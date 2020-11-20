import React, {useState, useEffect} from "react";

const TILE_ROW = 14;
const TILE_COLUMN = 20;
const GROUND_TYPES = 4;
const MIN_GROUND_ASSETS = 3;
const MAX_GROUND_ASSETS = 15 - MIN_GROUND_ASSETS;
const ASSET_TYPES = 4;
const ASSET_MIN_SIZE = 10;
const ASSET_MAX_SIZE = 25 - ASSET_MIN_SIZE;

const Ground = () => {
    const [tiles, setTiles] = useState([]);
    const [assets, setAssets] = useState([]);
    useEffect(() => {
        var newTiles = [];
        for (var row = 0; row < TILE_ROW; row++){
            var columns = [];
            for (var column = 0; column < TILE_COLUMN; column++){
                columns.push(<div key={"ground-row-" + row + "-column-" + column} className={"ground-column ground-" + Math.floor(Math.random() * GROUND_TYPES)}></div>);
            }
            newTiles.push(<div key={"ground-row-" + row} className="ground-row">
                {columns}
            </div>);
        }
        setTiles(newTiles);
    },[]);
    useEffect(() => {
        var assetAmount = Math.floor(Math.random() * MAX_GROUND_ASSETS) + MIN_GROUND_ASSETS;
        for (var asset = 0; asset < assetAmount; asset++) {
            var y = Math.floor(Math.random() * 100);
            var x = Math.floor(Math.random() * 100);
            var style = Math.floor(Math.random() * ASSET_TYPES);
            var classes = "ground-asset ground-asset-" + style;
            var size =  (y / 100) * ASSET_MAX_SIZE + ASSET_MIN_SIZE;
            if (style === 0) {
                size = 0.7 * size;
            }
            assets.push(
                <div key={"ground-asset-" + asset} className={classes} style={{
                    top: y + "%",
                    left: x + "%",
                    height: size + "%",
                    width: (size * 0.7) + "%",
                    zIndex: y
                }}>
                </div>
            );
        }
        setAssets(assets);
    }, []);
    return (
        <div className="ground">
            <div className="ground-tiles">
                {tiles}
            </div>
            <div className="ground-assets">
                {assets}
            </div>
        </div>
    )
};

export default Ground;
