import { View, Text, StyleSheet } from "react-native";

export function CharacterScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Detalhes do personagem</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 18,
  },
});
