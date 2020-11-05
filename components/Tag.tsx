import * as React from "react";
import { StyleSheet, View, Text } from "react-native";

export default function Tag({ tag }) {
  return (
    <View style={styles.container}>
      <Text style={styles.tag}>{tag}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    marginHorizontal: 5,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#EB5757",
    justifyContent: "center",
    alignItems: "center"
  },
  tag: {
    color: "white"
  }
});
