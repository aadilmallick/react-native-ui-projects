import React from "react";
import { Stack } from "expo-router";
import { useDarkModeContext } from "../../../context/DarkModeContext";

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
      <Stack.Screen name="home" />
    </Stack>
  );
}
