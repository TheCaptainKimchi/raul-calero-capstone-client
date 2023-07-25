import "./Results.scss";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import maps from "../../Data/Maps.json";

const Results = () => {
  const location = useLocation();
  const [matchData, setMatchData] = useState();

  // Access the data from the state object
  const puuid = location.state?.puuid || {};
  const userName = location.state?.userName || {};
  const tagline = location.state?.tagline || {};

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Axios call to get matchID
        const response1 = await axios.get(
          `http://localhost:8080/matchId?puuid=${puuid}`
        );

        // Axios call to get match data
        const response2 = await axios.get(
          `http://localhost:8080/match?matchId=${response1.data[0].matchId}`
        );
        setMatchData(response2.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (!matchData) {
    return <div className="results">Loading...</div>;
  }

  let playerDetails = matchData.players.find((player) => {
    return (
      player.gameName.localeCompare(userName, undefined, {
        sensitivity: "base",
      }) === 0
    );
  });

  let map = maps.find((map) => {
    if (map.assetPath === matchData.matchInfo.mapId) {
      return map;
    }
  });

  const kda =
    (playerDetails.stats.kills + playerDetails.stats.assists) /
    playerDetails.stats.deaths;
  const acs = playerDetails.stats.score / matchData.roundResults.length - 1;
  return (
    <div className="results">
      <div className="results__general">
        <p className="results__general-name">{`${playerDetails.gameName}#${playerDetails.tagLine}`}</p>
        <p className="results__general-mode">{matchData.matchInfo.queueId}</p>
        <p className="results__general-map">{map.name}</p>
      </div>
      <table className="results__player">
        <thead className="results__player-head">
          <tr>
            <th>Agent</th>
            <th>Kills</th>
            <th>Deaths</th>
            <th>Assists</th>
            <th>KDA</th>
            <th>ACS</th>
          </tr>
        </thead>
        <tbody className="results__player-body">
          <tr>
            <td>Jett</td>
            <td>{playerDetails.stats.kills}</td>
            <td>{playerDetails.stats.deaths}</td>
            <td>{playerDetails.stats.assists}</td>
            <td>{Math.round(kda * 10) / 10}</td>
            <td>{Math.round(acs * 10) / 10}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Results;
