import { StatusBar } from "expo-status-bar";
import { getAuth, signOut } from "firebase/auth";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { getDatabase, onValue, ref } from "firebase/database";
import { useEffect, useLayoutEffect, useState } from "react";
import {
  ScrollView, StyleSheet, View
} from "react-native";
import { Button, SearchBar } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import AlreadyLoginScreenHomeComponentPasswordData from "./AlreadyLoginScreenHomeComponentPasswordData";

export default function AlreadyLoginScreenHome({ navigation, user }) {
  const [passwordData, setPasswordData] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const db = getDatabase();
    const passwordDataRef = ref(db, `users/${user.uid}/password`);
    onValue(passwordDataRef, (snapshot) => {
      const data = snapshot.val();
      setPasswordData(data);
    });
  }, []);

  const signout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => { })
      .catch((error) => {
        console.error(error);
      });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Button
          icon={
            <Icon
              name="sign-out"
              size={20}
              color="black"
              style={{ transform: [{ rotateY: "180deg" }] }}
            ></Icon>
          }
          buttonStyle={{
            backgroundColor: "#fff",
          }}
          onPress={() => signout()}
        />
      ),
      headerRight: () => (
        <Button
          icon={<Icon name="plus" size={20} color="black"></Icon>}
          buttonStyle={{
            backgroundColor: "#fff",
          }}
          onPress={() => navigation.navigate("AddPassword")}
        />
      ),
    });
  }, [navigation]);

  renderPasswordData = <View></View>;
  if (passwordData != null) {
    const remianKey = Object.keys(passwordData).filter((key) => {
      const keyLowerCase = key.toLowerCase();
      const searchQueryLowerCase = searchQuery.toLowerCase();
      return keyLowerCase.includes(searchQueryLowerCase);
    });
    renderPasswordData = remianKey.map((key, index) => {
      return (
        <View key={index}>
          <AlreadyLoginScreenHomeComponentPasswordData
            navigation={navigation}
            user={user}
            title={key}
            username={passwordData[key].username}
            password={passwordData[key].password}
            note={passwordData[key].note}
          />
        </View>
      );
    });
  }

  return (
    <View style={styles.container}>
      <SearchBar
        containerStyle={styles.ipSearch}
        platform={"android"}
        onChangeText={(value) => {
          setSearchQuery(value);
        }}
      />
      <ScrollView>
        <View>{renderPasswordData}</View>
      </ScrollView>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F3F3",
  },
  ipSearch: {
    backgroundColor: 'white',
    borderRadius: 30,
    margin: 10,
    paddingHorizontal: 16,
    marginVertical: 20,
    alignItems: "center",
    elevation: 5,
  }
});
