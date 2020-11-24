import * as React from "react";
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  TouchableOpacity
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export const Posting = ({ post }) => {
  const navigation = useNavigation();

  return (
    <View>
      <TouchableOpacity
        onPress={() => navigation.navigate("Post", { post: post })}
      >
        <View
          style={[
            styles.postingContainer,
            {
              backgroundColor: post.status === "inactive" ? "#d3d3d3" : "white"
            }
          ]}
        >
          <Text
            style={[
              styles.postTitle,
              {
                textDecorationLine:
                  post.status === "inactive" ? "line-through" : "none"
              }
            ]}
          >
            {post.title}
          </Text>
          <Text
            style={[
              styles.postContent,
              {
                textDecorationLine:
                  post.status === "inactive" ? "line-through" : "none"
              }
            ]}
          >
            {post.content}
          </Text>
          <Text
            style={[
              styles.location,
              {
                textDecorationLine:
                  post.status === "inactive" ? "line-through" : "none"
              }
            ]}
          >
            {post.location}
          </Text>
          <Text
            style={[
              styles.postType,
              {
                textDecorationLine:
                  post.status === "inactive" ? "line-through" : "none"
              }
            ]}
          >
            {post.requesting ? "Request" : "Trade"}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  postingContainer: {
    width: 150,
    height: 150,
    borderRadius: 12,
    margin: 5,
    padding: 8,
    shadowColor: "black",
    shadowOffset: {
      width: 1.5,
      height: 2.5
    },
    shadowOpacity: 0.5,
    elevation: 20,
    backgroundColor: "white"
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
    right: 8,
    bottom: 8
  },
  location: {
    fontWeight: "bold"
  }
});
