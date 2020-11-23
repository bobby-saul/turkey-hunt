import React, {useState, useEffect} from "react";
import MouseFollow from "./Mouse-Follow";

const Scoreboard = () => {
  return (
    <div className="scoreboard">
        <MouseFollow/>
        <div className="timer"></div>
        <div className="score"></div>
        <div className="ammo"></div>
        <div className="settings"></div>
    </div>
  )
};

export default Scoreboard;
