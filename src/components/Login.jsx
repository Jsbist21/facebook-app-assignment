import React, { useState, useEffect } from "react";
import loadFbSdk from "../util/loadFbSdk";
const Login = ({ responseFacebook }) => {
  const [sdkLoaded, setSdkLoaded] = useState(false);

  useEffect(() => {
    loadFbSdk().then(() => {
      setSdkLoaded(true);
    });
  }, []);

  const handleLogin = () => {
    if (!sdkLoaded) {
      console.error("Facebook SDK not loaded yet.");
      return;
    }
    window.FB.login(
      function (response) {
        if (response.authResponse) {
          window.FB.api(
            "/me",
            { fields: "name, email, picture" },
            function (profileResponse) {
              responseFacebook({
                ...response.authResponse,
                profile: profileResponse,
              });
            }
          );
        } else {
          console.log("User cancelled login or did not fully authorize.");
        }
      },
      { scope: "email,public_profile,pages_show_list" }
    );
  };

  return <button onClick={handleLogin}>Login via Facebook</button>;
};

export default Login;
