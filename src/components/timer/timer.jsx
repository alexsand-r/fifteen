//--timer
import { useState } from "react";

function Timer({ hour, min, sec, ms }) {
  return (
    <>
      <div className="text-3xl text-bold  text-white mb-4 ">
        {String(hour).padStart(2, "0")} : {String(min).padStart(2, "0")} :{" "}
        {String(sec).padStart(2, "0")} :{" "}
        <span className="text-lg">{String(ms).padStart(2, "0")}</span>
      </div>
    </>
  );
}

export default Timer;
