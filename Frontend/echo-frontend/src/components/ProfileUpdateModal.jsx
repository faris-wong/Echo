import React from "react";
import ReactDOM from "react-dom";
import useFetchNT from "../hooks/useFetchNT";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import styles from "./css/ProfileUpdateModal.module.css";

const Overlay = (props) => {
  const usingFetch = useFetchNT();
  const queryClient = useQueryClient();

  const { mutate: callUpdateProfile } = useMutation({
    mutationFn: async () =>
      await usingFetch("/profile/" + props.id, "PATCH", {
        bio,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(["profile"]),
        props.setShowUpdateModal(false);
    },
  });
  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <h1>Helloooooo</h1>
      </div>
    </div>
  );
};

const ProfileUpdateModal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Overlay
          id={props.id}
          bio={props.bio}
          status={props.status}
          community={props.community}
          setShowUpdateModal={props.setShowUpdateModal}
        />,
        document.querySelector("#root")
      )}
    </>
  );
};

export default ProfileUpdateModal;
