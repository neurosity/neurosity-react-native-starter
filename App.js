import React, { useEffect } from "react";
import { StatusBar } from "react-native";
import SplashScreen from "react-native-splash-screen";

import { ProvideNotion } from "./services/useNotion";
import { ProvideBrainwaves } from "./services/brainwaves";
import { Navigation } from "./navigation/Navigation";

export function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <ProvideNotion>
      <ProvideBrainwaves>
        <StatusBar barStyle="dark-content" />
        <Navigation />
      </ProvideBrainwaves>
    </ProvideNotion>
  );
}
