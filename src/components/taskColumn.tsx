// tasks of a specific status - columns

import { TaskColumnProps } from "../types/index.ts";
import { TaskItem } from "./taskItem"; //

export const TaskColumn = ({ tasks, title, icon }: TaskColumnProps) => {
  return (
    <div className="space-y-4 min-w-[250px]">
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <h2 className="text-lg sm:text-xl font-semibold text-[#e2e8f0] mb-4">
          {title}
        </h2>
      </div>
      {tasks.map((task) => (
        // render taskItem components for each task
        <TaskItem key={task.id} task={task} />
      ))}
      {tasks.length === 0 && (
        <div className="text-center text-[#6b7280] py-8">
          No tasks in this column
        </div>
      )}
    </div>
  );
};
