//User profile Screen, includes Reviews, Feed, User info, a Settings button in top right corner and Back button on the left

import * as React from "react";
import { useState, useEffect } from "react";
import { Component } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Button,
  FlatList,
  TextInput,
  Dimensions,
  Image
} from "react-native";
import { Text, View } from "../components/Themed";
import CustomRow from "../components/UserPostRow";
import UserInfoScreen from "../components/UserInfoScreen";
import UserReviewsScreen from "../components/ReviewsUserProfileScreen";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(242, 242, 242, 1)",
    flex: 1,
    alignItems: "center"
  },
  settingsButton: {
    backgroundColor: "rgba(52, 52, 52, 0)",
    marginLeft: 300
  },
  profileImage: {
    marginTop: -120,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
    borderRadius: 140 / 2,
    borderColor: "white",
    borderWidth: 2.5
  },
  profileName: {
    backgroundColor: "rgba(242, 242, 242, 1)",
    marginTop: 12
  },
  myInfoButtonContainer: {
    position: 'absolute',
    left: 100,
    backgroundColor: "rgba(242, 242, 242, 1)",
  },
  feedButtonContainer: {
    backgroundColor: "rgba(242, 242, 242, 1)",
  },
  reviewsButtonContainer: {
    backgroundColor: "rgba(242, 242, 242, 1)",
    position: 'absolute',
    right: 100,
  },
  separator: {
    borderBottomColor: "lightgrey",
    borderBottomWidth: 1,
    marginHorizontal: -120
  },
  customListView: {
    width: 300,
    marginBottom: 380,
    backgroundColor: "rgba(242, 242, 242, 1)",
  },
  feedList: {
    marginHorizontal: -50,
    marginTop: 10,
    marginBottom: -40,
    backgroundColor: "rgba(52, 52, 52, 0.0)"
  },
  userInfoContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: "rgba(52, 52, 52, 0.0)"
  },
  usernameContainer: {
    marginTop: 12,
    marginHorizontal: -30,
    borderRadius: 15,
    padding: 12,
    borderColor: 'grey',
    borderWidth: 0.16,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.3,

    elevation: 2,
  },
  emailContainer: {
    marginTop: 22,
    marginHorizontal: -30,
    borderRadius: 15,
    padding: 12,
    borderColor: 'grey',
    borderWidth: 0.16,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.3,
    elevation: 2,
  },
  passwordContainer: {
    marginTop: 22,
    marginHorizontal: -30,
    borderRadius: 15,
    padding: 12,
    borderColor: 'grey',
    borderWidth: 0.16,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.3,
    elevation: 2,
  },
  addressContainer: {
    marginTop: 22,
    marginHorizontal: -30,
    borderRadius: 15,
    padding: 12,
    borderColor: 'grey',
    borderWidth: 0.16,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.3,
    elevation: 2,
  },
  saveButton: {
    backgroundColor: 'rgba(235, 87, 87, 1)',
    marginTop: 25,
    marginHorizontal: 60,
    width: 95,
    height: 40,
    borderRadius: 15,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.3,
    elevation: 2,
  },
});

//random data to test the listview
const getData = () => {
  return [
    {
      id: 1,
      title: "nice",
      description: "Had a great time",
      rating: 3
    },
    {
      id: 2,
      title: "okay",
      description: "not good",
      rating: 2
    },
    {
      id: 3,
      title: "great",
      description: "great!!",
      rating: 5
    }
  ];
};

interface User {
  user_id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  address: string;
  avatar: string;
  reviews: []
}

interface UserToUpdate {
  user_id: number;
  username: string;
  email: string;
  password: string;
  avatar: String;
  //address: string;
}

interface Post {
  post_id: string;
  title: string;
  requesting: boolean;
  content: string;
  tags: string[];
}


//trying to use useState
const UserProfileScreen = ({ navigation }: any) => {
  const [feed, setFeedVisible] = useState(true);
  const [userInfo, setUserInfoVisible] = useState(false); //setting intial value to be false so we see feed
  const [userReviews, setUserReviewsVisible] = useState(false); //setting intial value to be false so we see feed

  const viewFeed = () => {
    setFeedVisible(true);
    setUserInfoVisible(false);
    setUserReviewsVisible(false);
  };

  const viewInfo = () => {
    setFeedVisible(false);
    setUserInfoVisible(true);
    setUserReviewsVisible(false);
  };

  const viewReviews = () => {
    setFeedVisible(false);
    setUserInfoVisible(false);
    setUserReviewsVisible(true);
  };

  const [user, setUser] = useState<User>();
  const [status, setStatus] = useState("pending");
  const [post, setPostData] = useState<Post[]>([]);
  const [userToUpdate, setUserToUpdate] = useState<UserToUpdate>({
    user_id: 31,
    username: "",
    email: "",
    password: "",
    avatar: "",
  });

  useEffect(() => {
    getUserData();
    getPostData();
  }, []);

  const getUserData = () => {
    axios
      .get("http://localhost:3000/api/v1/users/31")
      .then(resp => {
        setUser(resp.data)
        setUserToUpdate(resp.data)
      })
      .catch(err => {
        console.log(err);
        setStatus("error")
      })
  }


  const getPostData = () => {
    axios
      .get("http://localhost:3000/api/v1/posts")
      .then(resp => {
        setPostData(resp.data)
      })
      .catch(err => {
        console.log(err);
        setStatus("error")
      })
  }

  const updateUser = () => {
    axios
      .put("http://localhost:3000/api/v1/users/31", userToUpdate)
      .then(resp => {
        getUserData()
      })
      .catch(err => {
        console.log(err);
        setStatus("error")
      })
  }

  const [selectedImage, setSelectedImage] = useState(null);

  let openImage = async () => {
    let permission = await ImagePicker.requestCameraRollPermissionsAsync();

    if (permission.granted === false) {
      return;
    }

    let picker = await ImagePicker.launchImageLibraryAsync()

    if (picker.cancelled === true) {
      return;
    }
    setSelectedImage({ localURI: picker.uri });
  }

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          backgroundColor: "rgba(235, 87, 87, 1)",
          width: "100%",
          height: "30%",
          borderBottomLeftRadius: 35,
          borderBottomRightRadius: 35
        }}
      >
        {
          userInfo && (
            <View style={styles.settingsButton}>
              <Button
                title="Update picture"
                onPress={() => openImage()}
                color="white"
              />
            </View>
          )
        }
      </View>
      <View style={styles.profileImage}>
        {
          selectedImage !== null ?
            (
              <Image
                source={{ uri: selectedImage.localURI }}
                style={{ width: 140, height: 140, borderRadius: 150 / 2 }}
              ></Image>
            ) : <Image
              source={require("../assets/images/profileImage.png")}
              style={{ width: 140, height: 140, borderRadius: 150 / 2 }}
            ></Image>
        }

      </View>
      <View style={styles.profileName}>
        <Text style={{ fontSize: 35 }}>{user?.first_name} {user?.last_name}</Text>
      </View>
      <View>
        <View style={styles.myInfoButtonContainer}>
          <Button title="My info" onPress={() => viewInfo()} />
        </View>
        <View style={styles.reviewsButtonContainer}>
          <Button title="Reviews" onPress={() => viewReviews()} />
        </View>
        <View style={styles.feedButtonContainer}>
          <Button title="Feed" onPress={() => viewFeed()} />
        </View>
        <View style={styles.separator} />
      </View>
      <SafeAreaView>
        {//shows when feed is true
          feed && post && (
            <View style={styles.customListView}>
              <FlatList
                style={styles.feedList}
                data={post}
                renderItem={({ item }) => (
                  <CustomRow
                    title={item.title}
                    content={item.content}
                    requesting={item.requesting}
                    tags={item.tags}
                    uri={selectedImage?.localURI}
                    keyExtractor={(item: { id: any; }) => item.id}
                  />
                )}
              />
            </View>
          )}
        {// shows when userInfo is true
          userInfo && user && (
            <View style={styles.userInfoContainer}>
              <View style={styles.usernameContainer}>
                <Text>
                  {user.username}
                </Text>
                <TextInput
                  placeholder="Change Username"
                  onChangeText={username =>
                    setUserToUpdate(prevState => ({ ...prevState, username: username }))
                  }
                ></TextInput>
              </View>

              <View style={styles.emailContainer}>
                <Text>
                  {user.email}
                </Text>
                <TextInput placeholder="Change Email"
                  onChangeText={email =>
                    setUserToUpdate(prevState => ({ ...prevState, email: email }))
                  }
                ></TextInput>
              </View>

              <View style={styles.passwordContainer}>
                <Text>
                  {user.password}
                </Text>
                <TextInput placeholder="Change Password"
                  secureTextEntry={true}
                  onChangeText={password =>
                    setUserToUpdate(prevState => ({ ...prevState, password: password }))
                  }
                ></TextInput>
              </View>

              <View style={styles.addressContainer}>
                <Text>
                  11 waterloo st{user.address}
                </Text>
                <TextInput placeholder="Change Address"
                // onChangeText={address =>
                //   setUserToUpdate(prevState => ({ ...prevState, address: address }))
                // }
                ></TextInput>
              </View>
              <View style={styles.saveButton}>
                <Button color='white' title="Save" onPress={() => { updateUser() }}>
                </Button>
              </View>
            </View>
          )}
        {//shows when userReviews is true
          userReviews && (
            <View style={styles.customListView}>
              <FlatList
                style={styles.feedList}
                data={getData()}
                renderItem={({ item }) => (
                  <UserReviewsScreen
                    ratings={item.rating}
                    title={item.title}
                    description={item.description}
                  />
                )}
              />
            </View>
          )}
      </SafeAreaView>
    </SafeAreaView>
  );
};

export default UserProfileScreen;
