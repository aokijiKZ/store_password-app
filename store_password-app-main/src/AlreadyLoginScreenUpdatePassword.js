import "firebase/compat/auth";
import "firebase/compat/firestore";
import { getDatabase, ref, set } from "firebase/database";
import React, { useState } from "react";
import {
  ScrollView, StyleSheet
} from "react-native";
import { Button, Input, ThemeProvider } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

export default function AlreadyLoginScreenUpdatePassword({ navigation, user,route }) {
  const { title ,username,password,note} = route.params;
  const [inputUsername, setInputUsername] = useState(username);
  const [inputPassword, setInputPassword] = useState(password);
  const [inputNote, setInputNote] = useState(note);

  const updateDataToDatabase = () => {
    if (inputPassword == "") return;
    const db = getDatabase();
    set(ref(db, "users/" + user.uid + "/password/" + title), {
      username: inputUsername,
      password: inputPassword,
      note: inputNote,
    });
    navigation.navigate("Home");
  };

  return (
    <ThemeProvider>
      <ScrollView style={styles.container}>
        <Input
          leftIcon={<Icon name="address-book-o" size={20} color="black"></Icon>}
          value={title}
          disabled={true}
        ></Input>

        <Input
          leftIcon={<Icon name="user-o" size={20} color="black"></Icon>}
          value={inputUsername}
          onChangeText={(value) => setInputUsername(value)}
        ></Input>

        <Input
          leftIcon={<Icon name="unlock-alt" size={20} color="black"></Icon>}
          value={inputPassword}
          onChangeText={(value) => setInputPassword(value)}
          errorMessage={inputPassword == "" ? "required" : ""}
        ></Input>

        <Input
          leftIcon={<Icon name="sticky-note-o" size={20} color="black"></Icon>}
          value={inputNote}
          onChangeText={(value) => setInputNote(value)}
        ></Input>

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
          onPress={() => updateDataToDatabase()}
          disabled={inputPassword == "" ? true : false}
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
