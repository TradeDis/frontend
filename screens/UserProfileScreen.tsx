import * as React from 'react';
import { Component } from 'react';
import { StyleSheet, SafeAreaView, Button, FlatList, TextInput, Dimensions, Image } from 'react-native';
import { Text, View } from '../components/Themed';
import CustomRow from '../screens/CustomViews/CustomRowUserProfileScreen';


export default class UserProfileScreen extends Component {

  render(this: any) {
      return (
        <SafeAreaView style={styles.container}>
            <View style={{
                backgroundColor : 'red',
                width: "100%",
                height: "30%",
            }}> 
            </View>
            <View style={styles.profileImage}>
            <Image source={require("../assets/images/profilePhoto.jpeg")} style={{width: 150, height: 150, borderRadius: 150/2}} >
                </Image>
            </View>
            <View style={styles.profileName}>
            <Text style={{fontSize:35}}>Akash Desai</Text>
            </View>
            <View>
                <View style={styles.feedButtonContainer}>
                    <Button title="Feed" onPress={() => {console.log("change to feed screen")}}/>
                </View>
                <View style={styles.userInfoButtonContainer}>
                    <Button title="My info" onPress={() => {console.log("change to feed screen")}}/>
                </View>
                <View style={styles.separator}/>
            </View>
            {/* <View style={styles.container}>
            <this.CustomListview
                itemList={this.getData()}
            />
      </View> */}
        </SafeAreaView>
      )
  }



CustomListview = ( itemList:any ) => (
    <View style={styles.container}>
        <FlatList
                data={itemList}
                renderItem={({ item }) => <CustomRow 
                    title={item.title}
                    description={item.description}
                    image_url={item.image_url}
                />}
            />

    </View>
);
}

const styles1 = StyleSheet.create({
    container: {
        flex: 1,
    },
});


  
  const styles = StyleSheet.create({
    container: { 
      backgroundColor: "white",
      flex: 1,
      alignItems: "center"
    },
    profileImage: {
        marginTop: -120,
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        
        elevation: 10,
        borderRadius: 150/2,
        borderColor: 'white',
        borderWidth: 2.5
    },
    profileName: {
        backgroundColor: 'rgba(52, 52, 52, 0.0)',
        marginTop: 12,
    },
    feedButtonContainer: {
        marginLeft:-200, 
        marginTop: 12,
    },
    userInfoButtonContainer: {
        marginTop: -36.8,
        marginLeft: 200
    },
    separator: {
        borderBottomColor: 'lightgrey',
        borderBottomWidth: 1,
        marginHorizontal: -50
    }

});
