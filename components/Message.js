import React from "react";
import { View } from "react-native";

import { Icon } from "../atoms/Icon";
import { Typography } from "../atoms/Typography";
import colors from "../constants/Colors";

export function Message({ iconName, iconStyle = {}, message }) {
  return (
    <View
      justifyContent="center"
      alignItems="center"
      paddingLeft={100}
      paddingRight={100}
      flex={1}
    >
      <Icon
        name={iconName}
        type="MaterialIcons"
        size={55}
        style={iconStyle}
      />
      <Typography
        size={20}
        marginTop={20}
        lineHeight={25}
        color={colors.defaultText}
        weight="medium"
        textAlign="center"
      >
        {message}
      </Typography>
    </View>
  );
}
