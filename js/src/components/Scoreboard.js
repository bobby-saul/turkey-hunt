import React, {useState, useEffect} from "react";
import Ammo from "./Ammo";
import MouseFollow from "./Mouse-Follow";

const Scoreboard = ({score, setScore, ammo, setAmmo, maxAmmo, reloadTime}) => {
    function reload() {
        setTimeout(() => {
            setAmmo(maxAmmo);
        }, reloadTime);
    }

    function fire() {
        setAmmo(ammo - 1);
    }

    return (
        <div className="scoreboard">
            <div className="round"></div>
            <div className="timer"></div>
            <MouseFollow fire={fire} ammo={ammo} score={score} setScore={setScore}/>
            <Ammo ammo={ammo} maxAmmo={maxAmmo} reload={reload}/>
            <div className="score">SCORE: {score}</div>
            <div className="settings"></div>
        </div>
    )
};

export default Scoreboard;
