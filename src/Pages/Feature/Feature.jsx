import "./Feature.scss";
import CardSection from "../../Components/CardSection/CardSection";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const Feature = () => {

    // useNavigate
    const navigate = useNavigate()

    // Capture form data on submit
    function submitHandler(e) {
        e.preventDefault();
        const data = {
            username: e.target.username.value,
            tagline: e.target.tagline.value
        };
        getPuuid(data)
    }

    function getPuuid(data) {
        axios.get(`http://localhost:8080/puuid?userName=${data.username}&tagline=${data.tagline}`)
        .then((response) => {

            const puuid = response.data.puuid;

            navigate('/feature/results', { state: { puuid } });

        })
    }


    // Axios call to find match data
    return (
        <div className="feature">
            <div className="feature__leaderboard">
                <h2 className="feature__title">Leaderboard</h2>
                <CardSection />
            </div>
            <form className="feature__form" onSubmit={submitHandler}>
                <h2 className="feature__form-title">SEARCH PLAYER</h2>
                <div className="feature__form-input">
                    <input className="feature__form-input--username input" type="text" name="username" required></input>
                    <input className="feature__form-input--tagline input" type="text" name="tagline" required></input>
                </div>
                <button className="feature__form-button">SEARCH</button>
            </form>
        </div>
    );
};

export default Feature;

