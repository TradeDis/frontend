import * as React from "react";
import { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Card, ListItem, Avatar } from "react-native-elements";

export default function InboxScreen({ navigation, route }) {
  const [post, setPost] = useState(route.params?.post);

  // temporary inbox
  const tempInbox = [
    {
      name: "Amy Farha",
      avatar_url:
        "https://gravatar.com/avatar/600b85c00c2de02235f3bd9f61425b67?s=400&d=robohash&r=x",
      recent:
        "Hey! I saw that you are looking for two slices of bread. I have just what you need.",
    },
    {
      name: "Chris Jackson",
      avatar_url:
        "https://gravatar.com/avatar/b314ae2247ed05add122d5e44ab6d323?s=400&d=robohash&r=x",
      recent:
        "Hello, just wondering if your extra pencils are still available.",
    },
    {
      name: "Amanda Martin",
      avatar_url:
        "https://gravatar.com/avatar/1b23a5d153d3051efe9e419ac46411e0?s=400&d=robohash&r=x",
      recent:
        "Good afternoon, I just saw your post for eggs and was wondering if you'd like to trade them for apples. Let me know if you're interested.",
    },
    {
      name: "Christy Thomas",
      avatar_url:
        "https://gravatar.com/avatar/febd6027cd17db3441dc6591875fb2dc?s=400&d=robohash&r=x",
      recent: "Hi, are you still looking to trade your eggs?",
    },
    {
      name: "Melissa Jones",
      avatar_url:
        "https://gravatar.com/avatar/a43bffa6b4c3516d30784cdce14557cc?s=400&d=robohash&r=x",
      recent:
        "Hello, I'm looking to trade my pens and I noticed that you are trading your pencils. Would like to exchange a few with you.",
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        {/* nav needs to be implemented */}
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.secondaryText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>TradeDis</Text>
        <Text style={styles.secondaryText}>Avatar</Text>
      </View>
      <View style={styles.main}>
        <Card>
          <Card.Title>INBOX</Card.Title>
          <Card.Divider />
          {tempInbox.map((c, i) => (
            <ListItem key={i} bottomDivider>
              <Avatar source={{ uri: c.avatar_url }} />
              <ListItem.Content>
                <ListItem.Title style={{ fontWeight: "bold" }}>
                  {c.name}
                </ListItem.Title>
                <ListItem.Subtitle numberOfLines={1}>
                  <Text>{c.recent}</Text>
                </ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
          ))}
        </Card>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
});
