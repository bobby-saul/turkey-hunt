import React, {useState, useEffect} from "react";
import Sky from "./Sky";
import Ground from "./Ground";
import TurkeyControl from "./Turkey-Control";
import Scoreboard from "./Scoreboard";

const MAX_SIZE = 9680;
const RELOAD_TIME = 350;
const BASE_AMMO = 3;

function getSize() {
  const width  = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  const height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
  return Math.min(MAX_SIZE, width, height);
}

const Game = () => {
  const [size, setSize] = useState(getSize());
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  const [time, setTime] = useState(60);
  const [ammo, setAmmo] = useState(BASE_AMMO);
  const [maxAmmo, setMaxAmmo] = useState(BASE_AMMO);
  const [reloadTime, setReloadTime] = useState(RELOAD_TIME);

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
        <TurkeyControl
          score={score}
          setScore={setScore}
          time={time}
          ammo={ammo}
          setAmmo={setAmmo}
        />
      </div>
      <Scoreboard
        gameOver={gameOver}
        round={round}
        setRound={setRound}
        time={time}
        setTime={setTime}
        score={score}
        setScore={setScore}
        ammo={ammo}
        setAmmo={setAmmo}
        maxAmmo={maxAmmo}
        reloadTime={reloadTime}
      />
    </div>
  )
};

export default Game;
