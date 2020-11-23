import React, {useState, useEffect} from "react";
import Sky from "./Sky";
import Ground from "./Ground";
import TurkeyControl from "./Turkey-Control";
import Scoreboard from "./Scoreboard";

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
        <Ground/>
        <TurkeyControl/>
      </div>
      <Scoreboard/>
    </div>
  )
};

export default Game;
