import React from "react";
import mp3File from "../../public/unlockSound.mp3";

const Sound = () => {
  const playAudio = () => {
    const audio = new Audio(mp3File);
    audio.play();
  };

  return (
    <div>
      <button onClick={() => playAudio()}>Play sound</button>
    </div>
  );
};

export default Sound;
