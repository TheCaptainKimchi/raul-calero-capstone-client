import { useState, useEffect } from "react";
import axios from "axios";

const Profile = ({ isLoggedIn, setIsLoggedIn }) => {
  const [profileData, setProfileData] = useState(null);

  // When the isLoggedIn state changes, check if it's true and if so fetch the profile data
  useEffect(() => {
    if (isLoggedIn) {
      fetchProfile();
    }
  }, [isLoggedIn]);

  // With the auth token in session storage, we can now get the users details
  const fetchProfile = () => {
    // Get the token from local storage
    const authToken = localStorage.getItem("authToken");

    // Do a GET request to the /profile endpoint to get the users data (pass the auth token in the authorization header)
    axios
      .get(`http://localhost:8080/profile`, {
        headers: {
          authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => {
        setProfileData(response.data);
      })
      .catch((err) => {
        console.log("Profile fetch error: ", err.response.data);
      });
  };

  const handleLogout = () => {
    // Unset the local storage auth token
    localStorage.removeItem("authToken");

    // Set the state to logged out
    setIsLoggedIn(false);
    setProfileData(null);
  };

  if (!profileData) {
    return <p>Loading...</p>;
  }

  return (
    <section>
      <h2>Welcome {profileData.token.riotId}</h2>
      <p></p>
      <button onClick={handleLogout}>Logout</button>
    </section>
  );
};

export default Profile;
