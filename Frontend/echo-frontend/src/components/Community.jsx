import { React, useState } from "react";
import MsgCard from "./MsgCard";
import InputBox from "./InputBox";
import styles from "./css/ChatRoom.module.css";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useFetchNT from "../hooks/useFetchNT";
import { useParams } from "react-router-dom";

const Community = (props) => {
  const queryClient = useQueryClient();
  const usingFetch = useFetchNT();
  const params = useParams();
  const [communityData, setCommunityData] = useState({});

  const {
    isSuccess: successful,
    isError: errorful,
    error: bad,
    isFetching: fetching,
    data: chicken,
  } = useQuery({
    queryKey: ["community", params.communityID],
    queryFn: async (id) =>
      await usingFetch("/community", "POST", {
        id: params.communityID,
      }),
  });

  const { isSuccess, isError, error, isFetching, data } = useQuery({
    queryKey: ["msgs", params.communityID],
    queryFn: async (id) =>
      await usingFetch("/messagebycommunity", "POST", {
        id: params.communityID,
      }),
  });

  const {
    isSuccess: duck,
    isError: pig,
    error: dog,
    isFetching: cow,
    data: frog,
  } = useQuery({
    queryKey: ["profile"],
    queryFn: async (accountlink) =>
      await usingFetch("/profileaccount", "POST", {
        accountlink: props.authID,
      }),
  });

  const deleteMessage = useMutation({
    mutationFn: async (id) =>
      await usingFetch("/message", "DELETE", {
        id,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(["msgs", params.communityID]);
    },
  });

  const handleDelete = (id) => {
    deleteMessage.mutate(id);
  };

  return (
    <>
      {/* <h1>{JSON.stringify(frog)}</h1> */}
      {/* <div className={styles.header}>
        {successful && <h1>{chicken.communityname} </h1>}
      </div> */}
      <div className={styles.msgContainer}></div>
      <div>
        <InputBox communityID={params.communityID} profile={frog} />
      </div>
      {isFetching && <h1>Loading...</h1>}

      {isError && <div>{error.message}</div>}

      {isSuccess &&
        data.map((item) => {
          return (
            <MsgCard
              key={item._id}
              id={item._id}
              profile={frog}
              message={item.message}
              timeStamp={item.timeStamp}
              handleDelete={handleDelete}
            />
          );
        })}
    </>
  );
};

export default Community;
