import React from "react";
import HighScores from "./HighScores";

const GameOverModal = ({ score, startGame }) => {
  return (
    <div className="modal">
      <div className="modal-container">
        <div className="title">Game Over</div>
        <div>
          <p>Score: {score}</p>
        </div>
        <HighScores score={score} />
        <button onClick={startGame}>New Game</button>
      </div>
    </div>
  );
};

export default GameOverModal;
