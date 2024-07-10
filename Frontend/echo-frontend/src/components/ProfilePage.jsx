import React, { useContext } from "react";
import styles from "./css/ProfilePage.module.css";
import { useState, useEffect } from "react";
import ProfileUpdateModal from "./ProfileUpdateModal";
import UserContext from "../context/user";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import useFetch from "../hooks/useFetch";

const ProfilePage = (props) => {
  const userCtx = useContext(UserContext);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const usingFetch = useFetch();

  const { isSuccess, isError, error, isFetching, data } = useQuery({
    queryKey: ["profile"],
    queryFn: async () =>
      await usingFetch(
        "/profileaccount",
        "POST",
        {
          accountlink: props.authID,
        },
        userCtx.accessToken
      ),
  });

  return (
    <>
      {showUpdateModal && (
        <ProfileUpdateModal
          setShowUpdateModal={setShowUpdateModal}
          data={data}
        />
      )}
      {isFetching && <h1>Loading...</h1>}

      {isError && <div>{error.message}</div>}
      {isSuccess && (
        <div className={styles.pageContainer}>
          <div className={styles.bio}>
            <div className={styles.avatar}>
              <img
                src="https://img.freepik.com/free-photo/androgynous-avatar-non-binary-queer-person_23-2151100269.jpg?t=st=1720277317~exp=1720280917~hmac=131407d0cd2c4d6d0cd313ee799bb259e9d8255230e789861a0a31f571eb9f8a&w=826"
                className={styles.avatar}
              ></img>
              <div className={styles.updateGameBtn}>
                <i
                  className="fa-regular fa-pen-to-square"
                  onClick={() => setShowUpdateModal(true)}
                ></i>
              </div>
            </div>
            <h1>
              Hey, <span className={styles.userName}>{data[0].username}.</span>
            </h1>
            <span className={styles.status}>{data[0].status}</span>
          </div>
          <div className={styles.gamesBio}>
            <h2>Bio</h2>
            <div>{data[0].bio}</div>
          </div>
          <div className={styles.commBio}>
            <h2>Games played:</h2>
            <div>
              
                <p>{data[0].games}</p>
              
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfilePage;
