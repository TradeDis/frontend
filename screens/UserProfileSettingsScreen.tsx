//this is the screen users go to when they want to update their info, 
//i only had address and password, i dont think they should be able to update anything else
//get to this page through a 'Settings' button at the top right corner of the UserProfileScreen

import * as React from 'react';
import { StyleSheet, SafeAreaView, Button, FlatList, TextInput, Dimensions, Image , Text} from 'react-native';
import { Component } from 'react';
import { View } from '../components/Themed';


const styles = StyleSheet.create({
    container: {
        marginTop: 40,
        marginHorizontal: 50,
        borderRadius: 15,
        marginVertical: 4,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.3,
        elevation: 2,
        backgroundColor: "white", 
    },
    container2: {
        marginTop: 10,
        marginHorizontal: 50,
        borderRadius: 15,
        marginVertical: 4,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.3, 
        elevation: 2, 
    },
    titleContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(52, 52, 52, 0)',
        marginTop: 120
        
    },
    profileImage: {
        marginTop: -100,
        backgroundColor: 'white',
        alignSelf: "center",
        borderRadius: 140/2,
        borderColor: 'white',
        borderWidth: 3,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        
        elevation: 10,
    },
    title: {
        fontSize: 40
    },
    addressTextInput: {
        height: 50,
        padding: 12,
        color: 'gray',
        fontSize: 16,
         
    },
    passwordTextInput: {
        height: 50,
        padding: 12,
        color: 'gray',
        fontSize: 16,
    },
    saveButton: {
        backgroundColor: 'rgba(235, 87, 87, 1)',
        marginTop: 200,
        marginHorizontal: 100,
        height: 40, 
        borderRadius: 15,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.3,
        
        elevation: 2, 
    },
    changePictureButton: {
        fontSize: 10
    }, 
    backButton: {
        backgroundColor : 'rgba(235, 87, 87, 0)',
        marginLeft: -340,
    }
});

const UserProfileSettingScreen = ({navigation}: any) => {
    const [value, onChangeText] = React.useState('');
    const [value2, onChangeText2] = React.useState('');
    return (
    <SafeAreaView>
         <View style={{
            backgroundColor : 'rgba(235, 87, 87, 1)',
            width: "100%",
            height: "32%",
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30
        }}> 
          <View style={styles.backButton}>
          <Button  title="Back" onPress={()=> navigation.navigate('TabTwo')} color='white'/>
          </View>
        </View>
        <View style={styles.profileImage}>
        <Image source={require("../assets/images/profileImage.png")} style={{width: 140, height: 140, borderRadius: 140/2}} >
            </Image>
          </View>
          <Button title="Change profile picture" onPress={() => { console.log("change profile picture") }}></Button>
        <View style={styles.container}>
        <TextInput
            placeholder = "Address"
            style={styles.addressTextInput}
            onChangeText={text => onChangeText(text)}
            value={value}
        /></View>
        <View style={styles.container2}>
        <TextInput
            placeholder = "Password"
            style={styles.passwordTextInput}
            onChangeText={text => onChangeText2(text)}
            value={value2}
        />
        </View>
        <View style={styles.saveButton}>
            <Button color='white' title="Save" onPress={() => { console.log("update data to database") }}>
            </Button>
        </View>
        </SafeAreaView>
    )




}

export default UserProfileSettingScreen;