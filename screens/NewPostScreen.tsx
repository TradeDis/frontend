import * as React from "react";
import { useState } from "react";
import axios from "axios";
import {
  StyleSheet,
  View,
  Text,
  Switch,
  TouchableOpacity,
  Keyboard
} from "react-native";
import Tags from "react-native-tags";
import { API_URL } from "@env";
import { useContext } from "react";
import { AuthContext } from "../navigation/AuthProvider";
import { TextInput, Button } from 'react-native-paper';

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

  const { user, setUser } = useContext(AuthContext);
  const [post, setPost] = useState<Post>({
    title: "",
    post_id: "",
    requesting: true,
    content: "",
    location: "",
    created_by: {
      user_id: user.user_id
    },
    date: new Date(),
    status: "active",
    tags: [],
    comments: []
  });

  const [status, setStatus] = useState("pending");
  const [displayMessage, setDisplayMessage] = useState("");
  const [isLoadingComplete, setLoadingComplete] = React.useState(true);

  const createPosting = () => {
    setLoadingComplete(false)
    Keyboard.dismiss(); //close keyboard on mobile devices
    setStatus("pending");
    if (!post.title || !post.content || !post.location) {
      //error checking to ensure all fields are present
      setStatus("error");
      setDisplayMessage("One or more required fields missing");
      setLoadingComplete(true)
      return;
    }

    post.created_by = user
    //perform api request to create new post
    axios
      .post(`http://192.168.31.138:3000/api/v1/posts`, post)
      .then(resp => {
        setStatus("success");
        setDisplayMessage("Successfully created post");
        //navigate back to homefeed after success
        navigation.navigate("Home");
      })
      .catch(err => {
        setStatus("error");
        setDisplayMessage(err);
      }).finally(
        () => setLoadingComplete(true)
      )
  };

  return (
    <View style={styles.container}>
      {/* <View style={styles.top}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Text style={styles.topSecondaryText}>Back</Text>
        </TouchableOpacity>
        <View>
          <Text style={styles.title}>Create Post</Text>
        </View>
        <Text style={styles.topSecondaryText}>Camera</Text>
      </View> */}
      <View style={styles.form}>
        <TextInput
          label="Title"
          placeholder="Title"
          style={styles.formInput}
          onChangeText={title =>
            setPost(prevState => ({ ...prevState, title: title }))
          }
          value={post.title}
        />
        <TextInput
          label="Content"
          placeholder="Content"
          style={styles.formInput}
          onChangeText={content =>
            setPost(prevState => ({ ...prevState, content: content }))
          }
          value={post.content}
        />
        <TextInput
          label="Location"
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
        <Button
          loading={!isLoadingComplete}
          color="rgba(235, 87, 87, 1)"
          mode="contained"
          style={styles.buttonContainer}
          onPress={() => createPosting()}>
          <Text style={styles.postText}> Post </Text>
        </Button>
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
  buttonContainer: {
    marginTop: 40,
    borderRadius: 15,
    shadowOffset: {
      width: 0.5,
      height: 4,
    },
    shadowOpacity: 0.3,
    elevation: 2,
  },
  container: {
    flex: 1
  },
  top: {
    flex: 2,
    flexDirection: "row",
    backgroundColor: "#EB5757",
    justifyContent: "space-around",
    alignItems: "center",
    borderBottomEndRadius: 30,
    borderBottomLeftRadius: 30
  },
  title: {
    fontSize: 30,
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
    alignItems: "center"
  },
  formInput: {
    width: "90%",
    height: 60,
    marginTop: 20,
    backgroundColor: "transparent",
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: 20,
    marginLeft: 20
  },
  switch: {
    marginLeft: 5,
    marginRight: 5,
    alignContent: "center"
  },
  postButton: {
    width: "30%",
    height: 45,
    backgroundColor: "#EB5757",
    marginTop: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
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
