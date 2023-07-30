import { Link } from "react-router-dom";
import "./About.scss";
import Carousel from "react-bootstrap/Carousel";
import productionImage from "../../Assets/Images/production.jpg";
import weatherImage from "../../Assets/Images/weather.png";
import qlc from "../../Assets/Images/qlc.jpg";

const About = () => {
  const test =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore doloribus assumenda labore numquam! Eos molestias, praesentium reiciendis error aperiam ipsam fugit vero eaque veritatis atque aut eligendi dolorum illo facere?";

  console.log(test.length);

  return (
    <div className="about">
      <div className="about__project">
        <div className="about__project-container">
          <h3 className="about__project-container-title">About The Project</h3>
          <p className="about__project-container-text">
            Experience SparkGG V1: Where Esports Analytics Began!
          </p>
          <Link
            className="about__project-container-button"
            to={"https://sparkgg.net"}
          >
            <button>VISIT SITE</button>
          </Link>
        </div>
      </div>
      <div className="about__developer">
        <h2 className="about__developer-title">About The Developer</h2>
        <div className="about__developer-me">
          <div className="about__developer-me-image"></div>
          <p className="about__developer-me-text">
            <span>Raul Calero</span> is a Software Engineer with extensive
            expertise in online live media production. Proficient in crafting
            seamless experiences that merge technical acumen with creative
            flair. A passionate problem-solver with a track record of driving
            innovation.
          </p>
        </div>
        <div className="about__developer-connect">
          <h3 className="about__developer-connect-title">Connect</h3>
          <div className="about__developer-connect-socials">
            <Link
              to={"linkedin.com/in/raulcalero/"}
              className="about__developer-connect-socials-linkedin"
            >
              LinkedIn
            </Link>
            <div className="about__developer-connect-socials-bot">
              <Link
                to={"github.com/TheCaptainKimchi"}
                className="about__developer-connect-socials-bot-github"
              >
                Github
              </Link>
              <Link
                to={"mailto:raulcalero7@gmail.com"}
                className="about__developer-connect-socials-bot-email"
              >
                Email
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Carousel className="carousel">
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={productionImage}
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>GLCRL Production</h3>
            <p>
              Directing flawless esports event: orchestrating strategy,
              coordination, execution for success.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={weatherImage}
            alt="Second slide"
          />
          <Carousel.Caption>
            <h3>Weather Report App</h3>
            <p>
              Custom built web application to capture local weather data and
              statistics and presented in a vibrant display.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={qlc} alt="Third slide" />
          <Carousel.Caption>
            <h3>QLC Season 2 Production</h3>
            <p>Small to large scale online live-production events.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default About;
