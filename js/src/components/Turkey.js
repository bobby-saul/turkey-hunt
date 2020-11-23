import React, {useState, useEffect} from "react";

const TURKEY_MIN_SIZE = 5;
const TURKEY_MAX_SIZE = 12 - TURKEY_MIN_SIZE;
const MIN_MOVES = 5;
const MAX_MOVES = 10 - MIN_MOVES;
const MIN_SPEED_TIME = 25;
const MAX_SPEED_TIME = 100 - MIN_SPEED_TIME;
const DEATH_ANIMATION_TIME = 450;

const TurkeyControl = ({id, removeTurkey}) => {
    const [isDead, setIsDead] = useState(false);
    const [speed, setSpeed] = useState(Math.floor(Math.random() * MAX_SPEED_TIME) + MIN_SPEED_TIME);
    const [moves, setMoves] = useState(Math.floor(Math.random() * MAX_MOVES) + MIN_MOVES);
    const [top, setTop] = useState(Math.floor(Math.random() * 100));
    const [topRoute, setTopRoute] = useState(Math.floor(Math.random() * 100));
    const [left, setLeft] = useState(Math.random() > 0.5 ? -12 : 100);
    const [leftRoute, setLeftRoute] = useState(Math.floor(Math.random() * 100));
    const [classes, setclasses] = useState('turkey');
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
    });

    function move(top, left, classes) {
        setTop(top);
        setLeft(left);
        setclasses(classes);
    }

    function newPosition(t, l) {
        setTopRoute(t);
        setLeftRoute(l);
        setMoves(moves - 1);
    }

    function deadTurkey() {
        setIsDead(true);
        setclasses("turkey dead");
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
