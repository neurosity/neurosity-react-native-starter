import colors from "../constants/Colors";

export const stackScreenOptions = {
  headerBackTitleVisible: false,
  headerTintColor: colors.defaultText,
  headerTitleStyle: {
    color: colors.defaultText,
    fontSize: 27,
    fontFamily: "Roboto-Medium",
    fontWeight: "normal"
  },
  headerBackTitleStyle: {
    color: colors.defaultText,
    fontFamily: "Roboto-Medium",
    fontWeight: "normal",
    paddingLeft: 4
  },
  headerStyle: {
    backgroundColor: colors.tintColor,
    shadowColor: "transparent"
  }
};
