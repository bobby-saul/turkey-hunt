import React from "react";
import ReactDOM from "react-dom";

import Game from './components/Game';

ReactDOM.render(<Game />, document.getElementById('TurkeyHunt'));

// Initial load sound
new Audio("./sounds/turkey.mp3");
new Audio("./sounds/reload.mp3");
new Audio("./sounds/empty-shot.mp3");
new Audio("./sounds/shotgun.mp3");