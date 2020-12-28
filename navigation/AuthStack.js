import React from "react";
import { View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import { LoginScreen } from "../screens/Login/LoginScreen";

import { Logo } from "../atoms/Logo";

import { stackScreenOptions } from "./stackScreenOptions";

const Stack = createStackNavigator();

export function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={stackScreenOptions}
      initialRouteName="Login"
    >
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerTitle: () => <Logo />,
          headerLeft: () => <View />,
          headerRight: () => <View />,
          animationTypeForReplace: "pop"
        }}
      />
    </Stack.Navigator>
  );
}
