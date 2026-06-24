"use client";

interface Player {
  number: number;
  name: string;
  position: string;
  club: string;
  goals: number;
  assists: number;
}

interface FormationData {
  type: string;
  lines: number[][];
}

interface Props {
  players: Player[];
  formation: FormationData;
}

export default function FormationView({ players, formation }: Props) {
  const playerMap = Object.fromEntries(players.map((p) => [p.number, p]));

  return (
    <div className="bg-gradient-to-b from-[#2d8a50] to-[#1a6b3c] rounded-xl p-4 aspect-[3/4] relative overflow-hidden shadow-inner">
      {/* Field lines */}
      <div className="absolute inset-x-4 top-4 bottom-4 border-2 border-white/30 rounded" />
      <div className="absolute left-4 right-4 top-1/2 h-px bg-white/30" />
      <div className="absolute left-1/2 top-4 bottom-4 w-px bg-white/30" style={{ left: "50%" }} />
      {/* Center circle */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 border-2 border-white/30 rounded-full" />

      {/* Players */}
      <div className="absolute inset-0 flex flex-col justify-around py-4 px-2">
        {formation.lines.map((line, lineIdx) => (
          <div key={lineIdx} className="flex justify-around">
            {line.map((num, i) => {
              const player = playerMap[num];
              if (!player) return null;
              return (
                <div key={i} className="flex flex-col items-center gap-1">
                  <div className="w-8 h-8 rounded-full bg-[#c9a84c] text-[#0d3d22] flex items-center justify-center text-xs font-bold shadow-lg border-2 border-white">
                    {num}
                  </div>
                  <div className="text-white text-[9px] font-medium text-center max-w-12 leading-tight truncate">
                    {player.name.split(" ").pop()}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
