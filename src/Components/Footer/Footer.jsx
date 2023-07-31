// Imports
import "./Footer.scss";
import Logo from "../../Assets/Images/SparkLogo.png";
import Github from "../../Assets/Icons/github-icon.svg";
import LinkedIn from "../../Assets/Icons/linkedin-icon.svg";
import { Link } from "react-router-dom";

const Footer = () => {
  // Render footer component
  return (
    <div className="footer">
      <Link className="footer__logo" to="/">
        <img src={Logo} alt="spark-logo"></img>
      </Link>
      <nav className="footer__nav">
        <Link className="footer__nav-item footer__nav-item--home" to={"/"}>
          Home
        </Link>
        <Link
          className="footer__nav-item footer__nav-item--feature"
          to={"/feature"}
        >
          Feature
        </Link>
        <Link
          className="footer__nav-item footer__nav-item--about"
          to={"/about"}
        >
          About
        </Link>
      </nav>
      <div className="footer__socials">
        <Link
          className="footer__socials-link footer__socials-link--github"
          to={"https://github.com/TheCaptainKimchi"}
        >
          <img src={Github} alt="github-logo"></img>
        </Link>
        <Link
          className="footer__socials-link footer__socials-link--linkedin"
          to={"https://www.linkedin.com/in/raulcalero/"}
        >
          <img src={LinkedIn} alt="LinkedIn-logo"></img>
        </Link>
      </div>
    </div>
  );
};

export default Footer;
