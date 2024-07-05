import React from "react";
import styles from "./css/MsgCard.module.css";

const MsgCard = () => {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.delBtn}>
        <i className="fa-solid fa-xmark"></i>
      </div>
      <div className={styles.updateBtn}>
      <i class="fa-regular fa-pen-to-square"></i>
      </div>
      <h4>User5391</h4>
      <span>12:00</span>
      <div className={styles.textBox}>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi voluptas
          a porro ab? Ut, voluptas iste accusantium repudiandae ipsum fuga
          perspiciatis eveniet voluptatem laboriosam. Quae velit aut dicta vero
          iste?
        </p>
      </div>
    </div>
  );
};

export default MsgCard;
