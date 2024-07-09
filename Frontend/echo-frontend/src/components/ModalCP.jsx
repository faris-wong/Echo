import React from "react";
import ReactDOM from "react-dom";
import useFetchNT from "../hooks/useFetchNT";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import styles from "./css/ModalCP.module.css";

const Overlay = (props) => {
  const usingFetch = useFetchNT();
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async () =>
      await usingFetch("/profile/" + props.id, "PUT", {
        username,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(["profileCreation"]),
        props.setModalCP(false);
    },
  });
  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <div className={styles.delBtn}>
          <i
            className="fa-solid fa-xmark"
            onClick={() => props.setShowUpdateModal(false)}
          ></i>
        </div>
        Please decide on a Username:
        <div>
          <input type="text"></input>
        </div>
      </div>
    </div>
  );
};

const ModalCP = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Overlay
          id={props.id}
          authId={props.authId}
          username={props.username}
          setModalCP={props.setModalCP}
        />,
        document.querySelector("#root")
      )}
    </>
  );
};

export default ModalCP;
