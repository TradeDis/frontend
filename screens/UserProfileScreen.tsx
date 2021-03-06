//User profile Screen, includes Reviews, Feed, User info, a Settings button in top right corner and Back button on the left

import * as React from "react";
import { useState, useEffect, useContext } from "react";
import { Component } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Button,
  FlatList,
  TextInput,
  Dimensions,
  Image,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { Text, View } from "../components/Themed";
import UserInfoScreen from "../components/UserInfoScreen";
import UserReviewsScreen from "../components/ReviewsUserProfileScreen";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import { API_URL } from "@env";
import BottomNavigation from "../components/BottomNavigation";
import { AuthContext } from "../navigation/AuthProvider";
import { useNavigation } from "@react-navigation/native";
import UserPostRow from "../components/UserPostRow";



const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(242, 242, 242, 1)",
    flex: 1,
    alignItems: "center"
  },
  settingsButton: {
    backgroundColor: "rgba(52, 52, 52, 0)",
    alignSelf: 'flex-end',
    marginLeft: 15,
    marginTop: 200,
    position: 'absolute'
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
    flexDirection: "row",
    width: '100%',
    backgroundColor: "rgba(242, 242, 242, 1)",
    marginBottom: 350,
    padding: 5
  },
  feedList: {
    width: '100%',
    backgroundColor: "rgba(242, 242, 242, 1)",
    padding: 5,
    alignSelf: 'center'
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
  postingContainer: {
    width: 150,
    height: 150,
    borderRadius: 10,
    borderWidth: 2,
    margin: 5,
    padding: 5
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
    right: 5,
    bottom: 5
  },
  location: {
    fontWeight: "bold"
  },

  top: {
    flex: 3,
    width: "100%",
    backgroundColor: "#EB5757",
    justifyContent: "center",
    borderBottomEndRadius: 35,
    borderBottomStartRadius: 35,
    marginBottom: 20
  },
  topElements: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    backgroundColor: "#EB5757"
  },
  title: {
    fontSize: 35,
    color: "#fff",
    fontWeight: "bold"
  },
  topSecondaryText: {
    color: "#fff",
    fontSize: 17.5
  },
  feed: {
    flex: 7,
  },
  newPostingsContainer: {
    margin: 15,
  },
  trendingContainer: {
    margin: 15
  },
  postingSubtitle: {
    fontSize: 25,
    fontWeight: "bold",
    color: "black"
  },
  postings: {
    flexDirection: "row",
  },
  backButton: {
    backgroundColor: 'rgba(235, 87, 87, 0)',
    alignSelf: "baseline",
    marginLeft: 15,
    marginTop: 35,
    position: 'absolute'
  },
  userInfoContainerNotOwner: {
    flex: 1,
    padding: 20,
    backgroundColor: "rgba(52, 52, 52, 0.0)",
    alignItems: 'center'
  }
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
  created_by: {
    user_id: number;
  };
}

//trying to use useState
export default function UserProfileScreen({ route }: any) {
  const navigation = useNavigation();
  const [feed, setFeedVisible] = useState(true);
  const [userInfo, setUserInfoVisible] = useState(false); //setting intial value to be false so we see feed
  const [userReviews, setUserReviewsVisible] = useState(false); //setting intial value to be false so we see feed

  useEffect(() => {
    getPostData();
    getUserData();
  }, []);

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

  const { user, setUser } = useContext(AuthContext);
  const [userData, setUserData] = useState<User>();
  const [status, setStatus] = useState("pending");
  const [posts, setPostData] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const incommingUser_id = route.params?.userPost_id
  let isOwner = true
  let userID = user.user_id

  if (user.user_id != incommingUser_id) {
    isOwner = false
    userID = incommingUser_id
  } else {
    isOwner = true
  }
  const [userToUpdate, setUserToUpdate] = useState<UserToUpdate>({
    user_id: userID,
    username: "",
    email: "",
    password: "",
    avatar: "",
  });


  const getUserData = () => {
    axios
      .get(`https://tradis.herokuapp.com/api/v1/users/${userID}`)
      .then(resp => {
        setUserData(resp.data)
        setUserToUpdate(resp.data)
      })

      .catch(err => {
        console.log(err);
        setStatus("error")
      })
  }

  const getPostData = () => {
    axios
      .get("https://tradis.herokuapp.com/api/v1/posts")
      .then(resp => {
        setPostData(resp.data)
        console.log(resp.data)
        filterPosts(resp.data)
      })
      .catch(err => {
        console.log(err);
        setStatus("error")
      })
  }

  const updateUser = () => {
    axios
      .put(`https://tradis.herokuapp.com/api/v1/users/${user.user_id}`, userToUpdate)
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

  const filterPosts = (posts1: Post[]) => {
    const filtered = posts1.filter(post => post.created_by.user_id === incommingUser_id)
    setFilteredPosts(filtered)

  };

  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: "rgba(235, 87, 87, 1)",
          width: "100%",
          height: "25%",
          borderBottomLeftRadius: 30,
          borderBottomRightRadius: 30
        }}
      >
        {isOwner ?
          userInfo && (
            <View style={styles.settingsButton}>
              <Button
                title="Update picture"
                onPress={() => openImage()}
                color="white"
              />
            </View>
          ) : <></>
        }
      </View >
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
        <Text style={{ fontSize: 35 }}>{userData?.first_name} {userData?.last_name}</Text>
      </View>
      <View>
        {isOwner ?
          <View style={styles.myInfoButtonContainer}>
            <Button title="My info" onPress={() => viewInfo()} />
          </View>
          : <View style={styles.myInfoButtonContainer}>
            <Button title="About" onPress={() => viewInfo()} />
          </View>
        }
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
          feed && filteredPosts && posts && (
            <View style={styles.customListView}>
              <ScrollView>
                {filteredPosts.map(filteredPosts => (
                  <UserPostRow
                    post={filteredPosts}
                    key={filteredPosts.post_id}
                  ></UserPostRow>
                ))}
              </ScrollView>
            </View>
          )}
        {// shows when userInfo is true
          userInfo && userData && isOwner ? (
            <View style={styles.userInfoContainer}>
              <View style={styles.usernameContainer}>
                <Text>
                  {userData.username}
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
                  {userData.email}
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
                  11 waterloo st{userData.address}
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
          ) : userInfo && userData && (
            <View style={styles.userInfoContainerNotOwner}>
              <View style={styles.usernameContainer}>
                <Text>
                  {userData.username}
                </Text>
              </View>
              <View style={styles.emailContainer}>
                <Text>
                  {userData.email}
                </Text>
              </View>
              <View style={styles.passwordContainer}>
                <Text>
                  {user.password}
                </Text>
              </View>
              <View style={styles.addressContainer}>
                <Text>
                  11 waterloo st{userData.address}
                </Text>
              </View>
            </View>)}
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
                  //these are inplace for when the data base is populated with reviews, for now its hard coded
                  // ratings={item.reviews.rating}
                  // title={item.reviews.review}
                  // description={item.reviews.username}
                  />
                )}
              />
            </View>
          )}
      </SafeAreaView>
    </View >

  );

};
