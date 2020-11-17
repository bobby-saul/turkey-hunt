import React, {useState, useEffect} from "react";
import Sky from "./Sky";

function getSize() {
  const maxSize = 9680;
  const width  = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  const height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
  return Math.min(maxSize, width, height);
}

const Game = () => {
  const [size, setSize] = useState(getSize())
  useEffect(() => {
    window.addEventListener('resize', () => {
      setSize(getSize());
    });

  });
  return (
    <div className="game" style={{
      width: size,
      height: size
    }}>
      <div className="environment">
        <Sky/>
        <div className="ground"></div>
        <div className="turkey-list"></div>
      </div>
      <div className="scoreboard">
        <div className="timer"></div>
        <div className="score"></div>
        <div className="ammo"></div>
        <div className="settings"></div>
      </div>
    </div>
  )
};

export default Game;