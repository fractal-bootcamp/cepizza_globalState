// TaskItem.tsx
import React, { useState, useRef, useEffect } from "react";
import { Task, TaskStatus } from "../types";
import { useTaskStore } from "./taskStore";
import { MdOutlinePlaylistAdd, MdOutlineDoneAll } from "react-icons/md";
import { RiTimeLine } from "react-icons/ri";

interface TaskItemProps {
  task: Task;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const { updateTaskStatus, selectedTaskId, setSelectedTask } = useTaskStore();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const statusOptions = [
    {
      value: "todo",
      label: "Todo",
      icon: <MdOutlinePlaylistAdd className="w-5 h-5" />,
    },
    {
      value: "in-progress",
      label: "In Progress",
      icon: <RiTimeLine className="w-5 h-5" />,
    },
    {
      value: "completed",
      label: "Completed",
      icon: <MdOutlineDoneAll className="w-5 h-5" />,
    },
  ];

  const currentStatus = statusOptions.find(
    (option) => option.value === task.status
  );

  const handleStatusChange = (status: TaskStatus) => {
    updateTaskStatus(task.id, status);
    setIsOpen(false);
  };

  return (
    <div
      onClick={() =>
        setSelectedTask(selectedTaskId === task.id ? null : task.id)
      }
      className={`
        bg-[#2a2b3d] 
        border 
        border-[#4a5568] 
        rounded-lg 
        p-4 
        shadow-md 
        hover:shadow-lg 
        transition-shadow 
        cursor-pointer
        ${selectedTaskId === task.id ? "ring-2 ring-[#6366f1]" : ""}
      `}
    >
      <div className="flex items-center justify-between gap-4">
        <span className="text-[#e2e8f0] flex-1">{task.title}</span>

        {/* Custom Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(!isOpen);
            }}
            className="bg-[#1a1b2e] text-[#e2e8f0] border border-[#4a5568] rounded-md px-2 sm:px-3 py-1.5 text-sm 
           focus:outline-none focus:ring-2 focus:ring-[#6366f1] flex items-center gap-2 min-w-[100px] sm:min-w-[120px]"
          >
            {currentStatus?.icon}
            <span className="truncate">{currentStatus?.label}</span>
          </button>

          {isOpen && (
            <div
              className="absolute right-0 mt-1 w-full bg-[#2a2b3d] border border-[#4a5568] rounded-md shadow-lg 
                          py-1 z-10"
            >
              {statusOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleStatusChange(option.value as TaskStatus);
                  }}
                  className={`w-full px-3 py-2 text-sm text-[#56667a] flex items-center gap-2 hover:bg-[#1a1b2e]
                            ${
                              task.status === option.value ? "bg-[#1a1b2e]" : ""
                            }`}
                >
                  {option.icon}
                  <span>{option.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
