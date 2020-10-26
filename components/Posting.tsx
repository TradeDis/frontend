import * as React from "react";
import { StyleSheet, TextInput, Text, View } from "react-native";

export function Posting(props: any) {
  return (
    <View style={styles.postingContainer}>
      <Text style={styles.postTitle}>{props.post.title}</Text>
      <Text style={styles.postContent}>{props.post.content}</Text>
      <Text style={styles.location}>{props.post.location}</Text>
      <Text style={styles.postType}>
        {props.post.requesting ? "Request" : "Trade"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
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
  }
});
