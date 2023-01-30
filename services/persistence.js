import { pipe } from "rxjs";
import { tap } from "rxjs/operators";
import { Notion } from "@neurosity/notion";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { notion } from "./notion";

export const LAST_DEVICE_ID_KEY = "@neurosity/deviceId";
export const USER_SESSION_KEY = "@neurosity/userSession";

export function getLastSelectedDeviceId() {
  return AsyncStorage.getItem(LAST_DEVICE_ID_KEY);
}

export function saveLastSelectedDevice() {
  return pipe(
    tap(async (selectedDevice) => {
      if (selectedDevice) {
        await AsyncStorage.setItem(LAST_DEVICE_ID_KEY, selectedDevice.deviceId);
      } else {
        await AsyncStorage.removeItem(LAST_DEVICE_ID_KEY);
      }
    })
  );
}

export function saveAuthSession() {
  return pipe(
    tap(async () => {
      const currentUser = JSON.stringify(notion.__getApp().auth().currentUser);
      await AsyncStorage.setItem(USER_SESSION_KEY, currentUser);
    })
  );
}

export async function loadAuthSession() {
  const userData = JSON.parse(await AsyncStorage.getItem(USER_SESSION_KEY));

  if (userData) {
    const user = Notion.createUser(
      userData,
      userData.stsTokenManager,
      userData
    );

    await notion
      .__getApp()
      .auth()
      .updateCurrentUser(user)
      .catch((error) => {
        console.error(error);
      });

    await new Promise((resolve) => setTimeout(resolve, 500));
  }
}

export async function deleteAuth() {
  await AsyncStorage.removeItem(USER_SESSION_KEY);
}
