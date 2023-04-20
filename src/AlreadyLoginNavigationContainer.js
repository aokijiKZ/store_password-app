import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AlreadyLoginScreenAddPassword from "./AlreadyLoginScreenAddPassword";
import AlreadyLoginScreenHome from "./AlreadyLoginScreenHome";
import AlreadyLoginScreenUpdatePassword from "./AlreadyLoginScreenUpdatePassword";

const Stack = createNativeStackNavigator();

export default function AlreadyLoginNavigationContainer({ user }) {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerTintColor: "black",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerTitleAlign: "center",
        }}
        options={({ navigation, route }) => ({
          headerTitle: (props) => <LogoTitle {...props} />,
        })}
      >
        <Stack.Screen name="Home">
          {(props) => <AlreadyLoginScreenHome {...props} user={user} />}
        </Stack.Screen>
        <Stack.Screen name="AddPassword">
          {(props) => <AlreadyLoginScreenAddPassword {...props} user={user} />}
        </Stack.Screen>
        <Stack.Screen name="UpdatePassword">
          {(props) => (
            <AlreadyLoginScreenUpdatePassword {...props} user={user} />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
