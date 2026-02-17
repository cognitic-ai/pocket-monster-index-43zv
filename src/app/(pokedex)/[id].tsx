import { ScrollView, View, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import * as AC from '@bacons/apple-colors';
import { pokemonData } from '@/data/pokemon';
import { typeColors } from '@/types/pokemon';

function StatBar({ label, value, maxValue = 255 }: { label: string; value: number; maxValue?: number }) {
  const percentage = (value / maxValue) * 100;

  return (
    <View style={{ marginBottom: 12 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
        <Text style={{ color: AC.secondaryLabel, fontSize: 14 }}>{label}</Text>
        <Text style={{ color: AC.label, fontSize: 14, fontWeight: '600', fontVariant: 'tabular-nums' }}>
          {value}
        </Text>
      </View>
      <View style={{
        height: 6,
        backgroundColor: AC.quaternaryLabel,
        borderRadius: 3,
        borderCurve: 'continuous',
      }}>
        <View style={{
          width: `${Math.min(percentage, 100)}%`,
          height: '100%',
          backgroundColor: value > 100 ? AC.systemGreen : value > 70 ? AC.systemOrange : AC.systemBlue,
          borderRadius: 3,
          borderCurve: 'continuous',
        }} />
      </View>
    </View>
  );
}

export default function PokemonDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const pokemon = pokemonData.find(p => p.id === parseInt(id || '0'));

  if (!pokemon) {
    return (
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={{ padding: 32, alignItems: 'center' }}>
          <Text style={{ color: AC.secondaryLabel, fontSize: 18 }}>
            Pokemon not found
          </Text>
        </View>
      </ScrollView>
    );
  }

  const primaryType = pokemon.types[0];
  const primaryColor = typeColors[primaryType];

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={{ backgroundColor: AC.systemGroupedBackground }}
    >
      <View style={{ padding: 16 }}>
        {/* Pokemon Header */}
        <View
          style={{
            backgroundColor: primaryColor + '15',
            borderRadius: 20,
            borderCurve: 'continuous',
            padding: 24,
            alignItems: 'center',
            marginBottom: 20,
          }}
        >
          <Text
            style={{
              fontSize: 12,
              color: AC.secondaryLabel,
              fontWeight: '600',
              marginBottom: 8,
            }}
          >
            #{pokemon.id.toString().padStart(3, '0')}
          </Text>

          <Image
            source={{
              uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`
            }}
            style={{
              width: 200,
              height: 200,
              marginBottom: 16,
            }}
            contentFit="contain"
          />

          <Text
            style={{
              fontSize: 32,
              fontWeight: 'bold',
              color: AC.label,
              marginBottom: 16,
            }}
          >
            {pokemon.name}
          </Text>

          {/* Types */}
          <View style={{ flexDirection: 'row', gap: 12 }}>
            {pokemon.types.map((type) => (
              <View
                key={type}
                style={{
                  backgroundColor: typeColors[type],
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                  borderRadius: 20,
                  borderCurve: 'continuous',
                }}
              >
                <Text
                  style={{
                    color: 'white',
                    fontSize: 14,
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

        {/* Description */}
        <View
          style={{
            backgroundColor: AC.systemBackground,
            borderRadius: 16,
            borderCurve: 'continuous',
            padding: 20,
            marginBottom: 20,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: '600',
              color: AC.label,
              marginBottom: 12,
            }}
          >
            About
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: AC.secondaryLabel,
              lineHeight: 24,
            }}
            selectable
          >
            {pokemon.description}
          </Text>
        </View>

        {/* Physical Stats */}
        <View
          style={{
            backgroundColor: AC.systemBackground,
            borderRadius: 16,
            borderCurve: 'continuous',
            padding: 20,
            marginBottom: 20,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: '600',
              color: AC.label,
              marginBottom: 16,
            }}
          >
            Physical Stats
          </Text>

          <View style={{ flexDirection: 'row', gap: 24 }}>
            <View style={{ flex: 1 }}>
              <Text style={{ color: AC.secondaryLabel, fontSize: 14, marginBottom: 4 }}>
                Height
              </Text>
              <Text style={{ color: AC.label, fontSize: 18, fontWeight: '600', fontVariant: 'tabular-nums' }}>
                {(pokemon.height / 10).toFixed(1)}m
              </Text>
            </View>

            <View style={{ flex: 1 }}>
              <Text style={{ color: AC.secondaryLabel, fontSize: 14, marginBottom: 4 }}>
                Weight
              </Text>
              <Text style={{ color: AC.label, fontSize: 18, fontWeight: '600', fontVariant: 'tabular-nums' }}>
                {(pokemon.weight / 10).toFixed(1)}kg
              </Text>
            </View>
          </View>
        </View>

        {/* Abilities */}
        <View
          style={{
            backgroundColor: AC.systemBackground,
            borderRadius: 16,
            borderCurve: 'continuous',
            padding: 20,
            marginBottom: 20,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: '600',
              color: AC.label,
              marginBottom: 12,
            }}
          >
            Abilities
          </Text>

          <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
            {pokemon.abilities.map((ability, index) => (
              <View
                key={ability}
                style={{
                  backgroundColor: AC.secondarySystemBackground,
                  paddingHorizontal: 14,
                  paddingVertical: 8,
                  borderRadius: 12,
                  borderCurve: 'continuous',
                }}
              >
                <Text style={{ color: AC.label, fontSize: 14, fontWeight: '500' }}>
                  {ability}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Base Stats */}
        <View
          style={{
            backgroundColor: AC.systemBackground,
            borderRadius: 16,
            borderCurve: 'continuous',
            padding: 20,
            marginBottom: 20,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: '600',
              color: AC.label,
              marginBottom: 20,
            }}
          >
            Base Stats
          </Text>

          <StatBar label="HP" value={pokemon.stats.hp} />
          <StatBar label="Attack" value={pokemon.stats.attack} />
          <StatBar label="Defense" value={pokemon.stats.defense} />
          <StatBar label="Special Attack" value={pokemon.stats.specialAttack} />
          <StatBar label="Special Defense" value={pokemon.stats.specialDefense} />
          <StatBar label="Speed" value={pokemon.stats.speed} />

          <View style={{
            paddingTop: 16,
            borderTopWidth: 1,
            borderTopColor: AC.separator,
            marginTop: 16,
          }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ color: AC.secondaryLabel, fontSize: 14 }}>Total</Text>
              <Text style={{
                color: AC.label,
                fontSize: 16,
                fontWeight: '700',
                fontVariant: 'tabular-nums'
              }}>
                {Object.values(pokemon.stats).reduce((sum, stat) => sum + stat, 0)}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}