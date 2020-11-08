import * as React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Tag from "../components/Tag";

export default function PostScreen({ navigation, post }) {
  //Mock post for testing & implementation purposes, use passed in post in future
  const mockPost = {
    title: "In Need of Pencils",
    content:
      "Just ran out of my last pencil and have an exam today at 3pm! Please, if anyone has any spare ones let me know!",
    created_by: {
      username: "johnsmith21",
      fullname: "John Smith"
    },
    date: new Date(),
    tags: ["pencils", "stationary"],
    location: "Icon North Tower Floor 8",
    requesting: true
  };
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        {/* nav needs to be implemented */}
        <TouchableOpacity onPress={() => navigation.navigate("HomeFeed")}>
          <Text style={styles.secondaryText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>TradeDis</Text>
        <Text style={styles.secondaryText}>Avatar</Text>
      </View>
      <View style={styles.main}>
        <View style={styles.basicInfo}>
          <Text style={styles.postTitle}>{mockPost.title}</Text>
          <Text style={styles.type}>
            {mockPost.requesting ? "Request" : "Trade"}
          </Text>
          {mockPost.tags && mockPost.tags.length > 0 && (
            <View>
              <Text style={styles.tagsText}>Tags:</Text>
              <View style={styles.tags}>
                {mockPost.tags.map((tag, index) => (
                  <Tag tag={tag}></Tag>
                ))}
              </View>
            </View>
          )}

          <Text style={styles.location}>
            {mockPost.location ? mockPost.location : "No location available"}
          </Text>
          <Text style={styles.date}>
            {mockPost.date
              ? "Posted on " + mockPost.date.toLocaleString()
              : "No date available"}
          </Text>
          <View style={styles.proposeContainer}>
            <TouchableOpacity style={styles.propose}>
              <Text style={styles.proposeText}>Propose Trade</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.details}>
          <Text style={styles.detailsText}>Details</Text>
          <Text style={styles.content}>{mockPost.content}</Text>
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.userInfoText}>User Information</Text>
          <View style={styles.userDetails}>
            <View style={styles.avatar}>{/*avatar will be put here*/}</View>
            <View style={styles.user}>
              <Text style={styles.fullName}>
                {mockPost.created_by.fullname}
              </Text>
              <Text style={styles.username}>
                {mockPost.created_by.username}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  top: {
    flex: 2,
    flexDirection: "row",
    backgroundColor: "#EB5757",
    justifyContent: "space-evenly",
    alignItems: "center"
  },
  main: {
    flex: 8
  },
  title: {
    fontSize: 35,
    color: "#fff",
    fontWeight: "bold"
  },
  secondaryText: {
    color: "#fff",
    fontSize: 17.5
  },
  basicInfo: {
    flex: 3.5,
    margin: 15,
    borderBottomColor: "#ccc",
    borderBottomWidth: 2
  },
  details: {
    flex: 4,
    margin: 15,
    marginTop: 0,
    borderBottomColor: "#ccc",
    borderBottomWidth: 2
  },
  userInfo: {
    flex: 1,
    margin: 15,
    marginTop: 0
  },
  postTitle: {
    fontSize: 30,
    fontWeight: "bold"
  },
  type: {
    fontSize: 22.5
  },
  tags: {
    flexDirection: "row",
    marginVertical: 10
  },
  tagsText: {
    fontSize: 15
  },
  noTags: {
    marginVertical: 10,
    fontSize: 15
  },
  date: {
    fontSize: 15
  },
  location: {
    fontSize: 15
  },
  proposeContainer: {
    alignItems: "center",
    marginVertical: 10
  },
  propose: {
    width: "90%",
    height: 40,
    borderRadius: 20,
    backgroundColor: "#EB5757",
    justifyContent: "center",
    alignItems: "center"
  },
  proposeText: {
    fontSize: 17.5,
    color: "white"
  },
  detailsText: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 10
  },
  content: {
    fontSize: 17.5
  },
  userInfoText: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 10
  },
  userDetails: {
    flexDirection: "row"
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#EB5757",
    borderColor: "black",
    borderWidth: 2
  },
  user: {
    marginLeft: 10
  },
  fullName: {
    fontSize: 17.5,
    fontWeight: "bold"
  },
  username: {
    fontSize: 15
  }
});
