import React from "react";
import { Image, StyleSheet } from "react-native";
import { spaces } from "../common/primitives/spaces";

export function Logo() {
  return (
    <Image source={require("../assets/images/logo.png")} style={styles.logo} />
  );
}

const styles = StyleSheet.create({
  logo: {
    width: spaces.x48,
    height: spaces.x10,
    resizeMode: "contain"
  }
});
