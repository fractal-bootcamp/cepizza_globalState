// define shape of task
import { ReactNode } from "react";
import { DraggableLocation } from "react-beautiful-dnd";
import { z } from "zod";

// base schemas
export const taskStatusSchema = z.enum(["todo", "in-progress", "completed"]);
// z.enum -> in Zod is a way to define a set of allowed string literal values - only these specific string values are permitted
export type TaskStatus = z.infer<typeof taskStatusSchema>;
// z.infer to extract the type from Zod schema to use it like any other type
export const taskSchema = z.object({
  id: z.string().uuid(), // id must be valid uuid
  title: z.string().min(1, "title required").max(100), //title between 1-100 char
  description: z.string().max(500), // max 500 char
  status: taskStatusSchema,
  createdAt: z.date(),
});
export type Task = z.infer<typeof taskSchema>;

// custom type for ReactNode bc it cannot be validated by Zod
export interface TaskColumnProps {
  id: z.string;
  tasks: z.array<typeof taskSchema>;
  title: z.string;
  icon: ReactNode;
}

// store with actions
export const taskStoreSchema = z
  .object({
    tasks: z.array(taskSchema),
    taskTitle: z.string(),
    taskDescription: z.string(),
    selectedTaskId: z.string().nullable(),
    isEditingDescription: z.boolean(),
    editingDescription: z.string(),
  })
  .and(
    // 1️⃣ Combines with previous schema definition
    z.object({
      // 2️⃣ Creates new object schema
      reorderTasks: z
        .function() // 3️⃣ Defines a function validator
        .args(
          // 4️⃣ Specifies function arguments
          z.custom<DraggableLocation>(), // 5️⃣ First arg: Uses TypeScript type directly
          z.custom<DraggableLocation>() // 5️⃣ Second arg: Same type
        )
        .returns(z.void()), // 6️⃣ Function returns nothing (void)
      setTaskTitle: z.function().args(z.string()).returns(z.void()),

      setTaskDescription: z.function().args(z.string()).returns(z.void()),

      setSelectedTask: z
        .function()
        .args(z.string().nullable())
        .returns(z.void()),

      setIsEditingDescription: z.function().args(z.boolean()).returns(z.void()),

      setEditingDescription: z.function().args(z.string()).returns(z.void()),

      addTask: z.function().args(z.string(), z.string()).returns(z.void()),

      updateTaskStatus: z
        .function()
        .args(z.string(), taskStatusSchema)
        .returns(z.void()),

      updateTaskDescription: z
        .function()
        .args(z.string(), z.string())
        .returns(z.void()),

      deleteTask: z.function().args(z.string()).returns(z.void()),

      getTodoTasks: z.function().args().returns(z.array(taskSchema)),

      getInProgressTasks: z.function().args().returns(z.array(taskSchema)),

      getCompletedTasks: z.function().args().returns(z.array(taskSchema)),
    })
  );
export type TaskStore = z.infer<typeof taskStoreSchema>;

// create new Task
export const createTask = (title: string, description: string): Task => {
  const task = {
    id: crypto.randomUUID(),
    title,
    description,
    status: "todo" as const,
    createdAt: new Date(),
  };

  // validate before returning
  return taskSchema.parse(task);
};

// validate task updates
export const validateTaskUpdate = (task: Partial<Task>) => {
  return taskSchema.partial().parse(task);
};
