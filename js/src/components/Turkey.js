import React, {useState, useEffect} from "react";

const TURKEY_MIN_SIZE = 5;
const TURKEY_MAX_SIZE = 12 - TURKEY_MIN_SIZE;
const MIN_MOVES = 5;
const MAX_MOVES = 10 - MIN_MOVES;
const MIN_SPRINT_MOVES = 10;
const MAX_SPRINT_MOVES = 100;
const BASE_SPEED = 100;
const DEATH_ANIMATION_TIME = 450;

const TurkeyControl = ({id, removeTurkey, score, setScore, ammo, setAmmo, time, round, groundAssets}) => {
    const [isDead, setIsDead] = useState(false);
    const [speed, setSpeed] = useState(Math.floor(Math.random() * BASE_SPEED / round) + BASE_SPEED / round);
    const [moves, setMoves] = useState(Math.floor(Math.random() * MAX_MOVES) + MIN_MOVES);
    const [top, setTop] = useState(Math.floor(Math.random() * 100));
    const [left, setLeft] = useState(Math.random() > 0.5 ? -12 : 100);
    const [direction, setDirection] = useState([
        (left > 0 ? -1 : 1),
        (Math.floor(Math.random() * 3) - 1)
    ]);
    const [sprintMoves, setSprintMoves] = useState(Math.floor(Math.random() * MAX_SPRINT_MOVES) + MIN_SPRINT_MOVES);
    var size = TURKEY_MAX_SIZE * (top / 100) + TURKEY_MIN_SIZE;

    useEffect(() => {
        if (isDead) {
            const die = setTimeout(() => {
                removeTurkey(id);
            }, DEATH_ANIMATION_TIME);
            return () => clearTimeout(die);
        } else {
            const makeMove = setInterval(() => {
                var bounce = [0, 0];
                // Move based on directions.
                var newLeft = left + direction[0];
                var newTop = top + direction[1];
                // Adjust based on boundaries.
                if (newLeft > 100 - size * 0.7 && left < 100 - size * 0.7 && moves > 0) {
                    newLeft = 100 - size * 0.7;
                    bounce[0] = -1;
                } else if (newLeft < 0 && left > 0 && moves > 0) {
                    newLeft = 0;
                    bounce[0] = 1;
                }
                if (newTop > 100) {
                    newTop = 100;
                    bounce[1] = -1;
                } else if (newTop < 0) {
                    newTop = 0;
                    bounce[1] = 1;
                }
                // Adjust based on assets
                var assetCollision = groundAssets.filter((asset) => {
                    return (newTop === asset.y && newLeft > asset.x - asset.size / 2 && newLeft < asset.x + asset.size / 2);
                });
                if (assetCollision.length) {
                    if (direction[1] !== 0) {
                        bounce[1] = direction[1] * -1;
                        newTop = top;
                    } else {
                        bounce[0] = direction[0] * -1;
                        newLeft = left;
                    }
                }
                // Change direction at end of sprint.
                if (moves < 1) {
                    if (left > 100 || left < 0 - size * 0.7) {
                        removeTurkey(id);
                    } else {
                        move(newTop, newLeft, bounce);
                    }
                } else if (sprintMoves < 1) {
                    changeDirection();
                } else {
                    move(newTop, newLeft, bounce);
                }
            }, speed);
            return () => clearInterval(makeMove);
        }
    }, [isDead, moves, sprintMoves, direction, left, top, removeTurkey]);

    function move(top, left, bounce) {
        setTop(top);
        setLeft(left);
        setSprintMoves(sprintMoves - 1);
        if (bounce[0] !== 0 || bounce[1] !== 0) {
            var bounceDir = direction;
            if (bounce[0] !== 0) {
                bounceDir[0] = bounce[0];
            }
            if (bounce[1] !== 0) {
                bounceDir[1] = bounce[1];
            }
            setDirection(bounceDir);
        }
    }

    function changeDirection() {
        var horizontal;
        var vertical;
        // Set horizontal.
        if (moves < 1) {
            horizontal = Math.random() > 0.5 ? -1 : 1;
        } else {
            if (left > 90) {
                horizontal = Math.floor(Math.random() * 2) - 1;
            } else if ( left < 10) {
                horizontal = 1 - Math.floor(Math.random() * 2);
            } else {
                horizontal = Math.floor(Math.random() * 3) - 1;
            }
        }
        // Set vertical.
        if (top > 90) {
            vertical = Math.floor(Math.random() * 2) - 1;
        } else if ( top < 10) {
            vertical = 1 - Math.floor(Math.random() * 2);
        } else {
            vertical = Math.floor(Math.random() * 3) - 1;
        }
        // Make sure not standing still.
        if (horizontal === 0 && vertical === 0) {
            if (Math.random() > 0.5) {
                if (left > 90) {
                    horizontal = -1;
                } else {
                    horizontal = 1;
                }
            } else {
                if (top > 90) {
                    vertical = -1;
                } else {
                    vertical = 1;
                }
            }
        }

        setSprintMoves(Math.floor(Math.random() * MAX_SPRINT_MOVES) + MIN_SPRINT_MOVES);
        setMoves(moves - 1);
        setDirection([horizontal, vertical]);
    }

    function deadTurkey(e) {
        if (ammo > 0 && time > 0 && !isDead) {
            e.stopPropagation();
            setIsDead(true);
            setScore(score + 100);
            setAmmo(ammo - 1);
        }
    }

    return (
        <div
            className={"turkey" + (isDead ? " dead" : " alive") + (direction[0] === -1 ? " left" : " right") + (direction[1] === -1 ? " away" : " towards")}
            style={{
                top: top + "%",
                left: left + "%",
                zIndex: top,
                height: size + '%',
                width: (size * 0.7) + '%',
                transition: (speed / 1000) + "s linear",
            }}
            onClick={deadTurkey}
        >
        </div>
    )
};

export default TurkeyControl;
