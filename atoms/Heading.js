import React from "react";
import { Typography } from "./Typography";
import colors from "../constants/Colors";

const defaultVariant = "default";

const variants = {
  default: {
    size: "18px",
    color: colors.defaultText,
    lineHeight: 18
  },
  error: {
    size: "19px",
    color: colors.errorText,
    lineHeight: 18,
    style: {
      textAlign: "center"
    }
  },
  primary: {
    weight: "medium",
    size: "24px",
    color: colors.electricBlue,
    lineHeight: 24
  },
  mini: {
    style: {
      textTransform: "uppercase"
    },
    weight: "medium",
    size: "14px",
    color: colors.mutedText,
    lineHeight: 14
  }
};

export function Heading({
  children,
  variant = defaultVariant,
  color,
  size,
  weight,
  lineHeight,
  letterSpacing,
  style = {},
  ...otherStyles
}) {
  return (
    <Typography
      {...(variants?.[variant] ?? {})}
      {...(size ? { size } : {})}
      {...(color ? { color } : {})}
      {...(weight ? { weight } : {})}
      {...(lineHeight ? { lineHeight } : {})}
      {...(letterSpacing ? { letterSpacing } : {})}
      style={{
        ...(variants?.[variant]?.style ?? {}),
        ...otherStyles,
        ...style
      }}>
      {children}
    </Typography>
  );
}
