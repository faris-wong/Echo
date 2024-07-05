import React from "react";
import MsgCard from "./MsgCard";
import InputBox from "./InputBox";

const ChatRoom = () => {
  return (
    <>
    <div>
      <MsgCard />
      <MsgCard />
    </div>
    <div>
      <InputBox />
    </div>
    </>
  );
};

export default ChatRoom;
