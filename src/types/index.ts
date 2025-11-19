export interface User {
  id: string;
  email: string;
  name: string;
}

export type TaskPriority = "low" | "medium" | "high";
export type TaskStatus = "pending" | "completed";

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: TaskPriority;
  status: TaskStatus;
  createdAt: string;
  completedAt?: string;
}

export interface FocusSession {
  id: string;
  duration: number; // em minutos
  completedAt: string;
}

export interface AppData {
  user: User | null;
  tasks: Task[];
  focusSessions: FocusSession[];
}
