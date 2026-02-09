import { View, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { getStatusColor } from "../utils/statusColor";

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
      >
        <Picker.Item label="All statuses" value="All" color="#000" />

        <Picker.Item
          label="Alive"
          value="Alive"
          color={getStatusColor("Alive")}
        />

        <Picker.Item label="Dead" value="Dead" color={getStatusColor("Dead")} />

        <Picker.Item
          label="Unknown"
          value="unknown"
          color={getStatusColor("unknown")}
        />
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
});
