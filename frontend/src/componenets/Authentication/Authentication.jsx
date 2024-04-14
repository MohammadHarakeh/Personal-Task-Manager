import React, { useState } from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SignupForm from "./Forms/SignupForm";
import SigninForm from "./Forms/SigninForm";
import { useDispatch, useSelector } from "react-redux";
import {
  authSliceName,
  switchRegister,
  switchSignin,
} from "../../Redux/authSlice";

const Authentication = () => {
  const { username, email, password, confirmPassword, isLogin } = useSelector(
    (global) => {
      global[authSliceName];
    }
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateForm = () => {
    if (!username || !email || !password || !confirmPassword) {
      toast.error("Please fill in all fields");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address");
      return false;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return false;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }
    return true;
  };

  const validateSigninForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email && !password) {
      toast.error("please fill in both fields");
      return false;
    } else if (!email) {
      toast.error("please enter your email");
      return false;
    } else if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return false;
    } else if (!password) {
      toast.error("please enter your password");
      return false;
    }
    return true;
  };

  const register = async () => {
    if (!validateForm()) return;

    try {
      const response = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        body: JSON.stringify({
          username,
          email,
          password,
          confirmPassword,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        console.log("User registered successfully");
        toast.success("User registered successfully");
        dispatch(switchSignin());
      } else {
        console.log("Registration failed");
        toast.error("Registration failed");
      }
    } catch (error) {
      console.log("Error occurred during registration", error);
      toast.error("Error occurred during registration");
    }
  };

  const handleSignin = async () => {
    if (!validateSigninForm()) return;

    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", JSON.stringify(data.token));
        toast.success("Login successful");
        navigate("/homepage");
      } else {
        console.log("Failed to login");
        toast.error("Failed to login");
      }
    } catch (error) {
      console.log("Error occured during registration", error);
      toast.error(error);
    }
  };

  return (
    <div className="form-wrapper">
      <ToastContainer theme="dark" />
      <div className="form-container">
        <div className="form-title">
          {isLogin ? <p>Signup now</p> : <p>Login</p>}
        </div>
        {isLogin ? (
          <SignupForm register={register} />
        ) : (
          <SigninForm handleSignin={handleSignin} />
        )}

        <div className="switcher">
          <p>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <span
              className="button-switcher"
              onClick={() => dispatch(switchRegister())}
            >
              {isLogin ? " Sign up" : "Sign in"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Authentication;
