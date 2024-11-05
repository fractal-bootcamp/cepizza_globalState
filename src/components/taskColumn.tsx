// tasks of a specific status - columns
import { Droppable } from "react-beautiful-dnd";
import { TaskColumnProps } from "../types/index.ts";
import { TaskItem } from "./taskItem"; //

export const TaskColumn: React.FC<TaskColumnProps> = ({
  id,
  title,
  tasks,
  icon,
}) => {
  return (
    <div className="space-y-4 min-w-[250px]">
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <h2 className="text-lg sm:text-xl font-semibold text-[#e2e8f0]">
          {title}
        </h2>
      </div>
      <Droppable droppableId={id}>
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={`space-y-4 min-h-[200px] p-2 rounded-lg ${
              snapshot.isDraggingOver ? "bg-[#1f2033]" : ""
            }`}
          >
            {tasks.map((task, index) => (
              <TaskItem key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};
