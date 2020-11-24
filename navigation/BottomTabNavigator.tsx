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
import InboxScreen from "../screens/InboxScreen";
import ConversationScreen from "../screens/ConversationScreen";
import NewMessageScreen from "../screens/NewMessageScreen";
import UserProfileScreen from "../screens/UserProfileScreen";
import EditPostScreen from "../screens/EditPostScreen";

import PostScreen from "../screens/PostScreen";
import { BottomTabParamList, TabOneParamList, TabTwoParamList } from '../types';
import HomeStack from "./HomeStack";

import { StyleSheet, View, TouchableWithoutFeedback } from 'react-native';
import { ScreenStackHeaderRightView } from 'react-native-screens';
import Navigation from '.';
import { IconButton } from "react-native-paper";
import { Button, Menu, Divider, Provider } from 'react-native-paper';
import { AuthContext } from "./AuthProvider";

const BottomTab = createBottomTabNavigator<any>();
const HomeFeedStack = createStackNavigator();

// route can only be passed in the same stack

export default function HomeFeedStackNavigator() {
  return (
    <HomeFeedStack.Navigator headerMode='none'>
      <HomeFeedStack.Screen name='Home' component={PostStackNavigator} />
      <HomeFeedStack.Screen name='Inbox' component={HomeStack} />
      <HomeFeedStack.Screen name='Post' component={PostScreen} />
      <HomeFeedStack.Screen name='User' component={UserProfileScreen} />
      <HomeFeedStack.Screen name='NewPost' component={NewPostStack} />
      <HomeFeedStack.Screen name='EditPostScreen' component={EditPostScreen} />
      <HomeFeedStack.Screen
        name='NewPost'
        component={NewPostStack}
      />
    </HomeFeedStack.Navigator>
  )
};

const UserModalStack = createStackNavigator();

function UserStack() {
  return (
    <UserModalStack.Navigator mode='modal' headerMode='none'>
      <UserModalStack.Screen name='User' component={UserProfileScreen} />
      <UserModalStack.Screen name='EditPostScreen' component={EditPostScreen} />
    </UserModalStack.Navigator>
  );
}



const NewPostModalStack = createStackNavigator();

function NewPostStack() {
  return (
    <NewPostModalStack.Navigator mode='modal' headerMode='none'>
      {/* <ModalStack.Screen name='Home' component={Post} /> */}
      <NewPostModalStack.Screen
        name='NewPost'
        component={NewPostScreen}
      />
    </NewPostModalStack.Navigator>
  );
}


const PostStack = createStackNavigator();
const ModalStack = createStackNavigator();

/**
 * All chat app related screens
 */

function Post() {
  const [visible, setVisible] = React.useState(false);
  const { user, setUser } = React.useContext(AuthContext);
  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false)
  // const { logout } = useContext(AuthContext);

  return (
    <PostStack.Navigator
      // headerMode='none'
      screenOptions={{
        headerStyle: {
          backgroundColor: '#EB5757'
        },
        headerTintColor: '#ffffff',
        headerTitleStyle: {
          fontSize: 23
        }
      }}
    >

      <PostStack.Screen name='Home' component={HomeFeedScreen} options={({ navigation }) => ({
        title: 'Home',
        headerLeft: () => (
          <Menu
            style={styles.menuStyle}
            visible={visible}
            onDismiss={closeMenu}
            anchor={<Button color="white" icon="menu" mode="text" onPress={openMenu}>Menu</Button>}>
            <Menu.Item icon="account" onPress={() => navigation.navigate("User")} title={`Logged In as ${user.username}`} />
            <Divider />
            <Menu.Item icon="logout" onPress={() => setUser(null)} title="Logout" />
            {/* <Menu.Item onPress={() => { }} title="Item 3" /> */}
          </Menu>
        ),
        headerRight: () => (
          <Button color="white" icon="account" mode="text" onPress={() => navigation.navigate("User")}>User</Button>
        )
      })} />

      <PostStack.Screen name='User' component={UserStack} options={({ navigation, route }) => ({
        title: `User ${user.first_name}`,
        headerRight: () => (
          <Button color="white" icon="account" mode="text" onPress={() => navigation.navigate("User")}>User</Button>
        )
      })} />

      <PostStack.Screen
        name='Post'
        component={PostScreen}
        options={({ navigation, route }) => ({
          title: `Posting for ${route.params.post.title}`,
          headerRight: () => (
            <Button color="white" icon="account" mode="text" onPress={() => navigation.navigate("User")}>User</Button>
          )
        })}
      />
      <PostStack.Screen
        name='NewPost'
        component={NewPostScreen}
        options={({ navigation, route }) => ({
          title: "New Posting",
          headerRight: () => (
            <Button color="white" icon="camera" mode="text" onPress={() => { }}>Camera</Button>
          )
        })}
      />
    </PostStack.Navigator>
  );
}

function PostStackNavigator() {
  return (
    <ModalStack.Navigator mode='modal' headerMode='none'>
      <ModalStack.Screen name='HomeApp' component={Post} />
    </ModalStack.Navigator>
  );
}


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
  menuStyle: {
    marginTop: 50
  },
  postingContainer: {
    width: 150,
    height: 150,
    borderRadius: 10,
    borderWidth: 2,
    margin: 5,
    padding: 5
  },
  postTitle: {
    fontWeight: "bold",
    fontSize: 20
  },
  postContent: {
    marginVertical: 3
  },
  postType: {
    position: "absolute",
    right: 5,
    bottom: 5
  },
  location: {
    fontWeight: "bold"
  },
  container: {
    flex: 1
  },
  top: {
    flex: 3,
    width: "100%",
    backgroundColor: "#EB5757",
    justifyContent: "center",
    borderBottomEndRadius: 35,
    borderBottomStartRadius: 35,
    marginBottom: 40
  },
  topElements: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#EB5757"
  },
  title: {
    fontSize: 35,
    color: "#fff",
    fontWeight: "bold",
  },
  topSecondaryText: {
    color: "#fff",
    fontSize: 17.5
  },
  search: {
    height: 50,
    marginHorizontal: 20,
    marginTop: 30,
    borderRadius: 50,
    padding: 10,
    backgroundColor: "white"
  },
  feed: {
    flex: 7,
  },
  newPostingsContainer: {
    margin: 15,
  },
  trendingContainer: {
    margin: 15
  },
  postingSubtitle: {
    fontSize: 25,
    fontWeight: "bold",
    color: "black"
  },
  postings: {
    flexDirection: "row",
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
