import React from "react";

const Ammo = ({ammo, maxAmmo, reload}) => {
    var shells = [];

    for (var shell = 0; shell < maxAmmo; shell++) {
        shells.push(
            <div key={shell} onClick={myReload} className={"shell " + (shell >= ammo ? "used" : "")}>
            </div>
        )
    }

    function myReload(e) {
        e.stopPropagation();
        reload();
    }

    return (
        <div className="ammo">
            {shells}
        </div>
    );
};

export default Ammo;
