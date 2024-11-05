import React from "react";
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (taskTitle.trim()) {
      addTask(taskTitle, taskDescription);
      setTaskDescription("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="flex flex-col gap-2">
        <input
          type="text"
          value={taskTitle}
          // allow status change
          onChange={(e) => setTaskTitle(e.target.value)}
          placeholder="name..."
          className="bg-white/90 text-[#4A6FA5] placeholder-[#4A6FA5]/60 
          border-2 border-[#ADD6FF] rounded-full px-6 py-3
          focus:outline-none focus:ring-2 focus:ring-[#7FB2F0]
          shadow-inner font-['Press_Start_2P'] text-sm"
          style={{ fontFamily: "'Press Start 2P', cursive" }}
        />
        <textarea
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
          placeholder="description..."
          className="bg-white/80 text-[#4A6FA5] placeholder-[#4A6FA5]/60 
          border-2 border-[#ADD6FF] rounded-[20px] px-6 py-3
          focus:outline-none focus:ring-2 focus:ring-[#7FB2F0]
          shadow-inner resize-none h-20 font-['Press_Start_2P'] text-sm"
          style={{ fontFamily: "'Press Start 2P', cursive" }}
        />
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
