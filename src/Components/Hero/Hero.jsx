import "./Hero.scss";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="hero">
      <h1 className="hero__title">SparkGG</h1>
      <p className="hero__text">
        Current of Champions: Unleash Esports Potential with SparkGG!
      </p>
      <Link className="hero__button" to={"/feature"}>
        <button>START NOW</button>
      </Link>
    </div>
  );
};

export default Hero;
