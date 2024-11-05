import { create } from "zustand";
import { TaskStatus, TaskStore } from "../types";
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
  setSelectedTask: (taskId) => set({ selectedTaskId: taskId }),
  setIsEditingDescription: (isEditing) =>
    set({ isEditingDescription: isEditing }),
  setEditingDescription: (description) =>
    set({ editingDescription: description }),

  addTask: (title, description) =>
    set((state) => ({
      tasks: [
        ...state.tasks,
        {
          id: crypto.randomUUID(),
          title,
          description,
          status: "todo" as TaskStatus,
          createdAt: new Date(),
        },
      ],
      taskTitle: "",
      taskDescription: "",
    })),

  updateTaskStatus: (id, status: TaskStatus) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, status } : task
      ),
    })),

  updateTaskDescription: (id, description) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, description } : task
      ),
      isEditingDescription: false,
    })),

  deleteTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
      selectedTaskId: null,
    })),

  getTodoTasks: () => get().tasks.filter((task) => task.status === "todo"),
  getInProgressTasks: () =>
    get().tasks.filter((task) => task.status === "in-progress"),
  getCompletedTasks: () =>
    get().tasks.filter((task) => task.status === "completed"),

  reorderTasks: (source, destination) =>
    set((state) => {
      const tasks = [...state.tasks];
      const sourceStatus = source.droppableId as TaskStatus;
      const destStatus = destination.droppableId as TaskStatus;

      const sourceTasks = tasks.filter((task) => task.status === sourceStatus);
      const [movedTask] = sourceTasks.splice(source.index, 1);

      const updatedTask = { ...movedTask, status: destStatus };
      const destTasks = tasks.filter((task) => task.status === destStatus);
      destTasks.splice(destination.index, 0, updatedTask);

      return {
        tasks: [
          ...tasks.filter(
            (task) => task.status !== sourceStatus && task.status !== destStatus
          ),
          ...destTasks,
        ],
      };
    }),
}));
