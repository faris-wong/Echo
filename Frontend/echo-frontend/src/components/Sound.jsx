import React from "react";

const Sound = () => {
  const playSound = () => {
    const audio = new Audio("/unlockSound.mp3");
    audio.play().catch((error) => {
      console.error("Failed to play sound:", error);
    });
  };

  return (
    <div>
      <button onClick={() => playSound()}>Play sound</button>
    </div>
  );
};

export default Sound;
