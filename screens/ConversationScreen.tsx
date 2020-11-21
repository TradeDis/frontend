import React, { useState, useContext, useEffect } from 'react';
import {
  GiftedChat,
  Bubble,
  Send,
  SystemMessage
} from 'react-native-gifted-chat';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';
// import { AuthContext } from '../navigation/AuthProvider';
// import firestore from '@react-native-firebase/firestore';
import useStatsBar from '../hooks/useStatusBar';
import axios from "axios";
import Loading from '../components/Loading';
import { API_URL, SOCKET_URL } from "@env"
import { AuthContext } from '../navigation/AuthProvider';
// with ES6 import
import io from 'socket.io-client';

export interface User {
  _id: string | number
  name?: string
  avatar?: string
  user_id?: number
}

export interface IMessage {
  _id: string | number
  text: string
  createdAt: Date | number
  user: User
  image?: string
  video?: string
  audio?: string
  system?: boolean
  sent?: boolean
  received?: boolean
  pending?: boolean
}


export default function ConversationScreen({ route }) {
  useStatsBar('light-content');

  const [messages, setMessages] = useState<any[]>([]);
  const { conversation } = route.params;
  const [loading, setLoading] = useState(true);
  const [socket, setSocket] = useState({ id: '' })
  const { user: authuser } = useContext(AuthContext);
  const currentUser = {
    ...authuser,
    name: authuser.first_name + ' ' + authuser.last_name,
    _id: authuser.user_id
  }



  function refresh() {
    axios
      .get(`http://192.168.31.138:3000/api/v1/conversations/${conversation.conversation_id}/messages`)
      .then(resp => {
        resp.data.map(data => {
          data.user._id = data.user.user_id
        })
        console.log(resp.data)
        setMessages(resp.data)
      })
      .catch(err => {
        const { errors } = err.response.data
        // const message = Object.values(errors).map((field: any) => field.message).join(' / ')
        // setResponse({ status: 'error', message })
      });
  }

  useEffect(() => {
    const _socket = io(`https://tradis.herokuapp.com`);
    console.log("connecting...")
    _socket.on('connect', () => {
      setSocket(_socket)
      setLoading(false)
      _socket.emit("add_room", conversation.conversation_id)
      console.log(_socket.id); // 'G5p5...'
      console.log("suucess")
      _socket.on("update", (message) => {
        console.log(message);
        refresh()
      });
    });

    refresh()
    return () => {
      console.log("Disconnecting", socket.id)
      _socket.disconnect('io server disconnect')
    }
  }, []);

  async function handleSend(messages: IMessage[]) {
    const { text, user, createdAt } = messages[0];

    delete user._id
    const newMessage = {
      text,
      user,
      createdAt
    }

    setMessages(prev => {
      return [{
        ...newMessage, user: {
          _id: currentUser.user_id,
          name: currentUser.name
        }
      }, ...prev]
    })

    axios
      .post(`http://192.168.31.138:3000/api/v1/conversations/${conversation.conversation_id}/messages?socket_id=${socket.id}`, newMessage)
      .then(resp => {
        // console.log(resp.data)
        // has to map it over
        resp.data.map(data => {
          data.user._id = data.user.user_id
        })
        setMessages(resp.data)
      })
      .catch(err => {
        console.log(err.response.data)
        const { errors } = err.response.data
        // const message = Object.values(errors).map((field: any) => field.message).join(' / ')
        // setResponse({ status: 'error', message })
      });
  }




  function renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#EB5757'
          }
        }}
        textStyle={{
          right: {
            color: '#fff'
          }
        }}
      />
    );
  }

  function renderLoading() {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size='large' color='#EB5757' />
      </View>
    );
  }

  function renderSend(props) {
    return (
      <Send {...props}>
        <View style={styles.sendingContainer}>
          <IconButton icon='send-circle' size={32} color='#EB5757' />
        </View>
      </Send>
    );
  }

  function scrollToBottomComponent() {
    return (
      <View style={styles.bottomComponentContainer}>
        <IconButton icon='chevron-double-down' size={36} color='#EB5757' />
      </View>
    );
  }

  function renderSystemMessage(props) {
    return (
      <SystemMessage
        {...props}
        wrapperStyle={styles.systemMessageWrapper}
        textStyle={styles.systemMessageText}
      />
    );
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <GiftedChat
      messages={messages}
      onSend={handleSend}
      user={currentUser}
      placeholder='Type your message here...'
      alwaysShowSend
      showUserAvatar
      scrollToBottom
      renderBubble={renderBubble}
      renderLoading={renderLoading}
      renderSend={renderSend}
      scrollToBottomComponent={scrollToBottomComponent}
      renderSystemMessage={renderSystemMessage}
    />
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  sendingContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  bottomComponentContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  systemMessageWrapper: {
    backgroundColor: '#EB5757',
    borderRadius: 4,
    padding: 5
  },
  systemMessageText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold'
  }
});
