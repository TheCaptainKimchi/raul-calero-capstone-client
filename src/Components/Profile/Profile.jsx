import { useState, useEffect } from "react";
import axios from "axios";
import maps from "../../Data/Maps.json";
import agents from "../../Data/Agents.json";

const Profile = ({ isLoggedIn, setIsLoggedIn }) => {
  const [profileData, setProfileData] = useState(null);
  const matchList = [];
  const matchDataList = [];
  const [matchData, setMatchData] = useState(false);
  const renderedKeys = new Set();

  // When the isLoggedIn state changes, check if it's true and if so fetch the profile data
  useEffect(() => {
    if (isLoggedIn) {
      fetchProfile();
    }
  }, [isLoggedIn]);

  // With the auth token in session storage, we can now get the users details
  const fetchProfile = async () => {
    // Get the token from local storage
    const authToken = localStorage.getItem("authToken");

    try {
      // Do a GET request to the /profile endpoint to get the user's data
      const response1 = await axios.get(`http://localhost:8080/profile`, {
        headers: {
          authorization: `Bearer ${authToken}`,
        },
      });

      // Update the profileData state with the received data
      setProfileData(response1.data);

      // Now that profileData is updated, we can make the second Axios request
      const response2 = await axios.get(
        `http://localhost:8080/matchId?puuid=${response1.data.token.puuid}`
      );

      // Sort through response2 and store matchIds in a list
      response2.data.map((matchId) => {
        return matchList.push(matchId.matchId);
      });

      // Iterate through matchList to make calls to obtain each match data from array
      for (let i = 0; i < 9 && i < matchList.length; i++) {
        const response3 = await axios.get(
          `http://localhost:8080/match?matchId=${matchList[i]}`
        );
        matchDataList.push(response3.data);
      }

      setMatchData(matchDataList);
    } catch (error) {
      setMatchData("Error");
      console.error("Error fetching data:", error);
    }
  };

  const handleLogout = () => {
    // Unset the local storage auth token
    localStorage.removeItem("authToken");

    // Set the state to logged out
    setIsLoggedIn(false);
    setProfileData(null);
  };

  if (!matchData) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <section>
      <h2>
        Welcome {profileData.token.riotId} #{profileData.token.tagline}
      </h2>
      <button onClick={handleLogout}>Logout</button>
      {matchData.map((match) => {
        const key = match.matchInfo.matchId;

        if (renderedKeys.has(key)) {
          return null;
        }

        const playerDetails = match.players.find((player) => {
          return (
            player.gameName.localeCompare(profileData.token.riotId, undefined, {
              sensitivity: "base",
            }) === 0
          );
        });

        console.log(`===== ${playerDetails.gameName} =====`);

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
        };

        async function postData() {
          try {
            const response = await axios.post(
              `http://localhost:8080/leaderboard?id=${matchInfo.id}&userName=${matchInfo.userName}&tagline=${matchInfo.tagline}&puuid=${matchInfo.puuid}&kills=${matchInfo.kills}&deaths=${matchInfo.deaths}&assists=${matchInfo.assists}&kda=${matchInfo.kda}&acs=${matchInfo.acs}&map=${matchInfo.map}&agent=${matchInfo.agent}&mode=${matchInfo.mode}`
            );
            console.log("Response data:", response.data);

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
              <h3 className="match-container__header-mode">{mode}</h3>
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
    </section>
  );
};

export default Profile;
