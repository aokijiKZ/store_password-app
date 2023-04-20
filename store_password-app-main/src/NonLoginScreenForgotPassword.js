import { StatusBar } from "expo-status-bar";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Input, ThemeProvider } from "react-native-elements";

export default function NonLoginScreenForgotPassword({ navigation }) {
  const [inputEmail, setInputEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const resetPassword = () => {
    const auth = getAuth();
    sendPasswordResetEmail(auth, inputEmail)
      .then(() => {})
      .catch((error) => {
        setErrorMessage(error.message);
      });
    navigation.goBack();
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
        <Text>{errorMessage}</Text>
        <Button
          title="FORGOT PASSWORD"
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
          onPress={() => resetPassword()}
          disabled={inputEmail == "" ? true : false}
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
