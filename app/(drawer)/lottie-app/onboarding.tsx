import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import Onboarding from "react-native-onboarding-swiper";
import colors from "tailwindcss/colors";
import LottieView from "lottie-react-native";
import { Redirect, useRouter } from "expo-router";
import AsyncStorageGenerator from "../../../constants/AsyncStorageGenerator";
import { LoadingScreen } from "../../../components/StyleComponents";
const onboardingStore = new AsyncStorageGenerator("onboarding");
export default function OnBoarding() {
  const lottieRef = React.useRef<LottieView>(null);
  const router = useRouter();
  const [isOnboarded, setIsOnboarded] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    async function bruh() {
      const isAlreadyOnboarded = await onboardingStore.get();
      if (isAlreadyOnboarded) {
        setIsOnboarded(true);
      }
      return;
    }

    setIsLoading(true);
    bruh().then(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  // redirect logic
  if (isOnboarded) {
    return <Redirect href="/lottie-app/home" />;
  }

  return (
    <SafeAreaView className="flex-1 relative">
      <Onboarding
        containerStyles={{
          paddingHorizontal: 20,
        }}
        onDone={() => {
          router.replace("/lottie-app/home");
          onboardingStore.set(true);
        }}
        onSkip={() => {
          router.replace("/lottie-app/home");
          onboardingStore.set(true);
        }}
        imageContainerStyles={{
          paddingHorizontal: 20,
          overflow: "visible",
        }}
        pages={[
          {
            backgroundColor: colors.red["400"],
            image: (
              <LottieView
                source={require("../../../assets/lottie-animations/medal-lottie.json")}
                autoPlay
                loop
                ref={lottieRef}
                style={{ width: 200, height: 200 }}
              />
            ),

            title: "Onboarding Process",
            subtitle: "This is a screen of the onboarding process",
          },
        ]}
      />
    </SafeAreaView>
  );
}
