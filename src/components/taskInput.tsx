import React, { useState } from "react";
import { useTaskStore } from "./taskStore";

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTask(taskTitle, taskDescription);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="flex flex-col gap-3">
        <div className="relative">
          <input
            type="text"
            value={taskTitle}
            onChange={(e) => {
              setTaskTitle(e.target.value);
              if (errors.title) {
                setErrors((prev) => ({ ...prev, title: undefined }));
              }
            }}
            placeholder="name..."
            className="w-full bg-white/90 text-[#4A6FA5] placeholder-[#4A6FA5]/60 
              border-4 border-[#ADD6FF] rounded-[20px] px-6 py-3
              focus:outline-none focus:ring-2 focus:ring-[#7FB2F0]
              shadow-lg font-['Press_Start_2P'] text-sm
              transition-all duration-200 hover:shadow-xl"
          />
          {errors.title && (
            <span className="text-red-500 font-['Press_Start_2P'] text-xs mt-1 absolute -bottom-5 left-6">
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
            className="w-full bg-white/90 text-[#4A6FA5] placeholder-[#4A6FA5]/60 
              border-4 border-[#ADD6FF] rounded-[20px] px-6 py-3
              focus:outline-none focus:ring-2 focus:ring-[#7FB2F0]
              shadow-lg resize-none h-24 font-['Press_Start_2P'] text-sm
              transition-all duration-200 hover:shadow-xl"
          />
          {errors.description && (
            <span className="text-red-500 font-['Press_Start_2P'] text-xs mt-1 absolute -bottom-5 left-6">
              {errors.description}
            </span>
          )}
        </div>

        <button
          type="submit"
          disabled={!taskTitle.trim()}
          className="bg-gradient-to-r from-[#7FB2F0] to-[#ADD6FF] text-white 
            font-['Press_Start_2P'] px-6 py-3 rounded-[20px] 
            shadow-lg hover:shadow-xl disabled:opacity-50 
            disabled:cursor-not-allowed transform hover:scale-102
            transition-all duration-200 border-4 border-white/80"
        >
          Add Task
        </button>
      </div>
    </form>
  );
};
