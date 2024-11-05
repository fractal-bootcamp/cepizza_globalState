import { create } from "zustand";
import {
  TaskStore,
  taskSchema,
  createTask,
  validateTaskUpdate,
  TaskStatus,
} from "../types";
import { DraggableLocation } from "react-beautiful-dnd";

// stores/taskStore.ts
export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: [],
  taskTitle: "",
  taskDescription: "",
  selectedTaskId: null,
  isEditingDescription: false,
  editingDescription: "",

  setTaskTitle: (title) => set({ taskTitle: title }),
  setTaskDescription: (description) => set({ taskDescription: description }),

  addTask: (title, description) => {
    try {
      const newTask = createTask(title, description);
      set((state) => ({
        tasks: [...state.tasks, newTask],
        taskTitle: "",
        taskDescription: "",
      }));
    } catch (error) {
      console.error("Failed to create task:", error);
    }
  },

  updateTaskStatus: (id, status) => {
    try {
      const validUpdate = validateTaskUpdate({ status });
      set((state) => ({
        tasks: state.tasks.map((task) =>
          task.id === id ? { ...task, ...validUpdate } : task
        ),
      }));
    } catch (error) {
      console.error("Failed to update task status:", error);
    }
  },

  setSelectedTask: (taskId) => set({ selectedTaskId: taskId }),
  setIsEditingDescription: (isEditing) =>
    set({ isEditingDescription: isEditing }),
  setEditingDescription: (description) =>
    set({ editingDescription: description }),

  updateTaskDescription: (id, description) => {
    try {
      const validUpdate = validateTaskUpdate({ description });
      set((state) => ({
        tasks: state.tasks.map((task) =>
          task.id === id ? { ...task, ...validUpdate } : task
        ),
      }));
    } catch (error) {
      console.error("Failed to update task description:", error);
    }
  },

  deleteTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
      //   selectedTaskId: null,
    })),

  reorderTasks: (source, destination) => {
    set((state) => {
      const tasks = [...state.tasks];
      const [removed] = tasks.splice(source.index, 1);
      tasks.splice(destination.index, 0, removed);
      return { ...state, tasks };
    });
  },

  getTodoTasks: () => get().tasks.filter((task) => task.status === "todo"),
  getInProgressTasks: () =>
    get().tasks.filter((task) => task.status === "in-progress"),
  getCompletedTasks: () =>
    get().tasks.filter((task) => task.status === "completed"),
}));
