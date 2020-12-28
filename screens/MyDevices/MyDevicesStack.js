import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { stackScreenOptions } from "../../navigation/stackScreenOptions";
import { DrawerButton } from "../../components/DeviceHeader";
import { MyDevicesScreen } from "./MyDevicesScreen";

const Stack = createStackNavigator();

export function MyDevicesStack() {
  return (
    <Stack.Navigator
      initialRouteName="MyDevices"
      screenOptions={{
        ...stackScreenOptions,
        headerLeft: () => <DrawerButton />
      }}
    >
      <Stack.Screen
        name="MyDevices"
        component={MyDevicesScreen}
        options={{
          headerTitle: "My Devices"
        }}
      />
    </Stack.Navigator>
  );
}
