import "./App.css";
import Login from "./components/Login";
import Insights from "./components/Insights";
import Profile from "./components/Profile";
import Pages from "./components/Pages";
import { useState } from "react";

function App() {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [pageId, setPageId] = useState(null);
  const [pageAccessToken, setPageAccessToken] = useState(null);

  const responseFacebook = (response) => {
    setUser(response.profile);
    setAccessToken(response.accessToken);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <h1 className="text-4xl font-bold mt-8 mb-4">Insight App</h1>
      {!user ? (
        <div className="flex-grow flex items-center justify-center">
          <Login responseFacebook={responseFacebook} />
        </div>
      ) : (
        <div className="flex-grow w-full max-w-4xl p-4">
          <Profile accessToken={accessToken} />
          <Pages
            accessToken={accessToken}
            setPageId={setPageId}
            setPageAccessToken={setPageAccessToken}
          />
          {pageId && pageAccessToken && (
            <Insights pageId={pageId} accessToken={pageAccessToken} />
          )}
        </div>
      )}
    </div>
  );
}

export default App;
