import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { HomeScreen } from "./src/screens/HomeScreen";
import { CharacterScreen } from "./src/screens/CharacterScreen";
import { RootStackParamList } from "./src/types/navigation";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View, Text } from "react-native";
import { getCharacter } from "./src/services/rickAndMorty";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "#2ECC71",
          },
          headerTintColor: "#FFF",
          headerTitleStyle: {
            fontWeight: "900",
          },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerTitle: () => (
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
              >
                <MaterialCommunityIcons
                  name="flask-outline"
                  size={26}
                  color="#FFF"
                />
                <Text
                  style={{
                    color: "#FFF",
                    fontSize: 18,
                    fontWeight: "700",
                  }}
                >
                  MORTY DEX
                </Text>
              </View>
            ),
          }}
        />

        <Stack.Screen
          name="Character"
          component={CharacterScreen}
          options={{ title: "Character Details" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
