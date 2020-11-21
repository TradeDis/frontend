import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { List, Divider } from 'react-native-paper';
// import firestore from '@react-native-firebase/firestore';
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
    // const unsubscribe = firestore()
    //   .collection('THREADS')
    //   .orderBy('latestMessage.createdAt', 'desc')
    //   .onSnapshot(querySnapshot => {
    //     const threads = querySnapshot.docs.map(documentSnapshot => {
    //       return {
    //         _id: documentSnapshot.id,
    //         // give defaults
    //         name: '',

    //         latestMessage: {
    //           text: ''
    //         },
    //         ...documentSnapshot.data()
    //       };
    //     });

    //     setThreads(threads);

    //     if (loading) {
    //       setLoading(false);
    //     }
    //   });

    /**
     * unsubscribe listener
     */
    // return () => unsubscribe();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={conversations}
        keyExtractor={item => item._id}
        ItemSeparatorComponent={() => <Divider />}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('Room', { conversation: item })}
          >
            <List.Item
              title={item.name}
              subtitle={item.post}
              description={item.members.map(member => member.name).join(' & ')}
              titleNumberOfLines={1}
              titleStyle={styles.listTitle}
              descriptionStyle={styles.listDescription}
              descriptionNumberOfLines={1}
            />
          </TouchableOpacity>
        )}
      />
      <BottomNavigation navigation={navigation}></BottomNavigation>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    flex: 1
  },
  listTitle: {
    fontSize: 22
  },
  listDescription: {
    fontSize: 16
  }
});
