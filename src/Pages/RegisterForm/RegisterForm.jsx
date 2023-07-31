import axios from "axios";
import { useState } from "react";
import "./RegisterForm.scss";
import { useNavigate } from "react-router-dom";
import maps from "../../Data/Maps.json";
import agents from "../../Data/Agents.json";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [registerError, setRegisterError] = useState("");
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const matchDetails = [];
  const renderedKeys = new Set();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;

    const username = form.registerUsername.value;
    const riotId = form.registerRiotId.value;
    const tagline = form.registerTagline.value;
    const email = form.registerEmail.value;
    const password = form.registerPassword.value;
    const confirmPassword = form.confirmPassword.value;
    let puuid = "";
    let newUsername = "";
    let newTagline = "";

    if (password !== confirmPassword) {
      setRegisterError("Passwords do not match");
    }

    setRegisterError("");

    try {
      const response = await axios.get(
        `http://localhost:8080/puuid?userName=${riotId}&tagline=${tagline}`
      );
      puuid = response.data.puuid;
      newUsername = response.data.gameName;
      newTagline = response.data.tagLine;

      await axios.post(
        `http://localhost:8080/register?username=${username}&password=${password}&riotId=${newUsername}&tagline=${newTagline}&email=${email}&puuid=${puuid}`
      );

      const response2 = await axios.get(
        `http://localhost:8080/matchId?puuid=${puuid}`
      );

      // Create an array to store all the axios requests for match data
      const matchRequests = response2.data.map((match) => {
        return axios.get(
          `http://localhost:8080/match?matchId=${match.matchId}`
        );
      });

      // Wait for all the match data requests to complete
      const matchResponses = await Promise.all(matchRequests);

      // Extract the data from each response and store it in matchDetails
      const matchDetails = matchResponses.map((response) => response.data);

      // Now you can perform the map operation on matchDetails
      const matchMap = matchDetails.map((match) => {
        const key = match.matchInfo.matchId;
        let matchOutcome = "";

        if (renderedKeys.has(key)) {
          return null;
        }

        const playerDetails = match.players.find((player) => {
          return (
            player.gameName.localeCompare(newUsername, undefined, {
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
      });

      setRegisterSuccess(true);
      navigate("/profile");
    } catch (error) {
      if (error.response) {
        setRegisterError(error.response.data.message);
      } else {
        setRegisterError("An error occurred during registration.");
      }
    }
  };

  return (
    <div className="register">
      <form onSubmit={handleSubmit} className="register__form">
        <h2 className="register__form-title">Register</h2>
        <div className="register__form-username">
          <label htmlFor="registerUsername">Username</label>
          <input type="text" name="registerUsername" id="registerUsername" />
        </div>
        <div className="register__form-riot-id">
          <label htmlFor="registerRiotId">Riot Id</label>
          <input type="text" name="registerRiotId" id="registerRiotId" />
        </div>
        <div className="register__form-tagline">
          <label htmlFor="registerTagline">Tagline</label>
          <input type="text" name="registerTagline" id="registerTagline" />
        </div>
        <div className="register__form-email">
          <label htmlFor="registerEmail">Email</label>
          <input type="text" name="registerEmail" id="registerEmail" />
        </div>
        <div className="register__form-password">
          <label htmlFor="registerPassword">Password</label>
          <input
            type="password"
            name="registerPassword"
            id="registerPassword"
          />
        </div>
        <div className="register__form-confirm-password">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input type="password" name="confirmPassword" id="confirmPassword" />
        </div>
        <button>Register</button>
        {registerError && <p>{registerError}</p>}
        {registerSuccess && <p>Success! Please login</p>}
      </form>
    </div>
  );
};

export default RegisterForm;
