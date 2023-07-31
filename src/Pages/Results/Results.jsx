/* eslint-disable react-hooks/exhaustive-deps */
import "./Results.scss";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import maps from "../../Data/Maps.json";
import agents from "../../Data/Agents.json";

const Results = () => {
  const location = useLocation();
  const matchList = [];
  const matchDataList = [];
  const [matchData, setMatchData] = useState();
  const renderedKeys = new Set();

  // Access the data from the state object
  const puuid = location.state?.puuid || {};
  const userName = location.state?.userName || {};
  const tagline = location.state?.tagline || {};

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Axios call to get matchID
        const response1 = await axios
          .get(`http://localhost:8080/matchId?puuid=${puuid}`)
          .catch((error) => {
            console.error(error.response);
          });

        // Sort through response1 and store matchIds in a list
        response1.data.map((matchId) => {
          return matchList.push(matchId.matchId);
        });

        // Iterate through matchList to make calls to obtain each match data from array
        for (let i = 0; i < 9 && i < matchList.length; i++) {
          const response2 = await axios.get(
            `http://localhost:8080/match?matchId=${matchList[i]}`
          );
          matchDataList.push(response2.data);
        }
        setMatchData(matchDataList);
      } catch (error) {
        setMatchData("Error");
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (!matchData) {
    return (
      <div className="results-loading">
        <div className="results-loading__header"></div>
        <div className="results-loading__card"></div>
        <div className="results-loading__card"></div>
        <div className="results-loading__card"></div>
      </div>
    );
  } else if (matchData.length === 0) {
    return (
      <div className="no-results">
        <div className="no-results__top">
          <Link className="results__top-return" to={"/feature"}>
            <img
              className="results__top-return-image"
              src="http://localhost:8080/icons/chevron-left.svg"
              alt="return-icon"
            ></img>
            <h3 className="results__top-return-text">Search Again</h3>
          </Link>
          <h2 className="results__top-user">{`${userName}#${tagline}`}</h2>
        </div>
        <div className="no-results__text">
          <p>No matches found. Try queuing up for some games</p>
        </div>
      </div>
    );
  } else if (matchData === "Error") {
    return (
      <div className="no-results">
        <div className="no-results__top">
          <Link className="results__top-return" to={"/feature"}>
            <img
              className="results__top-return-image"
              src="http://localhost:8080/icons/chevron-left.svg"
              alt="return-icon"
            ></img>
            <h3 className="results__top-return-text">Search Again</h3>
          </Link>
          <h2 className="results__top-user">{`${userName}#${tagline}`}</h2>
        </div>
        <div className="no-results__text">
          <p>No matches found. Try queuing up for some games</p>
        </div>
      </div>
    );
  }

  return (
    <div className="results">
      <div className="results__top">
        <Link className="results__top-return" to={"/feature"}>
          <img
            className="results__top-return-image"
            src="http://localhost:8080/icons/chevron-left.svg"
            alt="return-icon"
          ></img>
          <h3 className="results__top-return-text">Search Again</h3>
        </Link>
        <h2 className="results__top-user">{`${userName}#${tagline}`}</h2>
      </div>

      {matchData.map((match) => {
        const key = match.matchInfo.matchId;
        let matchOutcome = "";

        if (renderedKeys.has(key)) {
          return null;
        }

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

        const agent = agents.find((agent) => {
          const agentSearch = agent.id.toLowerCase();
          const agentPlayed = playerDetails.characterId.toLowerCase();

          return agentSearch === agentPlayed;
        });

        let mode = "";
        if (match.matchInfo.queueId === "ggteam") {
          mode = "escalation";
        } else if (match.matchInfo.queueId === "hurm") {
          mode = "team deathmatch";
        } else if (!match.matchInfo.queueId) {
          mode = "custom";
        } else {
          mode = match.matchInfo.queueId;
        }

        renderedKeys.add(key);

        match.teams.map((team) => {
          if (playerDetails.teamId === team.teamId) {
            if (team.won === true) {
              matchOutcome = "Victory";
            }
            if (team.won === false) {
              matchOutcome = "Defeat";
            }
          }
        });

        const matchInfo = {
          id: key,
          userName: playerDetails.gameName,
          tagline: playerDetails.tagLine,
          puuid: playerDetails.puuid,
          kills: playerDetails.stats.kills,
          deaths: playerDetails.stats.deaths,
          assists: playerDetails.stats.assists,
          kda: kda,
          acs: acs,
          map: map,
          agent: agent.name,
          mode: mode,
          matchOutcome: matchOutcome,
        };

        async function postData() {
          try {
            const response = await axios.post(
              `http://localhost:8080/leaderboard?id=${matchInfo.id}&userName=${matchInfo.userName}&tagline=${matchInfo.tagline}&puuid=${matchInfo.puuid}&kills=${matchInfo.kills}&deaths=${matchInfo.deaths}&assists=${matchInfo.assists}&kda=${matchInfo.kda}&acs=${matchInfo.acs}&map=${matchInfo.map}&agent=${matchInfo.agent}&mode=${matchInfo.mode}&matchOutcome=${matchInfo.matchOutcome}`
            );

            return response.data;
          } catch (error) {
            if (
              error.response.data.error !=
              "Data with the same id already exists"
            ) {
              console.error("Error posting data:", error);
            }
          }
        }
        postData();

        return (
          <div className={`match-container ${map}`} key={key}>
            <div className={`match-container__header`}>
              <div className="match-container__header-left">
                <h3 className="match-container__header-mode">{mode}</h3>
                <h3
                  className={`match-container__header-outcome`}
                  id={matchOutcome}
                >
                  {matchOutcome}
                </h3>
              </div>
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
                  <th>{agent.name}</th>
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
