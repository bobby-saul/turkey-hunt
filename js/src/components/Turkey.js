import React, {useState, useEffect} from "react";

const TURKEY_MIN_SIZE = 5;
const TURKEY_MAX_SIZE = 12 - TURKEY_MIN_SIZE;

const TurkeyControl = () => {
    const [verticalDir, setVerticalDir] = useState(0); // -1 down, 1 up
    const [horizontalDir, setHorizontalDir] = useState(0); // -1 left, 1 right
    const [speed, setSpeed] = useState(Math.floor(Math.random() * 1000) + 250);
    const [left, setLeft] = useState(50);
    const [top, setTop] = useState(50);
    const [classes, setclasses] = useState('turkey medium');

    var size = TURKEY_MAX_SIZE * (top / 100) + TURKEY_MIN_SIZE;
    return (
        <div className={classes} style={{
            top: top + "%",
            left: left + "%",
            zIndex: top,
            height: size + '%',
            width: (size * 0.7) + '%',
        }}>
        </div>
    )
};

export default TurkeyControl;
