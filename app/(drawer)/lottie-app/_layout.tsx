import React, { useEffect } from "react";
import { Stack } from "expo-router";
import { useDarkModeContext } from "../../../context/DarkModeContext";
import AsyncStorageGenerator from "../../../constants/AsyncStorageGenerator";
import { LoadingScreen } from "../../../components/StyleComponents";

const onboardingStore = new AsyncStorageGenerator("onboarding");
export default function Layout() {
  const { isDarkMode } = useDarkModeContext();

  return (
    <Stack
      screenOptions={{
        statusBarStyle: !isDarkMode ? "dark" : "light",
        statusBarTranslucent: true,
        headerShown: false,
      }}
    >
      {/* Huge find: the first screen is rendered by default when navigating to the parent route */}
      <Stack.Screen name="onboarding" />
      <Stack.Screen name="home" />
    </Stack>
  );
}

/* 
Navigating to /some-route navigates to the layout of that route, which then renders screens based on the 
order in which they are defined.

*/
