// Imports
import { useState, useEffect } from "react";
import axios from "axios";
import maps from "../../Data/Maps.json";
import agents from "../../Data/Agents.json";
import "./Profile.scss";

const Profile = ({ isLoggedIn, setIsLoggedIn }) => {
  // Load baseUrl from .env file
  const baseUrl = process.env.REACT_APP_API_BASE_URL;

  // Store datasets in to states
  const [profileData, setProfileData] = useState(null);
  const [matchData, setMatchData] = useState(false);
  const [kills, setKills] = useState(0);
  const [deaths, setDeaths] = useState(0);
  const [assists, setAssists] = useState(0);
  const [matchWins, setMatchWins] = useState(0);
  const [matchLosses, setMatchLosses] = useState(0);

  // Store key list to avoid potential duplicates
  const renderedKeys = new Set();

  // When the isLoggedIn state changes, check if it's true and if so fetch the profile data
  useEffect(() => {
    if (isLoggedIn) {
      fetchProfile();
    }
    // eslint-disable-next-line
  }, [isLoggedIn]);

  // With the auth token in session storage, we can now get the user's details
  const fetchProfile = async () => {
    // Get the token from local storage
    const authToken = localStorage.getItem("authToken");

    try {
      // Do a GET request to the /profile endpoint to get the user's data
      const response = await axios.get(`${baseUrl}profile`, {
        headers: {
          authorization: `Bearer ${authToken}`,
        },
      });

      // Update the profileData state with the received data
      setProfileData(response.data);

      // Fetch lifetime data first
      const lifetimeDataResponse = await axios
        .get(`${baseUrl}leaderboard/${response.data.token.puuid}`)
        .catch((error) => {
          console.error(error);
        });

      // Data values to assist in calculating total amounts
      let totalKills = 0;
      let totalDeaths = 0;
      let totalAssists = 0;
      let totalWins = 0;
      let totalLosses = 0;

      // Calculate totals
      lifetimeDataResponse.data.forEach((data) => {
        totalKills += Number(data.kills);
        totalDeaths += Number(data.deaths);
        totalAssists += Number(data.assists);

        if (data.matchOutcome === "Victory") {
          totalWins += 1;
        } else if (data.matchOutcome === "Defeat") {
          totalLosses += 1;
        }
      });

      // Update the total states
      setKills(totalKills);
      setDeaths(totalDeaths);
      setAssists(totalAssists);
      setMatchWins(totalWins);
      setMatchLosses(totalLosses);

      // Fetch match data
      const matchIdResponse = await axios.get(
        `${baseUrl}matchId?puuid=${response.data.token.puuid}`
      );

      // Sort through matchIdResponse and store matchIds in a list
      const matchList = matchIdResponse.data.map((matchId) => matchId.matchId);

      // Iterate through matchList to make calls to obtain each match data from array
      const matchDataList = [];
      for (let i = 0; i < 9 && i < matchList.length; i++) {
        const response3 = await axios.get(
          `${baseUrl}match?matchId=${matchList[i]}`
        );
        matchDataList.push(response3.data);
      }

      setMatchData(matchDataList);
    } catch (error) {
      setMatchData("Error");
      console.error("Error fetching data:", error);
      // Unset the local storage auth token
      localStorage.removeItem("authToken");

      // Set the state to logged out
      setIsLoggedIn(false);
      setProfileData(null);
    }
  };

  // Run function to remove authtoken once user clicks to log-out
  const handleLogout = () => {
    // Unset the local storage auth token
    localStorage.removeItem("authToken");

    // Set the state to logged out
    setIsLoggedIn(false);
    setProfileData(null);
    window.location.reload();
  };

  // If matchData is set to false, render loading text
  if (!matchData) {
    return (
      <div className="loading">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    // Render profile component
    <div className="profile">
      {/* Display username and option to logout */}
      <div className="profile__top">
        <h1 className="profile__top-title">
          Welcome {profileData.token.riotId}
        </h1>
        <button onClick={handleLogout}>Logout</button>
      </div>

      {/* Display user stats */}
      <div className="profile__bot">
        {/* Display recent match stats */}
        <div className="profile__bot-matches">
          {matchData.map((match) => {
            const key = match.matchInfo.matchId;
            let matchOutcome = "";

            if (renderedKeys.has(key)) {
              return null;
            }

            const playerDetails = match.players.find((player) => {
              return (
                player.gameName.localeCompare(
                  profileData.token.riotId,
                  undefined,
                  {
                    sensitivity: "base",
                  }
                ) === 0
              );
            });

            const kda =
              (playerDetails.stats.kills + playerDetails.stats.assists) /
              playerDetails.stats.deaths;

            const acs =
              playerDetails.stats.score / match.roundResults.length - 1;

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

            // eslint-disable-next-line
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
                  `${baseUrl}leaderboard?id=${matchInfo.id}&userName=${matchInfo.userName}&tagline=${matchInfo.tagline}&puuid=${matchInfo.puuid}&kills=${matchInfo.kills}&deaths=${matchInfo.deaths}&assists=${matchInfo.assists}&kda=${matchInfo.kda}&acs=${matchInfo.acs}&map=${matchInfo.map}&agent=${matchInfo.agent}&mode=${matchInfo.mode}&matchOutcome=${matchOutcome}`
                );

                return response.data;
              } catch (error) {
                if (
                  error.response.data.error !==
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

        {/* Display stored lifetime stats */}
        <div className="profile__bot-lifetime">
          <h3 className="profile__bot-lifetime-title">Lifetime Stats</h3>
          <div className="profile__bot-lifetime-stats">
            <div className="profile__bot-lifetime-stats-matches">
              <p>W/L Rate: {Math.round((matchWins / matchLosses) * 10) / 10}</p>
              <p>Total Wins: {matchWins}</p>
              <p>Total Losses: {matchLosses}</p>
            </div>
            <p>
              Average KDA: {Math.round(((kills + assists) / deaths) * 10) / 10}
            </p>
            <p>Kills: {kills}</p>
            <p>Deaths: {deaths}</p>
            <p>Assists: {assists}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
