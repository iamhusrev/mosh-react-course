import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface PostQuery {
  userId?: number;
  page?: number;
  pageSize?: number;
}

const usePosts = (query: PostQuery) =>
  useQuery<Post[], Error>({
    queryKey: ["posts", query],
    queryFn: () =>
      axios
        .get<Post[]>("https://jsonplaceholder.typicode.com/posts", {
          params: {
            ...(query.userId && { userId: query.userId }),
            ...(query.page && { _page: query.page }),
            ...(query.pageSize && { _limit: query.pageSize }),
          },
        })
        .then((res) => res.data),
    retry: 3,
    cacheTime: 1000 * 60 * 5, // 5 minutes
    staleTime: 1000 * 10, // 10 seconds
    keepPreviousData: true,
  });

export default usePosts;
