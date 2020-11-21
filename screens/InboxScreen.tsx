import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Card, ListItem, Avatar } from "react-native-elements";
import Loading from '../components/Loading';
import useStatsBar from '../hooks/useStatusBar';
import axios from "axios";
import { API_URL } from "@env"
import BottomNavigation from '../components/BottomNavigation';
import { AuthContext } from '../navigation/AuthProvider';


export default function InboxScreen({ navigation }) {
  useStatsBar('light-content');

  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, setUser } = useContext(AuthContext);
  console.log(user)
  /**
   * Fetch threads from Firestore
   */
  useEffect(() => {
    // setConversations([{
    //   _id: 123,
    //   // give defaults
    //   name: '123',

    //   latestMessage: {
    //     text: '123'
    //   }
    // }, {
    //   _id: 125,
    //   // give defaults
    //   name: '123',

    //   latestMessage: {
    //     text: '123'
    //   }
    // }, {
    //   _id: 126,
    //   // give defaults
    //   name: '123',

    //   latestMessage: {
    //     text: '123'
    //   },
    // }
    // ]);

    axios
      .get(`http://192.168.31.138:3000/api/v1/users/${user.user_id}/conversations`)
      .then(resp => {
        console.log(resp.data)
        setConversations(resp.data)
        setLoading(false)
      })
      .catch(err => {
        const { errors } = err.response.data
        // const message = Object.values(errors).map((field: any) => field.message).join(' / ')
        // setResponse({ status: 'error', message })
      });

  }, []);

  if (loading) {
    return <Loading />;
  }

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
          <View style={styles.head}>
            <TouchableOpacity onPress={() => navigation.navigate("NewMessage")}>
              <Text style={styles.newMessage}>New</Text>
            </TouchableOpacity>
            <Card.Title>INBOX</Card.Title>
            <Text style={styles.filter}>Filter</Text>
          </View>
          <Card.Divider />
          {conversations.map((c, i) => (
            <ListItem key={i} bottomDivider onPress={() => navigation.navigate('Room', { conversation: c })}>
              <Avatar source={{ uri: "https://gravatar.com/avatar/a43bffa6b4c3516d30784cdce14557cc?s=400&d=robohash&r=x" }} />
              <ListItem.Content>
                <ListItem.Title style={{ fontWeight: "bold" }}>
                  {c.members.map(member => member.name).join(' & ')}
                </ListItem.Title>
                <ListItem.Subtitle numberOfLines={1}>
                  <Text>{c.post} {c.name}</Text>
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
  head: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  newMessage: {
    color: "#fff",
    backgroundColor: "#EB5757",
    borderRadius: 5,
    margin: 10,
    padding: 10,
  },
  filter: {
    color: "#fff",
    backgroundColor: "#EB5757",
    borderRadius: 5,
    margin: 10,
    padding: 10,
  }
});
