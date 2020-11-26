import React from "react";

const Instructions = () => {
    return (
        <div className="instructions">
            <div className="title">Instructions</div>
            <p>The objective of the game is to shoot as many turkeys as you can within the time period. You will gain 100 points for every turkey you shoot and lose 10 for every shot you miss. The round is over when the time runs out. If you reach enough points you will advance to the next round, otherwise the game is over. Each round the difficulty is increased by the speed the turkeys travel.</p>
            <p>You can shoot by pointing and clicking towards a turkey. Notice that you will only have three shots until you must reload. Reloading can be done by either clicking on the ammo shells in the lower left corner or by pressing the space bar.</p>
            <p>If you get a high enough score by the end of your game, you can enter in your name to be saved.</p>
        </div>
    );
};

export default Instructions;
