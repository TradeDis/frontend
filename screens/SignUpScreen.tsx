import * as React from "react";
import { useState } from "react";
import axios from "axios";
import { API_URL } from "@env";

import {
  StyleSheet,
  View,
  Text,
  TextInput,
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
  const [user, setUser] = useState<User>({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    password: ""
  });

  const [response, setResponse] = useState({ status: "pending", message: "" });

  const createUser = () => {
    console.log(user);
    axios
      .post(`${process.env.API_URL}/api/v1/users`, user)
      .then(resp => {
        setResponse({
          status: "success",
          message: `User ${resp.data.username} Successfully created!`
        });
        navigation.navigate("TabTwo", {
          message: `User ${resp.data.username} Successfully created! Plesae login here.`
        });
      })
      .catch(err => {
        const { errors } = err.response.data;
        console.log(errors);
        const message = Object.values(errors)
          .map((field: any) => field.message)
          .join(" \n ");
        console.log(message);
        setResponse({ status: "error", message });
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
          placeholder="Username"
          style={styles.formInput}
          onChangeText={username =>
            setUser(prevState => ({ ...prevState, username }))
          }
          value={user.username}
        />
        <TextInput
          placeholder="First Name"
          style={styles.formInput}
          onChangeText={first_name =>
            setUser(prevState => ({ ...prevState, first_name }))
          }
          value={user.first_name}
        />
        <TextInput
          placeholder="Last Name"
          style={styles.formInput}
          onChangeText={last_name =>
            setUser(prevState => ({ ...prevState, last_name }))
          }
          value={user.last_name}
        />
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
          onPress={() => createUser()}
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
