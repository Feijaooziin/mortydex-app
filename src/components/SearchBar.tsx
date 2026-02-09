import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

type Props = {
  value: string;
  onChange: (text: string) => void;
};

export function SearchBar({ value, onChange }: Props) {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search character..."
        value={value}
        onChangeText={onChange}
        style={styles.input}
        placeholderTextColor="#EEE"
      />

      {value.length > 0 && (
        <TouchableOpacity
          onPress={() => onChange("")}
          style={styles.clearButton}
          activeOpacity={0.7}
        >
          <MaterialIcons name="close" size={24} color="#EEE" />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    marginBottom: 10,
    marginHorizontal: 6,
  },

  input: {
    backgroundColor: "#999",
    borderRadius: 12,
    paddingVertical: 12,
    paddingLeft: 18,
    paddingRight: 40,
    fontSize: 16,
    color: "#FFF",
    fontWeight: "900",
    height: 48,
  },

  clearButton: {
    position: "absolute",
    right: 12,
    top: "50%",
    transform: [{ translateY: -12 }],
  },
});
