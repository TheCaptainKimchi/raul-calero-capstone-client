import "./Hero.scss";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="hero">
        <h1 className="hero__title">TITLE</h1>
        <p className="hero__text">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Exercitationem, quas!</p>
        <Link className="hero__button" to={"/feature"}><button>START NOW</button></Link>
    </div>
  )
}

export default Hero