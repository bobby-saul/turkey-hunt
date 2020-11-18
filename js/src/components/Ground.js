import React, {useState, useEffect} from "react";

const MIN_GRASS = 1000;
const MAX_GRASS = 5000 - MIN_GRASS;

function getBladeHeight(y) {
    if (y < 20) {
        return 12;
    } else if (y < 40) {
        return 14;
    } else if (y < 60) {
        return 16;
    } else if (y < 80) {
        return 18;
    } else {
        return 20;
    }
}

const Ground = () => {
    var initialGrass = [];
    for (var i =0; i < Math.floor(Math.random() * MAX_GRASS) + MIN_GRASS; i++) {
        initialGrass.push({
            id: i,
            x: Math.floor(Math.random() * 100),
            y: Math.floor(Math.random() * 100),
            width: Math.floor(Math.random() * 2),
            style: Math.floor(Math.random() * 3)
        })
    }
    const [grass, setGrass] = useState(initialGrass);
    return (
        <div className="ground">
            {grass.map((blade) => 
                <div key={blade.id} className={'blade blade-' + blade.style} style={{
                    left: blade.x + "%",
                    top: blade.y + "%",
                    width: blade.width,
                    "border-bottom-width": getBladeHeight(blade.y)
                }}></div>
            )}
        </div>
    )
};

export default Ground;
