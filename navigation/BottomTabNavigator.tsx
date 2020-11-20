import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import SignUp from "../screens/SignUpScreen";
import Login from "../screens/LoginScreen";
import NewPostScreen from "../screens/NewPostScreen";
import TabOneScreen from "../screens/TabOneScreen";
import TabTwoScreen from "../screens/TabTwoScreen";
import HomeFeedScreen from "../screens/HomeFeedScreen";
import UserProfileScreen from "../screens/UserProfileScreen";
import PostScreen from "../screens/PostScreen";
// import UserProfileSettingsScreen from '../screens/UserProfileSettingsScreen';
import { BottomTabParamList, TabOneParamList, TabTwoParamList } from '../types';
import HomeStack from "./HomeStack";

import { StyleSheet, View, Button, TouchableWithoutFeedback } from 'react-native';
import { ScreenStackHeaderRightView } from 'react-native-screens';
import Navigation from '.';
import { IconButton } from "react-native-paper";

const BottomTab = createBottomTabNavigator<any>();
const HomeFeedStack = createStackNavigator();

export default function HomeFeedStackNavigator() {
  return (
    <HomeFeedStack.Navigator headerMode='none'>
      <HomeFeedStack.Screen name='Home' component={HomeFeedScreen} />
      <HomeFeedStack.Screen name='Inbox' component={HomeStack} />
    </HomeFeedStack.Navigator>
  )
};

// function BottomTabNavigator() {
//   const colorScheme = useColorScheme();

//   return (
//     <BottomTab.Navigator
//       initialRouteName="TabTwo"
//       tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}
//     >
//       <BottomTab.Screen
//         name="TabOne"
//         component={HomeStack}
//         options={{
//           tabBarIcon: ({ color }) => (
//             <TabBarIcon name="ios-code" color={color} />
//           )
//         }}
//       />
//       <BottomTab.Screen
//         name="TabTwo"
//         component={HomeStack}
//         options={{
//           tabBarIcon: ({ color }) => (
//             <TabBarIcon name="ios-code" color={color} />
//           )
//         }}
//       />
//       <BottomTab.Screen
//         name="HomseFeed"
//         component={HomeFeedScreen}
//         options={{
//           tabBarIcon: ({ color }) => (
//             <TabBarIcon name="ios-code" color={color} />
//           )
//         }}
//       />
//       <BottomTab.Screen
//         name="HomeeFeed"
//         component={Login}
//         options={{
//           tabBarIcon: ({ color }) => (
//             <TabBarIcon name="ios-code" color={color} />
//           )
//         }}
//       />
//       <BottomTab.Screen
//         name="HomaeFeed"
//         component={HomeFeedScreen}
//         options={{
//           tabBarIcon: ({ color }) => (
//             <TabBarIcon name="ios-code" color={color} />
//           )
//         }}
//       />
//       <BottomTab.Screen
//         name="HomeFeed"
//         component={HomeFeedScreen}
//         options={{
//           tabBarIcon: ({ color }) => (
//             <TabBarIcon name="ios-code" color={color} />
//           )
//         }}
//       />
//     </BottomTab.Navigator>
//   );
// }

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator<TabOneParamList>();

function TabOneNavigator() {
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        options={{ title: "tab 1" }}
        name="UserProfileScreen"
        component={UserProfileScreen}
      />
    </TabOneStack.Navigator>
  );
}

const styles = StyleSheet.create({
  leftBarButton: {
    color: "white",
    marginLeft: 12
  }
});

const TabTwoStack = createStackNavigator<TabTwoParamList>();

function TabTwoNavigator() {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="TabTwoScreen"
        component={TabTwoScreen}
        options={{ headerTitle: "Tab Two Title" }}
      />
    </TabTwoStack.Navigator>
  );
}
