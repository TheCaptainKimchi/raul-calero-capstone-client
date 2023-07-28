import "./Login.scss";
import LoginForm from "../../Components/LoginForm/LoginForm.jsx";
import Profile from "../../Components/Profile/Profile";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // On page load, check if the auth token is in session storage, if so, the user is already logged in
  useEffect(() => {
    const authToken = localStorage.getItem("authToken");

    if (authToken) {
      setIsLoggedIn(true);
    }
  }, []);
  return (
    <div className="login">
      {!isLoggedIn && (
        <div>
          <LoginForm setIsLoggedIn={setIsLoggedIn} />
          <div className="login__register">
            <Link to={"/"} className="login__register-button">
              <button>Register</button>
            </Link>
          </div>
        </div>
      )}
      {isLoggedIn && (
        <div>
          <Profile isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        </div>
      )}
    </div>
  );
};

export default Login;
