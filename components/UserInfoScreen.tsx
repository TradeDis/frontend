
import * as React from 'react';
import { useState } from 'react';
import { Component } from 'react';
import { StyleSheet, SafeAreaView, Dimensions, TextInput } from 'react-native';
import { Text, View } from './Themed';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "rgba(52, 52, 52, 0.0)"

    },
    username: {
        marginHorizontal: -180,
        padding: 10,
    },
    usernameContainer: {
        marginTop: 82,
        marginHorizontal: -130,
        borderRadius: 15,
        padding: 12,
        borderColor: 'grey',
        borderWidth: 0.16,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.3,

        elevation: 2,
    },
    email: {
        marginTop: 12,
        marginHorizontal: -180,
        padding: 10,
    },
    emailContainer: {
        marginTop: 22,
        marginHorizontal: -130,
        borderRadius: 15,
        padding: 12,
        borderColor: 'grey',
        borderWidth: 0.16,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.3,

        elevation: 2,
    },
    password: {
        marginTop: 12,
        marginHorizontal: -180,
        padding: 10,
    },
    passwordContainer: {
        marginTop: 22,
        marginHorizontal: -130,
        borderRadius: 15,
        padding: 12,
        borderColor: 'grey',
        borderWidth: 0.16,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.3,

        elevation: 2,
    },
    address: {
        marginTop: 12,
        marginHorizontal: -180,
        padding: 10,
    },
    addressContainer: {
        marginTop: 22,
        marginHorizontal: -130,
        borderRadius: 15,
        padding: 12,
        borderColor: 'grey',
        borderWidth: 0.16,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.3,

        elevation: 2,
    },
});


const UserInfoScreen = (props: any) => {
    return (
        <View style={styles.container}>
        <Text>
                {props.user.username}
            </Text>            
            <View style={styles.usernameContainer}>
                <TextInput placeholder="Username"></TextInput>
            </View>

            <View style={styles.emailContainer}>
                <TextInput placeholder="Email"></TextInput>
            </View>

            <View style={styles.passwordContainer}>
                <TextInput placeholder="Password"></TextInput>
            </View>

            <View style={styles.addressContainer}>
                <TextInput placeholder="Address"></TextInput>
            </View>
        </View>

    )
}

export default UserInfoScreen;