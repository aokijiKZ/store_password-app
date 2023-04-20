import * as Clipboard from "expo-clipboard";
import { getDatabase, ref, set } from "firebase/database";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

export default function AlreadyLoginScreenHomeComponentPasswordData({
  navigation,
  user,
  title,
  username,
  password,
  note,
}) {
  const updatePasswordData = () => {
    navigation.navigate("UpdatePassword", {
      title,
      username,
      password,
      note,
    });
  };

  const deletePasswordData = () => {
    const db = getDatabase();
    set(ref(db, "users/" + user.uid + "/password/" + title), null);
  };

  const copyToClipboard = (copyText) => {
    if (copyText == null) return;
    Clipboard.setString(String(copyText));
  };

  return (
    <View style={styles.dataContainer} elevation={5}>
      <View style={styles.styleIconLock}>
        <Icon name="lock" size={30} style={{ color: "#000" }}></Icon>
      </View>
      <View style={styles.detailAll}>
        <Text style={styles.title}>{`${title}`}</Text>
        <View style={styles.detail}>
          <TouchableOpacity onPress={() => copyToClipboard(username)}>
            <Text>{`Username: ${username}`}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => copyToClipboard(password)}>
            <Text>{`Password: ${password}`}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.styleBtnAction}>
          <View style={{ paddingLeft: 210, marginRight: 5 }}>
            <Button
              buttonStyle={styles.btnEdit}
              icon={
                <Icon name="pencil" size={18} style={{ color: "#fff" }}></Icon>
              }
              onPress={() => {
                updatePasswordData();
              }}
            ></Button>
          </View>

          <Button
            buttonStyle={styles.btnDelete}
            icon={
              <Icon name="trash" size={18} style={{ color: "#fff" }}></Icon>
            }
            onPress={() => {
              deletePasswordData();
            }}
          ></Button>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  dataContainer: {
    backgroundColor: "#fff",
    flexDirection: "row",
    marginHorizontal: 16,
    marginVertical: 6,
    paddingVertical: 20,
    paddingHorizontal: 24,
    borderRadius: 20,
  },
  addButton: {
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#333",
    shadowOpacity: 0.1,
    shadowOffset: { x: 2, y: 0 },
    shadowRadius: 2,
    position: "absolute",
    bottom: 20,
    right: 173,
  },
  addText: {
    color: "#FFF",
    fontSize: 20,
  },
  styleTab: {
    position: "absolute",
    bottom: 25,
    left: 0,
    right: 0,
    elevation: 0,
    backgroundColor: "#F6F6F6",
    height: 70,
    top: 540,
  },
  btnDelete: {
    width: 40,
    height: 40,
    borderRadius: 30,
    backgroundColor: "#F44338",
  },
  btnEdit: {
    width: 40,
    height: 40,
    borderRadius: 30,
    backgroundColor: "#4549F4",
  },
  detail: {
    marginTop: 5,
    fontSize: 16,
  },
  styleBtnAction: {
    flexDirection: "row",
    paddingRight: 15,
    paddingTop: 7,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  styleIconLock: {
    flexDirection: "row",
    paddingRight: 15,
    paddingTop: 7,
  },
  detailAll: {
    flexDirection: "column",
    padding: 5,
    paddingEnd: 5,
  },
});
