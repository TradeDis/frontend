import * as React from "react";
import { useState } from "react";
import axios from "axios";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Switch,
  TouchableOpacity
} from "react-native";

interface Post {
  post_id: string;
  title: string;
  trading: boolean;
  content: string;
  location: string;
  created_by: object;
  date: Date;
  status: string;
  tags: string[];
  comments: object[];
}

export default function NewPostScreen() {
  const [post, setPost] = useState<Post>({
    title: "",
    post_id: "",
    trading: true,
    content: "",
    location: "",
    created_by: {},
    date: new Date(),
    status: "",
    tags: [],
    comments: []
  });

  const createPosting = () => {
    console.log(post);
    axios
      .post("http://localhost:3000/api/v1/posts", post)
      .then(resp => {
        console.log("Response: " + resp);
      })
      .catch(err => {
        console.log("Error: " + err);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <View style={styles.topElements}>
          <Text style={styles.topSecondaryText}>Back</Text>
          <Text style={styles.title}>Post</Text>
          <Text style={styles.topSecondaryText}>Camera</Text>
        </View>
      </View>
      <View style={styles.form}>
        <TextInput
          placeholder="Title"
          style={styles.formInput}
          onChangeText={title =>
            setPost(prevState => ({ ...prevState, title: title }))
          }
          value={post.title}
        />
        <TextInput
          placeholder="Content"
          style={styles.formInput}
          onChangeText={content =>
            setPost(prevState => ({ ...prevState, content: content }))
          }
          value={post.content}
        />
        <TextInput
          placeholder="Location"
          style={styles.formInput}
          onChangeText={location =>
            setPost(prevState => ({ ...prevState, location: location }))
          }
          value={post.location}
        />
        <View style={styles.switchContainer}>
          <Text style={styles.switchOptions}>Requesting</Text>
          <Switch
            style={styles.switch}
            trackColor={{ false: "#767577", true: "#EB5757" }}
            onValueChange={() =>
              setPost(prevState => ({
                ...prevState,
                trading: !prevState.trading
              }))
            }
            value={post.trading}
          />
          <Text style={styles.switchOptions}>Trading</Text>
        </View>
        <TouchableOpacity
          style={styles.postButton}
          onPress={() => createPosting()}
        >
          <Text style={styles.postText}>Post!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  top: {
    flex: 2,
    width: "100%",
    backgroundColor: "#EB5757",
    justifyContent: "center"
  },
  topElements: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center"
  },
  title: {
    fontSize: 35,
    color: "#fff"
  },
  topSecondaryText: {
    color: "#fff",
    fontSize: 17.5
  },
  form: {
    width: "100%",
    flex: 9,
    alignItems: "center"
  },
  formInput: {
    width: "90%",
    height: 60,
    borderColor: "gray",
    borderBottomWidth: 1
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20
  },
  switch: {
    marginHorizontal: 20
  },
  postButton: {
    width: "30%",
    height: 45,
    backgroundColor: "#EB5757",
    marginTop: 40,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center"
  },
  postText: {
    color: "#fff",
    fontSize: 17.5
  },
  switchOptions: {
    fontSize: 15
  }
});
