import React, { useState } from "react";
import { useTaskStore } from "./taskStore";
import { validateTaskUpdate } from "../types/index.ts";
import { FiEdit2 } from "react-icons/fi";

export const DescriptionModal = () => {
  const {
    isEditingDescription,
    editingDescription,
    setIsEditingDescription,
    setEditingDescription,
    updateTaskDescription,
    selectedTaskId,
  } = useTaskStore();

  const [error, setError] = useState<string | null>(null);

  const handleSaveDescription = () => {
    if (selectedTaskId) {
      try {
        // Validate the description before updating
        const validUpdate = validateTaskUpdate({
          description: editingDescription,
        });

        if (validUpdate.description !== undefined) {
          updateTaskDescription(selectedTaskId, validUpdate.description);
          setIsEditingDescription(false);
          setError(null);
        }
      } catch (error) {
        console.error("Invalid description:", error);
        setError("Description is invalid. Must be less than 500 characters.");
      }
    }
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setEditingDescription(e.target.value);
    // Clear error when user starts typing
    if (error) {
      setError(null);
    }
  };
  if (!isEditingDescription || !selectedTaskId) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-20">
      <div
        className="bg-gradient-to-b from-[#7FB2F0] to-[#ADD6FF] 
        rounded-[30px] p-6 w-full max-w-lg border-4 border-white shadow-2xl
        transform transition-all duration-200"
      >
        <h3
          className="text-white font-['Press_Start_2P'] text-lg mb-4 
          flex items-center gap-2"
        >
          <FiEdit2 className="w-5 h-5" />
          Edit Description
        </h3>
        <div className="relative">
          <textarea
            value={editingDescription}
            onChange={handleDescriptionChange}
            className={`w-full bg-white/90 text-[#4A6FA5] 
              border-4 ${error ? "border-red-400" : "border-white/80"} 
              rounded-[20px] p-4 mb-6 h-32 resize-none 
              focus:outline-none focus:ring-2 shadow-inner
              font-['Press_Start_2P'] text-sm
              ${error ? "focus:ring-red-400" : "focus:ring-white"}`}
          />
          {error && (
            <span
              className="text-white text-xs font-['Press_Start_2P'] 
              absolute -bottom-4 left-2"
            >
              {error}
            </span>
          )}
        </div>
        <div className="flex justify-end gap-3">
          <button
            onClick={() => {
              setIsEditingDescription(false);
              setError(null);
            }}
            className="px-4 py-2 bg-white/20 text-white rounded-[15px] 
              hover:bg-white/30 transition-colors border-2 border-white/80
              font-['Press_Start_2P'] text-sm"
          >
            Cancel
          </button>
          <button
            onClick={handleSaveDescription}
            className="px-4 py-2 bg-white text-[#4A6FA5] rounded-[15px] 
              hover:bg-white/90 transition-colors border-2 border-white/80
              font-['Press_Start_2P'] text-sm shadow-lg hover:shadow-xl"
            disabled={!!error}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
