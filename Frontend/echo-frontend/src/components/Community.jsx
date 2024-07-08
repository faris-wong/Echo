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

  const getCommunityByID = async () => {
    try {
      const response = await fetch(
        import.meta.env.VITE_SERVER + `/community/${params.communityID}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: {
            id: params.communityID,
          },
        }
      );
      if (!response.ok) {
        throw new Error("fetch error");
      }
      const chicken = await response.json();
      setCommunityData(chicken);
    } catch (error) {
      console.log(error.message);
    }
  };

  const { isSuccess, isError, error, isFetching, data } = useQuery({
    queryKey: ["msgs", params.communityID],
    queryFn: async (id) =>
      await usingFetch("/messagebycommunity", "POST", {
        id: params.communityID,
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
      <div className={styles.header}>
        <h1>{JSON.stringify(communityData)}</h1>
      </div>
      <div className={styles.msgContainer}></div>
      <div>
        <InputBox
          communityID={params.communityID}
          profileID={props.profileID}
        />
      </div>
      {isFetching && <h1>Loading...</h1>}

      {isError && <div>{error.message}</div>}

      {isSuccess &&
        data.map((item) => {
          return (
            <MsgCard
              key={item._id}
              id={item._id}
              //  username={item.profilelink.username}
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
