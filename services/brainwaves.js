import React, { createContext, useContext, useState } from "react";
import { useCallback, useMemo } from "react";
import { of } from "rxjs";
import { map, switchMap, share, tap } from "rxjs/operators";
import { useObservable, useObservableState } from "observable-hooks";
import { fft, powerByBand } from "@neurosity/pipes";

import { notion } from "./notion";
import { useNotion } from "./useNotion";
import {
  averageChannels,
  relativeBandPower,
  windowBufferPowerByBand,
  createBufferOf
} from "./pipes";

export const METRIC_STATUS = {
  PAUSED: "paused",
  STREAMING: "streaming",
  UNABLE_TO_STREAM: "unableToStream"
};

export const BrainwavesContext = createContext();

export const useBrainwaves = () => {
  return useContext(BrainwavesContext);
};

export function ProvideBrainwaves({ children }) {
  const brainwaves = useProvideBrainwaves();

  return (
    <BrainwavesContext.Provider value={brainwaves}>
      {children}
    </BrainwavesContext.Provider>
  );
}

const bufferSize = 75;

const initialBuffer = createBufferOf({ length: bufferSize });

const initialPowerByBand = {
  alpha: initialBuffer,
  beta: initialBuffer,
  theta: initialBuffer,
  delta: initialBuffer,
  gamma: initialBuffer
};

function useProvideBrainwaves() {
  const { status, selectedDevice } = useNotion();
  const [isPaused, setPaused] = useState(true);
  const [startTime, setStartTime] = useState(null);

  const streamingStatus = useMemo(
    () => getStreamingStatus({ selectedDevice, status, isPaused }),
    [selectedDevice, status, isPaused]
  );

  const toggle = useCallback(() => {
    setPaused((isPaused) => !isPaused);
  }, [setPaused]);

  const powerByBand$ = useObservable(
    (input$) =>
      input$.pipe(
        switchMap(([streamingStatus]) => {
          return streamingStatus === METRIC_STATUS.PAUSED
            ? of(initialPowerByBand)
            : notion.brainwaves("raw").pipe(
                tap((epoch) => setStartTime(epoch?.info?.startTime)),
                fft(),
                powerByBand({
                  alpha: [7.5, 12.5],
                  beta: [12.5, 30],
                  theta: [4, 7.5],
                  delta: [0.1, 4],
                  gamma: [30, 45]
                }),
                averageChannels(),
                relativeBandPower(),
                windowBufferPowerByBand({
                  bufferSize
                }),
                map((powerByBand) =>
                  streamingStatus === METRIC_STATUS.STREAMING
                    ? powerByBand
                    : initialPowerByBand
                )
              );
        }),
        share()
      ),
    [streamingStatus]
  );

  const [powerByBandData] = useObservableState(
    () => powerByBand$,
    initialPowerByBand
  );

  return {
    powerByBand: powerByBandData,
    toggle,
    streamingStatus,
    startTime
  };
}

function getStreamingStatus({ selectedDevice, status, isPaused }) {
  const canStream = isNotionAbleToStream(selectedDevice, status);

  if (!canStream) {
    return METRIC_STATUS.UNABLE_TO_STREAM;
  }

  if (isPaused) {
    return METRIC_STATUS.PAUSED;
  }

  return METRIC_STATUS.STREAMING;
}

function isNotionAbleToStream(selectedDevice, status) {
  return (
    selectedDevice &&
    (status?.state === "online" || status?.state === "updating") &&
    !status?.sleepMode
  );
}
