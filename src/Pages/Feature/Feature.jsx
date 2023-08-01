// Imports
import "./Feature.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const Feature = () => {
  // Call baseURL from .env
  const baseUrl = process.env.REACT_APP_API_BASE_URL;

  const navigate = useNavigate();

  // Store leaderboard data
  const [leaderboard, setLeaderboard] = useState(false);

  // Capture form data on submit
  function submitHandler(e) {
    e.preventDefault();
    const data = {
      username: e.target.username.value,
      tagline: e.target.tagline.value,
    };
    // Execute getPUUID function to get puuid
    getPuuid(data);
  }

  // Submit axios call to get PUUID using form data
  function getPuuid(data) {
    const name = data.username;
    const tag = data.tagline;

    axios
      .get(`${baseUrl}puuid?userName=${name}&tagline=${tag}`)
      .then((response) => {
        const puuid = response.data.puuid;
        const userName = response.data.gameName;
        const tagline = response.data.tagLine;

        navigate("/feature/results", { state: { puuid, userName, tagline } });
      })
      .catch((error) => {
        console.error(error);
        const errorElement = document.querySelector(".feature__form-hide");

        if (errorElement) {
          errorElement.className = "feature__form-error";
        }
      });
  }

  // Get leaderboard data
  useEffect(() => {
    axios
      .get(`${baseUrl}leaderboard`)
      .then((response) => {
        setLeaderboard(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    // eslint-disable-next-line
  }, []);

  // If no leaderboard data loaded yet, render skeleton
  if (!leaderboard) {
    return (
      <div className="loading">
        <form className="feature__form" onSubmit={submitHandler}>
          <h2 className="feature__form-title">SEARCH PLAYER</h2>
          <div className="feature__form-input">
            <input
              className="feature__form-input--username input"
              type="text"
              name="username"
              required
            ></input>
            <input
              className="feature__form-input--tagline input"
              type="text"
              name="tagline"
              required
            ></input>
          </div>
          <button className="feature__form-button">SEARCH</button>
          <p className="feature__form-hide">
            User not found. Try a different username or tagline.
          </p>
        </form>
      </div>
    );
  }

  return (
    // Render feature page
    <div className="feature">
      {/* Render leaderboard stats */}
      <div className="feature__leaderboard">
        <h2 className="feature__leaderboard-title">Leaderboard</h2>
        <div className="feature__leaderboard-container">
          <div className="feature__leaderboard-container-kda">
            <h3>MVP</h3>
            <div>
              <p>{leaderboard.bestKda.name}</p>
              <p>{`KDA: ${Number(leaderboard.bestKda.kda.toFixed(1))}`}</p>
            </div>
          </div>
          <div className="feature__leaderboard-container-list">
            <div className="feature__leaderboard-container-list-kills">
              <h3>One-Player-Army</h3>
              <p>{leaderboard.mostKills.name}</p>
              <p>{`Kills: ${leaderboard.mostKills.kills}`}</p>
            </div>
            <div className="feature__leaderboard-container-list-deaths">
              <h3>Ghost Whisperer</h3>
              <p>{leaderboard.mostDeaths.name}</p>
              <p>{`Deaths: ${leaderboard.mostDeaths.deaths}`}</p>
            </div>
            <div className="feature__leaderboard-container-list-assists">
              <h3>Team Player</h3>
              <p>{leaderboard.mostAssists.name}</p>
              <p>{`Assists: ${leaderboard.mostAssists.assists}`}</p>
            </div>
          </div>
        </div>
      </div>
      {/* Render form to search matches for a player */}
      <form className="feature__form" onSubmit={submitHandler}>
        <h2 className="feature__form-title">SEARCH PLAYER</h2>
        <div className="feature__form-input">
          <input
            className="feature__form-input--username input"
            type="text"
            name="username"
            placeholder="Enter Riot Id"
            required
          ></input>
          <input
            className="feature__form-input--tagline input"
            type="text"
            name="tagline"
            placeholder="Enter Tagline"
            required
          ></input>
        </div>
        <button className="feature__form-button">SEARCH</button>
        <p className="feature__form-hide">
          User not found. Try a different username or tagline.
        </p>
      </form>
    </div>
  );
};

export default Feature;
