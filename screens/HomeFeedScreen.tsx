import * as React from "react";
import { useState, useEffect } from "react";
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  ScrollView,
  TouchableOpacity
} from "react-native";
import { Posting } from "./../components/Posting";
import axios from "axios";
import BottomNavigation from "../components/BottomNavigation";
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

export default function HomeFeedScreen({ navigation }) {
  const [error, setError] = useState("");
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);

  useEffect(() => {
    //whenever screen is focused
    const unsubscribe = navigation.addListener("focus", () => {
      fetchPosts();
    });
    return unsubscribe;
  }, [navigation]);

  //retrive posts from DB
  const fetchPosts = () => {
    axios
      .get(`${API_URL}/api/v1/posts`)
      .then(resp => {
        setPosts(resp.data);
        setFilteredPosts(resp.data);
      })
      .catch(err => {
        console.log(err)
        setError(err);
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
        <View style={styles.topElements}>
          <Text style={styles.topSecondaryText}>Avatar</Text>
          <Text style={styles.title}>TradeDis</Text>
          <Text style={styles.topSecondaryText}>Filter</Text>
        </View>
        <TextInput
          style={styles.search}
          placeholder="Search"
          placeholderTextColor="black"
          onChangeText={searchText => filterPosts(searchText)}
        />
      </View>
      <View style={styles.feed}>
        <View style={styles.newPostingsContainer}>
          <Text style={styles.postingSubtitle}>New Postings</Text>
          {error ? (
            <Text>Error retrieving posts</Text>
          ) : filteredPosts.length === 0 ? (
            <Text>No results available</Text>
          ) : (
            <View style={styles.postings}>
              <ScrollView horizontal={true}>
                {filteredPosts.map(post => (
                  <Posting
                    key={post.post_id}
                    post={post}
                    navigation={navigation}
                  ></Posting>
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
                  <Posting
                    key={post.post_id}
                    post={post}
                    navigation={navigation}
                  ></Posting>
                ))}
              </ScrollView>
            </View>
          )}
        </View>
      </View>
      <BottomNavigation navigation={navigation}></BottomNavigation>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  top: {
    flex: 3,
    width: "100%",
    backgroundColor: "#EB5757",
    justifyContent: "center"
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
  search: {
    height: 60,
    borderColor: "black",
    borderWidth: 2,
    marginHorizontal: 20,
    marginTop: 30,
    borderRadius: 50,
    padding: 10,
    backgroundColor: "white"
  },
  feed: {
    flex: 7
  },
  newPostingsContainer: {
    margin: 15
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
    flexDirection: "row"
  }
});
