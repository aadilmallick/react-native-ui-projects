import axios, { AxiosError } from "axios";
import { OpenAI } from "openai";

const openAi = new OpenAI({
  apiKey: process.env.EXPO_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export async function whisperAPICall(file: Blob) {
  try {
    const res: any = await axios.post(
      "https://api.openai.com/v1/audio/transcriptions",
      {
        file: file,
        model: "whisper-1",
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.EXPO_PUBLIC_OPENAI_API_KEY}`,
          // "Content-Type": "multipart/form-data",
        },
      }
    );
    return res.text;
  } catch (e) {
    console.error("something went wrong");
    console.log(JSON.stringify(e, null, 2));
  }
}

export async function translateFileData(file: File) {
  try {
    const response = await openAi.audio.transcriptions.create({
      file: file,
      model: "whisper-1",
    });
    return response.text;
  } catch (e) {
    console.error(e);
    // console.log(e.response);
  }
}

export const dummyMessages = [
  {
    role: "user",
    content: "How are you?",
  },
  {
    role: "assistant",
    content: "I'm fine, How may i help you today.",
  },
];
