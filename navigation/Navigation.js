import "react-native-gesture-handler";
import React, { useState, useLayoutEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { AuthStack } from "./AuthStack";
import { MainStack } from "./MainStack";
import { DrawerContent } from "./DrawerContent";
import { LoadingScreen } from "../screens/Loading/LoadingScreen";
import { useNotion } from "../services/useNotion";
import { STATE_LOADING } from "../constants/index";
import colors from "../constants/Colors";

const Drawer = createDrawerNavigator();

const drawerStyle = {
  width: "86%",
  backgroundColor: colors.tintColor
};

export function Navigation() {
  const { user, state } = useNotion();
  const loading = state === STATE_LOADING;

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      {user ? <DrawerNavigator component={MainStack} /> : <AuthStack />}
    </NavigationContainer>
  );
}

function DrawerNavigator({ component }) {
  const drawerReady = useDrawerReady();

  return (
    <Drawer.Navigator
      initialRouteName="Main"
      drawerPosition="left"
      openByDefault={false}
      drawerStyle={drawerStyle}
      overlayColor="rgba(0, 0, 0, 0.5)"
      drawerContent={(props) =>
        drawerReady ? <DrawerContent {...props} /> : null
      }
    >
      <Drawer.Screen name="Main" component={component} />
    </Drawer.Navigator>
  );
}

function useDrawerReady() {
  const [ready, setReady] = useState(false);

  let timeout;
  useLayoutEffect(() => {
    timeout = setTimeout(() => {
      setReady(true);
    });

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return ready;
}
