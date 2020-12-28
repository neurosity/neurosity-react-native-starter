import React, { useState, useCallback } from "react";

import { Button } from "../atoms/Button";
import { Picker } from "../atoms/Picker";

import { notion } from "../services/notion";
import { useNotion } from "../services/useNotion";

export function DeviceSelect({ onSelect = () => {}, onError = () => {} }) {
  const { devices, selectedDevice } = useNotion();
  const defaultDraftDeviceId =
    selectedDevice?.deviceId ?? devices[0]?.deviceId ?? "";
  const [draftDeviceId, setDraftDeviceId] = useState(defaultDraftDeviceId);
  const [status, setStatus] = useState("idle");
  const disabled = status !== "idle";

  const onSubmit = useCallback(() => {
    if (!draftDeviceId) {
      onError("Please select a device");
      return;
    }

    onError("");

    if (draftDeviceId !== selectedDevice?.deviceId) {
      setStatus("selecting");
      notion
        .selectDevice((devices) =>
          devices.find((device) => device.deviceId === draftDeviceId)
        )
        .then(() => {
          // @HACK: smooth transition instead of device screen flickering
          setTimeout(() => {
            setStatus("idle");
            onSelect(draftDeviceId);
          }, 500);
        })
        .catch((error) => {
          setStatus("idle");
          onError(error.message);
        });
    } else {
      onSelect(draftDeviceId);
    }
  }, [draftDeviceId, selectedDevice, onSelect, onError, setStatus]);

  return (
    <>
      <Picker
        disabled={disabled}
        placeholder={"Select a Device"}
        items={devices.map((device) => ({
          key: device?.deviceId,
          value: device?.deviceId,
          label: device?.deviceNickname ?? device.modelName
        }))}
        onValueChange={(selectedDevice) => {
          if (selectedDevice !== draftDeviceId) {
            setDraftDeviceId(selectedDevice);
          }
        }}
        value={draftDeviceId}
      />

      <Button onPress={() => onSubmit()} disabled={disabled}>
        {status === "selecting" ? "Selecting..." : null}
        {status === "idle" ? "Select" : null}
      </Button>
    </>
  );
}
