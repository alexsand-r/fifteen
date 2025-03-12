import { useState } from "react";
import PlayingField from "./components/playing-field/playing-field";

function App() {
  return (
    <>
      <h1 className="text-2xl font-bold text-amber-300 mb-4 px-4 text-center">
        Sliding Puzzle
      </h1>
      <PlayingField />
    </>
  );
}

export default App;
