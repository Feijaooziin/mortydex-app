import { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { RouteProp } from "@react-navigation/native";

import { getCharacter } from "../services/rickAndMorty";
import { Character } from "../types/character";

type Props = {
  route: RouteProp<{ params: { id: number } }, "params">;
};

export function CharacterScreen({ route }: Props) {
  const { id } = route.params;
  const [character, setCharacter] = useState<Character | null>(null);

  useEffect(() => {
    async function load() {
      const data = await getCharacter(String(id));
      setCharacter(data);
    }
    load();
  }, [id]);

  if (!character) return null;

  return (
    <View style={styles.container}>
      <Image source={{ uri: character.image }} style={styles.image} />

      <Text style={styles.name}>{character.name}</Text>

      <View style={styles.card}>
        <Text>Status: {character.status}</Text>
        <Text>Espécie: {character.species}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    padding: 16,
  },
  image: {
    width: "100%",
    height: 280,
    borderRadius: 20,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    elevation: 4,
  },
});
