import React, { useEffect, useState } from "react";
import fetchUserData from "../util/FetchUserData";

const Profile = ({ accessToken }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const data = await fetchUserData(accessToken);
        setUserData(data);
      } catch (error) {
        // Handle error appropriately
      }
    };

    if (accessToken) {
      getUserData();
    }
  }, [accessToken]);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{userData.name}</h1>
      <p>ID: {userData.id}</p>
    </div>
  );
};

export default Profile;
