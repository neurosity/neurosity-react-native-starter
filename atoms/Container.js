import React from "react";
import {
  TouchableWithoutFeedback,
  View,
  Keyboard,
  StyleSheet
} from "react-native";
import colors from "../constants/Colors";

export function Container({ children, padded = false, ...style }) {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View
        style={{
          ...styles.container,
          ...(padded ? styles.padded : styles.notPadded),
          ...style
        }}>
        {children}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
    backgroundColor: colors.tintColor
  },
  padded: {
    paddingTop: 70,
    paddingBottom: 40,
    paddingLeft: 40,
    paddingRight: 40
  },
  notPadded: {
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0
  }
});
