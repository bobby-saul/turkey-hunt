import React, {useState, useEffect} from "react";
import Turkey from "./Turkey";

const MAX_TURKEYS = 6;

const TurkeyControl = ({round, score, setScore, time, ammo, setAmmo}) => {
    const [turkeys, setTurkeys] = useState([]);

    useEffect(() => {
        if (round > 0 && time > 0 && turkeys.length < MAX_TURKEYS) {
            // Randomly add turkeys if in round.
            // TODO - Fix this to be more smooth
            var compareValue = (turkeys.length * round) / MAX_TURKEYS;
            if (Math.random() > compareValue) {
                addTurkey();
            }
        }
    }, [round, time, turkeys]);

    useEffect(() => {
        // Clear turkeys at end of round.
        if (time < 1) {
            clearTurkeys();
        }
    }, [time]);

    function addTurkey() {
        setTurkeys(turkeys.concat({
            id: "turkey-" + Date.now()
        }));
    }

    function removeTurkey(id) {
        setTurkeys(turkeys.filter((turkey) => turkey.id !== id));
    }

    function clearTurkeys() {
        setTurkeys([]);
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
                />
                )}
            </div>
        </div>
    )
};

export default TurkeyControl;
