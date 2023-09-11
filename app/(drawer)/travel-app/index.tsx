import { View, Text, SafeAreaView, ImageBackground } from "react-native";
import React from "react";
import {
  CSSLinearGradient,
  GradientButton,
  Layout,
  NativeButton,
  Typography,
} from "../../../components/StyleComponents";
import { Image } from "expo-image";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useRouter } from "expo-router";

export default function index() {
  const router = useRouter();
  return (
    <SafeAreaView className="flex-1">
      <ImageBackground
        source={require("../../../assets/my-images/welcome.png")}
        className="w-full h-full items-center justify-end relative"
        resizeMode="cover"
      >
        <CSSLinearGradient
          cssString="linear-gradient(175deg, rgba(7,4,66,0) 0%, rgba(0,0,0, 0.6) 100%);"
          className="absolute top-0 left-0 w-full h-full justify-end"
        >
          <View className="p-4 pb-8">
            <View className="space-y-1 mb-4">
              <Typography.Display className="text-white">
                Traveling made easy!
              </Typography.Display>
              <Typography.Subtitle>
                Experience the world's best adventure around the world
              </Typography.Subtitle>
            </View>
            <NativeButton
              className="self-center"
              variant="primary"
              onPress={() => router.push("/travel-app/home")}
            >
              Let's go!
            </NativeButton>
          </View>
        </CSSLinearGradient>
      </ImageBackground>
    </SafeAreaView>
  );
}
