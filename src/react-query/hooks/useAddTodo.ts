import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CAHCE_EY_TODOS } from "../constants";
import todoService from "../services/todoService";
import { Todo } from "./useTodos";

interface AddTodoContext {
  previousTodos: Todo[];
}
const useAddTodo = (onAdd: () => void) => {
  const queryClient = useQueryClient();
  return useMutation<Todo, Error, Todo, AddTodoContext>({
    mutationFn: todoService.post,
    onMutate: (newTodo) => {
      const previousTodos =
        queryClient.getQueryData<Todo[]>(CAHCE_EY_TODOS) || [];
      queryClient.setQueryData<Todo[]>(CAHCE_EY_TODOS, (oldTodos = []) => [
        newTodo,
        ...oldTodos,
      ]);

      return {
        previousTodos,
      };
    },
    onSuccess: (savedTodo, newTodo, context) => {
      // APPROACH 1: Manually Invalidate and refetch
      // queryClient.invalidateQueries({ queryKey: ["todos"] });
      // APPROACH 2: Manually update the cache
      // queryClient.setQueryData(["todos"], (oldTodos) => [
      //   newTodo,
      //   ...(oldTodos || []),
      // ]);

      queryClient.setQueryData<Todo[]>(CAHCE_EY_TODOS, (oldTodos) => {
        if (!oldTodos) return [savedTodo];
        return oldTodos.map((todo) => (todo === newTodo ? savedTodo : todo));
      });
      onAdd();
    },
    onError: (error, newTodo, context) => {
      if (!context) return;

      // Rollback the optimistic update
      queryClient.setQueryData<Todo[]>(CAHCE_EY_TODOS, context.previousTodos);
    },
  });
};

export default useAddTodo;
