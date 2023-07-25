import "./Results.scss";
import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import axios from "axios";

const Results = () => {
    const location = useLocation();
    const [matchData, setMatchData] = useState();

    // Access the data from the state object
    const puuid = location.state?.puuid || {};

    useEffect(() => {
      const fetchData = async () => {
        try {
          // Axios call to get matchID
          const response1 = await axios.get(`http://localhost:8080/matchId?puuid=${puuid}`);
    
          // Axios call to get match data
          const response2 = await axios.get(`http://localhost:8080/match?matchId=${response1.data[0].matchId}`);
          setMatchData(response2.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
    
      fetchData();
    }, []);
    

      if (!matchData) {
        return(<div className="results">Loading...</div>)
      }
      return (
        <div className="results">
            <p>{matchData.matchInfo.matchId}</p>
        </div>
      )
};

export default Results;

