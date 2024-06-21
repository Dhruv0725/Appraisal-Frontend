import React, { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./LoginPage.module.css";
import { StateContext } from "../store/context-store";
import useToken from "../utils/useToken";
const LoginPage = () => {
  const navigate = useNavigate();

  const userRef = useRef("");
  const passRef = useRef("");
  const stateCtx = useContext(StateContext);
  const { token, setToken } = useToken();
  const handleSignupClick = () => {
    navigate("/signup"); // Navigate to the login page
  };

  const handleLoginClick = () => {
    const login = async () => {
      const loginData = {
        userEmail: userRef.current.value,
        password: passRef.current.value,
      };

      try {
        const response = await fetch("http://localhost:8083/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginData),
        });

        if (!response.ok) {
          alert("Invalid credentials");
        } else {
          const data = await response.json();
          console.log(data);
          sessionStorage.setItem("user", JSON.stringify(data));
          setToken(data.token);
          stateCtx.loginstate();
          stateCtx.userState(data);
          stateCtx.setRoleId(data["roleId"]);
          navigate("/home");
        } // Handle response from the backend
      } catch (error) {
        console.error("Error:", error);
      }
    };

    login();
  };
  return (
    <div className={classes["form-container"]}>
      <img
        className={classes["login-image"]}
        src="https://api.time.com/wp-content/uploads/2024/03/Changing-allergies.gif?w=1920&quality=85"
        alt="Sign In"
      />

      <div className={classes["content-container"]}>
        <h2>Log In</h2>
        <form className={classes["form-content"]}>
          <div className={classes["form-group"]}>
            <label htmlFor="username">UserEmail:</label>
            <input type="text" id="username" name="username" ref={userRef} />
          </div>
          <div className={classes["form-group"]}>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              ref={passRef}
            />
          </div>
          <button
            className={classes.formButton}
            type="button"
            onClick={handleLoginClick}
          >
            Login
          </button>
        </form>
        <button className={classes.signupbutton} onClick={handleSignupClick}>
          New User SignUp
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
