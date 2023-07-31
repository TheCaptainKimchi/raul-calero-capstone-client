// Imports
import { Link } from "react-router-dom";
import "./FeaturePromo.scss";

const FeaturePromo = () => {
  // Render Promo component
  return (
    <div className="promo">
      <div className="promo__image"></div>
      <div className="promo__container">
        <h3 className="promo__container-title">Valorant Tool</h3>
        <p className="promo__container-text">
          Unleash your potential with our Valorant match analytics tool!
        </p>
        <Link className="promo__container-button" to={"/feature"}>
          <button>TRY NOW</button>
        </Link>
      </div>
    </div>
  );
};

export default FeaturePromo;
