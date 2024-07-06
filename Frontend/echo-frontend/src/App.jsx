import React from "react";
import ChatRoom from "./components/ChatRoom";
import Login from "./components/Login";
import Register from "./components/Register";
import UserContext from "./context/user";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

const App = () => {
  const queryClient = new QueryClient();
  const [accessToken, setAccessToken] = useState("");
  const [role, setRole] = useState("");
  const [showLogin, setShowLogin] = useState(true);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <UserContext.Provider
          value={{ accessToken, setAccessToken, role, setRole }}
        >
          {/* using accesstoken to set display if accesstoken is true it will display, basically needs login */}
          {!accessToken && showLogin && <Login setShowLogin={setShowLogin} />}
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
