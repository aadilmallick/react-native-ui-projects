import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import React, { useEffect } from "react";
import * as FileSystem from "expo-file-system";
import {
  Layout,
  NativeButton,
  Typography,
} from "../../../components/StyleComponents";
import { Image } from "expo-image";
import {
  dummyMessages,
  translateFileData,
  whisperAPICall,
} from "../../../constants/ai";
import { cn } from "../../../constants/tailwindMerge";
import { shadow_styles } from "../../../constants/shadowStyles";
import { Audio } from "expo-av";
import { DarkModeComponent } from "../../../components/DarkModeButton";
import { ChatCompletionMessage } from "openai/resources/chat";
import axios from "axios";
export default function home() {
  const [speaking, setSpeaking] = React.useState(false);
  const [recording, setRecording] = React.useState<Audio.Recording | null>(
    null
  );
  const [sound, setSound] = React.useState<Audio.Sound | null>(null);
  const [userMessage, setUserMessage] = React.useState("");
  const [messages, setMessages] = React.useState<ChatCompletionMessage[]>([]);
  const scrollViewRef = React.useRef<ScrollView>(null);
  const [loading, setLoading] = React.useState(false);

  // sound.
  // TODO: get sound status and play with it

  async function startRecording() {
    try {
      console.log("Requesting permissions..");
      const res = await Audio.requestPermissionsAsync();
      if (res.granted === false) {
        ToastAndroid.show(
          "Permission to record not granted",
          ToastAndroid.SHORT
        );
        return;
      }
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      console.log("Starting recording..");

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY,
        (status) => {},
        300
      );
      setRecording(recording);
      console.log("Recording started");
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }

  async function stopRecording() {
    console.log("Stopping recording..");
    if (!recording) return;

    const recordingStatus = await recording.getStatusAsync();

    const recordingDuration = recordingStatus.durationMillis;
    await recording.stopAndUnloadAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
    });
    setRecording(null);

    // if recording duration is less than 3 seconds, don't load sound
    if (recordingDuration < 3000) {
      ToastAndroid.show(
        "Recording is too short - deleting it",
        ToastAndroid.SHORT
      );
      return;
    }
    // if recording duration is longer than 30 seconds, don't load sound
    if (recordingDuration > 30000) {
      ToastAndroid.show(
        "Recording is too long - deleting it",
        ToastAndroid.SHORT
      );
      return;
    }
    const uri = recording.getURI();
    // setUri(uri);
    loadSound(uri!);
    console.log("Recording stopped and stored at", uri);
    return uri;
  }

  async function loadSound(uri: string) {
    console.log("Loading Sound");
    const { sound, status } = await Audio.Sound.createAsync(
      {
        uri,
      },
      {
        isMuted: false, // default false
        volume: 1, // 0-1 inclusive, float
        isLooping: false, // default false
      }
    );
    setSound(sound);

    // await sound.playAsync();
  }

  async function playSound() {
    if (!sound) {
      console.error("Trying to play a null sound");
      return;
    }
    if (sound) {
      console.log("Playing Sound");
      const status = await sound.getStatusAsync();
      console.log(status);
      await sound.playAsync();
      // await sound.unloadAsync();
    }
  }

  useEffect(() => {
    return () => {
      sound?.unloadAsync();
    };
  }, []);

  async function convertBase64StringToM4aFile(base64string: string) {
    const blob = await fetch(base64string).then((r) => r.blob());
    const file = new File([blob], "audio.m4a", {
      type: "audio/m4a",
    });
    return file;
  }

  async function saveRecordingAsM4a(uri: string) {
    try {
      const recordingName = "myRecording.m4a"; // Customize the file name as needed
      const fileUri = `${FileSystem.documentDirectory}${recordingName}`;

      await FileSystem.moveAsync({
        from: uri,
        to: fileUri,
      });

      console.log(`Recording saved at: ${fileUri}`);
      return fileUri;
    } catch (error) {
      console.error("Failed to save recording as m4a", error);
    }
  }

  async function convertUriToBase64String(uri: string) {
    const append = "data:audio/m4a;base64";
    const base64String = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    return `${append},${base64String}`;
  }

  async function createBlob(uri: string) {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });
    return blob as Blob;
  }

  const onMicPress = async () => {
    if (recording) {
      // stop recording, change mic image
      const uri = await stopRecording();
      if (!uri) {
        console.error("uri is null");
        return;
      }
      // const blob = await createBlob(uri);
      // await whisperAPICall(blob);
      // console.log("hello");

      // TODO: you have to explain this server

      // TODO: explain this base64 function
      // console.log(base64String);
      // TODO: explain this info function
      // const fileInfo = await FileSystem.getInfoAsync(uri);

      // convert sound to mp3 blob data
      // send API request to openAI whisper, transcribe to text
      // send text to chat Completions API
      // when message is added, reflect in state and use scrollViewRef to scroll to bottom
      // TODO: solve edge case where what to do if user has been speaking for over 20 seconds

      return;
    }
    if (!recording) {
      // start recording, change mic image
      await startRecording();
    }
  };

  const convertUriToBlob = async (uri: string) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    return blob;
  };

  function getMicImage() {
    if (recording && !loading) {
      return require("../../../assets/my-images/voiceLoading.gif");
    }
    if (loading) {
      return require("../../../assets/my-images/loading.gif");
    } else {
      return require("../../../assets/my-images/recordingIcon.png");
    }
  }

  return (
    <Layout.Container className="relative">
      <View className="flex-row items-center justify-between mb-4">
        <TouchableOpacity
          className="bg-black px-4 py-2 rounded-full"
          onPress={playSound}
        >
          <Text className="text-white font-semibold text-base">Clear</Text>
        </TouchableOpacity>
        <View>
          <Image
            source={require("../../../assets/my-images/bot.png")}
            className="w-32 aspect-square"
            contentFit="cover"
            style={{
              transform: [{ translateX: -12 }],
            }}
          />
        </View>
        <DarkModeComponent />
      </View>
      {sound && (
        <TouchableOpacity onPress={playSound}>
          <Text>Play recording</Text>
        </TouchableOpacity>
      )}
      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          paddingBottom: 50,
          rowGap: 16,
          paddingHorizontal: 16,
        }}
        ref={scrollViewRef}
      >
        {dummyMessages.map((message, index) => (
          <Message key={index} message={message as ChatCompletionMessage} />
        ))}
      </ScrollView>
      <View
        className="absolute left-0 bottom-0 w-screen flex flex-row items-center bg-white p-2  z-10    "
        style={{
          ...shadow_styles.shadow_md,
        }}
      >
        <TextInput
          className={cn(
            "flex-1 bg-neutral-200 p-4 ",
            userMessage.length > 40 ? "rounded-sm" : "rounded-full"
          )}
          multiline
          placeholder="Let's chat..."
        />
        <TouchableOpacity onPress={onMicPress}>
          <Image
            source={getMicImage()}
            className="w-20 aspect-square"
            contentFit="contain"
          />
        </TouchableOpacity>
      </View>
    </Layout.Container>
  );
}

interface MessageProps {
  message: ChatCompletionMessage;
}
const Message = ({ message }: MessageProps) => {
  return (
    <View
      className={cn(
        "p-2 rounded-xl w-3/5",
        message.role === "user" && "bg-neutral-100 self-end rounded-tr-none",
        message.role === "assistant" &&
          "bg-green-400 self-start rounded-tl-none "
      )}
      style={{
        ...shadow_styles.shadow_md,
      }}
    >
      <Text className={cn(message.role === "assistant" && "text-white")}>
        {message.content}
      </Text>
    </View>
  );
};
