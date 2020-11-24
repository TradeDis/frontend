import * as React from "react";
import { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Card } from "react-native-elements";
import { TextInput } from "react-native-gesture-handler";

export default function NewMessageScreen({ navigation, post }) {
  // const [post, setPost] = useState(route.params?.post);

  // temporary message
  const [recipient, setRecipient] = useState("");
  const [message, setMessage] = useState("");

  // temp sendMessage
  const sendMessage = () => {
    alert("Success!");
  };

  return (
    <View style={styles.container}>
      {/* <View style={styles.top}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Inbox", { screen: "Messages" })}
        >
          <Text style={styles.secondaryText}>Inbox</Text>
        </TouchableOpacity>
        <Text style={styles.title}>TradeDis</Text>
        <Text style={styles.secondaryText}>Avatar</Text>
      </View> */}
      <View style={styles.main}>

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
    borderBottomEndRadius: 30,
    borderBottomLeftRadius: 30
  },
  main: {
    flex: 8,
    marginHorizontal: 15,
    shadowColor: 'black',
    shadowOffset: {
        width: 0,
        height: 5,
    },
    shadowOpacity: 0.3,
    elevation: 2,
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
  form: {
    width: "100%",
    alignItems: "center",
  },
  formInput: {
    width: "90%",
    height: 60,
    borderColor: "gray",
    borderBottomWidth: 1,
    
  },
  sendButton: {
    width: "30%",
    backgroundColor: "#EB5757",
    marginTop: 40,
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    borderRadius: 15,
    shadowColor: 'black',
    shadowOffset: {
        width: 0,
        height: 5,
    },
    shadowOpacity: 0.3,
    elevation: 2,
  },
  buttonText: {
    color: "#fff",
  },
});
