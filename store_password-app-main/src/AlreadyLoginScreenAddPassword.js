import "firebase/compat/auth";
import "firebase/compat/firestore";
import { get, getDatabase, ref, set } from "firebase/database";
import React, { useState } from "react";
import {
  ScrollView, StyleSheet,
  Text
} from "react-native";
import { Button, Input, ThemeProvider } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

export default function AlreadyLoginScreenAddPassword({ navigation, user }) {
  const [inputTitle, setTitle] = useState("");
  const [inputUsername, setInputUsername] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [inputNote, setInputNote] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const writeDataToDatabase = () => {
    if (inputTitle == "") return;
    if (inputPassword == "") return;
    const db = getDatabase();
    const dbref = ref(db, "users/" + user.uid + "/password/" + inputTitle);
    get(dbref)
      .then((snapshot) => {
        if (snapshot.exists()) {
          setErrorMessage("title already have");
        } else {
          set(dbref, {
            username: inputUsername,
            password: inputPassword,
            note: inputNote,
          });
          navigation.navigate("Home");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <ThemeProvider>
      <ScrollView style={styles.container}>
        <Input
          leftIcon={<Icon name="address-book-o" size={20} color="black"></Icon>}
          placeholder="  Title"
          onChangeText={(value) => setTitle(value)}
          errorMessage={inputTitle == "" ? "required" : ""}
        ></Input>

        <Input
          leftIcon={<Icon name="user-o" size={20} color="black"></Icon>}
          placeholder="  Username"
          onChangeText={(value) => setInputUsername(value)}
        ></Input>

        <Input
          leftIcon={<Icon name="unlock-alt" size={20} color="black"></Icon>}
          placeholder="  Password"
          onChangeText={(value) => setInputPassword(value)}
          errorMessage={inputPassword == "" ? "required" : ""}
        ></Input>

        <Input
          leftIcon={<Icon name="sticky-note-o" size={20} color="black"></Icon>}
          placeholder="  Note"
          onChangeText={(value) => setInputNote(value)}
        ></Input>
        <Text>{errorMessage}</Text>
        <Button
          title="ADD PASSWORD"
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
          onPress={() => writeDataToDatabase()}
          disabled={inputTitle == "" || inputPassword == "" ? true : false}
        />
      </ScrollView>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 35,
  },
  preloder: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  btnAddPassword: {
    margin: 30,
  },
  textEmail: {
    margin: 10,
  },
});
