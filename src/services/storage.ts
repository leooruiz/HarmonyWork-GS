import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppData, User, Task, FocusSession } from "../types";

const STORAGE_KEY = "@HarmonyWork:data";

const defaultData: AppData = {
  user: null,
  tasks: [],
  focusSessions: [],
};

export const loadData = async (): Promise<AppData> => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : defaultData;
  } catch (error) {
    console.error("Error loading data:", error);
    return defaultData;
  }
};

export const saveData = async (data: AppData): Promise<void> => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error("Error saving data:", error);
  }
};

export const clearData = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("Error clearing data:", error);
  }
};
