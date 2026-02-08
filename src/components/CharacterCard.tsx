import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { getStatusColor } from "../utils/statusColor";
import { Character } from "../types/character";

type Props = {
  character: Character;
  onPress: () => void;
};

export function CharacterCard({ character, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <Image source={{ uri: character.image }} style={styles.image} />

      <Text style={styles.name} numberOfLines={1}>
        {character.name}
      </Text>

      <View
        style={[
          styles.statusBadge,
          { backgroundColor: getStatusColor(character.status) },
        ]}
      >
        <Text style={styles.statusText}>{character.status}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "48%",
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 10,
    marginBottom: 12,
    marginHorizontal: "1%",
    elevation: 4,
  },
  image: {
    width: "100%",
    height: 120,
    borderRadius: 12,
  },
  name: {
    fontWeight: "700",
    marginTop: 8,
  },
  statusBadge: {
    marginTop: 6,
    paddingVertical: 4,
    borderRadius: 10,
    alignItems: "center",
  },
  statusText: {
    color: "#FFF",
    fontSize: 12,
    fontWeight: "600",
  },
});
