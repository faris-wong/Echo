import React from "react";
import styles from "./css/ProfilePage.module.css";

const ProfilePage = () => {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.bio}>
        <img
          src="https://img.freepik.com/free-photo/androgynous-avatar-non-binary-queer-person_23-2151100269.jpg?t=st=1720277317~exp=1720280917~hmac=131407d0cd2c4d6d0cd313ee799bb259e9d8255230e789861a0a31f571eb9f8a&w=826"
          className={styles.avatar}
        />

        <h1>
          Hey, <span className={styles.userName}>User1234.</span>
        </h1>
        <span className={styles.status}>online</span>
      </div>
      <div className={styles.gamesBio}>
        <h2>Games Played</h2>
        <div className={styles.updateGameBtn}>
          <i className="fa-regular fa-pen-to-square"></i>
        </div>
        <ul>
          <li>Stardew Valley</li>
          <li>Red Dead Redemption 2</li>
          <li>Persona 5</li>
          <li>Fran Bow</li>
          <li>Detroit: Become Human</li>
          <li>Baldur's Gate 3</li>
        </ul>
      </div>
      <div className={styles.commBio}>
        <h2>Your Communities</h2>
        <ul>
          <li>Indie Games</li>
        </ul>
      </div>
    </div>
  );
};

export default ProfilePage;
