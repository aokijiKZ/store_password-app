import { StatusBar } from "expo-status-bar";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Input, ThemeProvider } from "react-native-elements";

export default function NonLoginScreenSingup() {
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [inputConfirmPassword, setInputConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const signup = () => {
    if (inputPassword != inputConfirmPassword) return;
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, inputEmail, inputPassword)
      .then((userCredential) => {
        const user = userCredential.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage(errorCode);
      });
  };

  return (
    <ThemeProvider>
      <View style={styles.container}>
        <Input
          placeholder="  Email"
          leftIcon={{ type: "font-awesome", name: "user" }}
          onChangeText={(value) => setInputEmail(value)}
          errorMessage={inputEmail == "" ? "required" : ""}
        />
        <Input
          placeholder="  Password"
          leftIcon={{ type: "font-awesome", name: "lock" }}
          onChangeText={(value) => setInputPassword(value)}
          errorMessage={inputPassword == "" ? "required" : ""}
          secureTextEntry={true}
        />
        <Input
          placeholder="  ConfirmPassword"
          leftIcon={{ type: "font-awesome", name: "repeat" }}
          onChangeText={(value) => setInputConfirmPassword(value)}
          secureTextEntry={true}
          errorStyle={{ color: "red" }}
          errorMessage={
            inputPassword != inputConfirmPassword
              ? "Passwords do NOT match"
              : ""
          }
        />
        <Text>{errorMessage}</Text>
        <Button
          title="SIGN IN"
          buttonStyle={{
            backgroundColor: "black",
            borderWidth: 2,
            borderColor: "white",
            borderRadius: 30,
          }}
          containerStyle={{
            width: 200,
            marginHorizontal: 70,
            marginVertical: 10,
          }}
          titleStyle={{ fontWeight: "bold" }}
          onPress={() => signup()}
          disabled={
            inputEmail == "" ||
            inputPassword == "" ||
            inputPassword != inputConfirmPassword
              ? true
              : false
          }
        />
        <StatusBar style="auto" />
      </View>
    </ThemeProvider>
  );
}

const theme = {
  Button: {
    raised: true,
  },
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 35,
  },
  textSignUp: {
    margin: 10,
  },
});
