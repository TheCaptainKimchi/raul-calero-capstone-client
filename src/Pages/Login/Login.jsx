// Imports
import "./Login.scss";
import LoginForm from "../../Components/LoginForm/LoginForm.jsx";
import Profile from "../../Components/Profile/Profile";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  // Store check if user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // On page load, check if the auth token is in session storage, if so, the user is already logged in
  useEffect(() => {
    const authToken = localStorage.getItem("authToken");

    if (authToken) {
      setIsLoggedIn(true);
    }
  }, []);

  // When clicked, navigate to register page
  function clickHandler(e) {
    navigate("/register");
  }

  return (
    <div className="login">
      {/* If user is not logged in, render login form */}
      {!isLoggedIn && (
        <div className="login__container">
          <LoginForm setIsLoggedIn={setIsLoggedIn} />
          <div className="login__container-register">
            <button onClick={clickHandler} className="login__container-button">
              Register
            </button>
          </div>
        </div>
      )}
      {/* If user is logged in, render profile component */}
      {isLoggedIn && (
        <div>
          <Profile isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        </div>
      )}
    </div>
  );
};

export default Login;
