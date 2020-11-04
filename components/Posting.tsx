import * as React from "react";
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  TouchableOpacity
} from "react-native";

export function Posting({ post, navigation }) {
  return (
    // Create PostPage in nav which accepts post_id data payload
    <TouchableOpacity
      onPress={() => navigation.navigate("PostPage", { post_id: post.post_id })}
    >
      <View style={styles.postingContainer}>
        <Text style={styles.postTitle}>{post.title}</Text>
        <Text style={styles.postContent}>{post.content}</Text>
        <Text style={styles.location}>{post.location}</Text>
        <Text style={styles.postType}>
          {post.requesting ? "Request" : "Trade"}
        </Text>
      </View>
    </TouchableOpacity>
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