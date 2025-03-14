import { useState, useEffect } from "react";
import Tele from "../tile/tile";

// 1
//const initialTiles = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, null];
// 2
//const initialTiles = [null, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
// 3
//const initialTiles = [1, 2, 3, 4, 8, 7, 6, 5, 9, 10, 11, 12, null, 15, 14, 13];
// 4
//const initialTiles = [13, 14, 15, null, 12, 11, 10, 9, 5, 6, 7, 8, 4, 3, 2, 1];
// 5
const initialTiles = [13, 14, 15, null, 9, 10, 11, 12, 5, 6, 7, 8, 4, 3, 2, 1];

function Rez() {
  const [varOne, setVarOne] = useState(initialTiles);

  return (
    <>
      <section className="px-3">
        <div className="grid grid-cols-4 grid-rows-4 border-4 outline-6 outline-yellow-400 border-orange-800 rounded-lg bg-orange-800 w-[280px] h-[280px] 375:w-[350px] 375:h-[350px] gap-1">
          {varOne.map((el, index) =>
            el !== null ? (
              <Tele key={index} number={el} />
            ) : (
              <div key={index} className="bg-transparent"></div>
            )
          )}
        </div>
      </section>
    </>
  );
}

export default Rez;
