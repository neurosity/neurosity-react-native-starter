import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SafeAreaView from "react-native-safe-area-view";

import { DeviceScreen } from "../screens/Device/DeviceScreen";
import { NoDevicesScreen } from "../screens/Device/NoDevicesScreen";
import { MyDevicesStack } from "../screens/MyDevices/MyDevicesStack";
import { LoadingScreen } from "../screens/Loading/LoadingScreen";
import { DrawerButton } from "../components/DeviceHeader";
import { useNotion } from "../services/useNotion";
import { stackScreenOptions } from "./stackScreenOptions";
import {
  STATE_LOADING,
  STATE_SELECTING_DEVICE
} from "../constants/index";
import colors from "../constants/Colors";

const Stack = createStackNavigator();

const safeAreaStyle = {
  flex: 1,
  backgroundColor: colors.tintColor
};

export function MainStack() {
  const { state, devices } = useNotion();
  const activeRoute = getActiveRoute(devices, state);
  const loading = state === STATE_LOADING;

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={safeAreaStyle}>
        <Stack.Navigator
          screenOptions={{
            ...stackScreenOptions,
            headerRight: () => <DrawerButton />
          }}
          initialRouteName={activeRoute}
        >
          <Stack.Screen
            name="Device"
            component={DeviceScreen}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen
            name="NoDevices"
            component={NoDevicesScreen}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen
            name="MyDevices"
            component={MyDevicesStack}
            options={{
              headerShown: false
            }}
          />
        </Stack.Navigator>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

function getActiveRoute(devices, state) {
  if (!devices?.length) {
    return "NoDevices";
  }

  if (state === STATE_SELECTING_DEVICE) {
    return "MyDevices";
  }

  return "Device";
}
