// Import
import { Link } from "react-router-dom";
import "./NotFound.scss";

const NotFound = () => {
  // Render not found page
  return (
    <div className="not-found">
      <div className="not-found__text">
        <h1>404 Page Not Found</h1>
        <Link to={"/"}>
          <button>Take me back home!</button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
