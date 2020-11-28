import React, {useEffect, useRef, useState} from "react";

function saveHS(highscore) {
    localStorage.setItem("highscores", JSON.stringify(highscore));
}

function getSavedHS() {
    var value = localStorage.getItem("highscores");
    if (value) {
        var hs = JSON.parse(value);
        hs.forEach(item => {
            delete item.new;
        });
        return hs;
    }
    return [];
}

const HighScores = ({score}) => {
    const [name, setName] = useState("");
    const [highScores, setHighScores] = useState(getHighScores());
    const inputRef = useRef(null);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    });

    function getHighScores() {
        var hs = getSavedHS();
        if (score) {
            hs.push({
                name: name,
                score: score,
                new: true
            });
        }
        hs = hs.sort((a, b) => {
            return b.score - a.score;
        }).slice(0, 10);
        return hs;
    }

    function nameChange(e, index) {
        var value = e.target.value.substring(0, 12).toUpperCase()
        highScores[index].name = value;
        setName(value);
        saveHS(highScores);
    }

    return (
        <div className="high-scores">
            <div className="title">High Scores</div>
            <ol>
                {highScores.map((highScore, index) => {
                    var nameObj = <span className="high-score-name">{highScore.name}</span>;
                    if (highScore.new) {
                        nameObj = <input className="high-score-name" value={name} size="14" ref={inputRef} onInput={(e) => { nameChange(e, index) }}/>;
                    }
                    return (
                        <li key={"high-score-" + index} className="high-score">
                            {nameObj}
                            <span className="high-score-number">{highScore.score}</span>
                        </li>
                    )
                })}
            </ol>
        </div>
    );
};

export default HighScores;
