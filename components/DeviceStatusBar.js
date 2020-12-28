import React from "react";
import { View } from "react-native";

import { Typography } from "../atoms/Typography";
import { Icon } from "../atoms/Icon";
import {
  stateColors,
  stateLabels,
  stateIcons
} from "../constants/Status";

import { useNotion } from "../services/useNotion";
import { getBatteryIcon } from "../services/battery";
import colors from "../constants/Colors";

export function DeviceStatusBar({ compact = false, style = {} }) {
  const { status, selectedDevice } = useNotion();
  const { state, sleepMode, battery, charging, ssid } = status || {};
  const { deviceNickname = "" } = selectedDevice || {};
  const isOffline = state === "offline";

  const labelFontSize = compact ? 13 : 18;
  const iconSize = compact ? 16 : 21;
  const itemInnerSpacing = compact ? 12 : 18;
  const itemOuterSpacing = compact ? 20 : 24;

  return (
    <View
      flexDirection="column"
      style={{
        paddingTop: 13,
        paddingBottom: 8,
        paddingLeft: 14,
        paddingRight: 14,
        backgroundColor: colors.tintColor,
        ...style
      }}
    >
      {!compact ? (
        <View marginBottom={22}>
          <Item
            label={deviceNickname}
            labelFontColor={colors.defaultText}
            labelFontSize={29}
            labelFontWeight={"500"}
            iconType="MaterialCommunityIcons"
            iconName="circle-medium"
            iconColor={stateColors?.[state] ?? stateColors.offline}
            iconSize={33}
            itemInnerSpacing={8}
          />
        </View>
      ) : null}
      <View
        flexDirection="row"
        justifyContent="space-between"
        paddingLeft={compact ? 0 : 8}
      >
        {compact ? (
          <Item
            label={deviceNickname}
            labelFontSize={labelFontSize}
            iconType="MaterialCommunityIcons"
            iconName="circle-medium"
            iconColor={stateColors?.[state] ?? stateColors.offline}
            iconSize={iconSize + 7}
            iconStyle={{ marginRight: 3 }}
            itemInnerSpacing={itemInnerSpacing}
            itemOuterSpacing={itemOuterSpacing}
          />
        ) : null}
        <Item
          label={stateLabels?.[state] ?? stateLabels.offline}
          labelFontSize={labelFontSize}
          iconName={stateIcons?.[state] ?? stateIcons.offline}
          iconSize={iconSize}
          itemInnerSpacing={itemInnerSpacing}
          itemOuterSpacing={itemOuterSpacing}
        />
        <Item
          truncate={!isOffline}
          label={!isOffline ? ssid : null}
          labelFontSize={labelFontSize}
          iconName={!isOffline ? "wifi" : "wifi-off"}
          iconSize={iconSize}
          itemInnerSpacing={itemInnerSpacing}
          itemOuterSpacing={itemOuterSpacing}
        />
        {sleepMode ? (
          <Item
            iconName="brightness-3"
            iconStyle={{ transform: [{ rotate: "132deg" }] }}
            iconSize={iconSize}
            itemInnerSpacing={itemInnerSpacing}
            itemOuterSpacing={itemOuterSpacing}
          />
        ) : null}
        {!isOffline ? (
          <Item
            label={`${battery}%`}
            labelFontSize={labelFontSize}
            iconType="MaterialCommunityIcons"
            iconName={getBatteryIcon(battery, charging, state)}
            iconSize={iconSize - 1}
            itemInnerSpacing={itemInnerSpacing}
            itemOuterSpacing={itemOuterSpacing / 2}
          />
        ) : null}
      </View>
    </View>
  );
}

function Item({
  label,
  labelFontSize,
  labelFontColor = colors.defaultText,
  labelFontWeight = "normal",
  iconColor = colors.defaultText,
  iconType = "MaterialIcons",
  iconSize = 16,
  iconName,
  iconStyle = {},
  style = {},
  itemOuterSpacing = 0,
  itemInnerSpacing = 0,
  truncate = false
}) {
  return (
    <View
      {...(truncate
        ? {
            flex: 1,
            justifyContent: "center"
          }
        : {})}
      flexDirection="row"
      alignItems="center"
      style={{
        alignItems: "center",
        ...style
      }}
    >
      <Icon
        size={iconSize}
        type={iconType}
        name={iconName}
        color={iconColor}
        style={{
          marginRight: label ? itemInnerSpacing / 2 : itemInnerSpacing, //6 : 12,
          ...iconStyle
        }}
      />
      {label ? (
        <Typography
          {...(truncate
            ? {
                numberOfLines: 1,
                ellipsizeMode: "tail"
              }
            : {})}
          color={labelFontColor}
          style={{
            paddingRight: itemOuterSpacing,
            fontSize: labelFontSize,
            fontWeight: labelFontWeight
          }}
        >
          {label}
        </Typography>
      ) : null}
    </View>
  );
}
