// Imports
import { useState } from "react";
import axios from "axios";

const LoginForm = ({ setIsLoggedIn }) => {
  // Load baseUrl from .env file
  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  // Store any login errors to display on page
  const [loginError, setLoginError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Capture form values
    const form = e.target;
    const username = form.loginUsername.value;
    const password = form.loginPassword.value;

    // Do a POST request to the /login endpoint using username and password from the form
    axios
      .post(`${baseUrl}login?username=${username}&password=${password}`)
      .then((response) => {
        // Store the JWT token in session storage for future requests
        localStorage.setItem("authToken", response.data.token);
        setIsLoggedIn(true);
        window.location.reload();
      })
      .catch((err) => {
        console.error(err);
        setLoginError(err.response.data.error);
      });
  };

  return (
    // Render login form
    <>
      <h2 className="login__container-title">Login</h2>
      <form onSubmit={handleSubmit} className="login__container-form">
        <div className="login__container-form-username">
          <label htmlFor="loginUsername">Username</label>
          <input type="text" name="loginUsername" id="loginUsername" />
        </div>
        <div className="login__container-form-password">
          <label htmlFor="loginPassword">Password</label>
          <input type="password" name="loginPassword" id="loginPassword" />
        </div>
        <button className="login__container-form-button">Login</button>
        <p id="error">{loginError}</p>
      </form>
    </>
  );
};

export default LoginForm;
