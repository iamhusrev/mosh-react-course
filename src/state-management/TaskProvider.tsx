import React, { useReducer } from "react";
import TaskContext from "./contexts/tasksContexts";
import taskReducer from "./reducers/taskReducer";

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
