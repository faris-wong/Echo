import React from "react";
import styles from "./css/InputBox.module.css";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import useFetchNT from "../hooks/useFetchNT";

const InputBox = (props) => {
  const queryClient = useQueryClient();
  const usingFetch = useFetchNT();
  const [messageText, setMessageText] = useState("");

  const { isSuccess, isError, error, isFetching, data } = useQuery({
    queryKey: ["msgs"],
    queryFn: async () => await usingFetch("/message", undefined, undefined),
  });

  const { mutate } = useMutation({
    mutationFn: async () =>
      await usingFetch("/message", "PUT", {
        message: messageText,
        profile: props.profile[0]._id,
        community: props.communityID,
      }),
    onSuccess: () => {
      setMessageText("");
      queryClient.invalidateQueries(["msgs"]);
      window.scrollTo(0, document.body.scrollHeight);
    },
  });

  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      mutate();
    }
  };
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className={styles.window}>
      <div className={styles.container}>
        <input
          type="text"
          placeholder="Enter message"
          value={messageText}
          onChange={(event) => setMessageText(event.target.value)}
        />
        <div className={styles.sendBtn} onClick={mutate}>
          <i className="fa-solid fa-paper-plane"></i>
        </div>
      </div>
    </div>
  );
};

export default InputBox;
