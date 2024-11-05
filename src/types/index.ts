// define shape of task
import { ReactNode } from "react";

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  createdAt: Date;
}

export type TaskStatus = "todo" | "in-progress" | "completed";

export interface TaskColumnProps {
  tasks: Task[];
  title: string;
  icon: ReactNode;
}

export interface TaskStore {
  tasks: Task[];
  taskTitle: string;
  selectedTaskId: string | null;

  setTaskTitle: (title: string) => void;
  setSelectedTask: (taskId: string | null) => void;
  addTask: (title: string) => void;
  updateTaskStatus: (id: string, status: TaskStatus) => void;
  deleteTask: (id: string) => void;

  getTodoTasks: () => Task[];
  getInProgressTasks: () => Task[];
  getCompletedTasks: () => Task[];
}

/* The data flow works like this:

1- User interacts with UI (adds/updates/deletes tasks)
2- Component calls store actions
3- Store updates state
4- Components re-render with new data
5- UI updates to reflect changes
*/
