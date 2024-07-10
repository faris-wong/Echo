import React from "react";
import Community from "./components/Community";
import Login from "./components/Login";
import Register from "./components/Register";
import UserContext from "./context/user";
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
} from "@tanstack/react-query";
import ProfilePage from "./components/ProfilePage";
import Navbar from "./components/Navbar";
import Newsfeed from "./components/Newsfeed";
import { Route, Routes } from "react-router-dom";
import { useState } from "react";

const queryClient = new QueryClient();
const App = () => {
  const [accessToken, setAccessToken] = useState("");
  const [role, setRole] = useState("");
  const [showLogin, setShowLogin] = useState(true);
  const [communityID, setCommunityID] = useState("");
  const [showCreateProfile, setShowCreateProfile] = useState(true);
  const [authID, setAuthID] = useState("");

  // const getProfileByAuth = useMutation({
  //   mutationFn: async () => {
  //     return await usingFetch("/profileaccount", "POST", {
  //       accountlink: authID,
  //     });
  //   },
  // });

  // useEffect(() => {
  //   getProfileByAuth.mutate(authID);
  // }, []);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <UserContext.Provider
          value={{ accessToken, setAccessToken, role, setRole }}
        >
          {/* using accesstoken to set display if accesstoken is true it will display, basically needs login */}
          <Navbar authID={authID} />
          <div className="content">
            <Routes>
              <Route path="Home" element={<Newsfeed />} />
              {accessToken && (
                <Route
                  path="community/:communityID"
                  element={
                    <Community communityID={communityID} authID={authID} />
                  }
                />
              )}

              <Route
                path="Profile"
                element={
                  <ProfilePage communityId={communityID} authID={authID} />
                }
              />
              {!accessToken && showLogin && (
                <Route
                  path="Login"
                  element={
                    <Login setShowLogin={setShowLogin} setAuthID={setAuthID} />
                  }
                />
              )}
            </Routes>
            {!accessToken && !showLogin && (
              <Register setShowLogin={setShowLogin} />
            )}
          </div>
        </UserContext.Provider>
      </QueryClientProvider>
    </>
  );
};

export default App;
