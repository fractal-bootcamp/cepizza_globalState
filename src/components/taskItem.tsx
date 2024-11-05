// TaskItem.tsx
import React, { useState } from "react";
import { Task, TaskStatus } from "../types";
import { useTaskStore } from "./taskStore";
import { TaskDescription } from "./TaskDescription";
import { MdOutlinePlaylistAdd, MdOutlineDoneAll } from "react-icons/md";
import { RiTimeLine } from "react-icons/ri";
import { Draggable } from "react-beautiful-dnd";
import { validateTaskUpdate } from "@/types";

interface TaskItemProps {
  task: Task;
  index: number;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const { updateTaskStatus, selectedTaskId, setSelectedTask } = useTaskStore();

  const handleDescriptionToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  const statusOptions = [
    {
      value: "todo",
      label: "Todo",
      icon: <MdOutlinePlaylistAdd className="w-6 h-6 text-[#FF6B6B]" />,
    },
    {
      value: "in-progress",
      label: "In Progress",
      icon: <RiTimeLine className="w-6 h-6 text-[#FFD700]" />,
    },
    {
      value: "completed",
      label: "Completed",
      icon: <MdOutlineDoneAll className="w-6 h-6 text-[#77DD77]" />,
    },
  ];

  const currentStatus = statusOptions.find(
    (option) => option.value === task.status
  );

  //handler function
  const handleStatusUpdate = (newStatus: TaskStatus) => {
    try {
      // Validate the status update
      const validUpdate = validateTaskUpdate({
        status: newStatus,
      }) as { status: TaskStatus };

      // If validation passes, update the status
      updateTaskStatus(task.id, validUpdate.status);
      setShowStatusDropdown(false);
    } catch (error) {
      console.error("Invalid status update:", error);
      // Optionally add error feedback to UI
    }
  };

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onClick={() =>
            setSelectedTask(selectedTaskId === task.id ? null : task.id)
          }
          className={`
            bg-white/90
            border-2 
            border-[#ADD6FF]
            rounded-[15px]
            p-4 
            shadow-lg
            hover:shadow-xl
            transition-all
            duration-200
            cursor-pointer
            font-['Press_Start_2P']
            text-sm
            ${snapshot.isDragging ? "scale-105 rotate-2" : ""}
            ${selectedTaskId === task.id ? "ring-4 ring-[#FFD700]" : ""}
          `}
        >
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between gap-4">
              <span className="text-[#4A6FA5] font-['Press_Start_2P'] text-xs">
                {task.title}
              </span>
              <div className="flex items-center gap-2">
                {/* Status Icon Dropdown */}
                <div className="relative">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowStatusDropdown(!showStatusDropdown);
                    }}
                    className="p-2 hover:bg-white/50 rounded-full transition-colors"
                  >
                    {currentStatus?.icon}
                  </button>
                  {showStatusDropdown && (
                    <div className="absolute right-0 mt-2 bg-white/90 rounded-lg shadow-lg py-2 z-50 border-2 border-[#ADD6FF]">
                      {statusOptions.map((option) => (
                        <button
                          key={option.value}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleStatusUpdate(option.value as TaskStatus); // Use new handler here
                          }}
                          className="w-full px-4 py-2 hover:bg-white/50 flex justify-center items-center transition-colors"
                        >
                          {option.icon}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                {/* Description Toggle */}
                <TaskDescription
                  description={task.description}
                  isExpanded={isExpanded}
                  onToggle={handleDescriptionToggle}
                />
              </div>
            </div>
            {/* Description Content */}
            {task.description && isExpanded && (
              <p className="text-[#4A6FA5]/80 font-['Press_Start_2P'] text-xs mt-2 leading-relaxed">
                {task.description}
              </p>
            )}
          </div>
        </div>
      )}
    </Draggable>
  );
};
