import React from "react";

var highScores = [
    {
        name: "BOB",
        score: 1000
    },
    {
        name: "JOE",
        score: 900
    },
    {
        name: "TIM",
        score: 800
    },
    {
        name: "TOM",
        score: 700
    },
    {
        name: "SUE",
        score: 600
    },
    {
        name: "BILL",
        score: 500
    },
    {
        name: "ALEX",
        score: 400
    },
    {
        name: "FOO",
        score: 300
    },
    {
        name: "BAR",
        score: 200
    },
    {
        name: "ITRIED",
        score: 100
    }
]

// TODO - Add cookies for high score

const HighScores = () => {
    highScores = highScores.sort((a, b) => {
        return b.score - a.score;
    }).slice(0, 10);

    return (
        <div className="high-scores">
            <div className="title">High Scores</div>
            <ol>
                {highScores.map((highScore, index) => {
                    return (
                        <li key={"high-score-" + index} className="high-score">
                            <span className="high-score-name">{highScore.name}</span>
                            <span className="high-score-number">{highScore.score}</span>
                        </li>
                    )
                })}
            </ol>
        </div>
    );
};

export default HighScores;
