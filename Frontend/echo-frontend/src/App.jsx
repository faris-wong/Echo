import React from "react";
import ChatRoom from "./components/ChatRoom";
import Login from "./components/Login";
import Register from "./components/Register";
import UserContext from "./context/user";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProfilePage from "./components/ProfilePage";
import Navbar from "./components/Navbar";
import Newsfeed from "./components/Newsfeed";
import { Route, Routes } from "react-router-dom";
import { useState } from "react";

const App = () => {
  const queryClient = new QueryClient();

  const [accessToken, setAccessToken] = useState("");
  const [role, setRole] = useState("");
  const [showLogin, setShowLogin] = useState(true);
  const [profileID, setProfileID] = useState("");
  const [communityID, setCommunityID] = useState("");
  const [showCreateProfile, setShowCreateProfile] = useState(true);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Navbar setCommunityID={setCommunityID} />
        <div className="content">
          <Routes>
            <Route path="Home" element={<Newsfeed />} />
            <Route
              path="Community"
              element={<ChatRoom communityID={communityID} />}
            />
            <Route
              path="Profile"
              element={<ProfilePage profileID={profileID} />}
            />
          </Routes>
        </div>
        <UserContext.Provider
          value={{ accessToken, setAccessToken, role, setRole }}
        >
          {/* using accesstoken to set display if accesstoken is true it will display, basically needs login */}
          {!accessToken && showLogin && (
            <Login setShowLogin={setShowLogin} setProfileID={setProfileID} />
          )}
          {!accessToken && !showLogin && (
            <Register setShowLogin={setShowLogin} />
          )}
          {accessToken && <ChatRoom />}
        </UserContext.Provider>
      </QueryClientProvider>
    </>
  );
};

export default App;
