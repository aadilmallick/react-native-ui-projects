import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";
import * as Animatable from "react-native-animatable";
import {
  CSSLinearGradient,
  IconButton,
  Layout,
  Typography,
} from "../../../components/StyleComponents";
import { Image } from "expo-image";
import { DarkModeComponent } from "../../../components/DarkModeButton";
import { cn } from "../../../constants/tailwindMerge";
import { shadow_styles } from "../../../constants/shadowStyles";
import { destinationData } from "../../../constants/data";
import { useNavigation, useRouter } from "expo-router";

const animatedButton = Animatable.createAnimatableComponent(TouchableOpacity);

export default function home() {
  const [activeTab, setActiveTab] = React.useState(0);
  const router = useRouter();
  const navigate = useNavigation();

  const tabs = [
    {
      tabNum: 0,
      tabLabel: "Popular",
    },
    {
      tabNum: 1,
      tabLabel: "New",
    },
    {
      tabNum: 2,
      tabLabel: "Recommended",
    },
    {
      tabNum: 3,
      tabLabel: "All",
    },
  ];

  return (
    <SafeAreaView className="flex-1 pt-[24]">
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="space-y-6 flex-1"
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingVertical: 24,
        }}
      >
        <View className="flex flex-row justify-between items-center">
          <Typography.H1 className="">Let's Explore</Typography.H1>
          {/* <Image
            source={require("../../../assets/my-images/avatar.png")}
            className="w-12 aspect-square rounded-full"
            contentFit="cover"
          /> */}
          <DarkModeComponent />
        </View>
        {/* // * search bar */}
        <Animatable.View className="flex-row items-center gap-x-4 bg-neutral-100 rounded-full p-4 w-[90%] self-center">
          <IconButton name="search" onPress={() => {}} color="gray" />
          <TextInput placeholder="Search Destination" className="flex-1" />
        </Animatable.View>

        {/* //* tabs */}
        <View className="flex-row justify-around items-center bg-neutral-100 rounded-full p-2">
          {tabs.map((tab) => (
            <TouchableOpacity
              onPress={() => setActiveTab(tab.tabNum)}
              key={tab.tabNum}
              className={cn(
                "p-4 rounded-full text-base shadow-2xl",
                activeTab === tab.tabNum && "bg-white "
              )}
            >
              <Text
                className={cn(
                  "font-semibold",
                  activeTab === tab.tabNum && "text-orange-500"
                )}
              >
                {tab.tabLabel}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* // * Destinations */}
        <View className="flex-row justify-between flex-wrap gap-4">
          {destinationData.map((destination) => (
            // for two column layout, set min width to above 40% and use `flex-1` for even width
            // Set height on the container element
            // ON outer container, set border radius. and if you want to set shadow, set bg color and then shadow
            <TouchableOpacity
              className="h-64 flex-1 min-w-[45%] bg-white rounded-3xl"
              style={shadow_styles.shadow_2xl}
              key={destination.title}
              onPress={() => {
                router.push(
                  `/travel-app/destinations?title=${destination.title}`
                );
              }}
            >
              {/* inner container will have overflow hidden, relative positioning, and same border radius, to avoid messing with shadow */}
              <View className="w-full h-full relative rounded-3xl overflow-hidden">
                {/* image that covers entire card */}
                <Image
                  source={destination.image}
                  className="w-full h-full"
                  contentFit="cover"
                />
                {/* absolutely positioned gradient that covers everything */}
                <CSSLinearGradient className="absolute top-0 left-0 w-full h-full justify-end px-2 pb-4 space-y-2">
                  <Text className="text-white font-semibold text-xl tracking-tighter leading-5">
                    {destination.title}
                  </Text>
                  <Text className="text-neutral-200 text-xs leading-3">
                    {destination.shortDescription}
                  </Text>
                </CSSLinearGradient>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
