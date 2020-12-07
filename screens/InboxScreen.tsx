import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from "react-native";
import { Card, ListItem, Avatar } from "react-native-elements";
import Loading from "../components/Loading";
import useStatsBar from "../hooks/useStatusBar";
import axios from "axios";
import { API_URL } from "@env";
import BottomNavigation from "../components/BottomNavigation";
import { AuthContext } from "../navigation/AuthProvider";
import { TextInput, Button, Searchbar } from "react-native-paper";
import TimeAgo from 'react-native-timeago';


export default function InboxScreen({ navigation }) {
  useStatsBar("light-content");

  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, setUser } = useContext(AuthContext);
  const [refreshing, setRefreshing] = React.useState(false);

  const [filteredConversations, setFilteredConversations] = useState(
    conversations
  );

  const filterConversations = (searchText) => {
    const search = searchText.toLowerCase();
    const filtered = conversations.filter((convo) => {
      let memberFilter = false;
      convo.members.forEach((m) => {
        if (m.name.toLowerCase().includes(search)) {
          memberFilter = true;
        }
      });
      return convo.name.toLowerCase().includes(search) || memberFilter;
    });
    setFilteredConversations(filtered);
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    loadConversations();
  }, []);

  const loadConversations = async () => {
    axios
      .get(
        `https://tradis.herokuapp.com/api/v1/users/${user.user_id}/conversations`
      )
      .then((resp) => {
        // console.log(resp.data)
        setConversations(resp.data);
        setFilteredConversations(resp.data);
      })
      .catch((err) => {
        const { errors } = err.response.data;
      })
      .finally(() => {
        setLoading(false);
        setRefreshing(false);
      });
  };

  /**
   * Fetch threads from Firestore
   */
  useEffect(() => {
    loadConversations()
    const unsubscribe = navigation.addListener("focus", () => {
      loadConversations();
    });

    return () => {
      unsubscribe
    }
  }, [navigation]);

  if (loading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <View style={styles.head}>
          <Searchbar
            style={styles.search}
            placeholder="Search"
            placeholderTextColor="black"
            onChangeText={(searchText) => filterConversations(searchText)}
          />
        </View>
        <ScrollView
          style={styles.scrollView}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {filteredConversations.map((c, i) => {
            let non_me = c.members.filter((m) => m.user_id != user.user_id);
            if (non_me.length < 1) {
              non_me = [
                {
                  ...user,
                  name: user.first_name + " " + user.last_name,
                },
              ];
            }
            return (
              <ListItem
                key={i}
                bottomDivider
                onPress={() => navigation.navigate("Room", { conversation: c })}
              >
                <Avatar
                  source={{
                    uri: `https://ui-avatars.com/api/?background=random&rounded=true&name=${non_me[0].name}`,
                  }}
                />
                <ListItem.Content>
                  <ListItem.Title style={{ fontWeight: "bold" }}>
                    {c.name}
                  </ListItem.Title>
                  {/* <ListItem.Subtitle numberOfLines={1}>
                  <Text>
                    {c.members.map(member => member.name).join(' & ')}
                  </Text>
                </ListItem.Subtitle> */}
                  <ListItem.Subtitle
                    numberOfLines={1}
                    style={{ color: "gray" }}
                  >
                    <Text>
                      {c.latestMessage
                        ? (c.latestMessage.user.name ==
                          user.first_name + " " + user.last_name
                          ? "You"
                          : c.latestMessage.user.name) +
                        ": " +
                        c.latestMessage.text
                        : ""}
                    </Text>
                  </ListItem.Subtitle>
                </ListItem.Content>
                <Text style={styles.ago}> <TimeAgo time={c.updated_at} /> </Text>
                {/* <ListItem.Chevron color="gray" /> */}
              </ListItem>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  ago: {
    color: "gray"
  },
  scrollView: {
    marginVertical: 10,
  },
  card: {
    width: 100,
    height: 80,
    marginBottom: 30,
    marginVertical: 40,
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
  search: {
    width: "100%",
    borderRadius: 10,
  },
  filter: {
    // color: "#fff",
    // backgroundColor: "#EB5757",
    borderRadius: 5,
    margin: 10,
  },
});
