import * as React from "react";
import { useContext, useState } from "react";
import axios from "axios";
import { StyleSheet, View, Text, Switch, TouchableOpacity } from "react-native";

import { TextInput, Button } from "react-native-paper";

import { useEffect } from "react";
import { API_URL } from "@env";
import { AuthContext } from "../navigation/AuthProvider";
import Loading from "../components/Loading";

interface User {
    email: string;
    password: string;
}

export default function LoginScreen({ route, navigation }: any) {
    const [response, setResponse] = useState({ status: "pending", message: "" });
    const [isLoadingComplete, setLoadingComplete] = React.useState(true);
    useEffect(() => {
        const { message } = route.params || "";
        setResponse({ status: "success", message });
    }, [route]);

    const [user, setUserForm] = useState<User>({
        email: "",
        password: ""
    });

    const { user: userAuth, setUser: setUserAuth } = useContext(AuthContext);

    const login = () => {
        setLoadingComplete(false);
        console.log(API_URL);
        axios
            .post(`http://192.168.31.138:3000/api/v1/users/login`, user)
            .then(resp => {
                const { result: isAuth, user } = resp.data;
                if (isAuth) {
                    setResponse({
                        status: "success",
                        message: `User ${user.username} logged in successfully!`
                    });
                    setUserAuth(user);
                } else {
                    setResponse({ status: "error", message: `Wrong email or password!` });
                }
                setLoadingComplete(true);
            })
            .catch(err => {
                const { errors } = err.response.data;
                const message = Object.values(errors)
                    .map((field: any) => field.message)
                    .join(" / ");
                setResponse({ status: "error", message });
                setLoadingComplete(true);
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
                <Text
                    style={
                        response.status == "success"
                            ? styles.successMessage
                            : styles.errorMessage
                    }
                >
                    {" "}
                    {response.message}{" "}
                </Text>
            )}
            <View style={styles.form}>
                <TextInput
                    mode="none"
                    label="Email"
                    placeholder="Email"
                    style={styles.formInput}
                    onChangeText={email =>
                        setUserForm(prevState => ({ ...prevState, email }))
                    }
                    value={user.email}
                />
                <TextInput
                    label="Password"
                    placeholder="Password"
                    style={styles.formInput}
                    secureTextEntry={true}
                    onChangeText={password =>
                        setUserForm(prevState => ({ ...prevState, password }))
                    }
                    value={user.password}
                />
                <Button
                    loading={!isLoadingComplete}
                    color="rgba(235, 87, 87, 1)"
                    mode="contained"
                    contentStyle={styles.buttonContentStyle}
                    style={styles.buttonContainer}
                    onPress={() => login()}
                >
                    <Text style={styles.postText}> Log in </Text>
                </Button>
                <Button
                    color="gray"
                    mode="contained"
                    contentStyle={styles.buttonContentStyle}
                    style={styles.buttonContainer}
                    onPress={() => navigation.navigate("Signup")}
                >
                    <Text style={styles.postText}> Sign up </Text>
                </Button>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonContentStyle: {
        // height: 40,
        width: 300
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
        backgroundColor: "transparent"
    },
    switchContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 20
    },
    switch: {
        marginHorizontal: 20
    },
    buttonContainer: {
        marginTop: 40,
        borderRadius: 15,
        shadowOffset: {
            width: 0.5,
            height: 4
        },
        shadowOpacity: 0.3,
        elevation: 2
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
