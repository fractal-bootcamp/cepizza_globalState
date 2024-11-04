export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  createdAt: Date;
}

export type TaskStatus = "todo" | "in-progress" | "completed";

export interface TaskBox {
  // state
  tasks: Task[];
  taskTitle: string;

  // actions
  addTask: (title: string) => void;
  setNewTaskTitle: (title: string) => void;
  updateTaskStatus: (id: string, status: TaskStatus) => void;
  deleteTask: (id: string) => void;

  // selectors
  getTaskByStatus: (status: TaskStatus) => Task[];
}
