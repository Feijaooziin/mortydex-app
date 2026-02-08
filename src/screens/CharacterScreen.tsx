import { View, Text, Image, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { getCharacter } from "../services/rickAndMorty";
import { getStatusColor } from "../utils/statusColor";
import { Character } from "../types/character";

export function CharacterScreen({ route }: any) {
  const { id } = route.params;
  const [character, setCharacter] = useState<Character | null>(null);

  useEffect(() => {
    async function load() {
      const data = await getCharacter(id);
      setCharacter(data);
    }
    load();
  }, [id]);

  if (!character) return null;

  return (
    <View style={styles.container}>
      <Image source={{ uri: character.image }} style={styles.image} />

      <Text style={styles.name}>{character.name}</Text>

      <View
        style={[
          styles.statusBadge,
          { backgroundColor: getStatusColor(character.status) },
        ]}
      >
        <Text style={styles.status}>{character.status}</Text>
      </View>

      <Text style={styles.info}>Species: {character.species}</Text>
      <Text style={styles.info}>Gender: {character.gender}</Text>
      <Text style={styles.info}>Origin: {character.origin.name}</Text>
      <Text style={styles.info}>Location: {character.location.name}</Text>
      <Text style={styles.info}>Episodes: {character.episode.length}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: "#FFF",
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: "700",
  },
  statusBadge: {
    marginTop: 8,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },
  status: {
    color: "#FFF",
    fontWeight: "600",
  },
  info: {
    marginTop: 8,
    fontSize: 16,
  },
});
