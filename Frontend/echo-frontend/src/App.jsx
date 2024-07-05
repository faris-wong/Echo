import React from "react";
import ChatRoom from "./components/ChatRoom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const App = () => {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ChatRoom />
      </QueryClientProvider>
    </>
  );
};

export default App;
