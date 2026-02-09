import { View, Text, Image, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { getCharacter, getCharacterDetails } from "../services/rickAndMorty";
import { getStatusColor } from "../utils/statusColor";
import { Character } from "../types/character";
import { InfoRow } from "../components/InfoRow";

export interface CharacterDetails extends Character {
  firstEpisodeName: string;
  createdYear: string;
}

export function CharacterScreen({ route }: any) {
  const { id } = route.params;
  const [character, setCharacter] = useState<CharacterDetails | null>(null);

  useEffect(() => {
    async function load() {
      const data = await getCharacterDetails(id);
      setCharacter(data);
    }

    load();
  }, [id]);

  if (!character) return null;

  return (
    <View style={styles.container}>
      {/* IMAGE */}
      <Image source={{ uri: character.image }} style={styles.image} />

      {/* NAME */}
      <Text style={styles.name}>{character.name}</Text>

      {/* STATUS BADGE */}
      <View
        style={[
          styles.statusBadge,
          { backgroundColor: getStatusColor(character.status) },
        ]}
      >
        <Text style={styles.statusText}>{character.status}</Text>
      </View>

      {/* INFO CARD */}
      <View style={styles.card}>
        <InfoRow label="Species" value={character.species} />
        <InfoRow label="Gender" value={character.gender} />
        <InfoRow label="Origin" value={character.origin.name} />
        <InfoRow label="Location" value={character.location.name} />
      </View>

      {/* STATS */}
      <View style={styles.card}>
        <InfoRow label="Episodes" value={`${character.episode.length}`} />
        <InfoRow label="First seen" value={character.firstEpisodeName} />
      </View>

      {/* FOOTER */}
      <Text style={styles.footer}>
        ID #{character.id} • Created {character.createdYear}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0E0E10",
    alignItems: "center",
    padding: 16,
  },

  image: {
    width: 180,
    height: 180,
    borderRadius: 90,
    marginTop: 16,
    borderWidth: 3,
    borderColor: "#00B5CC",
  },

  name: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "700",
    marginTop: 12,
    textAlign: "center",
  },

  statusBadge: {
    marginTop: 8,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },

  statusText: {
    color: "#fff",
    fontWeight: "600",
  },

  card: {
    width: "100%",
    backgroundColor: "#1C1C1E",
    borderRadius: 16,
    padding: 16,
    marginTop: 16,
  },

  footer: {
    color: "#888",
    fontSize: 12,
    marginTop: 20,
  },
});
