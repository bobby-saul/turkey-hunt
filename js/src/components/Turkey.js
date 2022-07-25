import React, { useState, useEffect, useMemo, useCallback } from "react";

const TURKEY_MIN_SIZE = 5;
const TURKEY_MAX_SIZE = 12 - TURKEY_MIN_SIZE;
const MIN_MOVES = 5;
const MAX_MOVES = 10 - MIN_MOVES;
const MIN_SPRINT_MOVES = 10;
const MAX_SPRINT_MOVES = 100;
const BASE_SPEED = 100;
const DEATH_ANIMATION_TIME = 400;

const TurkeyControl = ({
  id,
  removeTurkey,
  score,
  setScore,
  ammo,
  setAmmo,
  time,
  round,
  groundAssets,
}) => {
  const [isDead, setIsDead] = useState(false);
  const createDimensions = useCallback(() => {
    const left = Math.random() > 0.5 ? -12 : 100;
    return {
      moves: Math.floor(Math.random() * MAX_MOVES) + MIN_MOVES,
      moveSteps:
        Math.floor(Math.random() * MAX_SPRINT_MOVES) + MIN_SPRINT_MOVES,
      speed:
        Math.floor((Math.random() * BASE_SPEED) / round) + BASE_SPEED / round,
      top: Math.floor(Math.random() * 100),
      left: left,
      direction: [left > 0 ? -1 : 1, Math.floor(Math.random() * 3) - 1],
    };
  }, [round]);
  const [dimensions, setDimensions] = useState(createDimensions());

  const size = useMemo(() => {
    return TURKEY_MAX_SIZE * (dimensions.top / 100) + TURKEY_MIN_SIZE;
  }, [dimensions]);

  useEffect(() => {
    if (isDead) {
      const die = setTimeout(() => {
        removeTurkey(id);
      }, DEATH_ANIMATION_TIME);
      return () => clearTimeout(die);
    } else {
      const makeMove = setInterval(() => {
        const bounce = [0, 0];
        // Move based on directions.
        var newLeft = dimensions.left + dimensions.direction[0];
        var newTop = dimensions.top + dimensions.direction[1];
        // Adjust based on boundaries.
        if (
          newLeft > 100 - size * 0.7 &&
          dimensions.left < 100 - size * 0.7 &&
          dimensions.moves > 0
        ) {
          newLeft = 100 - size * 0.7;
          bounce[0] = -1;
        } else if (newLeft < 0 && dimensions.left > 0 && dimensions.moves > 0) {
          newLeft = 0;
          bounce[0] = 1;
        }
        if (newTop > 100) {
          newTop = 100;
          bounce[1] = -1;
        } else if (newTop < 0) {
          newTop = 0;
          bounce[1] = 1;
        }
        // Adjust based on assets
        const assetCollision = groundAssets.filter((asset) => {
          return (
            newTop === asset.y &&
            newLeft > asset.x - asset.size / 2 &&
            newLeft < asset.x + asset.size / 2
          );
        });
        if (assetCollision.length) {
          if (dimensions.direction[1] !== 0) {
            bounce[1] = dimensions.direction[1] * -1;
            newTop = dimensions.top;
          } else {
            bounce[0] = dimensions.direction[0] * -1;
            newLeft = dimensions.left;
          }
        }
        // Change direction at end of sprint.
        if (dimensions.moves < 1) {
          if (dimensions.left > 100 || dimensions.left < 0 - size * 0.7) {
            removeTurkey(id);
          } else {
            move(newTop, newLeft, bounce);
          }
        } else if (dimensions.moveSteps < 1) {
          changeDirection();
        } else {
          move(newTop, newLeft, bounce);
        }
      }, dimensions.speed);
      return () => clearInterval(makeMove);
    }
  }, [
    dimensions,
    size,
    isDead,
    groundAssets,
    removeTurkey,
    move,
    changeDirection,
  ]);

  const move = useCallback(
    (top, left, bounce) => {
      const bounceDir = dimensions.direction;
      if (bounce[0] !== 0 || bounce[1] !== 0) {
        if (bounce[0] !== 0) {
          bounceDir[0] = bounce[0];
        }
        if (bounce[1] !== 0) {
          bounceDir[1] = bounce[1];
        }
      }
      setDimensions({
        ...dimensions,
        moveSteps: dimensions.moveSteps - 1,
        top: top,
        left: left,
        direction: bounceDir,
      });
    },
    [dimensions, setDimensions]
  );

  const changeDirection = useCallback(() => {
    var horizontal;
    var vertical;
    // Set horizontal.
    if (dimensions.moves < 1) {
      horizontal = Math.random() > 0.5 ? -1 : 1;
    } else {
      if (dimensions.left > 90) {
        horizontal = Math.floor(Math.random() * 2) - 1;
      } else if (dimensions.left < 10) {
        horizontal = 1 - Math.floor(Math.random() * 2);
      } else {
        horizontal = Math.floor(Math.random() * 3) - 1;
      }
    }
    // Set vertical.
    if (dimensions.top > 90) {
      vertical = Math.floor(Math.random() * 2) - 1;
    } else if (dimensions.top < 10) {
      vertical = 1 - Math.floor(Math.random() * 2);
    } else {
      vertical = Math.floor(Math.random() * 3) - 1;
    }
    // Make sure not standing still.
    if (horizontal === 0 && vertical === 0) {
      if (Math.random() > 0.5) {
        if (dimensions.left > 90) {
          horizontal = -1;
        } else {
          horizontal = 1;
        }
      } else {
        if (dimensions.top > 90) {
          vertical = -1;
        } else {
          vertical = 1;
        }
      }
    }

    setDimensions({
      ...dimensions,
      moves: dimensions.moveSteps,
      moveSteps:
        Math.floor(Math.random() * MAX_SPRINT_MOVES) + MIN_SPRINT_MOVES,
      direction: [horizontal, vertical],
    });
  }, [dimensions, setDimensions]);

  const deadTurkey = useCallback(
    (e) => {
      if (ammo > 0 && time > 0 && !isDead) {
        e.stopPropagation();
        setIsDead(true);
        setScore(score + 100);
        setAmmo(ammo - 1);
      }
    },
    [ammo, time, isDead, setIsDead, setScore, setAmmo]
  );

  return (
    <div
      className={
        "turkey" +
        (isDead ? " dead" : " alive") +
        (dimensions.direction[0] === -1 ? " left" : " right") +
        (dimensions.direction[1] === -1 ? " away" : " towards")
      }
      style={{
        top: dimensions.top + "%",
        left: dimensions.left + "%",
        zIndex: dimensions.top,
        height: size + "%",
        width: size * 0.7 + "%",
        transition: dimensions.speed / 1000 + "s linear",
      }}
      onClick={deadTurkey}
    ></div>
  );
};

export default TurkeyControl;
