import * as React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Tag from "../components/Tag";

export default function PostScreen({ navigation, post }) {
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
        <TouchableOpacity onPress={navigation.navigate("Home")}>
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
          {/* {mockPost.tags.map((tag, index) => (
            <Tag></Tag>
          ))} */}
          <Text style={styles.location}>{mockPost.location}</Text>
          <Text style={styles.date}>
            Posted on {mockPost.date.toLocaleString()}
          </Text>
          <View style={styles.proposeContainer}>
            <TouchableOpacity style={styles.propose}>
              <Text style={styles.proposeText}>Propose Trade</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.details}></View>
        <View style={styles.userInfo}></View>
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
    flex: 3,
    margin: 15,
    borderBottomColor: "#ccc",
    borderBottomWidth: 2
  },
  details: {
    flex: 4,
    margin: 15,
    borderBottomColor: "#ccc",
    borderBottomWidth: 2
  },
  userInfo: {
    flex: 1,
    margin: 15
  },
  postTitle: {
    fontSize: 30,
    fontWeight: "bold"
  },
  type: {
    fontSize: 22.5,
    marginBottom: 10
  },
  date: {
    fontSize: 17.5
  },
  location: {
    fontSize: 17.5
  },
  proposeContainer: {
    alignItems: "center"
  },
  propose: {
    width: "80%",
    height: 50,
    borderRadius: 25,
    backgroundColor: "#EB5757",
    justifyContent: "center",
    alignItems: "center"
  },
  proposeText: {
    fontSize: 17.5,
    color: "white"
  }
});
