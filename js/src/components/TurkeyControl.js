import React, {useState, useEffect} from "react";
import Turkey from "./Turkey";

const MAX_TURKEYS = 5;

const TurkeyControl = ({round, score, setScore, time, ammo, setAmmo}) => {
    const [turkeys, setTurkeys] = useState([]);
    const [oldTime, setOldTime] = useState(time);
    const [maxTurkeys, setMaxTurkeys] = useState(MAX_TURKEYS);

    useEffect(() => {
        // Only do this once a second.
        if (time !== oldTime) {
            setOldTime(time);
            // Randomly add turkey if time left.
            if (time > 0 && turkeys.length < maxTurkeys) {
                if (Math.random() > (turkeys.length / maxTurkeys)) {
                    addTurkey();
                }
            } else if (time < 1) {
                setTurkeys([]);
            }
        }
    }, [round, time, oldTime, turkeys]);

    useEffect(() => {
        setMaxTurkeys(Math.max((MAX_TURKEYS - round + 1), 2));
    }, [round]);

    function addTurkey() {
        setTurkeys(turkeys.concat({
            id: "turkey-" + Date.now()
        }));
    }

    function removeTurkey(id) {
        setTurkeys(turkeys.filter((turkey) => turkey.id !== id));
    }

    return (
        <div className="turkey-container">
            <div className="turkey-control">
                {turkeys.map((turkey) => 
                    <Turkey
                    key={turkey.id}
                    id={turkey.id}
                    removeTurkey={removeTurkey}
                    ammo={ammo}
                    setAmmo={setAmmo}
                    score={score}
                    setScore={setScore}
                    time={time}
                    round={round}
                />
                )}
            </div>
        </div>
    )
};

export default TurkeyControl;
