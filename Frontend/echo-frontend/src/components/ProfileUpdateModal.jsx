import React, { useContext, useState } from "react";
import ReactDOM from "react-dom";
import UserContext from "../context/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import styles from "./css/ProfileUpdateModal.module.css";
import useFetch from "../hooks/useFetch";

const Overlay = (props) => {
  const userCtx = useContext(UserContext);
  const usingFetch = useFetch();
  const queryClient = useQueryClient();
  const [username, setUsername] = useState(props.username);
  const [form, setForm] = useState({
    username: props.username,
    status: props.status,
    bio: props.bio,
    community: props.community,
  });

  const mutate = useMutation({
    mutationFn: async () =>
      await usingFetch(
        "/profile/" + props.id,
        "PATCH",
        {
          username: form.username,
          bio: form.bio,
          status: form.status,
          community: form.community,
        },
        userCtx.accessToken
      ),
    onSuccess: () => {
      queryClient.invalidateQueries(["profile"]),
        props.setShowUpdateModal(false);
    },
  });

  const updateBtn = () => {
    mutate.mutate();
  };
  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <div className={styles.delBtn}>
          <i
            className="fa-solid fa-xmark"
            onClick={() => props.setShowUpdateModal(false)}
          ></i>
        </div>
        <h1>Update Profile</h1>
        <div className="row">
          <div className="col-md-2">Username:</div>
          <input
            type="text"
            value={form.username}
            className="col-md-3"
            onChange={(e) =>
              setForm((prev) => ({ ...prev, username: e.target.value }))
            }
          />

          <div className="col-md-2">Status:</div>
          <select
            className="col-md-3"
            value={form.status}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, status: e.target.value }))
            }
          >
            <option value="Online">Online</option>
            <option value="In-game">In-game</option>
            <option value="AFK">AFK</option>
            <option value="Offline">Offline</option>
          </select>
        </div>
        <div className="col-md-12">
          Bio:
          <input
            type="text"
            className="col-md-12"
            value={form.bio}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, bio: e.target.value }))
            }
          />
        </div>

        <div className="col-md-12">
          Your:
          <input
            type="text"
            className="col-md-12"
            value={form.community}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, community: e.target.value }))
            }
          />
        </div>

        <button onClick={updateBtn}>update</button>
      </div>
    </div>
  );
};

const ProfileUpdateModal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Overlay
          id={props.data[0]._id}
          bio={props.data[0].bio}
          status={props.data[0].status}
          community={props.data[0].community}
          username={props.data[0].username}
          setShowUpdateModal={props.setShowUpdateModal}
        />,
        document.querySelector("#root")
      )}
    </>
  );
};

export default ProfileUpdateModal;
