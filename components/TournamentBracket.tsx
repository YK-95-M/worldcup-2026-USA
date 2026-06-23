"use client";

interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeFlag: string;
  awayFlag: string;
  homeScore: number | null;
  awayScore: number | null;
  winner: string | null;
}

function MatchCard({ match, compact = false }: { match: Match; compact?: boolean }) {
  const isTBD = (name: string) => name === "TBD";
  const homeWon = match.winner === "home";
  const awayWon = match.winner === "away";

  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden ${compact ? "text-xs" : "text-sm"}`}>
      <div className={`flex items-center gap-1 px-2 py-1.5 ${homeWon ? "bg-green-50" : ""}`}>
        <span className={compact ? "text-base" : "text-lg"}>{match.homeFlag}</span>
        <span className={`flex-1 truncate font-medium ${isTBD(match.homeTeam) ? "text-gray-400 italic" : homeWon ? "text-[#1a6b3c] font-bold" : "text-gray-700"}`}>
          {match.homeTeam}
        </span>
        <span className={`font-bold w-4 text-center ${homeWon ? "text-[#1a6b3c]" : "text-gray-400"}`}>
          {match.homeScore !== null ? match.homeScore : "-"}
        </span>
      </div>
      <div className="h-px bg-gray-100" />
      <div className={`flex items-center gap-1 px-2 py-1.5 ${awayWon ? "bg-green-50" : ""}`}>
        <span className={compact ? "text-base" : "text-lg"}>{match.awayFlag}</span>
        <span className={`flex-1 truncate font-medium ${isTBD(match.awayTeam) ? "text-gray-400 italic" : awayWon ? "text-[#1a6b3c] font-bold" : "text-gray-700"}`}>
          {match.awayTeam}
        </span>
        <span className={`font-bold w-4 text-center ${awayWon ? "text-[#1a6b3c]" : "text-gray-400"}`}>
          {match.awayScore !== null ? match.awayScore : "-"}
        </span>
      </div>
    </div>
  );
}

interface BracketData {
  roundOf32: Match[];
  roundOf16: Match[];
  quarterFinals: Match[];
  semiFinals: Match[];
  final: Match;
}

export default function TournamentBracket({ data }: { data: BracketData }) {
  const rounds = [
    { label: "ラウンド32", matches: data.roundOf32, cols: 4 },
    { label: "ラウンド16", matches: data.roundOf16, cols: 2 },
    { label: "準々決勝", matches: data.quarterFinals, cols: 2 },
    { label: "準決勝", matches: data.semiFinals, cols: 1 },
  ];

  return (
    <div className="space-y-8">
      {/* ラウンド32 */}
      <section>
        <h2 className="text-lg font-bold text-[#0d3d22] mb-3 border-b-2 border-[#c9a84c] pb-1">
          ラウンド32（決勝トーナメント1回戦）
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {data.roundOf32.map((match) => (
            <MatchCard key={match.id} match={match} compact />
          ))}
        </div>
      </section>

      {/* ラウンド16 */}
      <section>
        <h2 className="text-lg font-bold text-[#0d3d22] mb-3 border-b-2 border-[#c9a84c] pb-1">
          ラウンド16（ベスト16）
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {data.roundOf16.map((match) => (
            <MatchCard key={match.id} match={match} />
          ))}
        </div>
      </section>

      {/* 準々決勝 */}
      <section>
        <h2 className="text-lg font-bold text-[#0d3d22] mb-3 border-b-2 border-[#c9a84c] pb-1">
          準々決勝（ベスト8）
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {data.quarterFinals.map((match) => (
            <MatchCard key={match.id} match={match} />
          ))}
        </div>
      </section>

      {/* 準決勝 */}
      <section>
        <h2 className="text-lg font-bold text-[#0d3d22] mb-3 border-b-2 border-[#c9a84c] pb-1">
          準決勝（ベスト4）
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
          {data.semiFinals.map((match) => (
            <MatchCard key={match.id} match={match} />
          ))}
        </div>
      </section>

      {/* 決勝 */}
      <section>
        <h2 className="text-lg font-bold text-[#0d3d22] mb-3 border-b-2 border-[#c9a84c] pb-1">
          🏆 決勝
        </h2>
        <div className="max-w-sm">
          <div className="bg-gradient-to-br from-[#0d3d22] to-[#1a6b3c] p-0.5 rounded-xl shadow-xl">
            <MatchCard match={data.final} />
          </div>
        </div>
      </section>
    </div>
  );
}
