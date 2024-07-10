import { React, useState, useEffect, useContext } from "react";
import MsgCard from "./MsgCard";
import InputBox from "./InputBox";
import styles from "./css/Community.module.css";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useFetch from "../hooks/useFetch";
import { useParams } from "react-router-dom";
import UserContext from "../context/user";

const Community = (props) => {
  const userCtx = useContext(UserContext);
  const queryClient = useQueryClient();
  const usingFetch = useFetch();
  const params = useParams();
  const [communityData, setCommunityData] = useState({});

  // to display community name
  const {
    isSuccess: successful,
    isError: errorful,
    error: bad,
    isFetching: fetching,
    data: chicken,
  } = useQuery({
    queryKey: ["community", params.communityID],
    queryFn: async (id) =>
      await usingFetch(
        "/community",
        "POST",
        {
          id: params.communityID,
        },
        userCtx.accessToken
      ),
  });

  // to display messages in specific community
  const { isSuccess, isError, error, isFetching, data } = useQuery({
    queryKey: ["msgs", params.communityID],
    queryFn: async () =>
      await usingFetch(
        "/messagebycommunity",
        "POST",
        {
          id: params.communityID,
        },
        userCtx.accessToken
      ),
  });

  // to fetch profile of person sending message
  const {
    isSuccess: duck,
    isError: pig,
    error: dog,
    isFetching: cow,
    data: frog,
  } = useQuery({
    queryKey: ["profile"],
    queryFn: async () =>
      await usingFetch(
        "/profileaccount",
        "POST",
        {
          accountlink: props.authID,
        },
        userCtx.accessToken
      ),
  });

  // const getProfileByAuth = useMutation({
  //   mutationFn: async () => {
  //     return await usingFetch("/profileaccount", "POST", {
  //       accountlink: props.authID,
  //     });
  //   },
  //   // onSuccess: () => {
  //   //   queryClient.invalidateQueries(["msgs", params.communityID]);
  //   // },
  // });

  // useEffect(() => {
  //   console.log(props.authID);
  //   getProfileByAuth.mutate(props.authID);
  // }, []);

  const deleteMessage = useMutation({
    mutationFn: async (id) =>
      await usingFetch(
        "/message",
        "DELETE",
        {
          id,
        },
        userCtx.accessToken
      ),
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
        {successful && <h1>{chicken.communityname}</h1>}
      </div>
      <div className={styles.msgContainer}>
      
      {isFetching && <h1>Loading...</h1>}

      {isError && <div>{error.message}</div>}

      {isSuccess &&
        data.map((item) => {
          return (
            <MsgCard
              key={item._id}
              id={item._id}
              profile={item.profilelink.username}
              message={item.message}
              timeStamp={item.timeStamp}
              handleDelete={handleDelete}
            />
          );
        })}
        </div>
        <div>
        <InputBox communityID={params.communityID} profile={frog} />
      </div>
    </>
  );
};

export default Community;
