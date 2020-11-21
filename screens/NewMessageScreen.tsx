import * as React from "react";
import { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Card } from "react-native-elements";
import { TextInput } from "react-native-gesture-handler";

export default function NewMessageScreen({ navigation, route }) {
  const [post, setPost] = useState(route.params?.post);

  // temporary message
  const [recipient, setRecipient] = useState("");
  const [message, setMessage] = useState("");

  // temp sendMessage
  const sendMessage = () => {
    alert("Success!");
  };

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
          <Card.Title>New Message</Card.Title>
          <Card.Divider />
          <View style={styles.form}>
            <TextInput
              placeholder="Recipient"
              style={styles.formInput}
              onChangeText={(rec) =>
                setRecipient(rec)
              }
              value={recipient}
            />
            <TextInput
              placeholder="Message"
              style={styles.formInput}
              onChangeText={(msg) =>
                setMessage(msg)
              }
              value={message}
            />
            <TouchableOpacity
              style={styles.sendButton}
              onPress={() => sendMessage()}
            >
              <Text style={styles.buttonText}>Send</Text>
            </TouchableOpacity>
          </View>
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
    height: 45,
    backgroundColor: "#EB5757",
    marginTop: 40,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
  },
});
