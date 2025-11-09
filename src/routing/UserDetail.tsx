import { useParams, useSearchParams } from "react-router-dom";

const UserDetail = () => {
  const { userId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  return <p>User ID: {userId}</p>;
};

export default UserDetail;
