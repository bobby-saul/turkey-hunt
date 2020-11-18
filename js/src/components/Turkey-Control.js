import React, {useState, useEffect} from "react";
import Turkey from "./Turkey";

const TurkeyControl = () => {
    const [turkeys, setTurkeys] = useState([{
        id: 1,
    }]);
    function addTurkey() {
        turkeys.push({
            id: "turkey-" + Date.now()
        });
        setTurkeys(turkeys);
    }
    function removeTurkey(id) {
        setClouds(turkeys.filter((turkey) => turkey.id !== parseInt(id)));
    }
    return (
        <div className="turkey-container">
            <div className="turkey-control">
                {turkeys.map((turkey) => 
                    <Turkey key={turkey.id}/>
                )}
            </div>
        </div>
    )
};

export default TurkeyControl;
