import React, { useMemo } from "react";

const TILE_ROW = 14;
const TILE_COLUMN = 20;
const TILE_TYPE = 4;

const Ground = ({ assets }) => {
  // Set the ground assets.
  const assetElements = useMemo(
    () =>
      assets.map((asset) => {
        return (
          <div
            key={"ground-asset-" + asset.id}
            className={"ground-asset ground-asset-" + asset.style}
            style={{
              top: asset.y + "%",
              left: asset.x + "%",
              height: asset.size + "%",
              width: asset.size * 0.7 + "%",
              zIndex: asset.y,
            }}
          ></div>
        );
      }),
    [assets]
  );

  // Set the ground tiles.
  const tiles = useMemo(() => {
    const tiles = [];
    for (var row = 0; row < TILE_ROW; row++) {
      var columns = [];
      for (var column = 0; column < TILE_COLUMN; column++) {
        columns.push(
          <div
            key={"ground-row-" + row + "-column-" + column}
            className={
              "ground-column ground-" + Math.floor(Math.random() * TILE_TYPE)
            }
          ></div>
        );
      }
      tiles.push(
        <div key={"ground-row-" + row} className="ground-row">
          {columns}
        </div>
      );
    }
    return tiles;
  }, [assets]);

  return (
    <div className="ground">
      <div className="horizon"></div>
      <div className="ground-tiles">{tiles}</div>
      <div className="ground-assets">{assetElements}</div>
    </div>
  );
};

export default Ground;
