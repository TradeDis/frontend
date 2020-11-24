import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { IconButton } from 'react-native-paper';
import InboxScreen from '../screens/InboxScreen';
// import AddConversationScreen from '../screens/AddConversationScreen';
import ConversationScreen from '../screens/ConversationScreen';
import NewMessageScreen from '../screens/NewMessageScreen';
import { Button, Menu, Divider, Provider } from 'react-native-paper';
import { AuthContext } from "./AuthProvider"

const ChatAppStack = createStackNavigator();
const ModalStack = createStackNavigator();

/**
 * All chat app related screens
 */

function ChatApp() {
  const { user } = useContext(AuthContext);

  return (
    <ChatAppStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#EB5757'
        },
        headerTintColor: '#ffffff',
        headerTitleStyle: {
          fontSize: 22
        }
      }}
    >
      <ChatAppStack.Screen
        name='Inbox'
        component={InboxScreen}
        options={({ navigation, route }) => ({
          title: "Inbox",
          headerLeft: () => (
            <Button color="white" mode="text" onPress={() => navigation.goBack()}>Back</Button>
          ),
          headerRight: () => (
            <Button color="white" icon="account" mode="text" onPress={() => navigation.navigate("User")}>User</Button>
          )
        })}
      // headerLeft: () => (
      //   <IconButton
      //     icon='logout-variant'
      //     size={28}
      //     color='#ffffff'
      //     onPress={() => logout()}
      //   />
      // )
      />
      <ChatAppStack.Screen
        name='Room'
        component={ConversationScreen}
        options={({ route }) => ({
          title: route.params.conversation.name
        })}
      />
    </ChatAppStack.Navigator>
  );
}

export default function HomeStack() {
  return (
    <ModalStack.Navigator mode='modal' headerMode='none'>
      <ModalStack.Screen name='ChatApp' component={ChatApp} />
      <ModalStack.Screen name='NewMessage' component={NewMessageScreen} />
    </ModalStack.Navigator>
  );
}
