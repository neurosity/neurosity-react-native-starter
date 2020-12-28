import React from "react";
import { View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Icon } from "../atoms/Icon";
import { Logo } from "../atoms/Logo";
import colors from "../constants/Colors";

const buttonsStyles = {
  paddingTop: 12,
  paddingRight: 23,
  paddingBottom: 12,
  paddingLeft: 23
};

export function DeviceHeader({ style = {} }) {
  return (
    <View
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      style={style}
    >
      <DrawerButton />
      <Logo />
      <View style={{ width: 56, buttonsStyles }} />
    </View>
  );
}

export function DrawerButton() {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.toggleDrawer()}
      style={buttonsStyles}
    >
      <Icon
        name="menu"
        type="MaterialIcons"
        color={colors.defaultText}
      />
    </TouchableOpacity>
  );
}
