import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import { useLocalSearchParams, useGlobalSearchParams } from "expo-router";
import { Image } from "expo-image";
import { destinationData } from "../../../constants/data";
import { IconButton, Typography } from "../../../components/StyleComponents";

export default function destinations() {
  const params = useLocalSearchParams<{
    description: string;
    title: string;
  }>();

  const findDestinationBasedOnTitle = (title: string) => {
    return destinationData.find((destination) => destination.title === title);
  };

  const destination = findDestinationBasedOnTitle(params.title);

  if (!destination) {
    return null;
  }

  return (
    <SafeAreaView className="flex-1 relative">
      <Image
        source={destination.image}
        className="w-full flex-[0.6]"
        contentFit="cover"
      />
      <IconButton
        name="arrow-left"
        onPress={() => {}}
        className="bg-white/70 p-2 rounded-full absolute top-6 left-4"
        color="white"
      />

      {/* cool thingy where curve down: add negative margin, top border radius */}
      <View className="bg-white -mt-24 rounded-t-3xl flex-[0.4]">
        <ScrollView className="space-y-5 p-4">
          <Typography.H2>{destination.title}</Typography.H2>
          <Typography.Body>{destination.longDescription}</Typography.Body>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
