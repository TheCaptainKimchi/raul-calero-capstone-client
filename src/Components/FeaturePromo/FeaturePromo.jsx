import { Link } from "react-router-dom";
import "./FeaturePromo.scss";

const FeaturePromo = () => {
  return (
    <div className='promo'>
        <div className="promo__image"></div>
        <div className="promo__container">
            <h3 className="promo__container-title">TITLE</h3>
            <p className="promo__container-text">Lorem ipsum dolor sit amet consectetur adipisicing.</p>
            <Link className="promo__container-button" to={"/feature"}><button>TRY NOW</button></Link>
        </div>
    </div>
  )
}

export default FeaturePromo