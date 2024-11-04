import { create } from "zustand";
import { Task, TaskStatus, TaskBox } from "../types";

export const callTask = create<TaskBox>((set, get) => ({
  // State
  tasks: [],
  taskTitle: "",

  setNewTaskTitle: (title) => set({ taskTitle: title }),

  // Actions
  addTask: (title) =>
    set((state) => ({
      tasks: [
        ...state.tasks,
        {
          id: crypto.randomUUID(),
          title,
          description: "",
          status: "todo" as TaskStatus,
          createdAt: new Date(),
        },
      ],
      //   clear input after adding
      taskTitle: "", //
    })),

  updateTaskStatus: (id, status) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, status } : task
      ),
    })),

  deleteTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    })),

  // Selectors
  getTaskByStatus: (status) =>
    get().tasks.filter((task) => task.status === status),
}));
