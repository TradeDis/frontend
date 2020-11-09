import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { ColorSchemeName } from "react-native";

import NotFoundScreen from "../screens/NotFoundScreen";
import { RootStackParamList } from "../types";
import HomeFeedStackNavigator from "./BottomTabNavigator";
import LinkingConfiguration from "./LinkingConfiguration";
import AuthStack from './AuthStack';
import HomeFeedScreen from "../screens/HomeFeedScreen";
import HomeStack from "./HomeStack";
import { useContext, useState } from "react";
import { AuthContext } from "./AuthProvider";

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default function Navigation({
  colorScheme
}: {
  colorScheme: ColorSchemeName;
}) {
  const { user, setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [initializing, setInitializing] = useState(true);

  // // Handle user state changes
  // function onAuthStateChanged(user) {
  //   setUser(user);
  //   if (initializing) setInitializing(false);
  //   setLoading(false);
  // }

  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      {user ? <RootNavigator /> : <AuthStack />}
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<any>();

function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* Chnage to HomeFeedScreen to initialize as home screen */}
      <Stack.Screen name="Root" component={HomeFeedStackNavigator} />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />

      {/* <Stack.Screen name="Home" component={HomeFeedStackNavigator} /> */}
    </Stack.Navigator>
  );
}
