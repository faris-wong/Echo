import { React, useState, useEffect } from "react";
import styles from "./css/CommunitiesModal.module.css";
import ReactDOM from "react-dom";

const Overlay = (props) => {
  const [communityName, setCommunityName] = useState("");
  const [genre, setGenre] = useState("");
  const [information, setInformation] = useState("");

  const createCommunity = async () => {
    try {
      const response = await fetch(import.meta.env.VITE_SERVER + "/community", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          communityname: communityName,
          genre: genre,
          information: information,
        }),
      });
      console.log(response);
      if (!response.ok) {
        throw new Error("error adding community");
      }
      await response.json();
      props.getCommunities();
      props.setShowCommunitiesModal(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <div className={styles.delBtn}>
          <i
            className="fa-solid fa-xmark"
            onClick={() => props.setShowCommunitiesModal(false)}
          ></i>
        </div>
        <h1 className={styles.modalHeader}>Create Community</h1>
        <div>
          <div className={styles.modalInputContainer}>
            <p>Community Name: </p>
            <input
              type="text"
              value={communityName}
              onChange={(e) => setCommunityName(e.target.value)}
            />
          </div>
          <div className={styles.modalInputContainer}>
            <p>Genre: </p>
            <input
              type="text"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
            />
          </div>
          <div className={styles.modalInputContainer}>
            <p>General Description: </p>
            <input
              type="text"
              value={information}
              onChange={(e) => setInformation(e.target.value)}
            />
          </div>
        </div>
        <button className={styles.createBtn} onClick={createCommunity}>
          Create
        </button>
      </div>
    </div>
  );
};

const CreateCommunitiesModal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Overlay
          getCommunities={props.getCommunities}
          setShowCommunitiesModal={props.setShowCommunitiesModal}
        />,
        document.querySelector("#modal-root")
      )}
    </>
  );
};

export default CreateCommunitiesModal;
