import React from "react";
import ChatRoom from "./components/ChatRoom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProfilePage from "./components/ProfilePage";

const App = () => {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        {/* <ChatRoom /> */}
        <ProfilePage />
      </QueryClientProvider>
    </>
  );
};

export default App;
