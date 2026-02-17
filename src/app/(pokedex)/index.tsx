import { ScrollView, View, Text, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { Image } from 'expo-image';
import * as AC from '@bacons/apple-colors';
import { pokemonData } from '@/data/pokemon';
import { Pokemon, typeColors } from '@/types/pokemon';
import useSearch from '@/hooks/use-search';

function PokemonCard({ pokemon }: { pokemon: Pokemon }) {
  const primaryType = pokemon.types[0];
  const primaryColor = typeColors[primaryType];

  return (
    <Link href={`/(pokedex)/${pokemon.id}`} asChild>
      <Link.Trigger>
        <Pressable
          style={({ pressed }) => ({
            backgroundColor: AC.systemBackground,
            borderRadius: 16,
            borderCurve: 'continuous',
            padding: 16,
            marginHorizontal: 16,
            marginBottom: 12,
            flexDirection: 'row',
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 3,
            transform: pressed ? [{ scale: 0.98 }] : [{ scale: 1 }],
            opacity: pressed ? 0.9 : 1,
          })}
        >
          <View
            style={{
              width: 80,
              height: 80,
              borderRadius: 16,
              borderCurve: 'continuous',
              backgroundColor: primaryColor + '15',
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 16,
              overflow: 'hidden',
            }}
          >
            <Image
              source={{
                uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`
              }}
              style={{
                width: 64,
                height: 64,
              }}
              contentFit="contain"
            />
            <View style={{
              position: 'absolute',
              bottom: 4,
              right: 4,
              backgroundColor: primaryColor,
              paddingHorizontal: 6,
              paddingVertical: 2,
              borderRadius: 8,
              borderCurve: 'continuous',
            }}>
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: 'bold',
                  color: 'white',
                }}
              >
                #{pokemon.id.toString().padStart(3, '0')}
              </Text>
            </View>
          </View>

          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '600',
                color: AC.label,
                marginBottom: 4,
              }}
            >
              {pokemon.name}
            </Text>

            <View style={{ flexDirection: 'row', gap: 8 }}>
              {pokemon.types.map((type) => (
                <View
                  key={type}
                  style={{
                    backgroundColor: typeColors[type],
                    paddingHorizontal: 12,
                    paddingVertical: 4,
                    borderRadius: 16,
                    borderCurve: 'continuous',
                  }}
                >
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 12,
                      fontWeight: '600',
                      textTransform: 'capitalize',
                    }}
                  >
                    {type}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </Pressable>
      </Link.Trigger>
    </Link>
  );
}

export default function PokedexScreen() {
  const search = useSearch({ placeholder: 'Search Pokemon...' });

  const filteredPokemon = pokemonData.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(search.toLowerCase()) ||
    pokemon.types.some(type => type.toLowerCase().includes(search.toLowerCase())) ||
    pokemon.id.toString().includes(search)
  );

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={{
        backgroundColor: AC.systemGroupedBackground,
      }}
    >
      <View style={{ paddingTop: 16, paddingBottom: 32 }}>

        {filteredPokemon.length === 0 ? (
          <View style={{ padding: 32, alignItems: 'center' }}>
            <Text style={{ color: AC.secondaryLabel, fontSize: 16 }}>
              No Pokemon found
            </Text>
          </View>
        ) : (
          filteredPokemon.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))
        )}
      </View>
    </ScrollView>
  );
}