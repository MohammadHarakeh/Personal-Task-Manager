import React from "react";
import { useDispatch } from "react-redux";
import { updateInput } from "../../../Redux/authSlice";

function SignupForm({ register }) {
  const dispatch = useDispatch();

  const handleSignup = () => {
    register();
  };

  return (
    <div className="signup-wrapper">
      <input
        placeholder="Username"
        onChange={(e) => {
          const change = updateInput({
            key: "username",
            value: e.target.value,
          });
          dispatch(change);
        }}
      ></input>
      <input
        placeholder="Email"
        onChange={(e) => {
          const change = updateInput({
            key: "email",
            value: e.target.value,
          });
          dispatch(change);
        }}
      ></input>
      <input
        placeholder="Password"
        type="password"
        onChange={(e) => {
          const change = updateInput({
            key: "password",
            value: e.target.value,
          });
          dispatch(change);
        }}
      ></input>
      <input
        placeholder="Confirm Password"
        type="password"
        onChange={(e) => {
          const change = updateInput({
            key: "confirmPassword",
            value: e.target.value,
          });
          dispatch(change);
        }}
      ></input>

      <div className="buttons-wrapper">
        <button onClick={handleSignup}>Signup</button>
      </div>
    </div>
  );
}

export default SignupForm;
