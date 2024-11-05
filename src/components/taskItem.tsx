// components/TaskItem.tsx
import React, { useState } from "react";
import { Task, TaskStatus } from "../types";
import { useTaskStore } from "./taskStore";
import { TaskDescription } from "./TaskDescription";
import { MdOutlinePlaylistAdd, MdOutlineDoneAll } from "react-icons/md";
import { RiTimeLine } from "react-icons/ri";
import { Draggable } from "react-beautiful-dnd";

interface TaskItemProps {
  task: Task;
  index: number;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { updateTaskStatus, selectedTaskId, setSelectedTask } = useTaskStore();

  const handleDescriptionToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  const statusOptions = [
    {
      value: "todo",
      label: "Todo",
      icon: <MdOutlinePlaylistAdd className="w-5 h-5 text-red-500" />,
    },
    {
      value: "in-progress",
      label: "In Progress",
      icon: <RiTimeLine className="w-5 h-5 text-yellow-500" />,
    },
    {
      value: "completed",
      label: "Completed",
      icon: <MdOutlineDoneAll className="w-5 h-5 text-green-500" />,
    },
  ];

  const currentStatus = statusOptions.find(
    (option) => option.value === task.status
  );

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
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
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between gap-4">
              <span className="text-[#e2e8f0] font-medium">{task.title}</span>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <select
                    value={task.status}
                    onChange={(e) =>
                      updateTaskStatus(task.id, e.target.value as TaskStatus)
                    }
                    onClick={(e) => e.stopPropagation()}
                    className="bg-[#1a1b2e] text-[#e2e8f0] border border-[#4a5568] rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#6366f1] appearance-none pl-9"
                  >
                    {statusOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <div className="absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none">
                    {currentStatus?.icon}
                  </div>
                </div>
                <TaskDescription
                  description={task.description}
                  isExpanded={isExpanded}
                  onToggle={handleDescriptionToggle}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};
