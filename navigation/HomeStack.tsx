import React, { useContext } from 'react';
import { Alert } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { IconButton } from 'react-native-paper';
import InboxScreen from '../screens/InboxScreen';
// import AddConversationScreen from '../screens/AddConversationScreen';
import ConversationScreen from '../screens/ConversationScreen';
// import { AuthContext } from './AuthProvider';

const ChatAppStack = createStackNavigator();
const ModalStack = createStackNavigator();

/**
 * All chat app related screens
 */

function ChatApp() {
  // const { logout } = useContext(AuthContext);

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
        options={({ navigation }) => ({
          title: 'Inbox',
          headerRight: () => (
            <IconButton
              icon='message-plus'
              size={28}
              color='#ffffff'
              onPress={() => navigation.navigate('AddRoom')}
            />
          ),
          // headerLeft: () => (
          //   <IconButton
          //     icon='logout-variant'
          //     size={28}
          //     color='#ffffff'
          //     onPress={() => logout()}
          //   />
          // )
        })}
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
      <ModalStack.Screen name='AddRoom' component={ConversationScreen} />
    </ModalStack.Navigator>
  );
}
