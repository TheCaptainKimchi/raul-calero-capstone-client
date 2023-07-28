import { useState } from "react";
import axios from "axios";

const LoginForm = ({ setIsLoggedIn }) => {
  const [loginError, setLoginError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;

    const username = form.loginUsername.value;
    const password = form.loginPassword.value;

    // Do a POST request to the /login endpoint using username and password from the form
    axios
      .post(
        `http://localhost:8080/login?username=${username}&password=${password}`
      )
      .then((response) => {
        // Store the JWT token in session storage for future requests
        localStorage.setItem("authToken", response.data.token);
        setIsLoggedIn(true);
      })
      .catch((err) => {
        setLoginError(err.response.data.message);
      });
  };

  return (
    <>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="loginUsername">Username</label>
          <input type="text" name="loginUsername" id="loginUsername" />
        </div>
        <div>
          <label htmlFor="loginPassword">Password</label>
          <input type="password" name="loginPassword" id="loginPassword" />
        </div>
        <button>Login</button>
        {loginError && <p>{loginError}</p>}
      </form>
    </>
  );
};

export default LoginForm;
