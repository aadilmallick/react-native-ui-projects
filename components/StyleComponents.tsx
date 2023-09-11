import {
  ActivityIndicator,
  ActivityIndicatorProps,
  SafeAreaView,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import { styled } from "nativewind";
import { LinearGradientProps, LinearGradient } from "expo-linear-gradient";
import { fromCSS } from "@bacons/css-to-expo-linear-gradient";
import { cn } from "../constants/tailwindMerge";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { shadow_styles } from "../constants/shadowStyles";

const Container = styled(SafeAreaView, "flex-1 p-4 pt-[24]");
const Display = styled(
  Text,
  "text-5xl font-bold tracking-tighter text-gray-700 dark:text-gray-50"
);
const H1 = styled(
  Text,
  "text-4xl font-bold tracking-tighter text-gray-700 dark:text-gray-50"
);

const H2 = styled(
  Text,
  "text-2xl font-bold tracking-tighter text-gray-700 dark:text-gray-50"
);
const H3 = styled(
  Text,
  "text-gray-700 text-xl font-bold tracking-tighter dark:text-gray-50"
);

const Body = styled(Text, "text-gray-700 text-base dark:text-gray-50");

const Subtitle = styled(Text, "text-neutral-200 font-medium");

export const Layout = {
  Container,
};

export const Typography = {
  H1,
  H2,
  H3,
  Body,
  Display,
  Subtitle,
};

interface LoadingScreenProps extends ActivityIndicatorProps {}

export const LoadingScreen = ({
  size = "large",
  ...props
}: LoadingScreenProps) => {
  return (
    <SafeAreaView className="flex-1 justify-center items-center">
      <ActivityIndicator size={size} {...props} />
    </SafeAreaView>
  );
};

interface CSSLinearGradientProps extends Partial<LinearGradientProps> {
  cssString?: string;
}

export const CSSLinearGradient = ({
  cssString = "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0,0,0, 0.6) 100%);",
  children,
  ...props
}: CSSLinearGradientProps) => {
  return (
    <LinearGradient {...fromCSS(cssString)} {...props}>
      {children}
    </LinearGradient>
  );
};

interface ButtonProps extends TouchableOpacityProps {
  variant?: "primary" | "primary-outline";
}

export const NativeButton = ({
  children,
  variant,
  className,
  ...props
}: ButtonProps) => {
  const variantColor = (() => {
    switch (variant) {
      case "primary":
        return "bg-orange-500";
      case "primary-outline":
        return "bg-transparent border-2 border-orange-500";
      default:
        return undefined;
    }
  })();
  return (
    <TouchableOpacity
      className={cn(
        "bg-black px-8 py-2 rounded-full dark:bg-gray-700/50",
        variantColor,
        className
      )}
      {...props}
    >
      <Text className="text-white font-bold text-lg text-center ">
        {children}
      </Text>
    </TouchableOpacity>
  );
};

interface GradientButtonProps extends TouchableOpacityProps {
  cssString?: string;
  linearGradientClassName?: string;
}

export const GradientButton = ({
  children,
  cssString = `linear-gradient(-90deg, rgba(58,131, 244, 0.9), rgba(9,181,211, 0.9));`,
  className = "",
  linearGradientClassName = "",
  ...props
}: GradientButtonProps) => {
  return (
    <TouchableOpacity
      className={cn("rounded-full bg-white overflow-hidden", className)}
      {...props}
    >
      <LinearGradient
        {...fromCSS(cssString)}
        className={cn("px-8 py-2", linearGradientClassName)}
      >
        <Text className="text-white font-medium text-xl text-center">
          {children}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

interface IconButtonProps extends TouchableOpacityProps {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  onPress: () => void;
  color?: string;
  size?: number;
}

export function IconButton({
  onPress,
  className = "",
  color = "black",
  name,
  size = 24,
  ...props
}: IconButtonProps) {
  return (
    <TouchableOpacity className={className} onPress={onPress} {...props}>
      <FontAwesome size={size} name={name} color={color} />
    </TouchableOpacity>
  );
}
