import { useEffect, useState } from "react";
import userServiceWithHttpGenericService from "../services/user-service-with-http-generic-service";
import type { User } from "../services/user-service";
import { AxiosError, CanceledError } from "axios";

const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    const { request, cancel } =
      userServiceWithHttpGenericService.getAll<User>();
    request
      .then((res) => setUsers(res.data))
      .catch((error: AxiosError) => {
        if (error instanceof CanceledError) return;
        setError(error.message);
      })
      .finally(() => setLoading(false));

    return () => {
      cancel();
    };
  }, []);

  return { users, error, loading, setUsers, setError };
};

export default useUsers;
