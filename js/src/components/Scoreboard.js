import React, {useState, useEffect} from "react";
import Ammo from "./Ammo";
import MouseFollow from "./Mouse-Follow";

const Scoreboard = ({ammo, setAmmo, maxAmmo, reloadTime}) => {
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
            <MouseFollow fire={fire} ammo={ammo}/>
            <Ammo ammo={ammo} maxAmmo={maxAmmo} reload={reload}/>
            <div className="timer"></div>
            <div className="round"></div>
            <div className="score"></div>
            <div className="settings"></div>
        </div>
    )
};

export default Scoreboard;
