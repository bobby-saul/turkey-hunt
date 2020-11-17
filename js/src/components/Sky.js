import React, {useState, useEffect} from "react";
import Cloud from "./Cloud";

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
    const [cloudid, setCloudid] = useState(cloudAmount);
    useEffect(() => {
        const cloudWait = setInterval(() => {
            setTimeout(() => {
                addCloud();
            }, Math.floor(Math.random() * 30000))
        }, 3000);
        return () => clearInterval(cloudWait);
    });
    function addCloud() {
        var cloud = {
            id: cloudid,
            firstLoad: false
        }
        setClouds(clouds.concat(cloud));
        setCloudid(cloudid + 1);
    }
    function removeCloud(id) {
        setClouds(clouds.filter((cloud) => cloud.id !== parseInt(id)));
    }
    return (
        <div className="sky">
            {clouds.map((cloud) => 
                <Cloud key={cloud.id} cloudId={cloud.id} firstLoad={cloud.firstLoad} removeCloud={removeCloud}/>
            )}
        </div>
    )
};

export default Sky;
