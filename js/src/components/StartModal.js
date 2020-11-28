import React from "react";
import HighScores from "./HighScores";
import Instructions from "./Instructions";

const StartModal = ({startGame}) => {
    return (
        <div className="modal">
            <div className="modal-container">
                <div className="title">Turkey Hunt</div>
                <button onClick={startGame}>Start Game</button>
                <div className="col-2">
                    <Instructions/>
                    <HighScores/>
                </div>
            </div>
        </div>
    );
};

export default StartModal;
