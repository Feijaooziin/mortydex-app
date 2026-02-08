import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Character } from "../types/character";

type Props = {
  character: Character;
  onPress: () => void;
};

export function CharacterCard({ character, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <Image source={{ uri: character.image }} style={styles.image} />

      <Text style={styles.name}>{character.name}</Text>
      <Text style={styles.species}>{character.species}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  image: {
    width: "100%",
    height: 120,
    borderRadius: 12,
    marginBottom: 8,
  },
  name: {
    fontWeight: "bold",
    fontSize: 14,
  },
  species: {
    color: "#666",
    fontSize: 12,
  },
});
