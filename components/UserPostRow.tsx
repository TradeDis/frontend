import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AuthContext } from '../navigation/AuthProvider';
import { useState, useEffect, useContext } from "react";



const styles = StyleSheet.create({
    container: {
        width: '90%',
        height: 95,
        borderRadius: 15,
        margin: 5,
        padding: 8,
        shadowColor: 'black',
        shadowOffset: {
            width: 1.5,
            height: 2.5,
        },
        shadowOpacity: 0.5,
        elevation: 20,
        backgroundColor: 'white',
        alignSelf: 'center'
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
        color: '#000',
        padding: 8,
        position: 'absolute'
    },
    content: {
        fontSize: 13,
        padding: 12
    },
    tags: {
        color: 'grey',
        alignSelf: 'flex-end',

    },
    requestText: {
        color: 'grey',
        alignSelf: 'flex-end',
    }
});

const UserPostRow = ({ post }) => {

    const navigation = useNavigation();
    const { user, setUser } = useContext(AuthContext);
    let isOwner = true
    if (post.created_by.user_id != user.user_id) {
        isOwner = false
      } else {
        isOwner = true
      }
    return (isOwner ?
        <TouchableOpacity onPress={() => navigation.navigate("EditPostScreen", { post: post })}>
            <View style={styles.container}>
                <Text style={styles.tags}>{post.tags}</Text>
                <Text style={styles.title}>{post.title}</Text>
                <Text style={styles.content}>{post.content}</Text>
                <Text style={styles.requestText}>{post.requesting ? "Request" : "Trade"}</Text>
            </View>
        </TouchableOpacity>
        :
        <View style={styles.container}>
            <Text style={styles.tags}>{post.tags}</Text>
            <Text style={styles.title}>{post.title}</Text>
            <Text style={styles.content}>{post.content}</Text>
            <Text style={styles.requestText}>{post.requesting ? "Request" : "Trade"}</Text>
        </View>
    )
}

export default UserPostRow;