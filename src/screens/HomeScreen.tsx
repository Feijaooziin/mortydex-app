import { useEffect, useState } from "react";
import { View, FlatList, StyleSheet, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { getCharacters } from "../services/rickAndMorty";
import { Character } from "../types/character";
import { CharacterCard } from "../components/CharacterCard";

export function HomeScreen() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const navigation = useNavigation<any>();

  useEffect(() => {
    async function load() {
      const data = await getCharacters();
      setCharacters(data);
    }
    load();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={characters}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <CharacterCard
            character={item}
            onPress={() => navigation.navigate("Character", { id: item.id })}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#F5F5F5",
  },
});
