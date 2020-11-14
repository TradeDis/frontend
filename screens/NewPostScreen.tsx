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
import CustomButton from "../components/CustomButton";

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
    Keyboard.dismiss();
    setStatus("pending");
    if (!post.title || !post.content || !post.location) {
      setStatus("error");
      setDisplayMessage("One or more required fields missing");
      return;
    }
    axios
      .post(`${process.env.API_URL}/api/v1/posts`, post)
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
          <Text style={styles.title}>Post</Text>
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
        <Tags
          style={styles.tagsInput}
          initialText="Tags separated by commas"
          initialTags={[]}
          createTagOnString={[","]}
          onChangeTags={tags =>
            setPost(prevState => ({ ...prevState, tags: tags }))
          }
        />
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
        <View style={styles.createPostButtonContainer}>
          <CustomButton
            onPress={() => createPosting()}
            title="Post!"
          ></CustomButton>
        </View>

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
    flex: 2.5,
    flexDirection: "row",
    backgroundColor: "#EB5757",
    justifyContent: "space-around",
    alignItems: "center",
    borderBottomEndRadius: 35,
    borderBottomLeftRadius: 35
  },
  title: {
    fontSize: 35,
    color: "#fff",
    marginLeft: 15
  },
  topSecondaryText: {
    color: "#fff",
    fontSize: 17.5
  },
  form: {
    width: "100%",
    flex: 9,
    alignItems: "center",
    marginTop: 20
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
    marginTop: 20,
    marginLeft: 20
  },
  switch: {
    marginHorizontal: 20
  },
  createPostButtonContainer: {
    height: 40,
    width: '30%',
    marginTop: 40,
    borderRadius: 15,
    alignItems: "center",
    backgroundColor: 'rgba(235, 87, 87, 1)',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.3,
    elevation: 2,
  },
  postText: {
    color: "#fff",
    fontSize: 17.5
  },
  switchOptions: {
    fontSize: 15
  },
  tagsInput: {
    margin: 15
  }
});
