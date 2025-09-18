import { configureStore } from "@reduxjs/toolkit";
import bookManagement from "../feature/bookManagement/bookManagementSlice";

export const store = configureStore({
  reducer: {
    bookManagement: bookManagement,
  },
});
