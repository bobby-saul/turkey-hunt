import React from "react";
import { createRoot } from "react-dom/client";

import Game from "./components/Game";

const container = document.getElementById("TurkeyHunt");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <Game />
  </React.StrictMode>
);

// Initial load sound
new Audio("./sounds/turkey.mp3");
new Audio("./sounds/reload.mp3");
new Audio("./sounds/empty-shot.mp3");
new Audio("./sounds/shotgun.mp3");
