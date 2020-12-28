import React from "react";
import { View } from "react-native";
import { VictoryLegend } from "victory-native";

import { Message } from "../../components/Message";
import { TimeSeriesChart } from "../../components/TimeSeriesChart";
import { DeviceHeader } from "../../components/DeviceHeader";
import { DeviceStatusBar } from "../../components/DeviceStatusBar";
import { LoadingScreen } from "../../screens/Loading/LoadingScreen";
import { Container } from "../../atoms/Container";
import { Button } from "../../atoms/Button";
import { useNotion } from "../../services/useNotion";
import { frequencyBandsColors } from "../../constants/Colors";
import {
  useBrainwaves,
  METRIC_STATUS
} from "../../services/brainwaves";

export function DeviceScreen() {
  const { status } = useNotion();

  if (!status) {
    return <LoadingScreen />;
  }

  return (
    <Container>
      <DeviceHeader style={{ marginBottom: 25 }} />
      <DeviceStatusBar />
      <MetricDashboard />
    </Container>
  );
}

function MetricDashboard() {
  const { status } = useNotion();
  const isOffline = status?.state === "offline";

  const { powerByBand, toggle, streamingStatus } = useBrainwaves();
  const isPaused = streamingStatus === METRIC_STATUS.PAUSED;
  const isStreaming = streamingStatus === METRIC_STATUS.STREAMING;
  const isUnableToStream =
    streamingStatus === METRIC_STATUS.UNABLE_TO_STREAM;

  if (isOffline) {
    return (
      <View
        flex={1}
        flexDirection="column"
        justifyContent="space-between"
        alignItems="center"
        paddingTop={40}
        paddingBottom={40}
      >
        <Message
          iconName="power-settings-new"
          message="Turn on your device to get started"
        />
      </View>
    );
  }

  return (
    <View
      flex={1}
      flexDirection="column"
      justifyContent="space-between"
      alignItems="center"
      paddingTop={40}
      paddingBottom={40}
    >
      {isUnableToStream ? (
        <Message
          iconName="brightness-3"
          iconStyle={{ transform: [{ rotate: "132deg" }] }}
          message="Your device is in sleep mode"
        />
      ) : (
        <View>
          {Object.entries(powerByBand).map(
            ([bandName, data], index) => {
              return (
                <TimeSeriesChart
                  key={bandName}
                  autoScale={false}
                  data={data}
                  height={65}
                  color={frequencyBandsColors[index]}
                />
              );
            }
          )}
          <VictoryLegend
            x={53}
            y={50}
            height={75}
            orientation="horizontal"
            gutter={18}
            style={{
              border: { stroke: "none" },
              title: {
                fontFamily: "Roboto-Regular"
              }
            }}
            colorScale={frequencyBandsColors}
            data={Object.keys(powerByBand).map((name) => ({ name }))}
          />
        </View>
      )}
      <View
        width="100%"
        marginTop={40}
        paddingLeft={40}
        paddingRight={40}
        minHeight={120}
        justifyContent="flex-end"
      >
        {!isUnableToStream ? (
          <Button secondary onPress={toggle}>
            {isPaused ? <>Stream</> : null}
            {isStreaming ? <>Stop</> : null}
          </Button>
        ) : null}
      </View>
    </View>
  );
}
