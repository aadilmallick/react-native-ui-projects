import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native";
import React, { useEffect } from "react";
import {
  GradientButton,
  Layout,
  LoadingScreen,
  NativeButton,
} from "../../../components/StyleComponents";
import { MotiView, MotiText, AnimatePresence } from "moti";
import AsyncStorageGenerator from "../../../constants/AsyncStorageGenerator";
import { useRouter } from "expo-router";
import { shadow_styles } from "../../../constants/shadowStyles";
import { Skeleton } from "moti/skeleton";
import { useDarkModeContext } from "../../../context/DarkModeContext";
import {
  Button,
  Tooltip,
  TooltipProps,
  TabView,
  Tab,
  TabProps,
  PricingCard,
  Overlay,
  LinearProgress,
  Divider,
  CheckBox,
  Icon,
  SpeedDial,
  Input,
  SearchBar,
  BottomSheet,
  ListItem,
  Slider,
} from "@rneui/base";
import { useThemeMode } from "@rneui/themed";
import colors from "tailwindcss/colors";
import { SocialIcon } from "@rneui/themed";

const Spacer = ({ height = 8 }) => <View style={{ height }} />;

function SkeletonLoader() {
  const { isDarkMode } = useDarkModeContext();
  const colorMode = isDarkMode ? "dark" : "light";
  return (
    <View>
      <Skeleton colorMode={colorMode} radius="round" height={75} width={75} />
      <Spacer />
      <Skeleton colorMode={colorMode} width={250} />
      <Spacer />
      <Skeleton colorMode={colorMode} width={"100%"} />
      <Spacer />
      <Skeleton colorMode={colorMode} width={"100%"} />
    </View>
  );
}

interface ControlledTooltipProps extends TooltipProps {
  children: React.ReactNode;
}

const ControlledTooltip = ({ children, ...props }: ControlledTooltipProps) => {
  const [open, setOpen] = React.useState(false);
  return (
    <Tooltip
      visible={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      {...props}
    >
      {children}
    </Tooltip>
  );
};

interface TabExampleProps extends TabProps {
  tabItems: string[];
  primaryColor: string;
  secondaryColor?: string;
}

const ModalExample = () => {
  const [visible, setVisible] = React.useState(false);
  return (
    <View>
      <Overlay
        isVisible={visible}
        onBackdropPress={() => setVisible(false)}
        overlayStyle={{
          backgroundColor: "white",
          padding: 32,
        }}
      >
        <Text>Hello from Overlay!</Text>
      </Overlay>
      <Button onPress={() => setVisible(true)}>Open Modal</Button>
    </View>
  );
};

const ProgressExample = () => {
  const [progress, setProgress] = React.useState(0);

  useEffect(() => {
    if (progress >= 1) return;
    setTimeout(() => {
      setProgress((prev) => prev + 0.05);
    }, 100);
  }, [progress]);

  return (
    <View className="p-4 w-full">
      <LinearProgress
        value={progress}
        variant="determinate"
        animation={{
          duration: 200,
        }}
      />
    </View>
  );
};

const CheckBoxExample = () => {
  const [checked, setChecked] = React.useState(false);
  return (
    <View>
      <CheckBox
        checked={checked}
        onPress={() => setChecked((prev) => !prev)}
        title={"check this box"}
        checkedIcon="heart"
        uncheckedIcon="heart-o"
        checkedColor="red"
      />
      <CheckBox
        checked={checked}
        onPress={() => setChecked((prev) => !prev)}
        title={"check this box"}
        size={40}
      />
    </View>
  );
};

const TabExample = ({
  primaryColor,
  tabItems,
  secondaryColor,
}: TabExampleProps) => {
  const [index, setIndex] = React.useState(0);

  // add scrollable prop if three or more tabs
  const obj: Partial<TabProps> = {};
  tabItems.length > 2 && (obj["scrollable"] = true);

  return (
    <>
      <Tab
        value={index}
        onChange={setIndex}
        dense
        indicatorStyle={{
          backgroundColor: primaryColor,
          height: 3,
        }}
        titleStyle={{
          color: primaryColor,
        }}
        {...obj}
      >
        {tabItems.map((item, index) => (
          <Tab.Item
            key={index}
            title={item}
            containerStyle={(active) => ({
              backgroundColor: active ? secondaryColor : undefined,
            })}
            titleStyle={(active) => ({
              color: primaryColor,
            })}
          />
        ))}
      </Tab>
    </>
  );
};

const SpeedDialExample = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <SpeedDial
      isOpen={open}
      icon={{ name: "edit", color: "#fff" }}
      openIcon={{ name: "close", color: "#fff" }}
      onOpen={() => setOpen(!open)}
      onClose={() => setOpen(!open)}
    >
      <SpeedDial.Action
        icon={{ name: "add", color: "#fff" }}
        title="Add"
        onPress={() => console.log("Add Something")}
      />
      <SpeedDial.Action
        icon={{ name: "delete", color: "#fff" }}
        title="Delete"
        onPress={() => console.log("Delete Something")}
      />
    </SpeedDial>
  );
};

const InputExample = () => {
  return (
    <View className="self-stretch">
      <Input
        placeholder="password..."
        secureTextEntry
        inputStyle={{
          backgroundColor: "white",
          paddingHorizontal: 16,
          borderRadius: 8,
        }}
        leftIcon={<Icon name="lock" size={24} color={"gray"} />}
      />
      <Input
        placeholder="INPUT WITH ICON"
        leftIcon={{ type: "font-awesome", name: "chevron-left" }}
      />
    </View>
  );
};

const SearchBarExample = () => {
  const [search, setSearch] = React.useState("");
  return (
    <View className="self-stretch">
      <SearchBar
        placeholder="Type Here..."
        onChangeText={(text) => setSearch(text)}
        value={search}
        lightTheme
        inputContainerStyle={{
          backgroundColor: colors.neutral["100"],
          borderRadius: 8,
        }}
        containerStyle={{
          backgroundColor: colors.neutral["50"],
          borderRadius: 4,
        }}
        onCancel={() => setSearch("")}
        onClear={() => setSearch("")}
        // showLoading
      />
    </View>
  );
};

const BottomSheetExample = () => {
  const [visible, setVisible] = React.useState(false);
  return (
    <>
      <BottomSheet
        isVisible={visible}
        onBackdropPress={() => setVisible(false)}
      >
        <View className="flex-1 justify-center items-center">
          <Text className="text-4xl text-white">Bottom Sheet</Text>
        </View>
      </BottomSheet>
      <Button onPress={() => setVisible(true)}>Open Bottom Sheet</Button>
    </>
  );
};

const ListItemExample = () => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  return (
    <View className="self-stretch">
      <ListItem.Accordion
        content={
          <View className="flex-1 flex-row items-center space-x-2">
            <Icon name="place" size={30} />
            <Text>List Accordion</Text>
          </View>
        }
        isExpanded={isExpanded}
        onPress={() => setIsExpanded((prev) => !prev)}
      >
        <View
          className="bg-gray-50 p-4"
          style={{
            ...shadow_styles.shadow_lg,
          }}
        >
          <Text>List item</Text>
        </View>
      </ListItem.Accordion>
    </View>
  );
};

const SliderExample = () => {
  const [value, setValue] = React.useState(0);
  return (
    <View className="self-stretch">
      <Slider
        value={value}
        onValueChange={setValue}
        minimumValue={0}
        maximumValue={100}
        step={1}
        minimumTrackTintColor={colors.red["500"]}
        thumbStyle={{
          width: 24,
          height: 24,
        }}
      />
    </View>
  );
};

export default function home() {
  const onboardingStore = new AsyncStorageGenerator("onboarding");
  const router = useRouter();
  const [visible, setVisible] = React.useState(false);
  const { toggleMode, modeLoading } = useDarkModeContext();

  if (modeLoading) {
    return <LoadingScreen />;
  }

  return (
    <Layout.Container className="flex-1 border p-1">
      <ScrollView
        className="space-y-4 0"
        contentContainerStyle={{
          //TODO: explain this shit
          flexGrow: 1,
          paddingBottom: 50,
          paddingHorizontal: 16,
        }}
      >
        <View className="justify-center items-center">
          <ControlledTooltip
            popover={<Text>Tooltip info goes here</Text>}
            width={200}
            backgroundColor={colors.teal["400"]}
          >
            <Text className="my-4">Press me</Text>
          </ControlledTooltip>
          <Button
            title={"toggle mode"}
            onPress={() => {
              toggleMode();
            }}
          ></Button>
          <MotiView
            animate={{
              translateX: [10, -10, 10, -10, 0],
            }}
            transition={{
              duration: 500,
              type: "timing",
            }}
          >
            <GradientButton
              className="text-base"
              onPress={() => {
                onboardingStore.set(false);
                router.replace("/lottie-app/onboarding");
              }}
              style={{
                ...shadow_styles.shadow_2xl,
              }}
            >
              Reset
            </GradientButton>
          </MotiView>
          <NativeButton onPress={() => setVisible((prev) => !prev)}>
            Toggle home
          </NativeButton>
          <TabExample
            primaryColor="green"
            tabItems={["Tab 1", "Tab 2"]}
            secondaryColor="white"
          />
          <Button
            title={"bruh moment"}
            icon={{ name: "home", color: "white", size: 30 }}
            iconPosition="right"
            type="solid"
            size="lg"
            containerStyle={{
              alignSelf: "stretch",
              margin: 16,
            }}
          />
          <SocialIcon iconType="font-awesome" type="facebook" loading />
          <SocialIcon
            iconType="font-awesome"
            type="facebook"
            light
            iconSize={18}
            onPress={() => {
              console.log("hello");
            }}
          />
          <PricingCard
            color={colors.teal["400"]}
            title="Free"
            price="$0"
            pricingStyle={{ color: colors.teal["900"] }}
            info={["1 User", "Basic Support", "All Core Features"]}
            button={{ title: " GET STARTED", icon: "flight-takeoff" }}
            onButtonPress={() => {}}
          />
          <ModalExample />
          <Divider
            style={{
              alignSelf: "stretch",
              marginVertical: 16,
            }}
            width={2}
            color="blue"
          />
          <View className="flex flex-row justify-between items-center self-stretch">
            <Text>Bruh bruh</Text>
            <Divider width={2} color="blue" orientation="vertical" />
            <Text>Bruh bruh</Text>
          </View>
          <ProgressExample />
          <CheckBoxExample />
          <Icon
            reverse
            name="ios-american-football"
            type="ionicon"
            color="#517fa4"
          />
          <InputExample />
          <SearchBarExample />
          <ListItemExample />
          <SliderExample />
        </View>
        {/* <SpeedDialExample /> */}
      </ScrollView>
      <BottomSheetExample />
    </Layout.Container>
  );
}
