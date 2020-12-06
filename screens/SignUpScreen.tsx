import * as React from "react";
import { useState } from "react";
import axios from "axios";
import { API_URL } from "@env";
import { TextInput, Button } from 'react-native-paper';

import {
    StyleSheet,
    View,
    Text,
    Switch,
    TouchableOpacity
} from "react-native";

interface User {
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
}

export default function SignUpScreen({ navigation }: any) {
    const [isLoadingComplete, setLoadingComplete] = React.useState(true);
    const [user, setUser] = useState<User>({
        username: "",
        first_name: "",
        last_name: "",
        email: "",
        password: ""
    });


    const [response, setResponse] = useState({ status: "pending", message: "" });

    const createUser = () => {
        setLoadingComplete(false)
        console.log(user);
        axios
            .post(`http://192.168.31.138:3000/api/v1/users`, user)
            .then(resp => {
                setResponse({ status: 'success', message: `User ${resp.data.username} Successfully created!` })
                navigation.navigate('Login', { message: `User ${resp.data.username} Successfully created! Please login here.` })
                setLoadingComplete(true)
            })
            .catch(err => {
                const { errors } = err.response.data
                console.log(errors)
                const message = Object.values(errors).map((field: any) => field.message).join(' \n ')
                console.log(message)
                setResponse({ status: 'error', message })
                setLoadingComplete(true)
            });
    };

    return (
        <View style={styles.container}>
            <View style={styles.top}>
                <View style={styles.topElements}>
                    <Text style={styles.title}>Sign Up</Text>
                </View>
            </View>
            {response.status != "pending" && (
                <Text style={response.status == "success" ? styles.successMessage : styles.errorMessage}> {response.message} </Text>
            )}
            <View style={styles.form}>
                <TextInput
                    label="Username"
                    placeholder="Username"
                    style={styles.formInput}
                    onChangeText={username =>
                        setUser(prevState => ({ ...prevState, username }))
                    }
                    value={user.username}
                />
                <TextInput
                    label="First Name"
                    placeholder="First Name"
                    style={styles.formInput}
                    onChangeText={first_name =>
                        setUser(prevState => ({ ...prevState, first_name }))
                    }
                    value={user.first_name}
                />
                <TextInput
                    label="Last Name"
                    placeholder="Last Name"
                    style={styles.formInput}
                    onChangeText={last_name =>
                        setUser(prevState => ({ ...prevState, last_name }))
                    }
                    value={user.last_name}
                />
                <TextInput
                    label="Email"
                    placeholder="Email"
                    style={styles.formInput}
                    onChangeText={email =>
                        setUser(prevState => ({ ...prevState, email }))
                    }
                    value={user.email}
                />
                <TextInput
                    label="Password"
                    placeholder="Password"
                    style={styles.formInput}
                    secureTextEntry={true}
                    onChangeText={password =>
                        setUser(prevState => ({ ...prevState, password }))
                    }
                    value={user.password}
                />
                <Button
                    loading={!isLoadingComplete}
                    color="rgba(235, 87, 87, 1)"
                    mode="contained"
                    contentStyle={styles.buttonContentStyle}
                    style={styles.buttonContainer}
                    onPress={() => createUser()}>
                    <Text style={styles.postText}> Sign Up  </Text>
                </Button>
                <Button
                    color="gray"
                    mode="contained"
                    contentStyle={styles.buttonContentStyle}
                    style={styles.buttonContainer}
                    onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.postText}> Log In  </Text>
                </Button>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonContentStyle: {
        // height: 40,
        width: 300,
    },
    buttonContainer: {
        marginTop: 40,
        borderRadius: 15,
        shadowOffset: {
            width: 0.5,
            height: 4,
        },
        shadowOpacity: 0.3,
        elevation: 2,
    },
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    top: {
        flex: 2,
        width: "100%",
        backgroundColor: "#EB5757",
        justifyContent: "center",
        borderBottomEndRadius: 30,
        borderBottomLeftRadius: 30
    },
    topElements: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        marginBottom: -25
    },
    title: {
        fontSize: 35,
        color: "#fff"
    },
    topSecondaryText: {
        color: "#fff",
        fontSize: 17.5
    },
    form: {
        width: "100%",
        flex: 9,
        alignItems: "center"
    },
    formInput: {
        width: "90%",
        height: 60,
        marginTop: 20,
        backgroundColor: "transparent",
    },
    switchContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 20
    },
    switch: {
        marginHorizontal: 20
    },
    postButton: {
        width: "30%",
        backgroundColor: "#EB5757",
        marginTop: 40,
        justifyContent: "center",
        alignItems: "center",
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
    signupButton: {
        width: "30%",
        backgroundColor: "#cccd",
        marginTop: 40,
        justifyContent: "center",
        alignItems: "center",
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
    postText: {
        color: "#fff",
        fontSize: 17.5
    },
    switchOptions: {
        fontSize: 15
    },
    successMessage: {
        marginTop: 10,
        color: "green",
        fontSize: 17.5
    },
    errorMessage: {
        marginTop: 10,
        color: "red",
        fontSize: 17.5
    }
});
