import React, {useState, useEffect} from "react";

const FIRING_TIME = 100;

const MouseFollow = ({ammo, fire, score, setScore, time, isReloading, playSound}) => {
    const [mousePosition, setMousePosition] = useState([0, 0, 0, 0, 0, 1]);
    const [firing, setFiring] = useState(false);
    const [oldAmmo, setOldAmmo] = useState(ammo);

    // Follow Mouse
    useEffect(() => {
        window.onmousemove = (e) => {
            var mouseContainer = document.getElementsByClassName('mouse-container')[0];
            var offset = mouseContainer.getBoundingClientRect();
            var x1 = (offset.right - offset.left) / 2;
            var y1 = offset.height;
            var x2 = e.clientX - offset.left;
            var y2 = e.clientY - offset.top;
            var angle = 90 - Math.atan(-(y2 - y1) / (x2 - x1)) * (180 / Math.PI);
            var flip = [-1, 1];
            if (x2 < x1) {
                var flip = [-1, -1];
                if (angle < 140) {
                    angle = 140;
                }
            }
            else if (angle > 40) {
                angle = 40;
            }
            setMousePosition([x2, y2, angle, flip]);
        }
    }, []);

    // On click remove ammo.
    useEffect(() => {
        window.onclick = () => {
            if (time > 0) {
                if (ammo > 0) {
                    fire();
                    setScore(score - 10);
                } else if (playSound) {
                    var sound = new Audio("./sounds/empty-shot.mp3");
                    sound.currentTime = 0;
                    sound.play();
                }
            }
        }
    }, [window, ammo, time, score]);

    // Set the firing animation.
    useEffect(() => {
        if (ammo !== oldAmmo) {
            setOldAmmo(ammo);
            if (ammo < oldAmmo) {
                if (playSound) {
                    var sound = new Audio("./sounds/shotgun.mp3");
                    sound.currentTime = 0;
                    sound.play();
                }
                setFiring(true);
                var firingAnimation = setTimeout(() => {
                    setFiring(false);
                }, FIRING_TIME);
                return () => clearInterval(firingAnimation);
            }
        }
    }, [ammo])

    return (
        <div className="mouse-container">
            <div
                className={"gun" + (firing ? " firing" : "") + (isReloading ? " reloading" : "")}
                style={{transform: "translate(-50%, -65%) rotate(" + mousePosition[2] + "deg) scaleX(" + mousePosition[3][0] + ")  scaleY(" + mousePosition[3][1] + ")",
            }}>
            </div>
            <div
                className={"target" + (isReloading ? " reloading" : "")}
                style={{
                    top: mousePosition[1],
                    left: mousePosition[0]
                }
            }>
            </div>
        </div>
    );
};

export default MouseFollow;
