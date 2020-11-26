import React, {useState, useEffect} from "react";
import Turkey from "./Turkey";

const TurkeyControl = ({score, setScore, time, ammo, setAmmo}) => {
    const [turkeys, setTurkeys] = useState([]);

    useEffect(() => {
        // For testing pressing "Enter" will add a new turkey.
        window.onkeypress = (e) => {
            if (e.keyCode === 13) {
                addTurkey();
            }
        }
        return () => { window.onkeypress = null };
    });

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
                />
                )}
            </div>
        </div>
    )
};

export default TurkeyControl;
