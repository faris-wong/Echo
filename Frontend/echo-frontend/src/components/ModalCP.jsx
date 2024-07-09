import React from "react";
import ReactDOM from "react-dom";
import useFetchNT from "../hooks/useFetchNT";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import styles from "./css/ModalCP.module.css";

const Overlay = (props) => {
  const [username, setUsername] = useState("");
  const usingFetch = useFetchNT();
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async () =>
      await usingFetch("/profile/" + props.authId, "PUT", {
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
            onClick={() => {
              mutate();
              props.setModalCP(false);
            }}
          ></i>
        </div>
        Please decide on a Username:
        <div>
          <input
            type="text"
            placeholder="username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
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
          authId={props.authId}
          setUserId={props.setUserId}
          setModalCP={props.setModalCP}
        />,
        document.querySelector("#root")
      )}
    </>
  );
};

export default ModalCP;
