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
        throw new error();
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
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl mt-4">
      <div className="p-4 flex items-center">
        <img
          src={userData.picture?.data.url}
          alt={userData.name}
          className="rounded-full h-16 w-16 flex-shrink-0"
        />
        <div className="ml-4">
          <h1 className="text-2xl font-bold">{userData.name}</h1>
        </div>
      </div>
    </div>
  );
};

export default Profile;
