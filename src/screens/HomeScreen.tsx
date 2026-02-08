import { useEffect, useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getCharacters } from "../services/rickAndMorty";
import { Character } from "../types/character";
import { CharacterCard } from "../components/CharacterCard";
import { SearchBar } from "../components/SearchBar";
import { StatusPicker } from "../components/StatusPicker";

export function HomeScreen() {
  const navigation = useNavigation<any>();
  const [characters, setCharacters] = useState<Character[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "All" | "Alive" | "Dead" | "unknown"
  >("All");

  useEffect(() => {
    async function load() {
      const data = await getCharacters();
      setCharacters(data);
    }
    load();
  }, []);

  const filtered = characters.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      String(c.id).includes(search);

    const matchesStatus = statusFilter === "All" || c.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <View style={styles.container}>
      <SearchBar value={search} onChange={setSearch} />
      <StatusPicker value={statusFilter} onChange={setStatusFilter} />

      <FlatList
        data={filtered}
        numColumns={2}
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
