import React, { useState } from "react";
import { useTaskStore } from "./taskStore";
import { validateTaskUpdate } from "@/types";

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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-20">
      <div className="bg-[#2a2b3d] rounded-lg p-4 w-full max-w-lg">
        <h3 className="text-[#e2e8f0] text-lg font-medium mb-4">
          Edit Description
        </h3>
        <div className="relative">
          <textarea
            value={editingDescription}
            onChange={handleDescriptionChange}
            className={`w-full bg-[#1a1b2e] text-[#e2e8f0] 
              border ${error ? "border-red-500" : "border-[#4a5568]"} 
              rounded-lg p-2 mb-4 h-32 resize-none 
              focus:outline-none focus:ring-2 
              ${error ? "focus:ring-red-500" : "focus:ring-[#6366f1]"}`}
          />
          {error && (
            <span className="text-red-500 text-xs absolute bottom-6 left-2">
              {error}
            </span>
          )}
        </div>
        <div className="flex justify-end gap-2">
          <button
            onClick={() => {
              setIsEditingDescription(false);
              setError(null);
            }}
            className="px-4 py-2 text-[#e2e8f0] hover:bg-[#4a5568] rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSaveDescription}
            className="px-4 py-2 bg-[#6366f1] text-white rounded-lg hover:bg-[#4f46e5] transition-colors"
            disabled={!!error}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
