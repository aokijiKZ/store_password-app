import { StyleSheet, Text, View, LogBox } from "react-native";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import NonLoginNavigationContainer from "./src/NonLoginNavigationContainer";
import AlreadyLoginNavigationContainer from "./src/AlreadyLoginNavigationContainer";

const firebaseConfig = {
  apiKey: "AIzaSyBrbK3yVkhvxXXImAONQBbAeNMDnOU7uAQ",
  authDomain: "storepassword-app.firebaseapp.com",
  databaseURL:
    "https://storepassword-app-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "storepassword-app",
  storageBucket: "storepassword-app.appspot.com",
  messagingSenderId: "797778436115",
  appId: "1:797778436115:web:938aec0db9c5d3fdbf5fe6",
  measurementId: "G-9VJYYF7VNM",
};

firebase.initializeApp(firebaseConfig);

LogBox.ignoreAllLogs();

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    auth.onAuthStateChanged((user)=>{
      setUser(user);
    });
  }, []);

  if (user == null) {
    return <NonLoginNavigationContainer />;
  }

  return <AlreadyLoginNavigationContainer user={user}/>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
