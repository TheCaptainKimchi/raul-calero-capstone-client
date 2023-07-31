// Imports
import "./Home.scss";
import Hero from "../../Components/Hero/Hero";
import FeaturePromo from "../../Components/FeaturePromo/FeaturePromo";

const Home = () => {
  // Render home page
  return (
    <div className="home">
      {/* Hero component */}
      <Hero />

      {/* Feature promo component */}
      <FeaturePromo />
    </div>
  );
};

export default Home;
