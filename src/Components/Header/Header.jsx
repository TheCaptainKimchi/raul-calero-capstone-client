import "./Header.scss";
import Logo from "../../Assets/Images/SparkLogo.png";
import { elastic as Menu } from "react-burger-menu";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <Link to={"/"} className="header__logo">
        <img src={Logo} alt="spark-logo"></img>
      </Link>
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
      </Menu>
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
      </nav>
    </div>
  );
};

export default Header;
