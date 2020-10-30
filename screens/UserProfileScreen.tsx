//User profile Screen, includes Reviews, Feed, User info, a Settings button in top right corner and Back button on the left

import * as React from 'react';
import {useState} from 'react';
import { Component } from 'react';
import { StyleSheet, SafeAreaView, Button, FlatList, TextInput, Dimensions, Image } from 'react-native';
import { Text, View } from '../components/Themed';
import CustomRow from '../components/CustomRowUserProfileScreen';


const styles = StyleSheet.create({
    container: { 
      backgroundColor: "white",
      flex: 1,
      alignItems: "center"
    },
    settingsButton: {
      backgroundColor: 'rgba(52, 52, 52, 0)',
      marginLeft: 300
    },
    profileImage: {
        marginTop: -120,
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        
        elevation: 10,
        borderRadius: 140/2,
        borderColor: 'white',
        borderWidth: 2.5
    },
    profileName: {
        backgroundColor: 'rgba(52, 52, 52, 0.0)',
        marginTop: 12,
    },
    feedButtonContainer: {
        marginTop: 10,
    },
    userInfoButtonContainer: {
        marginTop: -36.8,
        marginLeft: 250
    },
    reviewsButtonContainer: {
        position: "absolute",
        marginTop: 10 
    },
    separator: {
        borderBottomColor: 'lightgrey',
        borderBottomWidth: 1,
        marginHorizontal: -130
    },
    customListView: {
        width: 300,
        marginBottom: 380,
        backgroundColor: 'white',
    },
    feedList: {
        marginHorizontal: -50,
        marginTop: 10,
        marginBottom: -40,
        backgroundColor: 'white'
    }

});

//using onPress to try to open these views that these fucntions return, but no luck
function reviews() {
    return <View />;
}

function feedTab() {
    return <View />
}

function Item( itemList:any ) {
    return (
        <View style={styles.container}>
                data={itemList}
    </View>
    );
}

//random data to test the listview
const getData = () => {
    return [
      {
        id: 1, title: 'John',
        description: 'I have eggs',
        image_url: '../assets/images/profileImage.png'
      },
      {
        id: 2,
        title: 'John',
        description: 'I can trade for school supplies',
        image_url: '../assets/images/profileImage.png'
      },
      {
        id: 3, title: 'John',
        description: 'I need some sugar',
        image_url: '../assets/images/profileImage.png'
      }
    ]
}

//trying to use useState
const UserProfileScreen = ({navigation} : any) => {
    const [feed, setFeedVisible] = useState(true);
    const [userInfo, setUserInfoVisible] = useState(true);
    const [userReviews, setUserReviewsVisible] = useState(true);
    const toggleFeedSwitch = () => setFeedVisible(previousState => !previousState);
    const toggleReviewsSwitch = () => setUserReviewsVisible(previousState => !previousState);
    const toggleUserInfoSwitch = () => setUserInfoVisible(previousState => !previousState);

    return (
        <SafeAreaView style={styles.container}>
        <View style={{
            backgroundColor : 'rgba(235, 87, 87, 1)',
            width: "100%",
            height: "30%",
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30
        }}> 
        <View style={styles.settingsButton}>
          <Button  title="Settings" onPress={()=> navigation.navigate('.')} color='white'/>
          </View>
        </View>
        <View style={styles.profileImage}>
        <Image source={require("../assets/images/profileImage.png")} style={{width: 140, height: 140, borderRadius: 150/2}} >
            </Image>
        </View>
        <View style={styles.profileName}>
        <Text style={{fontSize:35}}>John Smith</Text>
        </View>
        <View>
            <View style={styles.feedButtonContainer}>
            <Button title="Feed" onPress={() => { reviews() }}/>
            </View>
            <View style={styles.userInfoButtonContainer}>
            <Button title="My info" onPress={() => setUserInfoVisible(true)}/>
            </View> 
             <View style={styles.reviewsButtonContainer}>
            <Button title="Reviews" onPress={() => setUserInfoVisible(true)}/>
            </View>
            <View style={styles.separator}/>
            
        </View>
        <SafeAreaView>
        <View style={styles.customListView}>
            <FlatList style={styles.feedList}
                data={getData()}
                renderItem={({ item }) => <CustomRow
                    title={item.title}
                    description={item.description}
                    image_url={item.image_url}
        />}
      /></View>
        </SafeAreaView>  
    </SafeAreaView>
  )
}

export default UserProfileScreen;
