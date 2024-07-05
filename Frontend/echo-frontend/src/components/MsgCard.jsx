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
      <span>online</span>
      <span>03:30pm</span>
      <div className={styles.textBox}>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit,
          molestiae. Ipsa eius id autem, vitae quas eum soluta sequi. Sint,
          minus officiis dolores mollitia molestias eligendi illo laborum
          debitis asperiores? Neque iure recusandae et earum tempore molestiae
          ad officia aliquam, voluptates vel rerum sequi ullam quod officiis
          saepe? Pariatur unde itaque alias architecto, maiores odio. Ullam
          temporibus debitis veritatis vitae?
        </p>
      </div>
    </div>
  );
};

export default MsgCard;
