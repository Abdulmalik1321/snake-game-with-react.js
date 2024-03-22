import { useState } from "react";
import "./App.css";

import { GameGrid } from "./components/GameGrid";

function App() {
  const [position, setPosition] = useState([1, 1]);

  window.addEventListener("keyup", (e) => {
    // console.log(e);
    if (e.key == "ArrowUp") {
      setPosition([position[0] - 1, position[1]]);
    } else if (e.key == "ArrowRight") {
      setPosition([position[0], position[1] + 1]);
    } else if (e.key == "ArrowDown") {
      setPosition([position[0] + 1, position[1]]);
    } else if (e.key == "ArrowLeft") {
      setPosition([position[0], position[1] - 1]);
      // const player = document.getElementById("player") as HTMLSpanElement;

      // const toGo = document.getElementById(
      //   `${position[0]}-${position[1]}`
      // ) as HTMLDivElement;

      // toGo.appendChild(player);
    }
  });

  const GridIds: number[][] = [];
  for (let i = 1; i < 9; i++) {
    for (let x = 1; x < 9; x++) {
      GridIds.push([i, x]);
    }
  }

  return (
    <>
      <GameGrid GridIds={GridIds} position={position} />
    </>
  );
}

export default App;
