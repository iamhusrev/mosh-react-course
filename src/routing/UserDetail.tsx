import { useParams, useSearchParams } from "react-router-dom";

const UserDetail = () => {
  const { userId } = useParams();

  return <p>User ID: {userId}</p>;
};

export default UserDetail;
