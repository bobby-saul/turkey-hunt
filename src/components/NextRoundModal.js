import React from "react";

const NextRoundModal = ({ startRound, score, round }) => {
  return (
    <div className="modal">
      <div className="modal-container">
        <div className="title">End of Round {round}</div>
        <div>
          <p>Score: {score}</p>
        </div>
        <button onClick={startRound}>Start Round {round + 1}</button>
      </div>
    </div>
  );
};

export default NextRoundModal;
