import "./Feature.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const Feature = () => {
  // useNavigate
  const navigate = useNavigate();
  const [leaderboard, setLeaderboard] = useState();

  // Capture form data on submit
  function submitHandler(e) {
    e.preventDefault();
    const data = {
      username: e.target.username.value,
      tagline: e.target.tagline.value,
    };
    getPuuid(data);
  }

  // Submit axios call to get PUUID using form data
  function getPuuid(data) {
    const name = data.username;
    const tag = data.tagline;

    axios
      .get(`http://localhost:8080/puuid?userName=${name}&tagline=${tag}`)
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
      .get(`http://localhost:8080/leaderboard`)
      .then((response) => {
        setLeaderboard(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  if (!leaderboard) {
    return (
      <div className="feature">
        <div className="feature__leaderboard">
          <h2 className="feature__title">Leaderboard</h2>
          <p>Loading...</p>
        </div>
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

  const roundedKda = Number(leaderboard.bestKda.kda.toFixed(1));

  return (
    <div className="feature">
      <div className="leaderboard-wrapper">
        <div className="feature__leaderboard">
          <h2 className="feature__leaderboard-title">Leaderboard</h2>
          <div className="feature__leaderboard-container">
            <div className="feature__leaderboard-container-kda">
              <h3>MVP</h3>
              <div>
                <p>{leaderboard.bestKda.name}</p>
                <p>{`KDA: ${roundedKda}`}</p>
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
      </div>
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
};

export default Feature;
