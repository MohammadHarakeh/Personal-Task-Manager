const initialState = {
  signupData: {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  },
  signupData: {
    email: "",
    password: "",
  },
};

const authenticationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_SIGNUP_DATE":
      return {
        ...state,
        signupData: action.payload,
      };
    case "SET_SIGNIN_DATA":
      return {
        ...state,
        signinData: action.payload,
      };
    default:
      return state;
  }
};

export default authenticationReducer;
