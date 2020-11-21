import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignUp from "../screens/SignUpScreen";
import Login from "../screens/LoginScreen";

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator initialRouteName='Login' headerMode='none'>
      <Stack.Screen name='Login' component={Login} />
      <Stack.Screen name='Signup' component={SignUp} />
    </Stack.Navigator>
  );
}
