import { User } from "../types";
import { loadData, saveData } from "./storage";

export const login = async (
  email: string,
  password: string
): Promise<User | null> => {
  try {
    const data = await loadData();

    // Simulação simples de login - em produção seria validação real
    if (data.user && data.user.email === email) {
      return data.user;
    }

    return null;
  } catch (error) {
    console.error("Error logging in:", error);
    return null;
  }
};

export const register = async (
  email: string,
  name: string,
  password: string
): Promise<User> => {
  try {
    const user: User = {
      id: Date.now().toString(),
      email,
      name,
    };

    const data = await loadData();
    data.user = user;
    await saveData(data);

    return user;
  } catch (error) {
    console.error("Error registering:", error);
    throw error;
  }
};

export const logout = async (): Promise<void> => {
  try {
    const data = await loadData();
    data.user = null;
    await saveData(data);
  } catch (error) {
    console.error("Error logging out:", error);
  }
};

export const getCurrentUser = async (): Promise<User | null> => {
  try {
    const data = await loadData();
    return data.user;
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
};
