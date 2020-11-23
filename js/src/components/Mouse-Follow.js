import React, {useState, useEffect} from "react";

const FIRING_TIME = 100;

const MouseFollow = () => {
    const [mousePosition, setMousePosition] = useState([0, 0, 0, 0, 0, 1]);
    const [firing, setFiring] = useState(false);

    useEffect(() => {
        window.onmousemove = (e) => {
            var mouseContainer = document.getElementsByClassName('mouse-container')[0];
            var offset = mouseContainer.getBoundingClientRect();
            var x1 = (offset.right - offset.left) / 2;
            var y1 = offset.height;
            var x2 = e.clientX - offset.left;
            var y2 = e.clientY - offset.top;
            // var height = Math.sqrt( (x2 - x1)**2 + (y2 - y1)**2);
            var angle = 90 - Math.atan(-(y2 - y1) / (x2 - x1)) * (180 / Math.PI);
            var flip = [-1, 1];
            if (x2 < x1) {
                var flip = [-1, -1];
            }
            setMousePosition([x2, y2, angle, flip]);
        }
        window.onclick = () => {
            setFiring(true);
            setTimeout(() => {
                setFiring(false);
            }, FIRING_TIME);
        }
    }, []);

    return (
        <div className="mouse-container">
            <div className={"gun" + (firing ? " firing" : "")} style={{
                transform: "translate(-50%, -90%) rotate(" + mousePosition[2] + "deg) scaleX(" + mousePosition[3][0] + ")  scaleY(" + mousePosition[3][1] + ")",
            }}>
            </div>
            <div className="target" style={{
                top: mousePosition[1],
                left: mousePosition[0]
            }}>
            </div>
        </div>
    );
};

export default MouseFollow;
