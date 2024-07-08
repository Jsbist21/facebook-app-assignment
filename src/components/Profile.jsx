import React from "react";

const Profile = ({ user }) => {
  return (
    <div>
      <h2>{user.name}</h2>
      <img src={user.picture.data.url} alt={user.name} />
    </div>
  );
};

export default Profile;
