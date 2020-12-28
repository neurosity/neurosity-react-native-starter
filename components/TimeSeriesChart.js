import React from "react";
import { View } from "react-native";
import { VictoryChart, VictoryLine, VictoryAxis } from "victory-native";

export function TimeSeriesChart({
  data,
  color,
  autoScale = false,
  height = 100
}) {
  if (!data) {
    return null;
  }

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
      }}
    >
      <VictoryChart
        {...(autoScale
          ? {
              domain: { y: [0, 1] }
            }
          : {})}
        height={height}
        width={450}
        padding={{ bottom: 0, top: 0, right: 0, left: 0 }}
        scale={{ x: "time", y: "linear" }}
      >
        <VictoryAxis
          dependentAxis
          tickFormat={() => ""}
          style={{ axis: { stroke: "none" } }}
        />
        <VictoryAxis
          crossAxis
          tickFormat={() => ""}
          style={{ axis: { stroke: "none" } }}
        />

        <VictoryLine
          interpolation="basis"
          data={data}
          style={{
            data: {
              stroke: color || "rgba(112,185,252,1)",
              strokeWidth: 2
            }
          }}
        />
      </VictoryChart>
    </View>
  );
}
