import React, { useState, useEffect, useCallback } from "react";

const MIN_CLOUD_WIDTH = 15;
const MAX_CLOUD_WIDTH = 45 - MIN_CLOUD_WIDTH;
const MIN_SPEED = 250;
const MAX_SPEED = 1250 - MIN_SPEED;
const MIN_HEIGHT = 15;
const MAX_HEIGHT = 20 - MIN_HEIGHT;

const Cloud = ({ cloudId, firstLoad, removeCloud }) => {
  const createDimensions = useCallback(() => {
    const width = Math.floor(Math.random() * MAX_CLOUD_WIDTH) + MIN_CLOUD_WIDTH;
    const left = firstLoad
      ? Math.floor(Math.random() * 100)
      : Math.random() > 0.5
      ? 100
      : -width;
    return {
      width: width,
      height: Math.floor(Math.random() * MAX_HEIGHT) + MIN_HEIGHT,
      speed: Math.floor(Math.random() * MAX_SPEED) + MIN_SPEED,
      left: left,
      top: Math.floor(Math.random() * 100),
      direction: left > 50 ? -1 : 1,
    };
  }, []);
  const [dimensions, setDimensions] = useState(createDimensions());

  useEffect(() => {
    const moveCloud = setInterval(() => {
      if (dimensions.direction === 1) {
        if (dimensions.left > 100) {
          removeCloud(cloudId);
        } else {
          setDimensions({ ...dimensions, left: dimensions.left + 1 });
        }
      } else {
        if (dimensions.left < 0 - dimensions.width) {
          removeCloud(cloudId);
        } else {
          setDimensions({ ...dimensions, left: dimensions.left - 1 });
        }
      }
    }, dimensions.speed);
    return () => clearInterval(moveCloud);
  }, [cloudId, removeCloud, dimensions, setDimensions]);

  return (
    <div
      className="cloud"
      style={{
        top: dimensions.top + "%",
        left: dimensions.left + "%",
        width: dimensions.width + "%",
        height: dimensions.height + "%",
        transition: dimensions.speed + "ms linear",
      }}
    ></div>
  );
};

export default Cloud;
