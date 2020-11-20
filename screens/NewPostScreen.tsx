import * as React from "react";
import { useState } from "react";
import axios from "axios";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Switch,
  TouchableOpacity,
  Keyboard
} from "react-native";
import Tags from "react-native-tags";
import { API_URL } from "@env";

interface Post {
  post_id: string;
  title: string;
  requesting: boolean;
  content: string;
  location: string;
  created_by: object;
  date: Date;
  status: string;
  tags: string[];
  comments: object[];
}

export default function NewPostScreen({ navigation }) {
  const [post, setPost] = useState<Post>({
    title: "",
    post_id: "",
    requesting: true,
    content: "",
    location: "",
    created_by: {},
    date: new Date(),
    status: "active",
    tags: [],
    comments: []
  });
  const [status, setStatus] = useState("pending");
  const [displayMessage, setDisplayMessage] = useState("");

  const createPosting = () => {
    Keyboard.dismiss(); //close keyboard on mobile devices
    setStatus("pending");
    if (!post.title || !post.content || !post.location) {
      //error checking to ensure all fields are present
      setStatus("error");
      setDisplayMessage("One or more required fields missing");
      return;
    }
    //perform api request to create new post
    axios
      .post(`${API_URL}/api/v1/posts`, post)
      .then(resp => {
        setStatus("success");
        setDisplayMessage("Successfully created post");
        //navigate back to homefeed after success
        navigation.navigate("HomeFeed");
      })
      .catch(err => {
        setStatus("error");
        setDisplayMessage(err);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <TouchableOpacity onPress={() => navigation.navigate("HomeFeed")}>
          <Text style={styles.topSecondaryText}>Back</Text>
        </TouchableOpacity>
        <View>
          <Text style={styles.title}>Create Post</Text>
        </View>
        <Text style={styles.topSecondaryText}>Camera</Text>
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
        <View style={styles.tagsContainer}>
          <Text style={styles.tagsText}>Tags separated by commas</Text>
          <Tags
            style={styles.tagsInput}
            initialTags={[]}
            createTagOnString={[","]}
            onChangeTags={tags =>
              setPost(prevState => ({ ...prevState, tags: tags }))
            }
          />
        </View>
        <View style={styles.switchContainer}>
          <Text style={styles.switchOptions}>Trading</Text>
          <Switch
            style={styles.switch}
            trackColor={{ false: "#767577", true: "#EB5757" }}
            onValueChange={() =>
              setPost(prevState => ({
                ...prevState,
                requesting: !prevState.requesting
              }))
            }
            value={post.requesting}
          />
          <Text style={styles.switchOptions}>Requesting</Text>
        </View>
        <TouchableOpacity
          style={styles.postButton}
          onPress={() => createPosting()}
        >
          <Text style={styles.postText}>Post!</Text>
        </TouchableOpacity>
        {(status === "success" || status === "error") && (
          <Text
            style={{
              marginTop: 10,
              color: status === "error" ? "red" : "green"
            }}
          >
            {displayMessage}
          </Text>
        )}
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
  title: {
    fontSize: 30,
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
  },
  tagsContainer: {
    margin: 15,
    width: "100%"
  },
  tagsText: {
    marginLeft: 20,
    marginBottom: 5
  },
  tagsInput: {
    marginHorizontal: 15
  }
});
