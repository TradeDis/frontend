import * as React from "react";
import { useState } from "react";
import axios from "axios";
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    Switch,
    TouchableOpacity
} from "react-native";
import { useEffect } from "react";

interface User {
    email: string;
    password: string;
}

export default function LoginScreen({ route, navigation }: any) {
    const [response, setResponse] = useState({ status: "pending", message: "" });

    const { message } = route.params || { message: '' };

    useEffect(() => {
        setResponse({ status: 'success', message })
    }, [])

    const [user, setUser] = useState<User>({
        email: '',
        password: ''
    });

    const createPosting = () => {
        console.log(user);
        axios
            .post("http://localhost:3000/api/v1/users/login", user)
            .then(resp => {
                const { result: isAuth, user } = resp.data
                if (isAuth) {
                    setResponse({ status: 'success', message: `User ${user.username} logged in successfully!` })
                } else {
                    setResponse({ status: 'error', message: `Wrong email or password!` })
                }
            })
            .catch(err => {
                const { errors } = err.response.data
                const message = Object.values(errors).map((field: any) => field.message).join(' / ')
                setResponse({ status: 'error', message })
            });
    };

    return (
        <View style={styles.container}>
            <View style={styles.top}>
                <View style={styles.topElements}>
                    <Text style={styles.title}>Log in</Text>
                </View>
            </View>
            {response.status != "pending" && (
                <Text style={response.status == "success" ? styles.successMessage : styles.errorMessage}> {response.message} </Text>
            )}
            <View style={styles.form}>
                <TextInput
                    placeholder="Email"
                    style={styles.formInput}
                    onChangeText={email =>
                        setUser(prevState => ({ ...prevState, email }))
                    }
                    value={user.email}
                />
                <TextInput
                    placeholder="Password"
                    style={styles.formInput}
                    onChangeText={password =>
                        setUser(prevState => ({ ...prevState, password }))
                    }
                    value={user.password}
                />
                <TouchableOpacity
                    style={styles.postButton}
                    onPress={() => createPosting()}
                >
                    <Text style={styles.postText}>Log In</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.signupButton}
                    onPress={() => navigation.navigate('TabOne')}
                >
                    <Text style={styles.postText}>Sign Up</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    top: {
        flex: 2,
        width: "100%",
        backgroundColor: "#EB5757",
        justifyContent: "center"
    },
    topElements: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center"
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
        borderColor: "gray",
        borderBottomWidth: 1
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
        height: 45,
        backgroundColor: "#EB5757",
        marginTop: 40,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center"
    },
    signupButton: {
        width: "30%",
        height: 45,
        backgroundColor: "#ccc",
        marginTop: 40,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center"
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
