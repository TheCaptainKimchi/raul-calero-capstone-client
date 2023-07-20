import "./Home.scss";
import Hero from "../../Components/Hero/Hero";
import FeaturePromo from "../../Components/FeaturePromo/FeaturePromo";

const Home = () => {
  return (
    <div className="home">
    <Hero/>
    <FeaturePromo/>
    </div>
  )
}

export default Home