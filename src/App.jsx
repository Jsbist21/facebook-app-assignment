import "./App.css";
import Login from "./components/Login";
import Insights from "./components/Insights";
import Profile from "./components/Profile";
import Pages from "./components/Pages";
import { useState, useEffect } from "react";

function App() {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [pageId, setPageId] = useState(null);

  const responseFacebook = (response) => {
    setUser(response.profile);
    setAccessToken(response.accessToken);
  };

  return (
    <div>
      {!user ? (
        <Login responseFacebook={responseFacebook} />
      ) : (
        <div>
          <Profile accessToken={accessToken} />
          <Pages accessToken={accessToken} setPageId={setPageId} />
          {pageId && <Insights pageId={pageId} accessToken={accessToken} />}
        </div>
      )}
    </div>
  );
}

export default App;
