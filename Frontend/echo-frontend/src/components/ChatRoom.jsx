import React from "react";
import MsgCard from "./MsgCard";
import InputBox from "./InputBox";
import styles from "./css/ChatRoom.module.css";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useFetchNT from "../hooks/useFetchNT";

const ChatRoom = () => {
  const queryClient = useQueryClient();
  const usingFetch = useFetchNT()

  const { isSuccess, isError, error, isFetching, data } = useQuery({
    queryKey: ["msgs"],
    queryFn: async () => await usingFetch("/message", undefined, undefined),
  });

  return (
    <>
    {JSON.stringify(data)}
      {/* <div className={styles.header}>
        <h1>Indie Games Chatroom</h1>
      </div> */}
      <div className={styles.msgContainer}></div>
      <div>
        <InputBox />
      </div>
      {isFetching && <h1>Loading...</h1>}

      {isError && <div>{error.message}</div>}

      {isSuccess &&
        data.map((item) => {
          return (
            <MsgCard
              key={item._id}
              id={item._id}
              // username={item.profilelink.username}
              message={item.message}
              timeStamp={item.timeStamp}
            />
          );
        })}
    </>
  );
};

export default ChatRoom;
