import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Rating, AirbnbRating } from 'react-native-ratings';



const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        paddingBottom: 16,
        paddingTop: 30,
        paddingLeft: 30,
        paddingRight:12,
        marginLeft:16,
        marginRight:16,
        marginTop: 8,
        marginBottom: 2,
        borderRadius: 5,
        backgroundColor: '#FFF',
        borderColor:'lightgray',
        borderWidth: 0.2,
        shadowColor: "black",
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 0,
            height: 5,
        },
        elevation: 2,
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
        color: '#000',
        marginTop: -5
    },
    container_text: {
        flex: 1,
        flexDirection: 'column',
        marginLeft: 1,
        justifyContent: 'center',
    },
    description: {
        fontSize: 13,
        marginTop: 10,
        marginLeft: 8,
        marginBottom: 10   
    },
    container_ratings: {
        width:'50%',
        marginHorizontal: 185,
        marginVertical: -10,
    }
});

const ReviewRow = (props: any) => {
    return (
        <View style={styles.container}>
        <View style={styles.container_text}>
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
    </View>
    )
}

export default ReviewRow;