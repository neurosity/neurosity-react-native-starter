import React, { useState } from "react";
import { Alert, ScrollView, View } from "react-native";

import { DeviceItem } from "./DeviceItem";
import { Heading } from "../../atoms/Heading";
import { notion } from "../../services/notion";
import { useNotion } from "../../services/useNotion";
import colors from "../../constants/Colors";

const contentContainerStyle = {
  paddingTop: 40,
  paddingBottom: 80
};

const horizontalSpacingStyle = {
  paddingLeft: 15,
  paddingRight: 15
};

export function MyDevicesScreen() {
  const { devices, selectedDevice } = useNotion();
  const [selectingDeviceId, setSelectingDeviceId] = useState(null);

  const isLastSetting = (index) => index === devices.length - 1;

  function onSelectDevice(draftDeviceId) {
    if (draftDeviceId === selectedDevice?.deviceId) {
      return;
    }

    setSelectingDeviceId(draftDeviceId);

    notion
      .selectDevice((devices) =>
        devices.find((device) => device.deviceId === draftDeviceId)
      )
      .catch((error) => {
        Alert.alert(error, "Please try again.");
      })
      .finally(() => {
        setSelectingDeviceId(null);
      });
  }

  return (
    <ScrollView
      contentContainerStyle={contentContainerStyle}
      backgroundColor={colors.tintColor}
      showsVerticalScrollIndicator={false}
    >
      <View {...horizontalSpacingStyle} marginBottom={40}>
        {!selectedDevice ? <SelectDeviceWarning /> : null}
        <Heading
          color={colors.defaultText}
          variant="mini"
          marginBottom={20}
        >
          Neurosity Devices
        </Heading>
        {devices.map((device, index) => (
          <DeviceItem
            key={device.deviceId}
            device={device}
            selected={device.deviceId === selectedDevice?.deviceId}
            selecting={device.deviceId === selectingDeviceId}
            onSelect={(draftDeviceId) => onSelectDevice(draftDeviceId)}
            showBottomBorder={!isLastSetting(index)}
          />
        ))}
      </View>
    </ScrollView>
  );
}

function SelectDeviceWarning() {
  return (
    <Heading variant="error" marginBottom={40} paddingTop={0}>
      Please select a device
    </Heading>
  );
}
