import React, {useState, useEffect} from "react";
import Sky from "./Sky";
import Ground from "./Ground";
import TurkeyControl from "./TurkeyControl";
import Scoreboard from "./Scoreboard";
import StartModal from "./StartModal";
import NextRoundModal from "./NextRoundModal";

const MAX_SIZE = 9680;
const RELOAD_TIME = 350;
const BASE_AMMO = 3;
const ROUND_TIME = 60;

function getSize() {
  const width  = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  const height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
  return Math.min(MAX_SIZE, width, height);
}

const Game = () => {
  const [size, setSize] = useState(getSize());
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [time, setTime] = useState(0);
  const [ammo, setAmmo] = useState(BASE_AMMO);
  const [maxAmmo, setMaxAmmo] = useState(BASE_AMMO);
  const [reloadTime, setReloadTime] = useState(RELOAD_TIME);
  const [modal, setModal] = useState(<StartModal startGame={startGame}/>);

  useEffect(() => {
    window.addEventListener('resize', () => {
      setSize(getSize());
    });
  }, [window]);

  useEffect(() => {
    if (round === 0) {
      // Start Modal
      setModal(<StartModal startGame={startGame}/>);
    } else if (time < 1 && nextRound()) {
      // Next Round
      setModal(<NextRoundModal round={round} score={score} startRound={startRound} />);
    } else if (time < 1) {
      // End Game
      setModal(<StartModal startGame={startGame}/>);
    } else if (isPaused) {
      // Paused
      setModal(<StartModal startGame={startGame}/>);
    } else {
      setModal(null);
    }
  }, [round, time, isPaused])

  function startGame() {
    setRound(1);
    setTime(ROUND_TIME);
    setAmmo(maxAmmo);
    setScore(0);
  }

  function nextRound() {
    return (score > round * 1000)
  }

  function startRound() {
    setRound(round + 1);
    setTime(ROUND_TIME);
    setAmmo(maxAmmo);
  }

  return (
    <div className="game" style={{
      width: size,
      height: size
    }}>
      {modal}
      <div className="environment">
        <Sky/>
        <Ground/>
        <TurkeyControl
          round={round}
          score={score}
          setScore={setScore}
          time={time}
          ammo={ammo}
          setAmmo={setAmmo}
        />
      </div>
      <Scoreboard
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
