import React, { useState } from "react";
import { useTaskStore } from "./taskStore";
import { validateTaskUpdate } from "@/types";

// add new tasks
export const TaskInput: React.FC = () => {
  const {
    taskTitle,
    setTaskTitle,
    addTask,
    taskDescription,
    setTaskDescription,
  } = useTaskStore();

  //handle validation errors
  const [errors, setErrors] = useState<{
    title?: string;
    description?: string;
  }>({});

  const validateInput = () => {
    try {
      validateTaskUpdate({
        title: taskTitle,
        description: taskDescription,
      });
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof Error) {
        // parse zod errors and set in state
        const zodError = error as any;
        const newErrors: typeof errors = {};

        zodError.errors?.forEach((err: any) => {
          const field = err.path[0] as keyof typeof errors;
          newErrors[field] = err.message;
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate before submitting
    if (validateInput()) {
      try {
        addTask(taskTitle, taskDescription);
        setTaskTitle("");
        setTaskDescription("");
        setErrors({});
      } catch (error) {
        console.error("Failed to add task:", error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="flex flex-col gap-2">
        <div className="relative">
          <input
            type="text"
            value={taskTitle}
            // allow status change
            onChange={(e) => {
              setTaskTitle(e.target.value);
              // Clear error when user starts typing
              if (errors.title) {
                setErrors((prev) => ({ ...prev, title: undefined }));
              }
            }}
            placeholder="name..."
            className="bg-white/90 text-[#4A6FA5] placeholder-[#4A6FA5]/60 
          border-2 border-[#ADD6FF] rounded-full px-6 py-3
          focus:outline-none focus:ring-2 focus:ring-[#7FB2F0]
          shadow-inner font-['Press_Start_2P'] text-sm"
            style={{ fontFamily: "'Press Start 2P', cursive" }}
          />
          {errors.title && (
            <span className="text-red-500 text-xs mt-1 absolute -bottom-5 left-6">
              {errors.title}
            </span>
          )}
        </div>

        <div className="relative">
          <textarea
            value={taskDescription}
            onChange={(e) => {
              setTaskDescription(e.target.value);
              if (errors.description) {
                setErrors((prev) => ({ ...prev, description: undefined }));
              }
            }}
            placeholder="description..."
            className="bg-white/80 text-[#4A6FA5] placeholder-[#4A6FA5]/60 
          border-2 border-[#ADD6FF] rounded-[20px] px-6 py-3
          focus:outline-none focus:ring-2 focus:ring-[#7FB2F0]
          shadow-inner resize-none h-20 font-['Press_Start_2P'] text-sm"
            style={{ fontFamily: "'Press Start 2P', cursive" }}
          />
          {errors.description && (
            <span className="text-red-500 text-xs mt-1 absolute -bottom-5 left-6">
              {errors.description}
            </span>
          )}
        </div>

        <button
          type="submit"
          disabled={!taskTitle.trim()}
          className="bg-[#FFD700] text-[#4A6FA5] font-bold px-6 py-3 
          rounded-full shadow-md hover:bg-[#FFC000] 
          transition-colors disabled:opacity-50 
          disabled:cursor-not-allowed transform hover:scale-105"
        >
          Add Task
        </button>
      </div>
    </form>
  );
};
