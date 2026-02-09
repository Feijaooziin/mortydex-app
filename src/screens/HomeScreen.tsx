import { useEffect, useState } from "react";
import { View, FlatList, StyleSheet, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getCharacters } from "../services/rickAndMorty";
import { Character } from "../types/character";
import { CharacterCard } from "../components/CharacterCard";
import { SearchBar } from "../components/SearchBar";
import { StatusPicker } from "../components/StatusPicker";

export function HomeScreen() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(true);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<"All" | "Alive" | "Dead" | "unknown">(
    "All",
  );

  const navigation = useNavigation<any>();

  async function loadCharacters(reset = false) {
    if (loading || (!hasNext && !reset)) return;

    setLoading(true);

    try {
      const data = await getCharacters({
        page: reset ? 1 : page,
        name: search,
        status,
      });

      setCharacters((prev) =>
        reset ? data.results : [...prev, ...data.results],
      );

      setHasNext(Boolean(data.next));
      setPage((prev) => (reset ? 2 : prev + 1));
    } catch (err) {
      if (reset) setCharacters([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCharacters(true);
  }, [search, status]);

  return (
    <View style={styles.container}>
      <SearchBar value={search} onChange={setSearch} />
      <StatusPicker value={status} onChange={setStatus} />

      <FlatList
        data={characters}
        numColumns={2}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <CharacterCard
            character={item}
            onPress={() => navigation.navigate("Character", { id: item.id })}
          />
        )}
        onEndReached={() => loadCharacters()}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loading ? <ActivityIndicator size="small" /> : null
        }
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
