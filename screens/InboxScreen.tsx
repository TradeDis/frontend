import React, { useState, useEffect, useContext } from 'react';
import {
  StyleSheet, View, Text, TouchableOpacity, ScrollView, RefreshControl,
} from "react-native";
import { Card, ListItem, Avatar } from "react-native-elements";
import Loading from '../components/Loading';
import useStatsBar from '../hooks/useStatusBar';
import axios from "axios";
import { API_URL } from "@env"
import BottomNavigation from '../components/BottomNavigation';
import { AuthContext } from '../navigation/AuthProvider';
import { TextInput, Button } from 'react-native-paper';

export default function InboxScreen({ navigation }) {
  useStatsBar('light-content');

  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, setUser } = useContext(AuthContext);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    loadConversations()
  }, []);

  const loadConversations = async () => {
    axios
      .get(`http://192.168.31.138:3000/api/v1/users/${user.user_id}/conversations`)
      .then(resp => {
        // console.log(resp.data)
        setConversations(resp.data)
      })
      .catch(err => {
        const { errors } = err.response.data
      }).finally(() => {
        setLoading(false)
        setRefreshing(false);
      })
  }

  /**
   * Fetch threads from Firestore
   */
  useEffect(() => {
    loadConversations()
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <View style={styles.head}>
          <TouchableOpacity onPress={() => navigation.navigate("NewMessage")}>
            <Button mode="contained" icon="plus" style={styles.newMessage}>New</Button>
          </TouchableOpacity>
          {/* <Card.Title>INBOX</Card.Title> */}
          <Button icon="filter" mode="contained" style={styles.filter}>Filter</Button>
        </View>
        <ScrollView style={styles.scrollView}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {conversations.map((c, i) => {
            let non_me = c.members.filter(m => m.user_id != user.user_id)
            if (non_me.length < 1) {
              non_me = [{
                ...user,
                name: user.first_name + " " + user.last_name
              }]
            }
            return (
              <ListItem key={i} bottomDivider onPress={() => navigation.navigate('Room', { conversation: c })}>
                <Avatar source={{ uri: `https://ui-avatars.com/api/?background=random&rounded=true&name=${non_me[0].name}` }} />
                <ListItem.Content>
                  <ListItem.Title style={{ fontWeight: "bold" }}>
                    {c.name}
                  </ListItem.Title>
                  {/* <ListItem.Subtitle numberOfLines={1}>
                  <Text>
                    {c.members.map(member => member.name).join(' & ')}
                  </Text>
                </ListItem.Subtitle> */}
                  <ListItem.Subtitle numberOfLines={1} style={{ color: "gray" }}>
                    <Text>
                      {c.latestMessage ? (c.latestMessage.user.name == user.first_name + " " + user.last_name ? "You" : c.latestMessage.user.name) + ": " + c.latestMessage.text : ''}
                    </Text>
                  </ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
            )
          })}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    marginVertical: 10,
  },
  card: {
    width: 100,
    height: 80,
    marginBottom: 30,
    marginVertical: 40
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
    marginHorizontal: 15,
    height: 100,
    marginTop: 35,
    marginBottom: 39,
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
    // backgroundColor: "#EB5757",
    borderRadius: 5,
    margin: 10,
  },
  filter: {
    // color: "#fff",
    // backgroundColor: "#EB5757",
    borderRadius: 5,
    margin: 10,
  }
});
