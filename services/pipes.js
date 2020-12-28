import { pipe } from "rxjs";
import { map, scan } from "rxjs/operators";
import { average } from "@neurosity/pipes";

export function averageChannels() {
  return pipe(
    map((data) => {
      return Object.entries(data).reduce(
        (acc, [bandName, channels]) => ({
          ...acc,
          [bandName]: average(channels)
        }),
        {}
      );
    })
  );
}

export function relativeBandPower() {
  return pipe(
    map((bands) => {
      let total = Object.values(bands).reduce((acc, power) => {
        return acc + power;
      }, 0);

      return Object.entries(bands).reduce((acc, [bandName, power]) => {
        return { ...acc, [bandName]: ((power / total) * 1).toFixed(2) };
      }, {});
    })
  );
}

export function windowBufferPowerByBand({ bufferSize } = {}) {
  return pipe(
    scan((powerByBandBuffer, powerByBand) => {
      for (const bandName of Object.keys(powerByBand)) {
        powerByBandBuffer[bandName] = [
          ...(
            powerByBandBuffer[bandName] ||
            createBufferOf({ length: bufferSize })
          ).slice(1),
          powerByBand[bandName]
        ];
      }

      return powerByBandBuffer;
    }, {})
  );
}

export const createBufferOf = ({ length, value = 0.1 } = {}) =>
  Array.from({ length }, () => value);
