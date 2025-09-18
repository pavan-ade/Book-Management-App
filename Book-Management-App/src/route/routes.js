import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import DeleteBook from "../view/deleteBook/DeleteBook";
const Dashboard = lazy(() => import("../view/dashboard/Dashboard"));
const AddBook = lazy(() => import("../view/addBook/AddBook"));
const ErrorPage = lazy(() => import("../view/errorPage/ErrorPage"));

const router = createBrowserRouter([
  {
    path: "/",
    Component: Dashboard,
    children: [
      {
        path: "/addBook",
        Component: AddBook,
      },
      {
        path: "/updateBook/:id",
        Component: AddBook,
      },
      {
        path: "/deleteBook/:id",
        Component: DeleteBook,
      },
    ],
  },
  {
    path: "*",
    Component: ErrorPage,
  },
]);

export default router;
