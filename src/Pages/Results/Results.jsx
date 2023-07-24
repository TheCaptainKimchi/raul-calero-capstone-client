import "./Results.scss";
import { useLocation } from 'react-router-dom';

const Results = () => {
    const location = useLocation();

    // Access the data from the state object
    const data = location.state?.data || {};
  
    return (
        <div className="results">
            
        </div>
    );
};

export default Results;

