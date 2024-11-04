import React from "react";
import { callTask } from "./stores/taskBox";
import "./App.css";
import { TaskStatus } from "./types";
import { RiDeleteBin2Fill } from "react-icons/ri";

function App() {
  const tasks = callTask((state) => state.tasks);
  const addTask = callTask((state) => state.addTask);
  const updateTaskStatus = callTask((state) => state.updateTaskStatus);
  const deleteTask = callTask((state) => state.deleteTask);

  return (
    <div className="p-4">
      <button
        className="bg-green-300 text-white px-4 py-2 rounded mb-4"
        onClick={() => addTask("New Task")}
      >
        Add Task
      </button>
      <div className="space-y-4"></div>
      {tasks.map((task) => (
        <div
          key={task.id}
          className="flex items-center gap-4 p-4 border rounded"
        >
          {task.title}
          {/* // choose status */}
          <select
            value={task.status}
            onChange={(e) =>
              updateTaskStatus(task.id, e.target.value as TaskStatus)
            }
            className="border rounded p-1"
          >
            <option value="todo">Todo</option>
            <option value="in-progress">In Progress</option>
            <option value="comppleted">Completed</option>
          </select>
          <button
            onClick={() => deleteTask(task.id)}
            className="bg-red-500 text-white px-2 py-1 rounded"
          >
            <RiDeleteBin2Fill />
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;
