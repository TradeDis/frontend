import * as React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Keyboard, Switch, TextInput } from "react-native";
import { useNavigation } from '@react-navigation/native';
import BottomNavigation from "../components/BottomNavigation";
import { useState } from "react";
import axios from "axios";
import Tags from "react-native-tags";

interface PostToUpdate {
    post_id: string;
    title: string;
    requesting: boolean;
    content: string;
    tags: string[];
}

export default function EditPostScreen({ navigation, route }) {
    const [post, setPost] = useState(route.params?.post);
    console.log(post)
    const [updatedPost, setPostToUpdate] = useState<PostToUpdate>({
        post_id: post.post_id,
        title: post.title,
        requesting: post.requesting,
        content: post.content,
        tags: post.tags
    });

    const updatePost = () => {
        axios
            .put(`http://192.168.31.138:3000/api/v1/posts/${post.post_id}`, updatedPost)
            .then(resp => {
                console.log(resp.data)
                setPostToUpdate(resp.data)
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <View style={styles.container}>
            <View style={styles.top}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <View style={styles.secondaryTextContainer}>
                        <Text style={styles.secondaryText}>Done</Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>TradeDis</Text>
                </View>
            </View>
            <View style={styles.main}>
                <View style={styles.basicInfo}>
                    <View style={styles.postTitleContainer}>
                        <Text style={styles.postTitle}>{post.title}</Text>
                        <TextInput placeholder="Change title"
                            onChangeText={title =>
                                setPostToUpdate(prevState => ({ ...prevState, title: title }))
                            }>
                        </TextInput>
                    </View>
                    <View style={styles.locationContainer}>
                        <Text style={styles.location}>{post.location ? post.location : "No location available"}</Text>
                        <TextInput placeholder="Change location"
                            onChangeText={location =>
                                setPostToUpdate(prevState => ({ ...prevState, location: location }))
                            }>
                        </TextInput>
                    </View>
                    <View style={styles.details}>
                        <Text style={styles.content}>{post.content}</Text>
                        <TextInput placeholder="Change details"
                            style={styles.detailsInput}
                            onChangeText={content =>
                                setPostToUpdate(prevState => ({ ...prevState, content: content }))
                            }>
                        </TextInput>
                    </View>

                    <View style={styles.tagsContainer}>
                        <Text style={styles.tagsText}>Tags separated by commas</Text>
                        <Tags
                            style={styles.tagsInput}
                            initialTags={post.tags}
                            createTagOnString={[","]}
                            onChangeTags={tags =>
                                setPostToUpdate(prevState => ({ ...prevState, tags: tags }))
                            }
                        />
                    </View>
                    <Text style={styles.type}>
                        {post.requesting ? "Type: Request" : "Type: Trade"}
                    </Text>
                    <Text style={styles.date}>
                        {post.date ? "Posted on " + post.date.toLocaleString() : "No date available"}
                    </Text>
                    <View style={styles.saveButtonContainer}>
                        <TouchableOpacity
                            style={styles.save}
                            onPress={() => updatePost()}>
                            <Text style={styles.proposeText}>Save</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
            {/* <BottomNavigation navigation={navigation}></BottomNavigation> */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    top: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: "#EB5757",
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '100%',
        borderBottomEndRadius: 30,
        borderBottomStartRadius: 30,
    },
    main: {
        flex: 8,
    },
    titleContainer: {
        marginLeft: -250,
        marginTop: 25
    },
    title: {
        fontSize: 35,
        color: "#fff",
        fontWeight: "bold",
    },
    secondaryTextContainer: {
        marginLeft: -105,
        marginTop: 25
    },
    secondaryText: {
        color: "#fff",
        fontSize: 17.5,
    },
    basicInfo: {
        flex: 3.5,
        margin: 15,
        borderBottomColor: "#ccc",
    },
    postTitleContainer: {
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
        backgroundColor: 'white',
        width: '85%',
        alignSelf: 'center',
        height: 65
    },
    locationContainer: {
        marginTop: 20,
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
        backgroundColor: 'white',
        width: '85%',
        alignSelf: 'center',
        height: 65
    },
    details: {
        marginTop: 20,
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
        backgroundColor: 'white',
        width: '85%',
        alignSelf: 'center',
        height: 120
    },
    detailsInput: {
        height: 50
    },
    userInfo: {
        flex: 1,
        margin: 15,
        marginTop: 0,
    },
    postTitle: {
        fontSize: 16,
        fontWeight: "bold",
        padding: 2
    },
    type: {
        fontSize: 15,
        marginTop: 12,
        marginHorizontal: 25
    },
    tagsContainer: {
        marginTop: 20,
        margin: 5,
        width: "100%"
    },
    tagsText: {
        marginLeft: 20,
        marginBottom: 5
    },
    tagsInput: {
        marginHorizontal: 15
    },
    date: {
        marginTop: 10,
        fontSize: 15,
        marginHorizontal: 25
    },
    location: {
        fontSize: 16,
        fontWeight: "bold",
        padding: 2
    },
    saveButtonContainer: {
        alignItems: "center",
        marginVertical: 120,
    },
    save: {
        width: "60%",
        backgroundColor: "#EB5757",
        justifyContent: "center",
        alignItems: "center",
        height: 45,
        marginTop: -50,
        borderRadius: 15,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.3,
        elevation: 2,
    },
    proposeText: {
        fontSize: 17.5,
        color: "white",
    },
    detailsText: {
        fontSize: 25,
        fontWeight: "bold",
        marginBottom: 10,
    },
    content: {
        fontSize: 16,
        fontWeight: "bold",
        padding: 2
    },
});
