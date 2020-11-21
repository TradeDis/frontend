import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        paddingBottom: 16,
        paddingTop: 30,
        paddingLeft: 30,
        paddingRight: 12,
        marginLeft: 16,
        marginRight: 16,
        marginTop: 8,
        marginBottom: 2,
        borderRadius: 5,
        backgroundColor: '#FFF',
        borderColor: 'lightgray',
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
        marginTop: -20
    },
    container_text: {
        flex: 1,
        flexDirection: 'column',
        marginLeft: 12,
        justifyContent: 'center',
    },
    content: {
        fontSize: 13,
        marginTop: 10
    },
    photo: {
        marginLeft: -12,
        height: 50,
        width: 50,
        borderRadius: 50 / 2,
        shadowColor: "black",
        shadowOpacity: 0.3,
        shadowOffset: {
            width: 0,
            height: 10,
        },
    },
    tagContainer: {
        marginRight: -45,
        marginTop: -12
    },
    tags: {
        color: 'grey',
    },
    requestTypeContainer: {
        marginRight: 5,
        marginTop: 50
    },
    requestText: {
        color: 'grey'
    }
});

const UserPostRow = (props: any) => {
    return (
        <View style={styles.container}>
            <Image source={{uri:props.uri}} style={styles.photo} />
            <View style={styles.container_text}>
                <Text style={styles.title}>
                    {props.title}
                </Text>
                <Text style={styles.content}>
                    {props.content}
                </Text>
            </View>
            <View style={styles.tagContainer}>
                <Text style={styles.tags}>{props.tags}</Text>
            </View>
            <View style={styles.requestTypeContainer}>
                <Text style={styles.requestText}>{props.requesting ? "Request" : "Trade"}
                </Text>
            </View>
        </View>
    )
}

export default UserPostRow;