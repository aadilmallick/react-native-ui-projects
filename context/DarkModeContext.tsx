import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useColorScheme } from "nativewind";
// * If using RNEUI
import { useThemeMode } from "@rneui/themed";

type ColorScheme = "light" | "dark";

interface IDarkModeContext {
  isDarkMode: boolean;
  toggleMode: () => void;
  modeLoading: boolean;
}

export const DarkModeContext = createContext<IDarkModeContext | null>(null);

export const useDarkModeContext = () => {
  const context = useContext(DarkModeContext);
  if (!context) {
    throw new Error(
      "useDarkModeContext has to be used within <DarkModeContext.Provider>"
    );
  }
  return context;
};

export const DarkModeProvider = ({
  children,
  withRNEUI = false,
}: {
  children: ReactNode;
  withRNEUI?: boolean;
}) => {
  const { colorScheme, setColorScheme, toggleColorScheme } = useColorScheme();
  const { setMode } = useThemeMode();
  const [isDarkMode, setIsDarkMode] = useState<boolean>(colorScheme === "dark");
  const [modeLoading, setModeLoading] = useState<boolean>(false);

  const toggleMode = async () => {
    setModeLoading(true);

    // * for nativewind
    toggleColorScheme();

    // * for internal state
    await AsyncStorage.setItem("colorScheme", isDarkMode ? "light" : "dark");
    setIsDarkMode((prev) => !prev);

    // * If using RNEUI
    withRNEUI && setMode(isDarkMode ? "light" : "dark");

    setModeLoading(false);
  };

  useEffect(() => {
    async function fetchStore() {
      const stored = await AsyncStorage.getItem("colorScheme");
      if (stored) {
        setColorScheme(stored as ColorScheme);
        setIsDarkMode(stored === "dark");
        // ? If using RNEUI
        withRNEUI && setMode(stored === "dark" ? "dark" : "light");
      }
    }
    setModeLoading(true);
    fetchStore().then(() => setModeLoading(false));
  }, []);

  return (
    <DarkModeContext.Provider
      value={{
        isDarkMode,
        toggleMode,
        modeLoading,
      }}
    >
      {children}
    </DarkModeContext.Provider>
  );
};
