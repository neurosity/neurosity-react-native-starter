import { StyleSheet } from "react-native";
import colors from "../../constants/Colors";
import { sizes } from "../primitives/typography";
import { margins } from "../primitives/spaces";

const styles = StyleSheet.create({
  heading: {
    textAlign: "center",
    color: colors.mutedText,
    fontSize: sizes.sm,
    lineHeight: 30
  },
  helpLink: {
    textAlign: "center",
    marginTop: margins.sm,
    marginLeft: margins.xxl,
    marginRight: margins.xxl,
    fontSize: sizes.xs,
    lineHeight: 22
  },
  icon: {
    textAlign: "center",
    marginBottom: margins.xxl
  }
});

const { heading, helpLink, icon } = styles;

export { heading, helpLink, icon, styles };
