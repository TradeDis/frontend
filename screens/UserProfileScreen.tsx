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
import CustomRow from "../components/CustomRowUserProfileScreen";
import UserInfoScreen from "../components/UserInfoScreen";
import UserReviewsScreen from "../components/ReviewsUserProfileScreen"
import axios from "axios";

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
  userInfo: {
    backgroundColor: "rgba(52, 52, 52, 0.0)"

  }
});

//random data to test the listview
const getData = () => {
  return [
    {
      id: 1,
      title: "John",
      description: "I have eggs",
      image_url: "../assets/images/profileImage.png"
    },
    {
      id: 2,
      title: "John",
      description: "I can trade for school supplies",
      image_url: "../assets/images/profileImage.png"
    },
    {
      id: 3,
      title: "John",
      description: "I need some sugar",
      image_url: "../assets/images/profileImage.png"
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

  useEffect(() => {
    getUserData();
  }, );

  const getUserData = () => {
    axios
      .get("http://localhost:3000/api/v1/users/24")
      .then(resp => {
        setUser(resp.data)
       
      })
      .catch(err => {
        console.log(err);
        setStatus("error")
      })
  }

 

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          backgroundColor: "rgba(235, 87, 87, 1)",
          width: "100%",
          height: "30%",
          borderBottomLeftRadius: 30,
          borderBottomRightRadius: 30
        }}
      >
        <View style={styles.settingsButton}>
          <Button
            title="Settings"
            onPress={() => navigation.navigate(".")}
            color="white"
          />
        </View>
      </View>
      <View style={styles.profileImage}>
        <Image
          source={require("../assets/images/profileImage.png")}
          style={{ width: 140, height: 140, borderRadius: 150 / 2 }}
        ></Image>
      </View>
      <View style={styles.profileName}>
        <Text style={{ fontSize: 35 }}>John Smith</Text>
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
          feed && (
            <View style={styles.customListView}>
              <FlatList
                style={styles.feedList}
                data={getData()}
                renderItem={({ item }) => (
                  <CustomRow
                    title={item.title}
                    description={item.description}
                    image_url={item.image_url}
                  />
                )}
              />
            </View>
          )}
        {// shows when userInfo is true
          userInfo && (
            <View style={styles.userInfo}>
                   <UserInfoScreen
                   user={user}
                   usernameTitle={user?.username}
                 >
                 </UserInfoScreen>
            
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
                  ratings={3}
                  title={item.title}
                  description={item.description}
                  image_url={item.image_url}
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
