import { create } from "zustand";
import { TaskStore } from "../types";

export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: [], //stores all tasks
  taskTitle: "",
  selectedTaskId: null, // tracking selected task

  // actions
  setTaskTitle: (title) => set({ taskTitle: title }),
  setSelectedTask: (taskId: string | null) => set({ selectedTaskId: taskId }),
  addTask: (title) =>
    set((state) => ({
      tasks: [
        ...state.tasks,
        {
          id: crypto.randomUUID(),
          title,
          description: "",
          status: "todo",
          createdAt: new Date(),
        },
      ],
      taskTitle: "",
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
      selectedTaskId: null,
    })),

  // selectors (functions that get filtered data)
  getTodoTasks: () => get().tasks.filter((task) => task.status === "todo"),
  getInProgressTasks: () =>
    get().tasks.filter((task) => task.status === "in-progress"),
  getCompletedTasks: () =>
    get().tasks.filter((task) => task.status === "completed"),
}));
