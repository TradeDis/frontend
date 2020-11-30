import * as React from "react";
import { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  ScrollView,
  TouchableOpacity
} from "react-native";
import { Posting } from "../components/Posting";
import axios from "axios";
import BottomNavigation from "../components/BottomNavigation";
import { API_URL } from "@env";
import { AuthContext } from "../navigation/AuthProvider";
import { Searchbar } from "react-native-paper";
import { Button, Menu, Divider, Provider } from "react-native-paper";
import { RefreshControl } from "react-native";

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

export default function HomeFeedScreen({ navigation }) {
  const [visible, setVisible] = React.useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const [refreshing, setRefreshing] = React.useState(false);
  const [error, setError] = useState("");
  const [posts, setPosts] = useState<Post[]>([]);
  const { user, setUser } = useContext(AuthContext);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchPosts();
  }, []);

  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [myPosts, setMyPosts] = useState<Post[]>([]);
  const [inquiredPosts, setInquiredPosts] = useState<Post[]>([]);

  useEffect(() => {
    // whenever screen is focused
    const unsubscribe = navigation.addListener("focus", () => {
      fetchPosts();
    });
    return unsubscribe;
  }, []);

  //retrive posts from DB
  const fetchPosts = () => {
    axios
      .get(`http://192.168.2.91:3000/api/v1/posts`)
      .then(resp => {
        const mine = resp.data.filter(
          post => post.created_by.user_id == user.user_id
        );
        setMyPosts(mine);
        let inquired = [];
        resp.data.map(post => {
          if (post.proposers && post.proposers.length > 0) {
            post.proposers.forEach(function(proposer) {
              if (proposer.user_id == user.user_id) {
                console.log("match");
                inquired.push(post);
              }
            });
          }
        });
        console.log(inquired);
        setInquiredPosts(inquired);
        setPosts(resp.data);
        setFilteredPosts(resp.data);
      })
      .catch(err => {
        console.log(err);
        setError(err);
      })
      .finally(() => {
        setRefreshing(false);
      });
  };

  const filterTags = (tags, searchText) => {
    for (let i = 0; i < tags.length; i++) {
      if (tags[i].toLowerCase().includes(searchText)) {
        return true;
      }
    }
    return false;
  };

  const filterPosts = searchText => {
    const search = searchText.toLowerCase();
    const filtered = posts.filter(
      post =>
        post.title.toLowerCase().includes(search) ||
        filterTags(post.tags, search)
    );
    setFilteredPosts(filtered);
  };

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Searchbar
          style={styles.search}
          placeholder="Search"
          placeholderTextColor="black"
          onChangeText={searchText => filterPosts(searchText)}
        />
      </View>

      <View style={styles.feed}>
        <ScrollView
          style={styles.scrollView}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View style={styles.newPostingsContainer}>
            <Text style={styles.postingSubtitle}>My Postings</Text>
            {error ? (
              <Text>Error retrieving posts</Text>
            ) : myPosts.length === 0 ? (
              <Text>No results available</Text>
            ) : (
              <View style={styles.postings}>
                <ScrollView horizontal={true}>
                  {myPosts.map(post => (
                    <Posting key={post.post_id} post={post}></Posting>
                  ))}
                </ScrollView>
              </View>
            )}
          </View>
          <View style={styles.trendingContainer}>
            <Text style={styles.postingSubtitle}>Trending</Text>
            {error ? (
              <Text>Error retrieving posts</Text>
            ) : filteredPosts.length === 0 ? (
              <Text>No results available</Text>
            ) : (
              <View style={styles.postings}>
                <ScrollView horizontal={true}>
                  {filteredPosts.map(post => (
                    <Posting key={post.post_id} post={post}></Posting>
                  ))}
                </ScrollView>
              </View>
            )}
          </View>
          <View style={styles.trendingContainer}>
            <Text style={styles.postingSubtitle}>Inquired</Text>
            {error ? (
              <Text>Error retrieving posts</Text>
            ) : inquiredPosts.length === 0 ? (
              <Text>No results available</Text>
            ) : (
              <View style={styles.postings}>
                <ScrollView horizontal={true}>
                  {inquiredPosts.map(post => (
                    <Posting key={post.post_id} post={post}></Posting>
                  ))}
                </ScrollView>
              </View>
            )}
          </View>
        </ScrollView>
      </View>
      <BottomNavigation navigation={navigation}></BottomNavigation>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    marginVertical: 20,
    // backgroundColor: 'pink',
    marginHorizontal: 20,
    // marginBottom: 70,
    width: "100%"
  },
  menuStyle: {
    marginTop: 50
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
  container: {
    flex: 1
  },
  top: {
    flex: 1.2,
    width: "100%",
    backgroundColor: "#EB5757",
    justifyContent: "center",
    borderBottomEndRadius: 35,
    borderBottomStartRadius: 35,
    marginBottom: 1
  },
  topElements: {
    flexDirection: "row",
    justifyContent: "space-around",
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
  search: {
    height: 50,
    marginHorizontal: 20,
    marginTop: 60,
    borderRadius: 50,
    padding: 10,
    backgroundColor: "white"
  },
  feed: {
    flex: 9,
    paddingBottom: 120
  },
  newPostingsContainer: {
    margin: 10
  },
  trendingContainer: {
    margin: 10
  },
  postingSubtitle: {
    fontSize: 25,
    fontWeight: "bold",
    color: "black"
  },
  postings: {
    width: "100%",
    flexDirection: "row"
  }
});
