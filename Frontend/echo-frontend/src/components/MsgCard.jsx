import React from "react";
import styles from "./css/MsgCard.module.css";

const MsgCard = (props) => {

  return (
    <div className={styles.cardContainer}>
      <div className={styles.delBtn}>
        <i className="fa-solid fa-xmark"></i>
      </div>
      <div className={styles.updateBtn}>
        <i className="fa-regular fa-pen-to-square"></i>
      </div>
      <div className={styles.timeStamp}>
      <span>{props.timeStamp}</span>
      </div>
      <h4>User5391</h4>
      <span className={styles.status}>online</span>
      <div className={styles.textBox}>
        <p>
          {props.message}
        </p>
      </div>
    </div>
  );
};

export default MsgCard;
