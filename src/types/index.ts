// define shape of task
import { ReactNode } from "react";
import { DraggableLocation } from "react-beautiful-dnd";

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  createdAt: Date;
}

export type TaskStatus = "todo" | "in-progress" | "completed";

export interface TaskColumnProps {
  id: string;
  tasks: Task[];
  title: string;
  icon: ReactNode;
}

// types/index.ts
export interface TaskStore {
  tasks: Task[];
  taskTitle: string;
  taskDescription: string;
  selectedTaskId: string | null;
  isEditingDescription: boolean;
  editingDescription: string;
  reorderTasks: (
    source: DraggableLocation,
    destination: DraggableLocation
  ) => void;

  // Actions
  setTaskTitle: (title: string) => void;
  setTaskDescription: (description: string) => void;
  setSelectedTask: (taskId: string | null) => void;
  setIsEditingDescription: (isEditing: boolean) => void;
  setEditingDescription: (description: string) => void;
  addTask: (title: string, description: string) => void;
  updateTaskStatus: (id: string, status: TaskStatus) => void;
  updateTaskDescription: (id: string, description: string) => void;
  deleteTask: (id: string) => void;

  // Selectors
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
