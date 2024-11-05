import { TaskColumn } from "./components/taskColumn";
import { TaskInput } from "./components/taskInput";
import { useTaskStore } from "./components/taskStore";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { MdOutlinePlaylistAdd, MdOutlineDoneAll } from "react-icons/md";
import { RiTimeLine } from "react-icons/ri";

function App() {
  const {
    getTodoTasks,
    getInProgressTasks,
    getCompletedTasks,
    selectedTaskId,
    deleteTask,
  } = useTaskStore();

  const columns = [
    {
      title: "To Do",
      tasks: getTodoTasks(),
      icon: <MdOutlinePlaylistAdd className="w-10 h-10 text-red-500" />,
    },
    {
      title: "In Progress",
      tasks: getInProgressTasks(),
      icon: <RiTimeLine className="w-10 h-10 text-yellow-500" />,
    },
    {
      title: "Completed",
      tasks: getCompletedTasks(),
      icon: <MdOutlineDoneAll className="w-10 h-10 text-green-500" />,
    },
  ];
  return (
    <div className="min-h-screen w-full bg-[#1a1b2e] flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12">
      <div className="w-full max-w-[90rem] bg-gradient-to-b from-[#2a2b3d] to-[#1f2033] rounded-lg shadow-xl p-4 sm:p-6 md:p-8 relative">
        <h1 className="text-2xl sm:text-3xl font-semibold text-[#e2e8f0] mb-4 text-center">
          Task Manager
        </h1>
        <TaskInput />
        <div className="mt-4 overflow-hidden">
          <div className="grid grid-cols-3 gap-4 md:gap-6 overflow-x-auto overflow-y-auto h-[calc(100vh-16rem)]">
            {columns.map((column) => (
              <TaskColumn
                key={column.title}
                title={column.title}
                tasks={column.tasks}
                icon={column.icon}
              />
            ))}
          </div>
        </div>

        {selectedTaskId && (
          <div className="absolute bottom-4 right-4 z-10">
            <button
              onClick={() => deleteTask(selectedTaskId)}
              className="bg-[#dc2626] text-white p-2 sm:p-3 rounded-lg shadow-lg hover:bg-[#ef4444] transition-colors flex items-center gap-2"
            >
              <RiDeleteBin2Fill className="w-5 h-5" />
              <span className="hidden sm:inline">Delete Task</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
