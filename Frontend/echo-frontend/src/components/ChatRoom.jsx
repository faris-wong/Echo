import React from "react";
import MsgCard from "./MsgCard";
import InputBox from "./InputBox";
import styles from "./css/ChatRoom.module.css";

const ChatRoom = () => {
  return (
    <>
      <div className={styles.header}>
        <h1>Indie Games Chatroom</h1>
      </div>
      <div className={styles.msgContainer}>
        <MsgCard />
        <MsgCard />
        <MsgCard />
        <MsgCard />
        <MsgCard />
        <MsgCard />
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
