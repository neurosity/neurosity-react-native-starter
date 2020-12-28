import React from "react";
import {
  View,
  ActivityIndicator,
  TouchableOpacity
} from "react-native";

import { Icon } from "../../atoms/Icon";
import { Typography } from "../../atoms/Typography";
import colors from "../../constants/Colors";

const deviceItemStyle = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  borderBottomColor: colors.midnight,
  height: 60
};

export function DeviceItem({
  device,
  selected,
  selecting,
  onSelect,
  showBottomBorder = true
}) {
  if (!device) {
    return null;
  }

  return (
    <TouchableOpacity
      activeOpacity={selected ? 1 : 0.2}
      onPress={() => onSelect(device.deviceId)}
      style={{
        ...deviceItemStyle,
        borderBottomWidth: showBottomBorder ? 1 : 0
      }}
    >
      <Typography size="16px">{device.deviceNickname}</Typography>
      <Typography
        selectable
        size="16px"
        color={colors.defaultText}
        style={{ flexGrow: 1, paddingLeft: 20 }}
      >
        {truncate(device.deviceId, 20)}
      </Typography>
      <View height={35} width={40} alignItems="center">
        {selecting ? (
          <ActivityIndicator size="small" color={colors.defaultText} />
        ) : null}
        {selected ? (
          <Icon
            name="done"
            type="MaterialIcons"
            color={colors.defaultText}
            size={30}
          />
        ) : null}
      </View>
    </TouchableOpacity>
  );
}

function truncate(text, maxLength) {
  return maxLength && text.length > maxLength
    ? `${text.substring(0, maxLength)}...`
    : text;
}
