import apiClient from "./api-client";

export interface User {
  id: number;
  name: string;
  email: string;
}

class UserService {
  getAllUsers() {
    const controller = new AbortController();
    const response = apiClient.get<User[]>("/users", {
      signal: controller.signal,
    });

    return { response, cancel: () => controller.abort() };
  }

  deleteUser(userId: number) {
    return apiClient.delete(`/users/${userId}`);
  }

  createUser(user: User) {
    return apiClient.post("/users", user);
  }

  updateUser(user: User) {
    return apiClient.put(`/users/${user.id}`, user);
  }
}

export default new UserService();
