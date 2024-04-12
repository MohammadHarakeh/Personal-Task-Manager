import React from "react";

function SignupForm({ signupData, setSignupData, register }) {
  const handleSignup = () => {
    register();
  };

  return (
    <div className="signup-wrapper">
      <input
        placeholder="Username"
        onChange={(e) => {
          setSignupData({ ...signupData, username: e.target.value });
        }}
      ></input>
      <input
        placeholder="Email"
        onChange={(e) => {
          setSignupData({ ...signupData, email: e.target.value });
        }}
      ></input>
      <input
        placeholder="Password"
        type="password"
        onChange={(e) => {
          setSignupData({ ...signupData, password: e.target.value });
        }}
      ></input>
      <input
        placeholder="Confirm Password"
        type="password"
        onChange={(e) => {
          setSignupData({ ...signupData, confirmPassword: e.target.value });
        }}
      ></input>

      <div className="buttons-wrapper">
        <button onClick={handleSignup}>Signup</button>
      </div>
    </div>
  );
}

export default SignupForm;
