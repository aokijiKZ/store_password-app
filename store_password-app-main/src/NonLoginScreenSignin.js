import { StatusBar } from "expo-status-bar";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Input, ThemeProvider } from "react-native-elements";

export default function NonLoginScreenSignin({ navigation }) {
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const signin = () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, inputEmail, inputPassword)
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
        <Text style={{ left: 15 }}>{errorMessage}</Text>
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
            marginHorizontal: 65,
            marginVertical: 10,
          }}
          titleStyle={{ fontWeight: "bold" }}
          onPress={() => signin()}
          disabled={inputEmail == "" || inputPassword == "" ? true : false}
        />
        <View style={styles.forgotPassTextCont}>
          <Text style={styles.forgotButton}
            onPress={() => navigation.navigate("ForgotPassword")}>Forgot password? </Text>
        </View>
        <View style={styles.signupTextCont}>
          <Text>Don't have an account yet? </Text>
          <Text style={styles.signupButton}
            onPress={() => navigation.navigate("Signup")} >Signup</Text>
        </View>
        <StatusBar style="auto" />
      </View>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 35,
  },
  textSignIn: {
    margin: 10,
  },
  signupTextCont: {
    flexGrow: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingVertical: 16,
    flexDirection: 'row',
  },
  signupButton: {
    color: 'gray',
  },
  forgotPassTextCont: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  forgotButton: {
    color: 'gray',
  }
});
