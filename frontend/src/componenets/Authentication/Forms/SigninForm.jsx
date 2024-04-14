import React from "react";
import { useDispatch } from "react-redux";
import { updateInput } from "../../../Redux/authSlice";

function SigninForm({ handleSignin }) {
  const dispatch = useDispatch();

  return (
    <div className="signup-wrapper">
      <input
        placeholder="Email"
        onChange={(e) => {
          const change = updateInput({ key: "email", value: e.target.value });
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

      <div className="buttons-wrapper">
        <button onClick={handleSignin}>Signin</button>
      </div>
    </div>
  );
}

export default SigninForm;
