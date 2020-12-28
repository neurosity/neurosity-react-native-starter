import React, { Component } from "react";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";

import colors from "../constants/Colors";

const types = {
  AntDesign,
  Ionicons,
  MaterialIcons,
  FontAwesome,
  Feather,
  MaterialCommunityIcons,
  SimpleLineIcons
};

export class Icon extends Component {
  render() {
    const { type, ...props } = this.props;
    const Icon = types[type];

    return <Icon {...props} />;
  }
}

Icon.defaultProps = {
  type: "MaterialCommunityIcons",
  size: 26,
  style: {},
  color: colors.defaultText
};
