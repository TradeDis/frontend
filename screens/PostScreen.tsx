import * as React from "react";
import { StyleSheet, View, TouchableOpacity, Keyboard, Switch } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import Tag from "../components/Tag";
import BottomNavigation from "../components/BottomNavigation";
import { useState } from "react";
import { Modal, Portal, Text, Button, Provider, Card, TextInput, Snackbar } from 'react-native-paper';
import { Title, Paragraph, Subheading } from 'react-native-paper';
import { AuthContext } from "../navigation/AuthProvider";
import axios from "axios";

export default function PostScreen({ navigation, route }) {
  const [snackVisible, setsnackVisible] = React.useState(false);
  const onToggleSnackBar = () => setsnackVisible(!visible);
  const onDismissSnackBar = () => setsnackVisible(false);
  const [visible, setVisible] = React.useState(false);
  const [recipient, setRecipient] = useState("");
  const [message, setMessage] = useState("");
  const [messageForm, setMessageForm] = React.useState('Hi there 👋 I am interseted in this posting!');
  const [isMessageFormLoading, setisMessageFormLoading] = React.useState(false);
  const [isLoadingComplete, setLoadingComplete] = React.useState(true);

  const { user, setUser } = React.useContext(AuthContext);
  const [post, setPost] = useState(route.params?.post);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = { backgroundColor: 'white', padding: 20, margin: 40 };
  const isOwner = user.user_id == post.created_by.user_id

  let isInquired = false;
  post.proposers.forEach(function (pro) {
    if (pro.user_id == user.user_id) {
      isInquired = true;
    }
  });
  const LeftContent = props => <Avatar.Icon {...props} icon="message" />
  const updateStatus = status => {
    post.status = status;
    setPost(prevState => ({ ...prevState, status: status }));
    axios
      .put(`http://192.168.2.91:3000/api/v1/posts/${post.post_id}`, post)
      .then(resp => {
        setPost(prevState => ({ ...prevState, status: status }));
      })
      .catch(err => {
        console.log(err);
        console.log("Error updating post status.");
      });
  };

  const updateReports = () => {
    let updatedReporters = [];
    if(!post.reporters || post.reporters.length == 0) { //no reporters
      updatedReporters = [user.user_id];
    } else if(!post.reporters.includes(user.user_id)) { //add current user to reporters
      updatedReporters = post.reporters.push(user.user_id);
    } else { //remove current user to reporters
      updatedReporters = post.reporters.filter(id => id != user.user_id);
    }
    post.reporters = updatedReporters;
    setPost(prevState => ({ ...prevState, reporters: updatedReporters }));
    axios
      .put(`http://192.168.2.91:3000/api/v1/posts/${post.post_id}`, post)
      .then(resp => {
        setPost(prevState => ({ ...prevState, reporters: updatedReporters }));
      })
      .catch(err => {
        console.log(err);
        console.log("Error updating reporters.");
      });
  }

  const createConversation = () => {
    setisMessageFormLoading(true)
    const conversation = {
      "members": [{
        "user_id": user.user_id,
        "name": user.first_name + ' ' + user.last_name,
      }, {
        "user_id": post.created_by.user_id,
        "name": post.created_by.first_name + " " + post.created_by.last_name
      }],
      "name": post.title,
      "post_id": post.post_id,
      latestMessage: {
        text: messageForm,
        user: {
          "user_id": user.user_id,
          "name": user.first_name + ' ' + user.last_name,
        }
      }
    }
    const firstMessage = {
      user: {
        "user_id": user.user_id,
        "name": user.first_name + ' ' + user.last_name,
      },
      text: messageForm,
    }
    const systemMessage = {
      user: {
        "user_id": user.user_id,
        "name": user.first_name + ' ' + user.last_name,
      },
      text: `Welcome to your first message with ${post.created_by.first_name + " " + post.created_by.last_name} about ${post.title}`,
      system: true
    }
    axios
      .post(`https://tradis.herokuapp.com/api/v1/posts/${post.post_id}/propose`, {
        conversation,
        systemMessage,
        firstMessage,
        proposer: user
      })
      .then(resp => {
        console.log(resp.data)
        navigation.navigate("Inbox")
      })
      .catch(err => {
        const { errors } = err.response.data
        console.log(errors)
      }).finally(() => { setisMessageFormLoading(false) })

  }



  React.useEffect(() => {
    // whenever screen is focused
    const unsubscribe = navigation.addListener("focus", () => {
      axios
        .get(`http://192.168.31.138:3000/api/v1/posts/${post.post_id}`)
        .then(resp => {
          setPost(post);
          console.log(post)
        })
        .catch(err => {
          console.log(err)
          console.log("Error updating post status.")
        });
    });
    return unsubscribe;
  }, []);


  return (
    <Provider>
      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle} style={styles.modalStyle}>
          <View>
            <Title>Send a Message  </Title>
            <Subheading>{`To ${post.created_by.first_name + " " + post.created_by.last_name}`} </Subheading>
            <TextInput
              label="Message"
              placeholder="Leave a message ..."
              style={styles.formInput}
              value={messageForm}
              multiline={true}
              onChangeText={text => setMessageForm(text)}
            />
            <Button mode="contained" loading={isMessageFormLoading} color="rgba(235, 87, 87, 1)"
              onPress={() => createConversation()}><Text style={styles.postText}>Send</Text></Button>
            <Button mode="outline" color="rgba(235, 87, 87, 1)"
              onPress={() => hideModal()}><Text>Cancel</Text></Button>
          </View>
        </Modal>
      </Portal>
      <View style={styles.container}>
        <View style={styles.main}>
          <View style={styles.basicInfo}>
            <View style={styles.topInfo}>
              <Text style={styles.postTitle}>{post.title}</Text>
              {user.user_id == post.created_by.user_id ?
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
                      <Text style={{ color: post.status === "active" ? "white" : "black" }}>Active</Text>
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
                      <Text style={{ color: post.status === "active" ? "black" : "white" }}>Inactive</Text>
                    </View>
                  </TouchableOpacity>
                </View> :
                <Button 
                  icon="flag" 
                  color={ post.reporters && post.reporters.includes(user.user_id) ? 'rgba(235, 87, 87, 1)' : '#d3d3d3'}
                  onPress={() => updateReports()}></Button>
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
                ? "Posted on " + post.date.toString()
                : "No date available"}
            </Text>
            <View style={styles.details}>
              <Text style={styles.detailsText}>Details</Text>
              <Text style={styles.content}>{post.content}</Text>
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.userInfoText}>Creater Information</Text>
              <View style={styles.userDetails}>
                <Avatar source={{ uri: `https://ui-avatars.com/api/?background=random&rounded=true&name=${post.created_by.first_name + post.created_by.last_name}` }} />
                <View style={styles.user}>
                  <Text style={styles.fullName}>{post.created_by.first_name + " " + post.created_by.last_name}</Text>
                  <Text style={styles.username}>{post.created_by.username}</Text>
                </View>
              </View>
            </View>
            {isOwner ?
              <View style={styles.userInfo}>
                <Text style={styles.userInfoText}>Inquries</Text>
                {post.proposers.map(pro => (
                  <View style={styles.userDetails} key={pro.user_id}>
                    <Avatar source={{ uri: `https://ui-avatars.com/api/?background=random&rounded=true&name=${pro.first_name + pro.last_name}` }} />
                    <View style={styles.user}>
                      <Text style={styles.fullName}>{pro.first_name + " " + pro.last_name}</Text>
                      <Text style={styles.username}>{pro.username}</Text>
                    </View>
                  </View>
                ))}
              </View>
              : null}
            {!isOwner ? <Button
              disabled={isInquired}
              icon="swap-horizontal-circle"
              loading={!isLoadingComplete}
              color="rgba(235, 87, 87, 1)"
              mode="contained"
              style={styles.buttonContainer}
              onPress={() => showModal()}>
              <Text style={styles.postText}>{!isInquired ? "Propose Trade" : "Proposed"}</Text>
            </Button> : <Button
              icon="pencil"
              color="rgba(235, 87, 87, 1)"
              mode="contained"
              style={styles.buttonContainer}
              onPress={() => navigation.navigate("EditPostScreen", { post: post })}>
                <Text style={styles.postText}>Edit</Text>
              </Button>}
          </View>
        </View>
        <Snackbar
          visible={snackVisible}
          onDismiss={onDismissSnackBar}
        // action={{
        //   label: 'Undo',
        //   onPress: () => {
        //     // Do something
        //   },
        // }}
        >
          Hey there! I'm a Snackbar.
      </Snackbar>
        <BottomNavigation navigation={navigation}></BottomNavigation>
      </View>
    </Provider>

  );
}

const styles = StyleSheet.create({
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
  modalStyle: {
    borderRadius: 15
  },
  postText: {
    fontWeight: "600",
    color: "white"
  },
  buttonContainer: {
    color: "white",
    marginTop: 20,
    borderRadius: 15,
    shadowOffset: {
      width: 0.5,
      height: 4,
    },
    shadowOpacity: 0.3,
    elevation: 2,
  },
  formInput: {
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: "transparent",
  },
  top: {
    flex: 2,
    flexDirection: "row",
    backgroundColor: "#EB5757",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  main: {
    flex: 8,
    marginHorizontal: 15,
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
  form: {
    width: "100%",
    alignItems: "center",
  },
  sendButton: {
    width: "30%",
    height: 45,
    backgroundColor: "#EB5757",
    marginTop: 40,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
  },
  container: {
    flex: 1,
  },
  top: {
    flex: 2,
    flexDirection: "row",
    backgroundColor: "#EB5757",
    justifyContent: "space-evenly",
    alignItems: "center",
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
    marginBottom: 15,
    marginTop: 0,
    paddingVertical: 15,
    borderBottomColor: "#ccc",
    borderBottomWidth: 2,
  },
  userInfo: {
    // flex: 1,
    // margin: 15,
    paddingVertical: 15,
    marginBottom: 15,
    borderBottomColor: "#ccc",
    borderBottomWidth: 2,
    marginTop: 0,
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
