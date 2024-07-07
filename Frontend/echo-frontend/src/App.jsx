import React from "react";
import ChatRoom from "./components/ChatRoom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProfilePage from "./components/ProfilePage";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";

const App = () => {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="Community" element={<ChatRoom />} />
            <Route path="Profile" element={<ProfilePage />} />
          </Routes>
        </div>
      </QueryClientProvider>
    </>
  );
};

export default App;
