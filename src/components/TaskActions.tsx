import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { useTaskStore } from "./taskStore";

export const TaskActions = () => {
  const {
    selectedTaskId,
    deleteTask,
    setIsEditingDescription,
    setEditingDescription,
    tasks,
  } = useTaskStore();

  if (!selectedTaskId) return null;

  const selectedTask = tasks.find((task) => task.id === selectedTaskId);

  const handleStartEditing = () => {
    if (selectedTask) {
      setEditingDescription(selectedTask.description);
      setIsEditingDescription(true);
    }
  };

  return (
    <div className="absolute top-2 right-4 z-10 flex gap-2">
      <button
        onClick={handleStartEditing}
        className="bg-[#6366f1] text-white p-2 sm:p-3 rounded-lg shadow-lg hover:bg-[#4f46e5] transition-colors flex items-center gap-2"
      >
        <FiEdit2 className="w-5 h-5" />
        <span className="hidden sm:inline">Edit Description</span>
      </button>

      <button
        onClick={() => deleteTask(selectedTaskId)}
        className="bg-[#dc2626] text-white p-2 sm:p-3 rounded-lg shadow-lg hover:bg-[#ef4444] transition-colors flex items-center gap-2"
      >
        <RiDeleteBin2Fill className="w-5 h-5" />
        <span className="hidden sm:inline">Delete Task</span>
      </button>
    </div>
  );
};
