"use client";

interface Player {
  number: number;
  name: string;
  position: string;
  club: string;
  goals: number;
  assists: number;
}

const positionOrder: Record<string, number> = { GK: 0, DF: 1, MF: 2, FW: 3 };
const positionColors: Record<string, string> = {
  GK: "bg-yellow-100 text-yellow-800",
  DF: "bg-blue-100 text-blue-800",
  MF: "bg-green-100 text-green-800",
  FW: "bg-red-100 text-red-800",
};

export default function PlayerList({ players }: { players: Player[] }) {
  const sorted = [...players].sort((a, b) => {
    const posA = positionOrder[a.position] ?? 9;
    const posB = positionOrder[b.position] ?? 9;
    if (posA !== posB) return posA - posB;
    return a.number - b.number;
  });

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-50 text-gray-500 text-xs border-b">
            <th className="px-3 py-2 text-left w-10">番号</th>
            <th className="px-3 py-2 text-left">選手名</th>
            <th className="px-3 py-2 text-center">POS</th>
            <th className="px-3 py-2 text-left hidden md:table-cell">所属クラブ</th>
            <th className="px-3 py-2 text-center">得点</th>
            <th className="px-3 py-2 text-center">A</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((player) => (
            <tr key={player.number} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
              <td className="px-3 py-2.5 text-gray-400 font-mono">{player.number}</td>
              <td className="px-3 py-2.5 font-medium text-gray-800">{player.name}</td>
              <td className="px-3 py-2.5 text-center">
                <span className={`inline-block px-2 py-0.5 rounded text-xs font-bold ${positionColors[player.position] ?? "bg-gray-100 text-gray-600"}`}>
                  {player.position}
                </span>
              </td>
              <td className="px-3 py-2.5 text-gray-500 hidden md:table-cell">{player.club}</td>
              <td className="px-3 py-2.5 text-center font-bold text-[#1a6b3c]">{player.goals || "-"}</td>
              <td className="px-3 py-2.5 text-center font-bold text-blue-600">{player.assists || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
