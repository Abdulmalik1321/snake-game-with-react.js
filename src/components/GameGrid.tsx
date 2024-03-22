import { Island } from "./Island";
export function GameGrid({
  position,
  GridIds,
}: {
  position: number[];
  GridIds: number[][];
}) {
  console.log("Rerendering Grid");

  return (
    <div className="GameGrid">
      {GridIds.map((arr) => {
        return (
          <Island
            key={`${arr[0]}-${arr[1]}`}
            position={position}
            elementId={`${arr[0]}-${arr[1]}`}
          />
        );
      })}
    </div>
  );
}
