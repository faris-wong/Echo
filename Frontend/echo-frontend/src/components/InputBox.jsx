import React from "react";
import styles from "./css/InputBox.module.css";

const InputBox = () => {
  return (
    <div className={styles.window}>
    <div className={styles.container}>
      <input type="text" placeholder="Enter message" />
      <div className={styles.sendBtn}>
        <i class="fa-solid fa-paper-plane"></i>
      </div>
    </div>
    </div>
  );
};

export default InputBox;
