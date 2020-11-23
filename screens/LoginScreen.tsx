import * as React from "react";
import { useContext, useState } from "react";
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
      .post(`http://192.168.2.91:3000/api/v1/users/login`, user)
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
          placeholder="Email"
          style={styles.formInput}
          onChangeText={email =>
            setUserForm(prevState => ({ ...prevState, email }))
          }
          value={user.email}
        />
        <TextInput
          placeholder="Password"
          style={styles.formInput}
          secureTextEntry={true}
          onChangeText={password =>
            setUserForm(prevState => ({ ...prevState, password }))
          }
          value={user.password}
        />
        {isLoadingComplete ? (
          <>
            <TouchableOpacity
              style={styles.postButtonContainer}
              onPress={() => login()}
            >
              <Text style={styles.postText}> Log in </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.signupButtonContainer}
              onPress={() => navigation.navigate("Signup")}
            >
              <Text style={styles.postText}> Sign up </Text>
            </TouchableOpacity>
          </>
        ) : (
          <Loading />
        )}
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
  postButtonContainer: {
    height: 40,
    width: "35%",
    marginTop: 80,
    borderRadius: 15,
    alignItems: "center",
    backgroundColor: "rgba(235, 87, 87, 1)",
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowOpacity: 0.3,
    elevation: 2
  },
  signupButtonContainer: {
    height: 40,
    width: "35%",
    marginTop: 20,
    borderRadius: 15,
    alignItems: "center",
    backgroundColor: "gray",
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 5
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
