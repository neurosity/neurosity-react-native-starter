import React from "react";
import { TouchableOpacity } from "react-native";
import { Typography } from "./Typography";
import colors from "../constants/Colors";
import { margins, paddings } from "../common/primitives/spaces";
import { sizes } from "../common/primitives/typography";

const defaultVariant = "primary";

const variants = {
  primary: {
    container: {
      borderRadius: 3,
      borderWidth: 2,
      borderStyle: "solid",
      borderColor: colors.buttonText,
      paddingLeft: paddings.sm,
      paddingRight: paddings.sm,
      paddingTop: paddings.sm,
      paddingBottom: paddings.sm,
      textAlign: "center",
      justifyContent: "center",
      marginTop: margins.lg,
      marginBottom: margins.lg
    },
    text: {
      color: colors.buttonText,
      textTransform: "uppercase",
      letterSpacing: 3,
      textAlign: "center",
      fontSize: sizes.sm
    }
  },
  secondary: {
    container: {
      borderRadius: 10,
      backgroundColor: colors.secondaryButtonBackground,
      paddingLeft: paddings.md,
      paddingRight: paddings.md,
      paddingTop: paddings.lg,
      paddingBottom: paddings.lg,
      marginTop: margins.lg,
      marginBottom: margins.lg,
      textAlign: "center",
      justifyContent: "center"
    },
    text: {
      color: colors.primaryColor,
      letterSpacing: 1,
      textAlign: "center",
      fontSize: sizes.md
    }
  }
};

export function Button({
  children,
  secondary,
  textStyle = {},
  containerStyle = {},
  ...props
}) {
  const variant = secondary ? "secondary" : defaultVariant;
  const selectedVariant =
    variants[variant in variants ? variant : defaultVariant];

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      {...props}
      style={{
        ...(selectedVariant?.container ?? {}),
        ...containerStyle
      }}
    >
      <Typography
        style={{
          ...(selectedVariant?.text ?? {}),
          ...textStyle
        }}
      >
        {children}
      </Typography>
    </TouchableOpacity>
  );
}
