import React from "react";
import styles from "./css/MsgCard.module.css";
import { useQuery } from "@tanstack/react-query";

const MsgCard = (props) => {
  const formatTime = (date) => {
    const parsedDate = new Date(date);
    return parsedDate.toLocaleString("en-GB", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  const formatDate = (date) => {
    const parsedDate = new Date(date);
    return parsedDate.toLocaleDateString("en-GB");
  };

  const { isSuccess, isError, error, isFetching, data } = useQuery({
    queryKey: ["profile"],
    queryFn: async (id) =>
      await usingFetch(
        "/profile",
        "POST",
        {
          id: props.profile,
        },
        userCtx.accessToken
      ),
  });

  return (
    <div className={styles.cardContainer}>
      <div
        className={styles.delBtn}
        onClick={() => props.handleDelete(props.id)}
      >
        <i className="fa-solid fa-xmark"></i>
      </div>
      <div className={styles.updateBtn}>
        <i className="fa-regular fa-pen-to-square"></i>
      </div>
      <div className={styles.timeStamp}>
        <span>{`${formatDate(props.timeStamp)} | ${formatTime(
          props.timeStamp
        )}`}</span>
      </div>
      <h4>{props.profile}</h4>
      <span className={styles.status}>online</span>
      <div className={styles.textBox}>
        <p>{props.message}</p>
      </div>
    </div>
  );
};

export default MsgCard;
