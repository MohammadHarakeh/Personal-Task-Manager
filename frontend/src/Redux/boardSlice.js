import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  boards: [],
  selectedId: "",
};

export const boardSlice = createSlice({
  initialState: initialState,
  name: "boardSlice",
  reducers: {
    storeBoards: (state, action) => {
      return {
        ...state,
        boards: [...action.payload],
      };
    },

    getBoardId: (state, action) => {
      state.selectedId = action.payload;
    },
  },
});

export const { storeBoards, getBoardId } = boardSlice.actions;
export const boardSliceName = boardSlice.name;
export default boardSlice.reducer;
