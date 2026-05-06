

type PlayerCircleProps = {
  players: string[];
  activeIndex: number | null;
};

export default function PlayerCircle({
  players,
  activeIndex,
}: PlayerCircleProps) {
  const radius = 120;

  return (
    <div className="circle">
      <div className="circle-center">
        <img src="/Bucket.png" alt="Bucket" />
      </div>

      {players.map((player, i) => {
        const angle = (i / players.length) * 2 * Math.PI;

        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        const isActive = i === activeIndex;

        return (
          <div
            key={i}
            className={`circle-player ${isActive ? "active" : ""}`}
            style={{
              transform: `translate(${x}px, ${y}px)`
            }}
          >
            {player}
          </div>
        );
      })}
    </div>
  );
}