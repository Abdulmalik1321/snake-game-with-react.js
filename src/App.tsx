import { useState } from "react";
import "./App.css";

import { GameGrid } from "./components/GameGrid";

function App() {
  for (let i = 0; i < 1000; i++) {
    window.clearInterval(i);
  }
  const randomInt = () => {
    let randomNum: number[] = [
      Math.floor(Math.random() * (16 - 1 + 1) + 1),
      Math.floor(Math.random() * (24 - 1 + 1) + 1),
    ];

    position.forEach((pos) => {
      if (pos.every((value, index) => value === randomNum[index])) {
        randomNum = [
          Math.floor(Math.random() * (16 - 1 + 1) + 1),
          Math.floor(Math.random() * (24 - 1 + 1) + 1),
        ];
      }
    });

    score++;

    if (score >= bestScore && score > 0) {
      // console.log(bestScore);
      localStorage.setItem("score", String(score));
      bestScore = score;
      const h1Score = document.getElementById("bestScore") as HTMLSpanElement;
      h1Score.innerText = String(score);
    }

    if (score > 0) {
      const h2Score = document.getElementById("score") as HTMLSpanElement;
      h2Score.innerText = String(score);
    }

    return randomNum;
  };

  const movePosition = (e: KeyboardEvent) => {
    if (
      !(dir == "ArrowRight" && e.key == "ArrowLeft") &&
      !(dir == "ArrowLeft" && e.key == "ArrowRight") &&
      !(dir == "ArrowUp" && e.key == "ArrowDown") &&
      !(dir == "ArrowDown" && e.key == "ArrowUp")
    ) {
      dir = e.key;
    }
  };

  const checkDeath = (newPosition: number[]) => {
    return position.some((arr) =>
      arr.every((value, index) => value === newPosition[index])
    );
  };

  const loseHandler = () => {
    alert("you lost the game");
    position = [
      [1, 2],
      [1, 1],
    ];
    dir = "none";
    score = -1;
    food = randomInt();
    // bestScore = bestScore - 1;
    const h2Score = document.getElementById("score") as HTMLSpanElement;
    h2Score.innerText = "0";
    return [1, 1];
  };

  if (localStorage.getItem("score") == null) {
    localStorage.setItem("score", "0");
  }
  let bestScore = Number(localStorage.getItem("score"));
  let score = -1;

  const [speed, setSpeed] = useState(100);

  let position = [
    [1, 1],
    [1, 2],
  ];
  let food = randomInt();
  let dir = "none";

  const GridIds: number[][] = [];
  for (let i = 1; i < 17; i++) {
    for (let x = 1; x < 25; x++) {
      GridIds.push([i, x]);
    }
  }

  window.setInterval(() => {
    let newPosition: number[] = [];
    const last: number = position.length - 1;
    switch (dir) {
      case "ArrowUp":
        newPosition = [position[last][0] - 1, position[last][1]];
        if (newPosition[0] < 1 || checkDeath(newPosition)) {
          newPosition = loseHandler();
        }
        if (newPosition[0] === food[0] && newPosition[1] === food[1]) {
          food = randomInt();
          position = [...position, newPosition];
        } else {
          position = [...position.slice(1), newPosition];
        }
        break;

      case "ArrowRight":
        newPosition = [position[last][0], position[last][1] + 1];
        if (newPosition[1] > 24 || checkDeath(newPosition)) {
          newPosition = loseHandler();
        }
        if (newPosition[0] === food[0] && newPosition[1] === food[1]) {
          food = randomInt();
          position = [...position, newPosition];
        } else {
          position = [...position.slice(1), newPosition];
        }
        break;

      case "ArrowDown":
        newPosition = [position[last][0] + 1, position[last][1]];
        if (newPosition[0] > 16 || checkDeath(newPosition)) {
          newPosition = loseHandler();
        }
        if (newPosition[0] === food[0] && newPosition[1] === food[1]) {
          food = randomInt();
          position = [...position, newPosition];
        } else {
          position = [...position.slice(1), newPosition];
        }
        break;

      case "ArrowLeft":
        newPosition = [position[last][0], position[last][1] - 1];
        if (newPosition[1] < 1 || checkDeath(newPosition)) {
          newPosition = loseHandler();
        }
        if (newPosition[0] === food[0] && newPosition[1] === food[1]) {
          food = randomInt();
          position = [...position, newPosition];
        } else {
          position = [...position.slice(1), newPosition];
        }
        break;

      default:
        break;
    }

    GridIds.forEach((island) => {
      if (
        position.some((arr) =>
          arr.every((value, index) => value === island[index])
        )
      ) {
        document
          .getElementById(`${island[0]}-${island[1]}`)
          ?.classList.add("green");
      } else {
        const islandPos = document.getElementById(
          `${island[0]}-${island[1]}`
        ) as HTMLDivElement;

        islandPos.classList.remove("green");
        islandPos.classList.remove("red");
      }
    });
    const foodPos = document.getElementById(
      `${food[0]}-${food[1]}`
    ) as HTMLDivElement;
    foodPos.classList.add("red");
  }, speed);

  window.onkeydown = movePosition;

  return (
    <main>
      <GameGrid GridIds={GridIds} food={food} />
      <div className="score">
        <h1>
          Best Score: <span id="bestScore">{bestScore}</span>
        </h1>
        <h2>
          Current Score: <span id="score">0</span>
        </h2>
        <div className="speed__wrap">
          <h3>Change Speed:</h3>
          <div className="speed">
            <button
              onClick={() => {
                setSpeed(speed - 25);
              }}
            >
              -
            </button>
            <span>{speed}</span>
            <button
              onClick={() => {
                setSpeed(speed + 25);
              }}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
