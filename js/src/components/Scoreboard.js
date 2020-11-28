import React, {useEffect} from "react";
import Ammo from "./Ammo";
import MouseFollow from "./MouseFollow";

const Scoreboard = ({time, setTime, round, score, setScore, ammo, setAmmo, maxAmmo, reload, isReloading}) => {
    useEffect(() => {
        if (time > 0) {
            const countDown = setTimeout(() => {
                setTime(time - 1);
            }, 1000);
            return () => clearTimeout(countDown);
        }
    }, [time]);

    function fire() {
        setAmmo(ammo - 1);
    }

    return (
        <div className="scoreboard">
            <div className="black-box timer-wrapper">
                <div className="round">ROUND: {round}</div>
                <div className="timer">{time}s</div>
            </div>
            <MouseFollow
                fire={fire}
                ammo={ammo}
                score={score}
                setScore={setScore}
                time={time}
                isReloading={isReloading}
            />
            <Ammo
                ammo={ammo}
                maxAmmo={maxAmmo}
                reload={reload}
            />
            <div className="score black-box">SCORE: {score}</div>
            <div className="settings"></div>
        </div>
    )
};

export default Scoreboard;
