import React, { useContext } from "react";
import styles from "./css/ProfilePage.module.css";
import { useState, useEffect } from "react";
import ProfileUpdateModal from "./ProfileUpdateModal";
import UserContext from "../context/user";

const ProfilePage = (props) => {
  const userCtx = useContext(UserContext);
  const [profile, setProfile] = useState("");
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const getProfileByID = async () => {
    try {
      const response = await fetch(import.meta.env.VITE_SERVER + "/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          {
            id: props.profileID,
          },
          userCtx.accessToken
        ),
      });
      if (!response.ok) {
        throw new Error("fetch error");
      }
      const profiledata = await response.json();
      setProfile(profiledata);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getProfileByID();
  }, []);
  return (
    <>
      {showUpdateModal && (
        <ProfileUpdateModal setShowUpdateModal={setShowUpdateModal} />
      )}
      <div className={styles.pageContainer}>
        <div className={styles.bio}>
          <img
            src="https://img.freepik.com/free-photo/androgynous-avatar-non-binary-queer-person_23-2151100269.jpg?t=st=1720277317~exp=1720280917~hmac=131407d0cd2c4d6d0cd313ee799bb259e9d8255230e789861a0a31f571eb9f8a&w=826"
            className={styles.avatar}
          />

          <h1>
            Hey, <span className={styles.userName}>{profile.username}</span>
          </h1>
          <span className={styles.status}>{profile.status}</span>
        </div>
        <div className={styles.gamesBio}>
          <h2>Bio</h2>
          <div>{profile.bio}</div>
          <div className={styles.updateGameBtn}>
            <i
              className="fa-regular fa-pen-to-square"
              onClick={() => setShowUpdateModal(true)}
            ></i>
          </div>
        </div>
        <div className={styles.commBio}>
          <h2>Your Communities</h2>
          <div>{profile.communities}</div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
