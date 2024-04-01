import { Island } from "./Island";
export function GameGrid({
  GridIds,
  food,
}: {
  GridIds: number[][];
  food: number[];
}) {
  console.log("Rerendering Grid");

  return (
    <div className="GameGrid">
      {GridIds.map((arr) => {
        return (
          <Island
            key={`${arr[0]}-${arr[1]}`}
            elementId={`${arr[0]}-${arr[1]}`}
            food={food}
          />
        );
      })}
    </div>
  );
}
