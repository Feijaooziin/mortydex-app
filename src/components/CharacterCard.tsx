import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { getStatusColor } from "../utils/statusColor";
import { Character } from "../types/character";

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
      activeOpacity={0.85}
    >
      <Image source={{ uri: character.image }} style={styles.image} />

      <View style={styles.content}>
        <Text style={styles.name}>{character.name}</Text>

        <View style={styles.statusRow}>
          <View
            style={[
              styles.statusBadge,
              { backgroundColor: getStatusColor(character.status) },
            ]}
          >
            <Text style={styles.statusText}>{character.status}</Text>
          </View>
        </View>

        <Text style={styles.info}>{character.species}</Text>
        <Text style={styles.subInfo}>{character.origin.name}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "48%",
    backgroundColor: "#1C1C1E",
    borderRadius: 16,
    marginBottom: 14,
    marginHorizontal: "1%",
    overflow: "hidden",
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    borderLeftWidth: 5,
  },

  image: {
    width: "100%",
    height: 160,
  },

  content: {
    padding: 12,
  },

  name: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FFF",
  },

  statusRow: {
    flexDirection: "row",
    marginVertical: 6,
  },

  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },

  statusText: {
    color: "#FFF",
    fontWeight: "600",
    fontSize: 12,
  },

  info: {
    fontSize: 14,
    fontWeight: "600",
    color: "#EEE",
    marginBottom: 4,
  },

  subInfo: {
    fontSize: 12,
    color: "#999",
  },
});
