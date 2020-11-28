import React, {useState, useEffect} from "react";
import Cloud from "./Cloud";

const CLOUD_MIN_TIME = 3000;
const CLOUD_MAX_TIME = 30000 - CLOUD_MIN_TIME;
const MAX_CLOUDS = 10;

const Sky = () => {
    var firstClouds = [];
    var cloudAmount = Math.floor(Math.random() * 10);
    for (var i = 0; i < cloudAmount; i++) {
        firstClouds.push({
            id: i,
            firstLoad: true
        });
    }
    const [clouds, setClouds] = useState(firstClouds);

    useEffect(() => {
            const time = Math.floor(Math.random() * CLOUD_MAX_TIME) + CLOUD_MIN_TIME;
            var addNewTimer = setTimeout(() => {
                if (clouds.length < MAX_CLOUDS) {
                    addCloud()
                }
            }, time);
            return () => clearTimeout(addNewTimer);
    },[clouds]);

    function addCloud() {
        var cloud = {
            id: Date.now(),
            firstLoad: false
        }
        setClouds(clouds.concat(cloud));
    }

    function removeCloud(id) {
        setClouds(clouds.filter((cloud) => cloud.id !== parseInt(id)));
    }

    return (
        <div className="sky">
            {clouds.map((cloud) => 
                <Cloud
                    key={cloud.id}
                    cloudId={cloud.id}
                    firstLoad={cloud.firstLoad}
                    removeCloud={removeCloud}
                />
            )}
        </div>
    )
};

export default Sky;
