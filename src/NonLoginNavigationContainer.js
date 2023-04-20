import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NonLoginScreenForgotPassword from "./NonLoginScreenForgotPassword";
import NonLoginScreenSignin from "./NonLoginScreenSignin";
import NonLoginScreenSingup from "./NonLoginScreenSingup";

const Stack = createNativeStackNavigator();

export default function NonLoginNavigationContainer() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Signin"
        screenOptions={{
          headerTintColor: "black",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerTitleAlign: "center",
        }}
      >
        <Stack.Screen name="Signin" component={NonLoginScreenSignin} />
        <Stack.Screen name="Signup" component={NonLoginScreenSingup} />
        <Stack.Screen
          name="ForgotPassword"
          component={NonLoginScreenForgotPassword}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
