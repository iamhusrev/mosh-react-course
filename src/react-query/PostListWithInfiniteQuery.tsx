import { useState } from "react";
import { Post } from "./hooks/usePosts";
import usePostsWithInfiniteQuery from "./hooks/usePostsWithInfiniteQuery";

const PostListWithInfiniteQuery = () => {
  const pageSize = 10;
  const [userId, setUserId] = useState<number>();
  const {
    data: posts,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = usePostsWithInfiniteQuery({ userId, pageSize });

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>{error.message}</p>;

  return (
    <>
      <select
        className="form-select mb-3"
        onChange={(event) => setUserId(parseInt(event.target.value))}
      >
        <option value="">Select an option</option>
        <option value="1">User 1</option>
        <option value="2">User 2</option>
        <option value="3">User 3</option>
      </select>
      <ul className="list-group">
        {posts.pages.map((page) =>
          page.map((post: Post) => (
            <li key={post.id} className="list-group-item">
              {post.title}
            </li>
          ))
        )}
      </ul>
      <div className="mt-3">
        <button
          className="btn btn-primary"
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage}
        >
          {isFetchingNextPage ? "Loading..." : "Load More"}
        </button>
      </div>
    </>
  );
};

export default PostListWithInfiniteQuery;
