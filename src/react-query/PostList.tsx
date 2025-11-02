import axios from "axios";
import { useEffect, useState } from "react";
import usePosts, { Post } from "./hooks/usePosts";

const PostList = () => {
  const pageSize = 10;
  const [page, setPage] = useState(1);
  const [userId, setUserId] = useState<number>();
  const { data: posts, isLoading, error } = usePosts({ userId, page, pageSize });

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
        {posts.map((post: Post) => (
          <li key={post.id} className="list-group-item">
            {post.title}
          </li>
        ))}
      </ul>
      <div className="mt-3">
        <button
          className="btn btn-primary me-2"
          onClick={() => setPage((page) => Math.max(page - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <button
          className="btn btn-primary"
          onClick={() => setPage((page) => page + 1)}
          disabled={posts.length < pageSize}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default PostList;
