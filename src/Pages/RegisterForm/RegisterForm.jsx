import axios from "axios";
import { useState } from "react";
import "./RegisterForm.scss";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [registerError, setRegisterError] = useState("");
  const [registerSuccess, setRegisterSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;

    const username = form.registerUsername.value;
    const riotId = form.registerRiotId.value;
    const tagline = form.registerTagline.value;
    const email = form.registerEmail.value;
    const password = form.registerPassword.value;
    const confirmPassword = form.confirmPassword.value;

    if (password !== confirmPassword) {
      setRegisterError("Passwords do not match");
    }

    setRegisterError("");

    try {
      await axios.post(
        `http://localhost:8080/register?username=${username}&password=${password}&riotId=${riotId}&tagline=${tagline}&email=${email}`
      );

      setRegisterSuccess(true);
      navigate("/profile");
    } catch (error) {
      if (error.response) {
        setRegisterError(error.response.data.message);
      } else {
        setRegisterError("An error occurred during registration.");
      }
    }
  };

  return (
    <div className="register">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="register__username">
          <label htmlFor="registerUsername">Username</label>
          <input type="text" name="registerUsername" id="registerUsername" />
        </div>
        <div className="register__riot-id">
          <label htmlFor="registerRiotId">Riot Id</label>
          <input type="text" name="registerRiotId" id="registerRiotId" />
        </div>
        <div className="register__tagline">
          <label htmlFor="registerTagline">Tagline</label>
          <input type="text" name="registerTagline" id="registerTagline" />
        </div>
        <div className="register__email">
          <label htmlFor="registerEmail">Email</label>
          <input type="text" name="registerEmail" id="registerEmail" />
        </div>
        <div className="register__password">
          <label htmlFor="registerPassword">Password</label>
          <input
            type="password"
            name="registerPassword"
            id="registerPassword"
          />
        </div>
        <div className="register__confirm-password">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input type="password" name="confirmPassword" id="confirmPassword" />
        </div>
        <button>Register</button>
        {registerError && <p>{registerError}</p>}
        {registerSuccess && <p>Success! Please login</p>}
      </form>
    </div>
  );
};

export default RegisterForm;
