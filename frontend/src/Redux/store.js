import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer, { authSliceName } from "./authSlice";
import boardSliceReducer, { boardSliceName } from "./boardSlice";
import logger from "redux-logger";

export const store = configureStore({
  reducer: {
    [authSliceName]: authSliceReducer,
    [boardSliceName]: boardSliceReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
