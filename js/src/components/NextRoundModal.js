import React from "react";

const NextRoundModal = ({startRound, score, round}) => {
    return (
        <div className="modal">
            <div className="modal-container">
                <div className="title">Turkey Hunt</div>
                <div>
                    Score: {score}
                </div>
                <button onClick={startRound}>Start Round {round + 1}</button>
            </div>
        </div>
    );
};

export default NextRoundModal;
