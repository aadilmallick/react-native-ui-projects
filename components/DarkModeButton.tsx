import { useDarkModeContext } from "../context/DarkModeContext";
import { IconButton } from "./StyleComponents";
import colors from "tailwindcss/colors";

export function DarkModeComponent() {
  const { isDarkMode, toggleMode } = useDarkModeContext();
  const iconName = isDarkMode ? "sun-o" : "moon-o";
  const iconColor = isDarkMode ? colors.orange["500"] : colors.neutral["500"];
  return (
    <IconButton
      name={iconName}
      color={iconColor}
      onPress={() => {
        toggleMode();
      }}
      className="bg-neutral-100 dark:bg-gray-700/80 p-2 rounded-md"
    />
  );
}
