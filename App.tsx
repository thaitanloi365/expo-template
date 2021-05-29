import React, { Suspense } from "react";
import { View, LogBox } from "react-native";
import { Provider } from "react-redux";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { store } from "@Store/Store";
import { I18nextProvider } from "react-i18next";
import { I18n } from "@Utils/I18n";
import { AppContainer } from "@Navigation/AppNavigation";
import { enableScreens } from "react-native-screens";
import { useLoadResources } from "@Common/Expo";
import * as SplashScreen from "expo-splash-screen";
import { appActions } from "@Store/AppReducer";

LogBox.ignoreAllLogs();

enableScreens(true);

SplashScreen.preventAutoHideAsync().catch((error) => console.error(error));

export default () => {
  const [loaded] = useLoadResources();

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <I18nextProvider i18n={I18n}>
          <Suspense fallback={<View />}>
            <AppContainer />
          </Suspense>
        </I18nextProvider>
      </Provider>
    </SafeAreaProvider>
  );
};
