import * as React from "react";
import { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Card } from "react-native-elements";

export default function ConversationScreen({ navigation, route }) {
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        {/* nav needs to be implemented */}
        <TouchableOpacity
          onPress={() => navigation.navigate("Inbox", { screen: "Messages" })}
        >
          <Text style={styles.secondaryText}>Inbox</Text>
        </TouchableOpacity>
        <Text style={styles.title}>TradeDis</Text>
        <Text style={styles.secondaryText}>Avatar</Text>
      </View>
      <View style={styles.main}>
        <Card>
          <Card.Title>Conversation</Card.Title>
          <Card.Divider />
        </Card>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  top: {
    flex: 2,
    flexDirection: "row",
    backgroundColor: "#EB5757",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  main: {
    flex: 8,
    marginHorizontal: 15,
  },
  title: {
    fontSize: 35,
    color: "#fff",
    fontWeight: "bold",
  },
  secondaryText: {
    color: "#fff",
    fontSize: 17.5,
  },
});
