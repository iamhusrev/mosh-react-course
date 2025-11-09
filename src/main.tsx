import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import ReactDOM from "react-dom/client";
import PartTwoApp from "./PartTwoApp";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import PartOneApp from "./PartOneApp";
import { RouterProvider } from "react-router-dom";
import router from "./routing/routes";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      keepPreviousData: true,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      {/* <PartTwoApp /> */}
      {/* <PartOneApp /> */}
      <ReactQueryDevtools />
    </QueryClientProvider>
  </React.StrictMode>
);
