import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
const Dashboard = lazy(() => import("../view/dashboard/Dashboard"));
const AddBook = lazy(() => import("../view/addBook/AddBook"));

const router = createBrowserRouter([
  {
    path: "/",
    Component: Dashboard,
    children: [
      {
        path: "/addBook",
        Component: AddBook,
      },
    ],
  },
]);

export default router;
