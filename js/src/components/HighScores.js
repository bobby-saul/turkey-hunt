import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

function saveHS(highscore) {
  if (navigator.cookieEnabled) {
    try {
      localStorage.setItem("highscores", JSON.stringify(highscore));
    } catch (error) {
      console.error("Error - Failed to set local storage.");
      console.error(error);
    }
  }
}

function getSavedHS() {
  var value =
    '[{"name":"PLEASE","score":100},{"name":"TURN","score":90},{"name":"ON","score":80},{"name":"COOKIES","score":70},{"name":"FOR","score":60},{"name":"HIGH","score":50},{"name":"SCORES","score":40},{"name":"TO","score":30},{"name":"BE","score":20},{"name":"TRACKED","score":10}]';
  if (navigator.cookieEnabled) {
    try {
      value = localStorage.getItem("highscores");
    } catch (error) {
      console.error("Error - Failed to get local storage.");
      console.error(error);
    }
  }
  if (value) {
    var hs = JSON.parse(value);
    hs.forEach((item) => {
      delete item.new;
    });
    return hs;
  }
  return [];
}

const HighScores = ({ score }) => {
  const [name, setName] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  });

  const highScores = useMemo(() => {
    var hs = getSavedHS();
    if (score) {
      hs.push({
        name: name,
        score: score,
        new: true,
      });
    }
    hs = hs
      .sort((a, b) => {
        return b.score - a.score;
      })
      .slice(0, 10);
    return hs;
  }, [score]);

  const nameChange = useCallback(
    (e, index) => {
      var value = e.target.value.substring(0, 12).toUpperCase();
      highScores[index].name = value;
      setName(value);
      saveHS(highScores);
    },
    [setName, saveHS]
  );

  return (
    <div className="high-scores">
      <div className="title">High Scores</div>
      <ol>
        {highScores.map((highScore, index) => {
          var nameObj = (
            <span className="high-score-name">{highScore.name}</span>
          );
          if (highScore.new) {
            nameObj = (
              <input
                className="high-score-name"
                value={name}
                size="14"
                ref={inputRef}
                onInput={(e) => {
                  nameChange(e, index);
                }}
              />
            );
          }
          return (
            <li key={"high-score-" + index} className="high-score">
              {nameObj}
              <span className="high-score-number">{highScore.score}</span>
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default HighScores;
