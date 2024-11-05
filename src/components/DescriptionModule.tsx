import React from "react";
import { useTaskStore } from "./taskStore";

export const DescriptionModal = () => {
  const {
    isEditingDescription,
    editingDescription,
    setIsEditingDescription,
    setEditingDescription,
    updateTaskDescription,
    selectedTaskId,
  } = useTaskStore();

  const handleSaveDescription = () => {
    if (selectedTaskId) {
      updateTaskDescription(selectedTaskId, editingDescription);
    }
  };

  if (!isEditingDescription || !selectedTaskId) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-20">
      <div className="bg-[#2a2b3d] rounded-lg p-4 w-full max-w-lg">
        <h3 className="text-[#e2e8f0] text-lg font-medium mb-4">
          Edit Description
        </h3>
        <textarea
          value={editingDescription}
          onChange={(e) => setEditingDescription(e.target.value)}
          className="w-full bg-[#1a1b2e] text-[#e2e8f0] border border-[#4a5568] rounded-lg p-2 mb-4 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-[#6366f1]"
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={() => setIsEditingDescription(false)}
            className="px-4 py-2 text-[#e2e8f0] hover:bg-[#4a5568] rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSaveDescription}
            className="px-4 py-2 bg-[#6366f1] text-white rounded-lg hover:bg-[#4f46e5] transition-colors"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
