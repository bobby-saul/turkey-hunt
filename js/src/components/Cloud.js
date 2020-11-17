import React, {useState, useEffect} from "react";

const Cloud = ({cloudId, firstLoad, removeCloud}) => {
    const [width, setWidth] = useState(Math.floor(Math.random() * 35) + 15);
    var l = Math.floor(Math.random() * 100);
    if (!firstLoad) {
        if (l > 50) {
            l = 100;
        } else {
            l = - width;
        }
    }
    const [speed, setSpeed] = useState(Math.floor(Math.random() * 1000) + 250);
    const [top, setTop] = useState(Math.floor(Math.random() * 100));
    const [left, setLeft] = useState(l);
    const [height, setHeight] = useState(Math.floor(Math.random() * 5) + 15);
    const [style, setStyle] = useState(Math.floor(Math.random() * 3));
    var dir = 1;
    if (left > 50) {
        dir = -1;
    }
    const [direction, setDirection] = useState(dir);

    useEffect(() => {
        const moveCloud = setInterval(() => {
            if (direction === 1) {
                if (left > 100) {
                    removeCloud(cloudId);
                } else {
                    setLeft(left + 1);
                }
            } else {
                if (left < (0 - width)) {
                    removeCloud(cloudId);
                } else {
                    setLeft(left - 1);
                }
            }
        }, speed);
        return () => clearInterval(moveCloud);
    });
    return (
        <div className={"cloud could-" + style} style={{
            top: top + "%",
            left: left + "%",
            width: width + "%",
            height: height + "%",
            transition: (speed / 1000) + "s linear"
        }}>
        </div>
    )
};

export default Cloud;
