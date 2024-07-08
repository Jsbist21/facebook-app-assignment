// Login.jsx

import React from "react";
import { FacebookProvider, LoginButton } from "react-facebook";
import loadFbSdk from "../util/loadFbSdk"; // Import your SDK loader

const Login = ({ responseFacebook }) => {
  const handleResponse = (data) => {
    responseFacebook(data.profile);
  };

  const handleError = (error) => {
    console.log(error);
  };

  // Ensure SDK is loaded before rendering FacebookProvider
  loadFbSdk()
    .then(() => {
      console.log("Facebook SDK loaded successfully.");
    })
    .catch((error) => {
      console.error("Failed to load Facebook SDK:", error);
    });

  return (
    <FacebookProvider appId={import.meta.env.VITE_FACEBOOK_APP_ID}>
      <LoginButton
        scope="email"
        onCompleted={handleResponse}
        onError={handleError}
      >
        <span>Login via Facebook</span>
      </LoginButton>
    </FacebookProvider>
  );
};

export default Login;
