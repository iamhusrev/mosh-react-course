import { createBrowserRouter } from "react-router-dom";
import ContactPage from "./ContactPage";
import ErrorPage from "./ErrorPage";
import HomePage from "./HomePage";
import Layout from "./Layout";
import UserDetail from "./UserDetail";
import UsersPage from "./UsersPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/users",
        element: <UsersPage />,
        children: [
          {
            path: ":userId",
            element: <UserDetail />,
          },
        ],
      },
      {
        path: "/users/:userId",
        element: <UserDetail />,
      },
      {
        path: "/contact",
        element: <ContactPage />,
      },
    ],
  },
]);

export default router;
