import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface PostQuery {
  userId?: number;
  pageSize?: number;
}

const usePosts = (query: PostQuery) =>
  useInfiniteQuery<Post[], Error>({
    queryKey: ["posts", query],
    queryFn: ({ pageParam = 1 }) =>
      axios
        .get<Post[]>("https://jsonplaceholder.typicode.com/posts", {
          params: {
            ...(query.userId && { userId: query.userId }),
            ...(query.pageSize && { _limit: query.pageSize }),
            _start: (pageParam - 1) * (query.pageSize || 10),
          },
        })
        .then((res) => res.data),
    retry: 3,
    cacheTime: 1000 * 60 * 5, // 5 minutes
    staleTime: 1000 * 10, // 10 seconds
    keepPreviousData: true,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length > 0 ? allPages.length + 1 : undefined,
  });

export default usePosts;
