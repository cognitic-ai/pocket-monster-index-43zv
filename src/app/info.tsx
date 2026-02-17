import { ScrollView, View, Text } from "react-native";
import * as AC from "@bacons/apple-colors";

export default function InfoRoute() {
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={{
        backgroundColor: AC.systemGroupedBackground,
      }}
    >
      <View style={{ padding: 16 }}>
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
              fontSize: 24,
              fontWeight: 'bold',
              color: AC.label,
              marginBottom: 16,
            }}
          >
            About Pokédex
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: AC.secondaryLabel,
              lineHeight: 24,
              marginBottom: 16,
            }}
            selectable
          >
            This Pokédex contains information about various Pokémon species, including their types, stats, abilities, and descriptions.
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: AC.secondaryLabel,
              lineHeight: 24,
            }}
            selectable
          >
            Built with Expo and React Native for a native mobile experience.
          </Text>
        </View>

        <View
          style={{
            backgroundColor: AC.systemBackground,
            borderRadius: 16,
            borderCurve: 'continuous',
            padding: 20,
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
            Features
          </Text>
          <View style={{ gap: 8 }}>
            <Text style={{ color: AC.secondaryLabel, fontSize: 16 }}>
              • Browse Pokemon with beautiful cards
            </Text>
            <Text style={{ color: AC.secondaryLabel, fontSize: 16 }}>
              • Search by name, type, or ID
            </Text>
            <Text style={{ color: AC.secondaryLabel, fontSize: 16 }}>
              • View detailed stats and abilities
            </Text>
            <Text style={{ color: AC.secondaryLabel, fontSize: 16 }}>
              • Type-based color coding
            </Text>
            <Text style={{ color: AC.secondaryLabel, fontSize: 16 }}>
              • Native iOS and Android experience
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
