import { View, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

type StatusFilter = "All" | "Alive" | "Dead" | "unknown";

type Props = {
  value: StatusFilter;
  onChange: (status: StatusFilter) => void;
};

export function StatusPicker({ value, onChange }: Props) {
  return (
    <View style={styles.container}>
      <Picker
        selectedValue={value}
        onValueChange={(itemValue) => onChange(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="All statuses" value="All" />
        <Picker.Item label="Alive" value="Alive" />
        <Picker.Item label="Dead" value="Dead" />
        <Picker.Item label="Unknown" value="unknown" />
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    marginBottom: 10,
    overflow: "hidden",
  },

  picker: {
    height: 28,
    paddingHorizontal: 8,
  },
});
