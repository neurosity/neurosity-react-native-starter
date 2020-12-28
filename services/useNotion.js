import React, { useContext } from "react";
import { useState, useEffect, useCallback } from "react";
import { BehaviorSubject, combineLatest, of, from, pipe } from "rxjs";
import { map, switchMap, tap } from "rxjs/operators";

import { notion, NotionContext } from "./notion";
import {
  saveAuthSession,
  loadAuthSession,
  deleteAuth
} from "./persistence";
import {
  getLastSelectedDeviceId,
  saveLastSelectedDevice
} from "./persistence";
import { STATE_LOADING, STATE_IDLE } from "../constants/index";
import { STATE_SELECTING_DEVICE } from "../constants/index";

const initialState = {
  state: STATE_LOADING,
  user: null,
  devices: null,
  selectedDevice: null,
  status: null
};

const state$ = new BehaviorSubject(initialState);

export const useNotion = () => {
  return useContext(NotionContext);
};

export function ProvideNotion({ children }) {
  const notionProvider = useProvideNotion();

  return (
    <NotionContext.Provider value={notionProvider}>
      {children}
    </NotionContext.Provider>
  );
}

function useProvideNotion() {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    from(loadAuthSession())
      .pipe(
        switchMap(() =>
          notion
            .onAuthStateChanged()
            .pipe(
              saveAuthSession(),
              selectDefaultDevice(),
              switchMapToLatestDeviceState()
            )
        )
      )
      .subscribe((state) => {
        state$.next(state);
      });

    state$.asObservable().subscribe((state) => {
      setState(state);
    });
  }, []);

  const logoutNotion = useCallback(async () => {
    await deleteAuth();
    await notion.logout();
  }, []);

  return {
    ...state,
    logoutNotion
  };
}

function switchMapToLatestDeviceState() {
  return pipe(
    switchMap((user) => {
      return !user
        ? of({ ...initialState, state: STATE_IDLE })
        : notion.onUserDevicesChange().pipe(
            switchMap((devices) => {
              if (!devices.length) {
                return of({
                  state: STATE_IDLE,
                  user,
                  devices,
                  selectedDevice: null,
                  status: null
                });
              }

              return combineLatest([
                notion.onUserDevicesChange(),
                notion.onDeviceChange().pipe(saveLastSelectedDevice()),
                notion.status()
              ]).pipe(
                map(([devices, selectedDevice, status]) => {
                  const state = !selectedDevice
                    ? STATE_SELECTING_DEVICE
                    : STATE_IDLE;
                  return {
                    state,
                    user,
                    devices,
                    selectedDevice,
                    status
                  };
                })
              );
            })
          );
    })
  );
}

function selectDefaultDevice() {
  return pipe(
    tap(async (user) => {
      if (user) {
        const lastSelectedDeviceId = await getLastSelectedDeviceId();
        await notion
          .selectDevice((devices) => {
            const lastSelectedDevice = devices.find(
              (device) => device.deviceId === lastSelectedDeviceId
            );
            const selectedDevice = lastSelectedDevice ?? devices[0];
            return selectedDevice;
          })
          .catch(() => {}); // No device found
      }
    })
  );
}
