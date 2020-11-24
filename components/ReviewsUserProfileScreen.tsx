import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Rating, AirbnbRating } from 'react-native-ratings';



const styles = StyleSheet.create({
    container: {
        width: '90%',
        height: 100,
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
        padding: 12,
        marginLeft: 5,
        position: "absolute"
    },
    description: {
        fontSize: 13,
        padding: 12 
    },
    container_ratings: {
        width:'50%',
        alignSelf: "flex-end",
        marginRight: -30
    }
});

const ReviewRow = (props: any) => {
    return (
        <View style={styles.container}>
            <View style={styles.container_ratings}>
            <AirbnbRating defaultRating={props.ratings} isDisabled={true} showRating={false} size={15}/>
            </View>
            <Text style={styles.title}>
                {props.title}
            </Text>
            <Text style={styles.description}>
                {props.description}
            </Text>
        </View>
    )
}

export default ReviewRow;