import React from "react";
import Drawer from "expo-router/drawer";
import { StatusBar } from "expo-status-bar";

export default function _layout() {
  return (
    <>
      <Drawer
        screenOptions={{
          headerShown: false,
        }}
      >
        <Drawer.Screen name="travel-app" />
        <Drawer.Screen name="weather-app/index" />
        <Drawer.Screen name="chatgpt-app" />
        <Drawer.Screen name="lottie-app" />
      </Drawer>
    </>
  );
}
