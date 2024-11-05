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
          placeholder="Task name..."
          className="flex-1 bg-[#2a2b3d] text-[#e2e8f0] placeholder-[#6b7280] border border-[#4a5568] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#6366f1]"
        />
        <textarea
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
          placeholder="Task description..."
          className="bg-[#2a2b3d] text-[#e2e8f0] placeholder-[#6b7280] border border-[#4a5568] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#6366f1] resize-none h-20"
        />
        <button
          type="submit"
          disabled={!taskTitle.trim()}
          className="bg-[#6366f1] text-white px-6 py-2 rounded-lg hover:bg-[#4f46e5] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Add Task
        </button>
      </div>
    </form>
  );
};
