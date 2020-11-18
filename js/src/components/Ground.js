import React, {useState, useEffect} from "react";

const TILE_SIZE = 32;
const GROUND_TYPES = 4;
const MIN_GROUND_ASSETS = 3;
const MAX_GROUND_ASSETS = 10 - MIN_GROUND_ASSETS;
const ASSET_TYPES = 3;

const Ground = ({size}) => {
    const [tiles, setTiles] = useState([]);
    const [assets, setAssets] = useState([]);
    useEffect(() => {
        var newTiles = [];
        for (var row = 0; row < (size / TILE_SIZE); row++){
            var columns = [];
            for (var column = 0; column < (size / TILE_SIZE); column++){
                columns.push(<div key={"ground-row-" + row + "-column-" + column} className={"ground-column ground-" + Math.floor(Math.random() * GROUND_TYPES)}></div>);
            }
            newTiles.push(<div key={"ground-row-" + row} className="ground-row">
                {columns}
            </div>);
        }
        setTiles(newTiles);
    },[size]);
    useEffect(() => {
        var assetAmount = Math.floor(Math.random() * MAX_GROUND_ASSETS) + MIN_GROUND_ASSETS;
        for (var asset = 0; asset < assetAmount; asset++) {
            var y = Math.floor(Math.random() * 100);
            var x = Math.floor(Math.random() * 100);
            assets.push(
                <div key={"ground-asset-" + asset} className={"ground-asset ground-asset-" + Math.floor(Math.random() * ASSET_TYPES)} style={{
                    top: y + "%",
                    left: x + "%",
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
