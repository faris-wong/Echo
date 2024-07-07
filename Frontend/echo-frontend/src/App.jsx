import React from "react";
import ChatRoom from "./components/ChatRoom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProfilePage from "./components/ProfilePage";
import Navbar from "./components/Navbar";
import Newsfeed from "./components/Newsfeed";
import { Route, Routes } from "react-router-dom";

const App = () => {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="Home" element={<Newsfeed />} />
            <Route path="Community" element={<ChatRoom />} />
            <Route path="Profile" element={<ProfilePage />} />
          </Routes>
        </div>
      </QueryClientProvider>
    </>
  );
};

export default App;
