import React, {useState, useEffect} from "react";

const TURKEY_MIN_SIZE = 5;
const TURKEY_MAX_SIZE = 12 - TURKEY_MIN_SIZE;
const MIN_MOVES = 5;
const MAX_MOVES = 10 - MIN_MOVES;
const BASE_SPEED = 100;
const DEATH_ANIMATION_TIME = 450;

const TurkeyControl = ({id, removeTurkey, score, setScore, ammo, setAmmo, time, round}) => {
    const [isDead, setIsDead] = useState(false);
    const [speed, setSpeed] = useState(Math.floor(Math.random() * BASE_SPEED / round) + BASE_SPEED / round);
    const [moves, setMoves] = useState(Math.floor(Math.random() * MAX_MOVES) + MIN_MOVES);
    const [top, setTop] = useState(Math.floor(Math.random() * 100));
    const [topRoute, setTopRoute] = useState(Math.floor(Math.random() * 100));
    const [left, setLeft] = useState(Math.random() > 0.5 ? -12 : 100);
    const [leftRoute, setLeftRoute] = useState(Math.floor(Math.random() * 100));
    const [classes, setClasses] = useState('turkey');
    var size = TURKEY_MAX_SIZE * (top / 100) + TURKEY_MIN_SIZE;

    useEffect(() => {
        if (isDead) {
            const die = setTimeout(() => {
                removeTurkey(id);
            }, DEATH_ANIMATION_TIME);
            return () => clearTimeout(die);
        } else {
            const moveStep = setInterval(() => {
                var newTop = top;
                var newLeft = left;
                var newClasses = "turkey";
                if (top > topRoute) {
                    newTop = top - 1;
                    newClasses += " away";
                } else if (top < topRoute) {
                    newTop = top + 1;
                } else {
                    if (left === leftRoute) {
                        if (moves > 1) {
                            var t = Math.floor(Math.random() * 100);
                            var l = Math.floor(Math.random() * 100);
                            newPosition(t, l);
                        } else if (moves > 0) {
                            var t = Math.floor(Math.random() * 100);
                            var l = Math.random() > 0.5 ? -12 : 100;
                            newPosition(t, l);
                        } else {
                            removeTurkey(id);
                        }
                        return;
                    }
                }
                if (left > leftRoute) {
                    newLeft = left - 1;
                    newClasses += " left";
                } else if (left < leftRoute) {
                    newLeft = left + 1;
                }
                move(newTop, newLeft, newClasses);
            }, speed);
            return () => clearInterval(moveStep);
        }
    }, [isDead, moves, top, topRoute, left, leftRoute, classes]);

    function move(top, left, classes) {
        setTop(top);
        setLeft(left);
        setClasses(classes);
    }

    function newPosition(t, l) {
        setTopRoute(t);
        setLeftRoute(l);
        setMoves(moves - 1);
    }

    function deadTurkey(e) {
        if (ammo > 0 && time > 0 && !isDead) {
            e.stopPropagation();
            setIsDead(true);
            setClasses("turkey dead");
            setScore(score + 100);
            setAmmo(ammo - 1);
        }
    }

    return (
        <div className={classes} style={{
            top: top + "%",
            left: left + "%",
            zIndex: top,
            height: size + '%',
            width: (size * 0.7) + '%',
            transition: (speed / 1000) + "s linear",
        }} onClick={deadTurkey}>
        </div>
    )
};

export default TurkeyControl;
