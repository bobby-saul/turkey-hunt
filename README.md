# Turkey Hunt

React point and click game to hunt turkeys for thanksgiving.

## Game Play

The objective of the game is to shoot as many turkeys as you can within the time period. You will gain 100 points for every turkey you shoot and lose 10 for every shot you miss. The round is over when the time runs out. If you reach enough points you will advance to the next round, otherwise the game is over. Each round the difficulty is increased by the speed the turkeys travel.

You can shoot by pointing and clicking towards a turkey. Notice that you will only have three shots until you must reload. Reloading can be done by either clicking on the ammo shells in the lower left corner or by pressing the space bar.

If you get a high enough score by the end of your game, you can enter in your name to be saved.

## Development

To install, clone the repo and run ```npm i``` to install the proper node packages. The scripts to build in the development mode is ```npm run dev``` and to watch is ```npm run watch```. To build in production mode run ```npm run prod```. This project is currently using the latest long term support version of node (14.15.1).

This project contains the index.html file to load the css and js. The css is found in ./styles.css. The js source is in ./js/src and builds out to ./js/dist. The js is built with [react](https://reactjs.org/docs/getting-started.html).
