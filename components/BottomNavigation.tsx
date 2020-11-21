import * as React from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";

export default function BottomNavigation({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Make Home in index.tsx naviation*/}
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <View style={styles.navButton}>
          <Text style={styles.navText}>Home</Text>
        </View>
      </TouchableOpacity>
      {/* Make CreatePost in index.tsx naviation*/}
      <TouchableOpacity onPress={() => navigation.navigate("NewPost")}>
        <View style={styles.circle}>
          <Text style={styles.plusSign}>+</Text>
        </View>
      </TouchableOpacity>
      {/* Make Home in index.tsx naviation*/}
      <TouchableOpacity
        onPress={() => navigation.navigate("Inbox", { screen: "Messages" })}
      >
        <View style={styles.navButton}>
          <Text style={styles.navText}>Inbox</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#C9CED6",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  circle: {
    backgroundColor: "#EB5757",
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: "center",
    top: "-50%",
  },
  plusSign: {
    fontSize: 75,
    color: "white",
  },
  navButton: {
    width: 90,
    height: 50,
    borderRadius: 15,
    backgroundColor: "#EB5757",
    justifyContent: "center",
    alignItems: "center",
  },
  navText: {
    fontSize: 17.5,
    color: "white",
  },
});
