import React from "react";
import { TouchableOpacity, Image, View } from "react-native";

import { Heading } from "../atoms/Heading";
import { Button } from "../atoms/Button";
import { Icon } from "../atoms/Icon";
import { useNotion } from "../services/useNotion";
import colors from "../constants/Colors";

const contentContainerStyle = {
  display: "flex",
  flex: 1,
  alignItems: "center",
  paddingTop: 150,
  paddingBottom: 50
};

const closeButtonStyle = {
  position: "absolute",
  top: 52,
  right: 20,
  zIndex: 1
};

const pictureSize = 100;
const profilePictureStyle = {
  width: pictureSize,
  height: pictureSize,
  borderRadius: pictureSize / 2,
  resizeMode: "contain"
};

const logoutButtonContainerStyle = {
  borderWidth: 1,
  borderRadius: 8,
  paddingTop: 7,
  paddingBottom: 7,
  marginBottom: 0
};

const logoutButtonTextStyle = {
  textTransform: "none",
  letterSpacing: 0
};

const menuButtonContainerStyle = {
  backgroundColor: "transparent",
  paddingLeft: 10,
  paddingRight: 10,
  paddingTop: 5,
  paddingBottom: 5,
  marginBottom: 0
};

const menuButtonTextStyle = {
  color: colors.defaultText,
  fontSize: 25,
  lineHeight: 30,
  letterSpacing: 0
};

export function DrawerContent({ navigation }) {
  const { user, devices, selectedDevice, logoutNotion } = useNotion();
  const userSelectedADevice = !!selectedDevice;
  const userHasMultipleDevices = devices?.length > 1;

  async function logout() {
    await navigation.closeDrawer();
    await logoutNotion();
  }

  if (!user) {
    return null;
  }

  return (
    <>
      <CloseButton navigation={navigation} />
      <View style={contentContainerStyle}>
        <View alignItems="center">
          <Image
            source={
              user.photoURL
                ? { uri: user.photoURL }
                : require("../assets/images/default-profile-picture.png")
            }
            defaultSource={require("../assets/images/default-profile-picture.png")}
            style={profilePictureStyle}
          />
          <Heading marginTop={20} color={colors.defaultText}>
            {user.email}
          </Heading>
          <Button
            secondary
            onPress={logout}
            containerStyle={logoutButtonContainerStyle}
            textStyle={logoutButtonTextStyle}
          >
            Log out
          </Button>
        </View>
        <View marginTop={40} marginBottom={40}>
          {userSelectedADevice ? (
            <MenuButton
              onPress={() =>
                navigation.navigate("Main", { screen: "Device" })
              }
            >
              Home
            </MenuButton>
          ) : null}
          {userHasMultipleDevices ? (
            <MenuButton
              onPress={() =>
                navigation.navigate("Main", { screen: "MyDevices" })
              }
            >
              My Devices
            </MenuButton>
          ) : null}
        </View>
      </View>
    </>
  );
}

function CloseButton({ navigation }) {
  return (
    <TouchableOpacity
      onPress={() => navigation.toggleDrawer()}
      style={closeButtonStyle}
    >
      <Icon
        name="close"
        size={35}
        type="MaterialCommunityIcons"
        color={colors.defaultText}
      />
    </TouchableOpacity>
  );
}

function MenuButton({ children, onPress = () => {} }) {
  return (
    <Button
      secondary
      containerStyle={menuButtonContainerStyle}
      textStyle={menuButtonTextStyle}
      onPress={onPress}
    >
      {children}
    </Button>
  );
}
