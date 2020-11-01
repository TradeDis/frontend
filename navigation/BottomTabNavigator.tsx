import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';


import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import UserProfileScreen from '../screens/UserProfileScreen';
import UserProfileSettingsScreen from '../screens/UserProfileSettingsScreen';
import UserInfoScreen from '../components/UserInfoScreen';
import { BottomTabParamList, TabOneParamList, TabTwoParamList } from '../types';


import { StyleSheet, View, Button, TouchableWithoutFeedback} from 'react-native';
import { ScreenStackHeaderRightView } from 'react-native-screens';
import Navigation from '.';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="TabOne"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}>
      <BottomTab.Screen
        name="TabOne"
        component={TabOneScreen}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-code" color={color} />,
        }}
      /> 
      <BottomTab.Screen
        name="TabTwo"
        component={UserProfileScreen}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-code" color={color} />,
        }}
      />
        <BottomTab.Screen
        name="."
        component={UserProfileSettingsScreen}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-code" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

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
        name="UserProfileScreen"
        component={TabOneScreen}
        options={{ title: "tab 1"}}
      />
    </TabOneStack.Navigator>
    
  );
}

const styles = StyleSheet.create({
  leftBarButton: { 
    color: 'white',
    marginLeft: 12

  },

});


const TabTwoStack = createStackNavigator<TabTwoParamList>();

function TabTwoNavigator() {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="profile"
        component={UserProfileScreen}
        options={{ headerTitle: 'Tab Two Title' }}
      />
        <TabTwoStack.Screen
        name="settings"
        component={UserProfileSettingsScreen}
      />
    </TabTwoStack.Navigator>
  );
}
