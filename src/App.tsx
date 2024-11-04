import React from "react";
import { callTask } from "./stores/taskBox";
import "./App.css";
import { TaskStatus } from "./types";
import { RiDeleteBin2Fill } from "react-icons/ri";

function App() {
  const tasks = callTask((state) => state.tasks);
  const newTaskTitle = callTask((state) => state.taskTitle);
  const setNewTaskTitle = callTask((state) => state.setNewTaskTitle);
  const addTask = callTask((state) => state.addTask);
  const updateTaskStatus = callTask((state) => state.updateTaskStatus);
  const deleteTask = callTask((state) => state.deleteTask);

  // handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // prevent default refresh
    if (newTaskTitle.trim()) {
      addTask(newTaskTitle);
    }
  };
  return (
    <div className="p-4">
      <div>
        <form onSubmit={handleSubmit} className="mb-4">
          <input
            type="text"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            placeholder="task name..."
            className="border p-2 mr-2 rounded"
          />
          <button
            type="submit"
            disabled={!newTaskTitle.trim()}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Add Task
          </button>
        </form>
      </div>

      <div className="space-y-4"></div>
      {tasks.map((task) => (
        <div
          key={task.id}
          className="flex items-center gap-4 p-4 border rounded"
        >
          {task.title}
          {/* // choose status per task */}
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
