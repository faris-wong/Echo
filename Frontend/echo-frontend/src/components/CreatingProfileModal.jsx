import React from "react";
import ReactDOM from "react-dom";
import useFetchNT from "../hooks/useFetchNT";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import styles from "./css/ProfileUpdateModal.module.css";

const Overlay = (props) => {
  const usingFetch = useFetchNT();
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async () =>
      await usingFetch("/profile/" + props.id, "PUT", {
        bio,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(["createProfile"]),
        props.setShowUpdateModal(false);
    },
  });
  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <div className="row">
          <div className="col-md-3">
            <input></input>
          </div>
        </div>
      </div>
    </div>
  );
};

const CreatingProfileModal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Overlay setShowUpdateModal={props.setShowUpdateModal} />,
        document.querySelector("#root")
      )}
    </>
  );
};

export default CreatingProfileModal;
