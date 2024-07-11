import { React, useState } from "react";
import styles from "./css/CommunitiesModal.module.css";
import ReactDOM from "react-dom";

const Overlay = (props) => {
  const [communityName, setCommunityName] = useState("");
  const [genre, setGenre] = useState("");
  const [information, setInformation] = useState("");

  const updateCommunity = async () => {
    try {
      const response = await fetch(
        import.meta.env.VITE_SERVER + "/community/" + `${props.communityId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            communityname: communityName,
            genre: genre,
            information: information,
          }),
          
        }
      );
      console.log(response);
      if (!response.ok) {
        throw new Error("error updating community");
      }
      await response.json();
      props.getCommunities();
      props.setShowUpdateCommunitiesModal(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleClick = () => {
    props.setShowUpdateCommunitiesModal(false);
  };

  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <div className={styles.delBtn}>
          <i className="fa-solid fa-xmark" onClick={handleClick}></i>
        </div>
        <h1 className={styles.modalHeader}>Update Community</h1>
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
        <button className={styles.updateBtn} onClick={updateCommunity}>
          Update
        </button>
      </div>
    </div>
  );
};

const UpdateCommunitiesModal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Overlay
          getCommunities={props.getCommunities}
          setShowUpdateCommunitiesModal={props.setShowUpdateCommunitiesModal}
          communityId={props.communityId}
        />,
        document.querySelector("#modal-root")
      )}
    </>
  );
};

export default UpdateCommunitiesModal;
