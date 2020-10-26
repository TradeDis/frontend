import * as React from "react";
import { useState } from "react";
import { StyleSheet, TextInput, Text, View, ScrollView } from "react-native";
import { Posting } from "./../components/Posting";

const postings = [
  {
    tags: ["bread", "toast"],
    title: "Sliced Bread",
    requesting: true,
    location: "Icon - Waterloo",
    date: new Date(),
    content: "Ran out of bread. Looking for two slices!",
    created_by: {
      _id: "5f9502bde30f82462ae7056c",
      user_id: 2,
      username: "jesssmith123",
      full_name: "Jessica Smith",
      avatar: "female3.png"
    },
    status: "active",
    comments: [],
    post_id: "1"
  },
  {
    tags: [],
    title: "Apples",
    post_id: "6",
    requesting: true,
    content: "Need apples ",
    location: "E7",
    created_by: {
      _id: "5f962ade1e5c522e748f40d3"
    },
    date: new Date(),
    status: "active",
    comments: []
  },
  {
    title: "Printer",
    post_id: "10",
    requesting: false,
    content: "Willing to let people print stuff!",
    location: "Blair House"
  }
];

export default function HomeFeedScreen() {
  const [search, setSearch] = useState("");

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <View style={styles.topElements}>
          <Text style={styles.topSecondaryText}>Avatar</Text>
          <Text style={styles.title}>TradeDis</Text>
          <Text style={styles.topSecondaryText}>Filter</Text>
        </View>
        <TextInput
          style={{
            height: 60,
            borderColor: "black",
            borderWidth: 2,
            marginHorizontal: 20,
            marginTop: 30,
            borderRadius: 50,
            padding: 10,
            backgroundColor: "white"
          }}
          placeholder="Search"
          placeholderTextColor="black"
          onChangeText={searchText => setSearch(searchText)}
          value={search}
        />
      </View>
      <View style={styles.feed}>
        <View style={styles.newPostingsContainer}>
          <Text style={styles.postingSubtitle}>New Postings</Text>
          <View style={styles.postings}>
            <ScrollView horizontal={true}>
              {postings.map(post => (
                <Posting key={post.post_id} post={post}></Posting>
              ))}
            </ScrollView>
          </View>
        </View>
        <View style={styles.trendingContainer}>
          <Text style={styles.postingSubtitle}>Trending</Text>
          <View style={styles.postings}>
            <ScrollView horizontal={true}>
              {postings.map(post => (
                <Posting key={post.post_id} post={post}></Posting>
              ))}
            </ScrollView>
          </View>
        </View>
      </View>
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
  feed: {
    flex: 6
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
