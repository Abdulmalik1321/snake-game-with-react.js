export function Island({
  elementId,
  position,
}: {
  elementId: string;
  position: number[];
}) {
  return (
    <div className="Island" id={elementId}>
      {elementId === `${position[0]}-${position[1]}` ? <span>#</span> : null}
    </div>
  );
}
