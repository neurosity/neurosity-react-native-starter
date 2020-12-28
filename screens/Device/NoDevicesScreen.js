import React from "react";
import { View } from "react-native";

import { Container } from "../../atoms/Container";
import { Message } from "../../components/Message";

export function NoDevicesScreen() {
  return (
    <Container>
      <View
        flex={1}
        flexDirection="column"
        justifyContent="space-between"
        alignItems="center"
        paddingTop={40}
        paddingBottom={40}
      >
        <Message
          iconName="error-outline"
          message={
            <>
              No devices found. Please add a device to your Neurosity
              account.
            </>
          }
        />
      </View>
    </Container>
  );
}
