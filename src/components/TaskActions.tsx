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
    <div className="absolute top-4 right-4 z-10 flex gap-2">
      <button
        onClick={handleStartEditing}
        className="bg-gradient-to-r from-[#7FB2F0] to-[#ADD6FF] 
          text-white p-2 sm:p-3 rounded-[15px] shadow-lg 
          hover:shadow-xl transition-all duration-200 
          flex items-center gap-2 border-2 border-white/80
          font-['Press_Start_2P'] text-sm"
      >
        <FiEdit2 className="w-5 h-5" />
        <span className="hidden sm:inline">Edit</span>
      </button>

      <button
        onClick={() => deleteTask(selectedTaskId)}
        className="bg-gradient-to-r from-[#FF6B6B] to-[#FFA6A6] 
          text-white p-2 sm:p-3 rounded-[15px] shadow-lg 
          hover:shadow-xl transition-all duration-200 
          flex items-center gap-2 border-2 border-white/80
          font-['Press_Start_2P'] text-sm"
      >
        <RiDeleteBin2Fill className="w-5 h-5" />
        <span className="hidden sm:inline">Delete</span>
      </button>
    </div>
  );
};
