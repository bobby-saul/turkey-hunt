import React, { useCallback, useMemo } from "react";

const Ammo = ({ ammo, maxAmmo, reload }) => {
  const myReload = useCallback(
    (e) => {
      e.stopPropagation();
      reload();
    },
    [reload]
  );

  const shells = useMemo(() => {
    const shells = [];
    for (var shell = 0; shell < maxAmmo; shell++) {
      shells.push(
        <div
          key={shell}
          onClick={myReload}
          className={"shell " + (shell >= ammo ? "used" : "")}
        ></div>
      );
    }
    return shells;
  }, [ammo, maxAmmo, myReload]);

  return <div className="ammo">{shells}</div>;
};

export default Ammo;
