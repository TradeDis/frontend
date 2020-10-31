
import * as React from 'react';
import {useState} from 'react';
import { Component } from 'react';
import { StyleSheet, SafeAreaView, Dimensions } from 'react-native';
import { Text, View } from '../components/Themed';
import CustomRow from '../components/CustomRowUserProfileScreen';


const styles = StyleSheet.create({
    container: {

    }


});


const UserInfoScreen = ({navigation} : any) =>  {
    return (
        <SafeAreaView>
        <View style={styles.container}>
            <Text> John Smith </Text>
            <Text> john@uwaterloo.ca </Text>
            <Text> 123 john street </Text>
        </View>


    </SafeAreaView>
)
}

export default UserInfoScreen;