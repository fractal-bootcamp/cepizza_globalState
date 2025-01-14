import React from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { validateTaskUpdate } from "../types/index.ts";

interface TaskDescriptionProps {
  description: string;
  isExpanded: boolean;
  onToggle: (e: React.MouseEvent) => void;
}

export const TaskDescription: React.FC<TaskDescriptionProps> = ({
  description,
  isExpanded,
  onToggle,
}) => {
  try {
    // Validate the description
    validateTaskUpdate({ description });
  } catch (error) {
    console.error("Invalid description:", error);
    return null;
  }

  if (!description) return null;

  // toggle down description
  return (
    <>
      <button
        onClick={onToggle}
        className="text-[#e2e8f0] hover:text-[#6366f1] transition-colors"
      >
        {isExpanded ? (
          <FiChevronUp className="w-5 h-5" />
        ) : (
          <FiChevronDown className="w-5 h-5" />
        )}
      </button>
      {isExpanded && (
        <p className="text-[#afa79c] text-sm mt-1">{description}</p>
      )}
    </>
  );
};
