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
        placeholderTextColor="#999"
      />

      {value.length > 0 && (
        <TouchableOpacity
          onPress={() => onChange("")}
          style={styles.clearButton}
          activeOpacity={0.7}
        >
          <MaterialIcons name="close" size={22} color="#666" />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    marginBottom: 10,
  },

  input: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    paddingVertical: 12,
    paddingLeft: 14,
    paddingRight: 40,
    fontSize: 16,
  },

  clearButton: {
    position: "absolute",
    right: 12,
    top: "50%",
    transform: [{ translateY: -11 }],
  },
});
