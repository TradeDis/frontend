import * as React from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { TextInput, Button } from 'react-native-paper';

export default function BottomNavigation({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Make Home in index.tsx naviation*/}
      <Button icon="home" mode="outline" color="#EB5757" labelStyle={styles.labelStyle} style={styles.navButton} onPress={() => navigation.navigate("Home")}>
        <Text style={styles.navText}>Home</Text>
      </Button>
      {/* Make CreatePost in index.tsx naviation*/}
      <TouchableOpacity onPress={() => navigation.navigate("NewPost")}>
        <View style={styles.circle}>
          <Text style={styles.plusSign}>+</Text>
        </View>
      </TouchableOpacity>
      {/* Make Home in index.tsx naviation*/}
      <Button
        icon="inbox" mode="outline" color="#EB5757" labelStyle={styles.labelStyle} style={styles.navButton}
        style={styles.navButton}
        onPress={() => navigation.navigate("Inbox", { screen: "Messages" })}
      >
        <Text style={styles.navText}>Inbox</Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    flex: 0.5,
    flexDirection: "row",
    backgroundColor: "#C9CED6",
    justifyContent: "space-evenly",
    alignItems: "center"
  },
  circle: {
    backgroundColor: "#EB5757",
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: "center",
    top: "-50%",
    shadowOffset: {
      width: 0.5,
      height: 4,
    },
    shadowOpacity: 0.4,
  },
  plusSign: {
    fontSize: 75,
    color: "white"
  },
  navButton: {
    width: 120,
    borderRadius: 7,
  },
  labelStyle: {
    fontSize: 50
  },
  navText: {
    fontSize: 17.5,
    color: "white"
  }
});
