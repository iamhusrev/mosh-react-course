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


export default taskReducer;