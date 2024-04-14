import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  isLogin: true,
};

export const authSlice = createSlice({
  initialState: initialState,
  name: "authSlice",
  reducers: {
    switchRegister: (state, action) => {
      Object.assign(state, initialState);
      state.isLogin = false;
    },

    switchSignin: (state, action) => {
      Object.assign(state, initialState);
    },

    updateInput: (state, action) => {
      // return {
      //   ...state, [action.payload.key]: action.payload.value
      // };

      const { key, value } = action.payload;
      state[key] = value;
    },
  },
});

export const { switchRegister, switchSignin, updateInput } = authSlice.actions;
export const authSliceName = authSlice.name;
export default authSlice.reducer;
