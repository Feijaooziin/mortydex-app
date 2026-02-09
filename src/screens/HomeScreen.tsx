import { useEffect, useState, useRef } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Text,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getCharacters } from "../services/rickAndMorty";
import { Character } from "../types/character";
import { CharacterCard } from "../components/CharacterCard";
import { SearchBar } from "../components/SearchBar";
import { StatusPicker } from "../components/StatusPicker";

export function HomeScreen() {
  const listRef = useRef<FlatList>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
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
        ref={listRef}
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
        scrollEventThrottle={16}
        onScroll={(event) => {
          const y = event.nativeEvent.contentOffset.y;
          setShowScrollTop(y > 300);
        }}
        ListFooterComponent={
          loading ? <ActivityIndicator size="large" /> : null
        }
      />

      {showScrollTop && (
        <TouchableOpacity
          style={styles.scrollTopButton}
          activeOpacity={0.8}
          onPress={() =>
            listRef.current?.scrollToOffset({
              offset: 0,
              animated: true,
            })
          }
        >
          <Text style={styles.scrollTopText}> ↑ </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#F5F5F5",
  },

  scrollTopButton: {
    position: "absolute",
    bottom: 32,
    right: 32,
    width: 48,
    height: 48,
    borderRadius: 100,
    backgroundColor: "#333",
    alignItems: "center",
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },

  scrollTopText: {
    color: "#fff",
    fontSize: 32,
    fontWeight: 900,
  },
});
