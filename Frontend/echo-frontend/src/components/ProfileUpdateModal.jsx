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
        <div>
          <p>username: </p>
          <input
            type="text"
            value={form.username}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, username: e.target.value }))
            }
          />
        </div>
        <div>
          <p>bio: </p>
          <input
            type="text"
            value={form.bio}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, bio: e.target.value }))
            }
          />
        </div>
        <div>
          <p>status: </p>
          <input
            type="text"
            value={form.status}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, status: e.target.value }))
            }
          />
        </div>
        <div>
          <p>community: </p>
          <input
            type="text"
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
