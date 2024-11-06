import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import {
  TaskStore,
  taskSchema,
  createTask,
  validateTaskUpdate,
  TaskStatus,
} from "../types";
import { boolean } from "zod";

// stores/taskStore.ts
export const useTaskStore = create<TaskStore>()(
  persist(
    (set, get) => ({
      tasks: [],
      taskTitle: "",
      taskDescription: "",
      selectedTaskId: null,
      isEditingDescription: false,
      editingDescription: "",

      isModalOpen: false,
      setIsModalOpen: (isOpen) => set({ isModalOpen: isOpen }),

      // state mutators (actions)
      setTaskTitle: (title) => set({ taskTitle: title }),
      setTaskDescription: (description) =>
        set({ taskDescription: description }),

      addTask: (title, description) => {
        const newTask = createTask(title, description);
        set((state) => ({
          tasks: [...state.tasks, newTask],
          taskTitle: "",
          taskDescription: "",
        }));
      },

      updateTaskStatus: (id, status) => {
        const validUpdate = validateTaskUpdate({ status });
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, ...validUpdate } : task
          ),
        }));
      },

      setSelectedTask: (taskId) => set({ selectedTaskId: taskId }),
      setIsEditingDescription: (isEditing) =>
        set({ isEditingDescription: isEditing }),
      setEditingDescription: (description) =>
        set({ editingDescription: description }),

      updateTaskDescription: (id, description) => {
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, description } : task
          ),
        }));
      },

      deleteTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
          //   selectedTaskId: null,
        })),

      reorderTasks: (source, destination) => {
        set((state) => {
          const tasks = [...state.tasks]; // copy current task
          const [removed] = tasks.splice(source.index, 1); // remove from source
          tasks.splice(destination.index, 0, removed); // insert at destination
          return { ...state, tasks }; // update the state
        });
      },

      getTodoTasks: () => get().tasks.filter((task) => task.status === "todo"),
      getInProgressTasks: () =>
        get().tasks.filter((task) => task.status === "in-progress"),
      getCompletedTasks: () =>
        get().tasks.filter((task) => task.status === "completed"),
    }),
    {
      name: `task-store`,
      storage: createJSONStorage(() => localStorage),
    }
  )
);
