import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  boards: [],
};

export const boardSlice = createSlice({
  initialState: initialState,
  name: "boardSlice",
  reducers: {
    storeBoards: (state, action) => {
      const { key, value } = action.payload;
      state[key] = value;
    },
  },
});

export const { storeBoards } = boardSlice.actions;
export const boardSliceName = boardSlice.name;
export default boardSlice.reducer;
