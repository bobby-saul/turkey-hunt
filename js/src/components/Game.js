import React, {useState, useEffect} from "react";
import Sky from "./Sky";
import Ground from "./Ground";
import TurkeyControl from "./TurkeyControl";
import Scoreboard from "./Scoreboard";
import StartModal from "./StartModal";
import NextRoundModal from "./NextRoundModal";
import GameOverModal from "./GameOverModal";

const MAX_SIZE = 9680;
const RELOAD_TIME = 500;
const BASE_AMMO = 3;
const ROUND_TIME = 60 / 2;

function getSize() {
  const width  = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  const height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
  return Math.min(MAX_SIZE, width, height);
}

const Game = () => {
  const [size, setSize] = useState(getSize());
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(0);
  const [time, setTime] = useState(0);
  const [ammo, setAmmo] = useState(BASE_AMMO);
  const [maxAmmo, setMaxAmmo] = useState(BASE_AMMO);
  const [reloadTime, setReloadTime] = useState(RELOAD_TIME);
  const [isReloading, setIsReloading] = useState(false);
  const [playSound, setPlaySound] = useState(true);
  const [modal, setModal] = useState(<StartModal startGame={startGame}/>);

  useEffect(() => {
    // Window resize.
    window.addEventListener('resize', () => {
      setSize(getSize());
    });

    // Reload on space bar.
    window.onkeypress = (e) => {
      if (e.keyCode === 32) {
        reload();
      }
    };
  }, [window, time, playSound]);

  useEffect(() => {
    if (round === 0) {
      // Start Modal
      setModal(<StartModal
        startGame={startGame}
      />);
    } else if (time < 1 && nextRound()) {
      // Next Round
      setModal(<NextRoundModal
        round={round}
        score={score}
        startRound={startRound}
      />);
    } else if (time < 1) {
      // End Game
      setModal(<GameOverModal
        score={score}
        startGame={startGame}
      />);
    } else {
      setModal(null);
    }
  }, [round, time])

  function startGame() {
    setRound(1);
    setTime(ROUND_TIME);
    setAmmo(maxAmmo);
    setScore(0);
  }

  function nextRound() {
    return (score > round * 1000 / 2);
  }

  function startRound() {
    setRound(round + 1);
    setTime(ROUND_TIME);
    setAmmo(maxAmmo);
  }

  function reload() {
    if (time > 0) {
      setIsReloading(true);
      if (playSound) {
        var sound = new Audio("./sounds/reload.mp3");
        sound.currentTime = 0;
        sound.play();
      }
      setTimeout(() => {
        setAmmo(maxAmmo);
        setIsReloading(false);
      }, reloadTime);
    }
  }

  return (
    <div className="game" style={{
      width: size,
      height: size
    }}>
      {modal}
      <div className="environment">
        <Sky/>
        <Ground
          round={round}
        />
        <TurkeyControl
          playSound={playSound}
          round={round}
          score={score}
          setScore={setScore}
          time={time}
          ammo={ammo}
          setAmmo={setAmmo}
        />
      </div>
      <Scoreboard
        setPlaySound={setPlaySound}
        playSound={playSound}
        round={round}
        setRound={setRound}
        time={time}
        setTime={setTime}
        score={score}
        setScore={setScore}
        ammo={ammo}
        setAmmo={setAmmo}
        maxAmmo={maxAmmo}
        reload={reload}
        isReloading={isReloading}
      />
    </div>
  )
};

export default Game;
