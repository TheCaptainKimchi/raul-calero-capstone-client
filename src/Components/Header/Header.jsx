// Imports
import "./Header.scss";
import Logo from "../../Assets/Images/SparkLogo.png";
import { elastic as Menu } from "react-burger-menu";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Header = () => {
  // State to check if user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Navigate to profile page once clicked
  const clickHandler = (e) => {
    navigate("/profile");
  };

  // State to render loginButton or see profile button
  const [loginButton, setLoginButton] = useState(
    <a id="login" onClick={clickHandler}>
      <button>Login</button>
    </a>
  );

  // On page load, check if the auth token is in session storage, if so, the user is already logged in
  useEffect(() => {
    const authToken = localStorage.getItem("authToken");

    if (authToken) {
      setIsLoggedIn(true);
      // Change login button to view profile button
      setLoginButton(
        <a id="profile" onClick={clickHandler}>
          <button>View Profile</button>
        </a>
      );
    }
  }, [isLoggedIn]);

  // Render header component
  return (
    <div className="header">
      <Link to={"/"} className="header__logo">
        <img src={Logo} alt="spark-logo"></img>
      </Link>

      {/* Burger menu only visible during mobile viewing */}
      <Menu right className="burger-menu">
        <Link id="home" className="menu-item" to={"/"}>
          Home
        </Link>
        <Link id="feature" className="menu-item" to={"/feature"}>
          Feature
        </Link>
        <Link id="about" className="menu-item" to={"/about"}>
          About
        </Link>
        {loginButton}
      </Menu>

      {/* Standard nav menu visible in tablet or desktop viewing */}
      <nav className="header__nav">
        <ul className="header__nav-list">
          <li className="header__nav-list-item">
            <Link to={"/"}>Home</Link>
          </li>
          <li className="header__nav-list-item">
            <Link to={"/feature"}>Feature</Link>
          </li>
          <li className="header__nav-list-item">
            <Link to={"/about"}>About</Link>
          </li>
        </ul>
        {loginButton}
      </nav>
    </div>
  );
};

export default Header;
