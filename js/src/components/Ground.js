import React, {useState, useEffect} from "react";

const TILE_ROW = 14;
const TILE_COLUMN = 20;
const TILE_TYPE = 4;

const Ground = ({assets}) => {
    const [tiles, setTiles] = useState([]);
    
    var assetsDOM = assets.map((asset) => {
        return (
            <div key={"ground-asset-" + asset.id}
                className={"ground-asset ground-asset-" + asset.style}
                style={{
                    top: asset.y + "%",
                    left: asset.x + "%",
                    height: asset.size + "%",
                    width: (asset.size * 0.7) + "%",
                    zIndex: asset.y
                }}
            >
            </div>
        );
    });
    
    // Set the ground tiles.
    useEffect(() => {
        var newTiles = [];
        for (var row = 0; row < TILE_ROW; row++){
            var columns = [];
            for (var column = 0; column < TILE_COLUMN; column++){
                columns.push(<div key={"ground-row-" + row + "-column-" + column} className={"ground-column ground-" + Math.floor(Math.random() * TILE_TYPE)}></div>);
            }
            newTiles.push(<div key={"ground-row-" + row} className="ground-row">
                {columns}
            </div>);
        }
        setTiles(newTiles);
    },[assets]);

    return (
        <div className="ground">
            <div className="horizon"></div>
            <div className="ground-tiles">
                {tiles}
            </div>
            <div className="ground-assets">
                {assetsDOM}
            </div>
        </div>
    )
};

export default Ground;
