import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import DeleteBook from "../view/deleteBook/DeleteBook";
const Dashboard = lazy(() => import("../view/dashboard/Dashboard"));
const AddBook = lazy(() => import("../view/addOrEditBook/AddOrEditBook"));
const ErrorPage = lazy(() => import("../view/errorPage/ErrorPage"));
const ViewBook = lazy(() => import("../view/viewBook/ViewBook"));

const router = createBrowserRouter([
  {
    path: "/",
    Component: Dashboard,
    children: [
      {
        path: "/viewBook/:id",
        Component: ViewBook,
      },
      {
        path: "/addBook",
        Component: AddBook,
      },
      {
        path: "/deleteBook/:id",
        Component : DeleteBook
      },
    ],
  },
  {
    path: "*",
    Component : ErrorPage
  }
]);

export default router;
