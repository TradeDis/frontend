import * as React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Keyboard, Switch, TextInput, ScrollView } from "react-native";
import Tag from "../components/Tag";
import { useNavigation } from '@react-navigation/native';
import BottomNavigation from "../components/BottomNavigation";
import { useState, useContext } from "react";
import axios from 'axios';
import { AuthContext } from "../navigation/AuthProvider";

export default function PostScreen({ navigation, route }) {
  const [post, setPost] = useState(route.params?.post);
  const { user, setUser } = useContext(AuthContext);

  const updateStatus = status => {
    post.status = status;
    axios
      .put(`http://192.168.2.91:3000/api/v1/posts/${post.post_id}`, post)
      .then(resp => {
        setPost(prevState => ({ ...prevState, status: status }));
      })
      .catch(err => {
        console.log("Error updating post status.")
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.secondaryText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>TradeDis</Text>
        <Text style={styles.secondaryText}>Avatar</Text>
      </View>
      <ScrollView style={styles.body}>
      <View style={styles.main}>
        <View style={styles.basicInfo}>
        <View style={styles.topInfo}>
          <Text style={styles.postTitle}>{post.title}</Text>
          {user.user_id == post.created_by.user_id &&
          <View style={styles.switch}>
              <TouchableOpacity onPress={() => updateStatus("active")}>
                <View
                  style={{
                    flex: 1,
                    padding: 5,
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                    borderTopLeftRadius: 17.5,
                    borderBottomLeftRadius: 17.5,
                    backgroundColor:
                      post.status === "active" ? "#EB5757" : "#d3d3d3"
                  }}
                >
                  <Text style={{color: post.status === "active" ? "white" : "black"}}>Active</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => updateStatus("inactive")}>
                <View
                  style={{
                    flex: 1,
                    padding: 5,
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                    borderTopRightRadius: 17.5,
                    borderBottomRightRadius: 17.5,
                    backgroundColor:
                      post.status === "active" ? "#d3d3d3" : "#EB5757"
                  }}
                >
                  <Text style={{color: post.status === "active" ? "black" : "white"}}>Inactive</Text>
                </View>
              </TouchableOpacity>
            </View>
            }
          </View>
          <Text style={styles.type}>
            {post.requesting ? "Request" : "Trade"}
          </Text>
          {post.tags && post.tags.length > 0 && (
            <View>
              <Text style={styles.tagsText}>Tags:</Text>
              <View style={styles.tags}>
                {post.tags.map((tag, index) => (
                  <Tag key={index} tag={tag}></Tag>
                ))}
              </View>
            </View>
          )}

          <Text style={styles.location}>
            {post.location ? post.location : "No location available"}
          </Text>
          <Text style={styles.date}>
            {post.date
              ? "Posted on " + post.date.toLocaleString()
              : "No date available"}
          </Text>
          <View style={styles.proposeContainer}>
            <TouchableOpacity
              style={styles.propose}
              onPress={() =>
                navigation.navigate("Inbox", { screen: "NewMessage", post })
              }
            >
              <Text style={styles.proposeText}>Propose Trade</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.details}>
          <Text style={styles.detailsText}>Details</Text>
          <Text style={styles.content}>{post.content}</Text>
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.userInfoText}>User Information</Text>
          <View style={styles.userDetails}>
            <View style={styles.avatar}>{/*avatar will be put here*/}</View>
            <View style={styles.user}>
              <Text style={styles.fullName}>{post.created_by.full_name}</Text>
              <Text style={styles.username}>{post.created_by.username}</Text>
            </View>
          </View>
        </View>
      </View>
      </ScrollView>
      <BottomNavigation navigation={navigation}></BottomNavigation>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  top: {
    flex: 0.2,
    flexDirection: "row",
    backgroundColor: "#EB5757",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  body: {
    flex: 1
  },
  main: {
    flex: 8,
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
  basicInfo: {
    flex: 3.5,
    margin: 15,
    borderBottomColor: "#ccc",
    borderBottomWidth: 2,
  },
  details: {
    flex: 4,
    margin: 15,
    marginTop: 0,
    paddingVertical: 15,
    borderBottomColor: "#ccc",
    borderBottomWidth: 2,
  },
  userInfo: {
    flex: 1,
    margin: 15,
    marginTop: 0,
  },
  topInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  switch: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 120,
    height: 35
  },
  postTitle: {
    fontSize: 30,
    fontWeight: "bold",
  },
  type: {
    fontSize: 22.5,
  },
  tags: {
    flexDirection: "row",
    marginVertical: 10,
  },
  tagsText: {
    fontSize: 15,
  },
  noTags: {
    marginVertical: 10,
    fontSize: 15,
  },
  date: {
    fontSize: 15,
  },
  location: {
    fontSize: 15,
  },
  proposeContainer: {
    alignItems: "center",
    marginVertical: 10,
  },
  propose: {
    width: "90%",
    height: 40,
    borderRadius: 20,
    backgroundColor: "#EB5757",
    justifyContent: "center",
    alignItems: "center",
  },
  proposeText: {
    fontSize: 17.5,
    color: "white",
  },
  detailsText: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 10,
  },
  content: {
    fontSize: 17.5,
  },
  userInfoText: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 10,
  },
  userDetails: {
    flexDirection: "row",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#EB5757",
    borderColor: "black",
    borderWidth: 2,
  },
  user: {
    marginLeft: 10,
  },
  fullName: {
    fontSize: 17.5,
    fontWeight: "bold",
  },
  username: {
    fontSize: 15,
  },
});
