import "./App.css";
import Login from "./components/Login";
import Insights from "./components/Insights";
import Profile from "./components/Profile";
import Pages from "./components/Pages";
import { useState, useEffect } from "react";
import loadFbSdk from "./util/loadFbSdk";

function App() {
  const [sdkLoaded, setSdkLoaded] = useState(false);
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [pageId, setPageId] = useState(null);

  useEffect(() => {
    loadFbSdk().then(() => {
      setSdkLoaded(true);
    });
  }, []);

  const responseFacebook = (response) => {
    setUser(response);
    setAccessToken(response.accessToken);
  };

  return (
    <div>
      {!user ? (
        <Login responseFacebook={responseFacebook} />
      ) : (
        <div>
          <Profile user={user} />
          <Pages accessToken={accessToken} setPageId={setPageId} />
          {pageId && <Insights pageId={pageId} accessToken={accessToken} />}
        </div>
      )}
    </div>
  );
}

export default App;
