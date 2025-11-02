import { useQuery } from "@tanstack/react-query";
import { CAHCE_EY_TODOS } from "../constants";
import todoService from "../services/todoService";

export interface Todo {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
}

const useTodos = () => {
  const query = useQuery<Todo[], Error>({
    queryKey: CAHCE_EY_TODOS,
    queryFn: todoService.getAll,
    retry: 3,
    cacheTime: 1000 * 60 * 5, // 5 minutes
    staleTime: 1000 * 10, // 10 seconds
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
  return query;
};

export default useTodos;
