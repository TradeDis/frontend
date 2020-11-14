
import * as React from 'react';
import { StyleSheet, SafeAreaView, Button, FlatList, TextInput, Dimensions, Image, Text } from 'react-native';
import { Component } from 'react';
import { View } from '../components/Themed';


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    top: {
        width: "100%",
        height: '30%',
        backgroundColor: "#EB5757",
        justifyContent: "center",
        borderBottomEndRadius: 35,
        borderBottomLeftRadius: 35,
        marginBottom: 20
    },
});

const UpdateUserPostScreen = ({ navigation }: any) => {
    return (
        <View style={styles.container}>
            <View style={styles.top}></View>
        </View>

    )




}

export default UpdateUserPostScreen;