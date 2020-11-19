import React, {useState, useEffect} from "react";

const TurkeyControl = () => {
    const [verticalDir, setVerticalDir] = useState(0); // -1 down, 1 up
    const [horizontalDir, setHorizontalDir] = useState(0); // -1 left, 1 right
    const [speed, setSpeed] = useState(Math.floor(Math.random() * 1000) + 250);
    const [left, setLeft] = useState(50);
    const [top, setTop] = useState(50);
    const [classes, setclasses] = useState('turkey medium');

    return (
        <div className={classes} style={{
            top: top + "%",
            left: left + "%",
            zIndex: top
        }}>
        </div>
    )
};

export default TurkeyControl;
