// App.tsx
import { TaskColumn } from "./components/taskColumn";
import { TaskInput } from "./components/taskInput";
import { TaskActions } from "./components/TaskActions";
import { DescriptionModal } from "./components/DescriptionModule";
import { useTaskStore } from "./components/taskStore";
import { MdOutlinePlaylistAdd, MdOutlineDoneAll } from "react-icons/md";
import { RiTimeLine } from "react-icons/ri";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { TaskStatus } from "./types";

function App() {
  const {
    getTodoTasks,
    getInProgressTasks,
    getCompletedTasks,
    reorderTasks,
    updateTaskStatus,
  } = useTaskStore();

  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    // If dropped outside a droppable area
    if (!destination) return;
    console.log("Drag ended:", result);

    // If dropped in the same position
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    try {
      // Update status if moved to a different column
      if (source.droppableId !== destination.droppableId) {
        updateTaskStatus(
          result.draggableId,
          destination.droppableId as TaskStatus
        );
      }

      // Handle reordering
      reorderTasks(source, destination);
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  const columns = [
    {
      id: "todo",
      title: "To Do",
      tasks: getTodoTasks(),
      icon: <MdOutlinePlaylistAdd className="w-5 h-5 text-red-500" />,
    },
    {
      id: "in-progress",
      title: "In Progress",
      tasks: getInProgressTasks(),
      icon: <RiTimeLine className="w-5 h-5 text-yellow-500" />,
    },
    {
      id: "completed",
      title: "Completed",
      tasks: getCompletedTasks(),
      icon: <MdOutlineDoneAll className="w-5 h-5 text-green-500" />,
    },
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#7FB2F0] to-[#ADD6FF] flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12">
      <div className="w-full max-w-[90rem] bg-white/90 rounded-[30px] shadow-2xl p-4 sm:p-6 md:p-8 relative border-4 border-white">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#4A6FA5] mb-4 text-center pixelated">
          Task Manager
        </h1>
        <TaskInput />
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="mt-4 grid grid-cols-3 gap-4 md:gap-6 overflow-x-auto overflow-y-auto h-[calc(100vh-16rem)]">
            {columns.map((column) => (
              <TaskColumn
                key={column.id}
                id={column.id}
                title={column.title}
                tasks={column.tasks}
                icon={column.icon}
              />
            ))}
          </div>
        </DragDropContext>
        <TaskActions />
        <DescriptionModal />
      </div>
    </div>
  );
}

export default App;
