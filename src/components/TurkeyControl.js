import React, { useState, useEffect, useCallback, useMemo } from "react";
import Turkey from "./Turkey";
import { v4 as newUuid } from "uuid";
import turkeySound from "../sounds/turkey.mp3";

const MAX_TURKEYS = 5;

const TurkeyControl = ({
  round,
  score,
  setScore,
  time,
  ammo,
  setAmmo,
  playSound,
  groundAssets,
}) => {
  const [turkeys, setTurkeys] = useState([]);
  const [oldTime, setOldTime] = useState(time);

  const maxTurkeys = useMemo(() => {
    return Math.max(MAX_TURKEYS - round + 1, 2);
  }, [MAX_TURKEYS, round]);

  useEffect(() => {
    // Only do this once a second.
    if (time !== oldTime) {
      setOldTime(time);
      // Randomly add turkey if time left.
      if (time > 0 && turkeys.length < maxTurkeys) {
        if (Math.random() > turkeys.length / maxTurkeys) {
          addTurkey();
        }
      } else if (time < 1) {
        setTurkeys([]);
      }

      // Random turkey calls.
      if (
        playSound &&
        time % 2 === 0 &&
        turkeys.length * Math.random() > 0.85
      ) {
        var sound = new Audio(turkeySound);
        sound.currentTime = 0;
        sound.volume = 0.2;
        sound.play();
      }
    }
  }, [round, time, oldTime, turkeys, playSound]);

  const addTurkey = useCallback(() => {
    setTurkeys(
      turkeys.concat({
        id: newUuid(),
      })
    );
  }, [turkeys, setTurkeys]);

  const removeTurkey = useCallback(
    (id) => {
      setTurkeys(turkeys.filter((turkey) => turkey.id !== id));
    },
    [turkeys, setTurkeys]
  );

  return (
    <div className="turkey-container">
      <div className="turkey-control">
        {turkeys.map((turkey) => (
          <Turkey
            key={turkey.id}
            id={turkey.id}
            removeTurkey={removeTurkey}
            ammo={ammo}
            setAmmo={setAmmo}
            score={score}
            setScore={setScore}
            time={time}
            round={round}
            groundAssets={groundAssets}
          />
        ))}
      </div>
    </div>
  );
};

export default TurkeyControl;
