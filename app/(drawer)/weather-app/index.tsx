import { View, Text, ImageBackground, TextInput } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { IconButton } from "../../../components/StyleComponents";
import { cn } from "../../../constants/tailwindMerge";
import * as Animatable from "react-native-animatable";

export default function index() {
  const [showSearch, setShowSearch] = React.useState(true);
  const animatedViewRef = React.useRef<Animatable.View & View>(null);
  console.log(showSearch);
  return (
    <>
      <ImageBackground
        className="flex-1 p-4 pt-[24]"
        source={require("../../../assets/my-images/bg.png")}
        resizeMode="cover"
        blurRadius={70}
      >
        <View
          className={cn(
            "flex-row  items-center justify-between rounded-full py-1 pl-4 pr-1",
            showSearch && "bg-white/10"
          )}
        >
          {showSearch && (
            <TextInput
              className="flex-1"
              placeholder="search city"
              placeholderTextColor={"rgba(255, 255, 255, 0.7)"}
            />
          )}
          <Animatable.View
            className={cn(!showSearch && "flex-1 justify-end items-end")}
            ref={animatedViewRef}
          >
            <IconButton
              name="search"
              onPress={async () => {
                setShowSearch(!showSearch);
                // animatedViewRef.current?.anim
                // animatedViewRef.current?.
                // if (animatedViewRef.current) {
                //   await animatedViewRef.current.bounce(2000);
                // }
              }}
              className={"bg-white/20 p-3 rounded-full"}
              color="rgba(255, 255, 255, 0.7)"
            />
          </Animatable.View>
        </View>
      </ImageBackground>
    </>
  );
}
