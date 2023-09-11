import { View, Text } from "react-native";
import React from "react";
import { Redirect } from "expo-router";
import { useNavigation, useRootNavigation } from "expo-router";
import { LoadingScreen } from "../components/StyleComponents";

export default function index() {
  const navigation = useRootNavigation();
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    if (!navigation?.isReady) return;

    setReady(true);
  }, [navigation?.isReady]);

  if (ready) return <Redirect href="/lottie-app" />;

  return <LoadingScreen />;
}
