import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Character } from "../types/character";
import { getStatusColor } from "../utils/statusColor";

type Props = {
  character: Character;
  onPress: () => void;
};

export function CharacterCard({ character, onPress }: Props) {
  return (
    <TouchableOpacity
      style={[
        styles.card,
        { borderLeftColor: getStatusColor(character.status) },
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Image source={{ uri: character.image }} style={styles.image} />

      <View style={styles.info}>
        <Text style={styles.name}>{character.name}</Text>
        <Text style={styles.sub}>
          {character.species} • {character.status}
        </Text>
        <Text style={styles.location}>📍 {character.location.name}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    borderLeftWidth: 6,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },

  image: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },

  info: {
    marginLeft: 12,
    flex: 1,
    justifyContent: "center",
  },

  name: {
    fontSize: 16,
    fontWeight: "700",
  },

  sub: {
    fontSize: 13,
    color: "#666",
    marginTop: 2,
  },

  location: {
    fontSize: 12,
    color: "#888",
    marginTop: 4,
  },
});
