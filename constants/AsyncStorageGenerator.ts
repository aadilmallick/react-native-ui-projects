import AsyncStorage from "@react-native-async-storage/async-storage";

export default class AsyncStorageGenerator {
  public constructor(public key: string) {}

  async get() {
    const stored = await AsyncStorage.getItem(this.key);
    if (stored) {
      return JSON.parse(stored);
    }
    return null;
  }

  async set(value: any) {
    if (typeof value === "string") {
      await AsyncStorage.setItem(this.key, value);
      return;
    }
    await AsyncStorage.setItem(this.key, JSON.stringify(value));
  }
}
