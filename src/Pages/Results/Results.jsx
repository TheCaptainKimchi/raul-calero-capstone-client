import "./Results.scss";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import maps from "../../Data/Maps.json";

const Results = () => {
  const location = useLocation();
  const matchList = [];
  const matchDataList = [];
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

        // Sort through response1 and store matchIds in a list
        response1.data.map((matchId) => {
          return matchList.push(matchId.matchId);
        });

        // Iterate through matchList to make calls to obtain each match data from array
        for (let i = 0; i < 9; i++) {
          const response2 = await axios.get(
            `http://localhost:8080/match?matchId=${matchList[i]}`
          );
          matchDataList.push(response2.data);
        }
        setMatchData(matchDataList);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (!matchData) {
    return <div className="results">Loading...</div>;
  }

  return (
    <div className="results">
      {matchData.map((match, index) => {
        const playerDetails = match.players.find((player) => {
          return (
            player.gameName.localeCompare(userName, undefined, {
              sensitivity: "base",
            }) === 0
          );
        });

        const kda =
          (playerDetails.stats.kills + playerDetails.stats.assists) /
          playerDetails.stats.deaths;

        const acs = playerDetails.stats.score / match.roundResults.length - 1;

        const map = maps.find(
          (map) => map.assetPath === match.matchInfo.mapId
        )?.name;

        return (
          <div className={`match-container ${map}`} key={index}>
            <div className={`match-container__header`}>
              <h3 className="match-container__header-mode">
                {match.matchInfo.queueId}
              </h3>
              <h3 className="match-container__header-map">{map}</h3>
            </div>
            <table className="match-container__table">
              <thead>
                <tr>
                  <th>Agent</th>
                  <th>Kills</th>
                  <th>Deaths</th>
                  <th>Assists</th>
                  <th>KDA</th>
                  <th>ACS</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>Jett</th>
                  <th>{playerDetails.stats.kills}</th>
                  <th>{playerDetails.stats.deaths}</th>
                  <th>{playerDetails.stats.assists}</th>
                  <th>{Math.round(kda * 10) / 10}</th>
                  <th>{Math.round(acs * 10) / 10}</th>
                </tr>
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  );
};

export default Results;
