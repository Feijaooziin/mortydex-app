import { View, Text } from "react-native";

export function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={{ marginBottom: 10 }}>
      <Text style={{ color: "#888", fontSize: 12 }}>{label}</Text>
      <Text style={{ color: "#fff", fontSize: 16 }}>{value}</Text>
    </View>
  );
}
