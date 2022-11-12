import React from "react";
import { createRoot } from "react-dom/client";
import Game from "./components/Game";
// HTML Assets
import "./index.html";
import "./styles.css";
import "./images/turkey.png";
import turkeySound from "./sounds/turkey.mp3";
import reloadSound from "./sounds/reload.mp3";
import emptySound from "./sounds/empty-shot.mp3";
import shotgunSound from "./sounds/shotgun.mp3";

const container = document.getElementById("TurkeyHunt");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <Game />
  </React.StrictMode>
);

// Initial load sound
new Audio(turkeySound);
new Audio(reloadSound);
new Audio(emptySound);
new Audio(shotgunSound);
