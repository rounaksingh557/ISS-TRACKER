// Modules Import
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// Files Import
import HomeScreen from "../Screens/Home";
import MeteorScreen from "../Screens/Meteors";
import IssLocationScreen from "../Screens/IssLocation";

const Stack = createStackNavigator();

export default function StackNavigatorRoute() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Meteors" component={MeteorScreen} />
        <Stack.Screen name="IssLocation" component={IssLocationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
