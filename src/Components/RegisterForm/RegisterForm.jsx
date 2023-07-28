import axios from "axios";
import { useState } from "react";

const RegisterForm = () => {
  const [registerError, setRegisterError] = useState("");
  const [registerSuccess, setRegisterSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;

    const username = form.registerUsername.value;
    const password = form.registerPassword.value;
    const confirmPassword = form.confirmPassword.value;

    if (password !== confirmPassword) {
      setRegisterError("Passwords do not match");
    }

    setRegisterError("");

    // Do a POST request to the /login endpoint using username and password from the form
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/register?username=${username}&password=${password}`
      )
      .then(() => {
        setRegisterSuccess(true);
      })
      .catch((err) => {
        setRegisterError(err.response.data.message);
      });
  };

  return (
    <>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="registerUsername">Username</label>
          <input type="text" name="registerUsername" id="registerUsername" />
        </div>
        <div>
          <label htmlFor="registerPassword">Password</label>
          <input
            type="password"
            name="registerPassword"
            id="registerPassword"
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input type="password" name="confirmPassword" id="confirmPassword" />
        </div>
        <button>Register</button>
        {registerError && <p>{registerError}</p>}
        {registerSuccess && <p>Success! Please login</p>}
      </form>
    </>
  );
};

export default RegisterForm;
