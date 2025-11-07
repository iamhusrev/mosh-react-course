import React, { useReducer } from "react";
import TaskContext from "./tasksContexts";

export interface Task {
  id: number;
  title: string;
}

export interface AddAction {
  type: "ADD";
  task: Task;
}

export interface DeleteAction {
  type: "DELETE";
  id: number;
}

export type TaskAction = AddAction | DeleteAction;

const taskReducer = (tasks: Task[], action: TaskAction): Task[] => {
  switch (action.type) {
    case "ADD":
      const newTask: Task = { id: Date.now(), title: "Task " + Date.now() };
      return [newTask, ...tasks];
    case "DELETE":
      return tasks.filter((task) => task.id !== action.id);
    default:
      return tasks;
  }
};

interface TaskProviderProps {
  children: React.ReactNode;
}

const TaskProvider = ({ children }: TaskProviderProps) => {
  const [tasks, taskDispatch] = useReducer(taskReducer, []);

  return (
    <TaskContext.Provider value={{ tasks, dispatch: taskDispatch }}>
      {children}
    </TaskContext.Provider>
  );
};

export default TaskProvider;
