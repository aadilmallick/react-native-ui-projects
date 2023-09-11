import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  Theme,
  ThemeProvider,
} from "@react-navigation/native";
import { SplashScreen, Stack, useRouter } from "expo-router";
import { useEffect } from "react";
import {
  useFonts,
  Lato_300Light,
  Lato_400Regular,
  Lato_700Bold,
} from "@expo-google-fonts/lato";
import { Drawer } from "expo-router/drawer";
import {
  DarkModeProvider,
  useDarkModeContext,
} from "../context/DarkModeContext";
import { Slot } from "expo-router/src/exports";
import {
  ThemeProvider as RNEThemeProvider,
  createTheme,
  useTheme,
  useThemeMode,
} from "@rneui/themed";
const theme = createTheme({
  lightColors: {
    primary: "#e7e7e8",
    secondary: "green",
    background: "lightblue",
  },
  darkColors: {
    primary: "#000",
  },
  mode: "light",
});

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    "lato-300": Lato_300Light,
    "lato-400": Lato_400Regular,
    "lato-700": Lato_700Bold,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <RNEThemeProvider theme={theme}>
      <DarkModeProvider withRNEUI={true}>
        <RootLayoutNav />
      </DarkModeProvider>
    </RNEThemeProvider>
  );
}

function RootLayoutNav() {
  const { isDarkMode } = useDarkModeContext();
  const { theme } = useTheme();

  const CustomLightTheme: Theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      ...theme.colors,
    },
    dark: false,
  };

  const CustomDarkTheme: Theme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      ...theme.colors,
    },
    dark: true,
  };

  return (
    <ThemeProvider value={isDarkMode ? CustomDarkTheme : CustomLightTheme}>
      <Slot />
    </ThemeProvider>
  );
}
