import "./Header.scss";
import Logo from "../../Assets/Images/SparkLogo.png";
import {elastic as Menu } from "react-burger-menu";
import {Link} from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <img className="header__logo" src={Logo} alt="spark-logo"></img>
      <Menu right>
        <Link id="home" className="menu-item" to={"/"}>Home</Link>
        <Link id="home" className="menu-item" to={"/"}>Feature</Link>
        <Link id="home" className="menu-item" to={"/"}>About</Link>
      </Menu>
    </div>
  )
}

export default Header