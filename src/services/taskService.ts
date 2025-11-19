import { Task, TaskPriority, FocusSession } from "../types";
import { loadData, saveData } from "./storage";

export const getTasks = async (): Promise<Task[]> => {
  try {
    const data = await loadData();
    return data.tasks;
  } catch (error) {
    console.error("Error getting tasks:", error);
    return [];
  }
};

export const addTask = async (
  title: string,
  description: string,
  priority: TaskPriority
): Promise<Task> => {
  try {
    const task: Task = {
      id: Date.now().toString(),
      title,
      description,
      priority,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    const data = await loadData();
    data.tasks.push(task);
    await saveData(data);

    return task;
  } catch (error) {
    console.error("Error adding task:", error);
    throw error;
  }
};

export const updateTask = async (
  taskId: string,
  updates: Partial<Task>
): Promise<void> => {
  try {
    const data = await loadData();
    const taskIndex = data.tasks.findIndex((t) => t.id === taskId);

    if (taskIndex !== -1) {
      data.tasks[taskIndex] = { ...data.tasks[taskIndex], ...updates };
      await saveData(data);
    }
  } catch (error) {
    console.error("Error updating task:", error);
    throw error;
  }
};

export const deleteTask = async (taskId: string): Promise<void> => {
  try {
    const data = await loadData();
    data.tasks = data.tasks.filter((t) => t.id !== taskId);
    await saveData(data);
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
};

export const completeTask = async (taskId: string): Promise<void> => {
  try {
    const data = await loadData();
    const taskIndex = data.tasks.findIndex((t) => t.id === taskId);

    if (taskIndex !== -1) {
      data.tasks[taskIndex].status = "completed";
      data.tasks[taskIndex].completedAt = new Date().toISOString();
      await saveData(data);
    }
  } catch (error) {
    console.error("Error completing task:", error);
    throw error;
  }
};

export const getSortedTasks = async (): Promise<Task[]> => {
  try {
    const tasks = await getTasks();
    const priorityOrder = { high: 0, medium: 1, low: 2 };

    return tasks.sort((a, b) => {
      // Primeiro: tarefas pendentes antes de completadas
      if (a.status !== b.status) {
        return a.status === "pending" ? -1 : 1;
      }
      // Segundo: por prioridade
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });
  } catch (error) {
    console.error("Error sorting tasks:", error);
    return [];
  }
};

export const addFocusSession = async (duration: number): Promise<void> => {
  try {
    const session: FocusSession = {
      id: Date.now().toString(),
      duration,
      completedAt: new Date().toISOString(),
    };

    const data = await loadData();
    data.focusSessions.push(session);
    await saveData(data);
  } catch (error) {
    console.error("Error adding focus session:", error);
    throw error;
  }
};

export const getFocusSessions = async (): Promise<FocusSession[]> => {
  try {
    const data = await loadData();
    return data.focusSessions;
  } catch (error) {
    console.error("Error getting focus sessions:", error);
    return [];
  }
};
