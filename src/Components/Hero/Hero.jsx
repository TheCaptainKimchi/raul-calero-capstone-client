// Imports
import "./Hero.scss";
import { Link } from "react-router-dom";

const Hero = () => {
  // Render hero component
  return (
    <div className="hero">
      <video autoPlay loop muted>
        <source src="https://capstoneserver-9d48f9576e5c.herokuapp.com/videos/valorant.mp4"></source>
      </video>
      <div className="hero__container">
        <h1 className="hero__title">SparkGG</h1>
        <p className="hero__text">
          Current of Champions: Take your Valorant skills to the next level with
          our data analytics!
        </p>
        <Link className="hero__button" to={"/feature"}>
          <button>START NOW</button>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
