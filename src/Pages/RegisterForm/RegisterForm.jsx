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
    let puuid = "";

    if (password !== confirmPassword) {
      setRegisterError("Passwords do not match");
    }

    setRegisterError("");

    try {
      const response = await axios.get(
        `http://localhost:8080/puuid?userName=${riotId}&tagline=${tagline}`
      );
      puuid = response.data.puuid;

      await axios.post(
        `http://localhost:8080/register?username=${username}&password=${password}&riotId=${riotId}&tagline=${tagline}&email=${email}&puuid=${puuid}`
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
      <form onSubmit={handleSubmit} className="register__form">
        <h2 className="register__form-title">Register</h2>
        <div className="register__form-username">
          <label htmlFor="registerUsername">Username</label>
          <input type="text" name="registerUsername" id="registerUsername" />
        </div>
        <div className="register__form-riot-id">
          <label htmlFor="registerRiotId">Riot Id</label>
          <input type="text" name="registerRiotId" id="registerRiotId" />
        </div>
        <div className="register__form-tagline">
          <label htmlFor="registerTagline">Tagline</label>
          <input type="text" name="registerTagline" id="registerTagline" />
        </div>
        <div className="register__form-email">
          <label htmlFor="registerEmail">Email</label>
          <input type="text" name="registerEmail" id="registerEmail" />
        </div>
        <div className="register__form-password">
          <label htmlFor="registerPassword">Password</label>
          <input
            type="password"
            name="registerPassword"
            id="registerPassword"
          />
        </div>
        <div className="register__form-confirm-password">
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
