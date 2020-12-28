import React from "react";
import { Text } from "react-native";
import colors from "../constants/Colors";

const weights = {
  thin: "Thin",
  light: "Light",
  regular: "Regular",
  medium: "Medium",
  black: "Black",
  bold: "Bold"
};

export function Typography({
  children,
  font = "Roboto",
  weight = "Regular",
  size = "14px",
  color = colors.defaultText,
  lineHeight,
  letterSpacing,
  style = {},
  onPress,
  selectable,
  numberOfLines,
  ellipsizeMode,
  ...otherStyles
}) {
  return (
    <Text
      {...(selectable ? { selectable } : {})}
      {...(onPress ? { onPress } : {})}
      {...(numberOfLines ? { numberOfLines } : {})}
      {...(ellipsizeMode ? { ellipsizeMode } : {})}
      style={{
        fontFamily: getFontWithWeight(font, weight),
        fontSize: coerceToNumber(size),
        color,
        ...(lineHeight ? { lineHeight: coerceToNumber(lineHeight) } : {}),
        ...(letterSpacing ? { letterSpacing } : {}),
        ...otherStyles,
        ...style
      }}>
      {children}
    </Text>
  );
}

function getFontWithWeight(font, weight) {
  return `${font}${weight in weights ? `-${weights[weight]}` : ``}`;
}

function coerceToNumber(value) {
  return typeof value === "number" ? value : Number(value.replace(/\D/g, ""));
}
