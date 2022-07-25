import React, { useState, useEffect, useCallback } from "react";
import { v4 as newUuid } from "uuid";
import Cloud from "./Cloud";

const CLOUD_MIN_TIME = 3000;
const CLOUD_MAX_TIME = 30000 - CLOUD_MIN_TIME;
const MAX_CLOUDS = 10;

const Sky = () => {
  const getFirstClouds = useCallback(() => {
    const firstClouds = [];
    const cloudAmount = Math.floor(Math.random() * 10);
    for (let i = 0; i < cloudAmount; i++) {
      firstClouds.push({
        id: newUuid(),
        firstLoad: true,
      });
    }
    return firstClouds;
  }, []);
  const [clouds, setClouds] = useState(getFirstClouds());

  const addCloud = useCallback(() => {
    const cloud = {
      id: newUuid(),
      firstLoad: false,
    };
    setClouds([...clouds, cloud]);
  }, [clouds, setClouds]);

  const removeCloud = useCallback(
    (id) => {
      setClouds([...clouds.filter((cloud) => cloud.id !== id)]);
    },
    [clouds, setClouds]
  );

  useEffect(() => {
    const time = Math.floor(Math.random() * CLOUD_MAX_TIME) + CLOUD_MIN_TIME;
    const addNewTimer = setTimeout(() => {
      if (clouds.length < MAX_CLOUDS) {
        addCloud();
      }
    }, time);
    return () => clearTimeout(addNewTimer);
  }, [clouds]);

  return (
    <div className="sky">
      {clouds.map((cloud) => (
        <Cloud
          key={cloud.id}
          cloudId={cloud.id}
          firstLoad={cloud.firstLoad}
          removeCloud={removeCloud}
        />
      ))}
    </div>
  );
};

export default Sky;
