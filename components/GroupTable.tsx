"use client";
import Link from "next/link";

interface Team {
  code: string;
  name: string;
  flag: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  gf: number;
  ga: number;
  pts: number;
  qualified: boolean;
}

interface Group {
  id: string;
  teams: Team[];
}

export default function GroupTable({ group }: { group: Group }) {
  const sorted = [...group.teams].sort((a, b) => {
    if (b.pts !== a.pts) return b.pts - a.pts;
    const gdA = a.gf - a.ga;
    const gdB = b.gf - b.ga;
    if (gdB !== gdA) return gdB - gdA;
    return b.gf - a.gf;
  });

  const teamCodes: Record<string, string> = {
    USA: "USA", MEX: "MEX", POL: "POL", KSA: "KSA",
    ESP: "ESP", BRA: "BRA", CHE: "CHE", CMR: "CMR",
    ARG: "ARG", CAN: "CAN", EGY: "EGY", NZL: "NZL",
    FRA: "FRA", GER: "GER", ITA: "ITA", ALG: "ALG",
    ENG: "ENG", POR: "POR", URU: "URU", KOR: "KOR",
    NED: "NED", JPN: "JPN", SWE: "SWE", TUN: "TUN",
    BEL: "BEL", NOR: "NOR", SEN: "SEN", CHN: "CHN",
    PRT: "PRT", COL: "COL", MAR: "MAR", GHA: "GHA",
    NGA: "NGA", TUR: "TUR", CIV: "CIV", AUS: "AUS",
    CRO: "CRO", DEN: "DEN", IRN: "IRN", ECU: "ECU",
  };

  const navigableTeams = ["JPN", "NED", "SWE", "TUN", "ARG"];

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="bg-gradient-to-r from-[#0d3d22] to-[#1a6b3c] px-4 py-3">
        <h3 className="text-white font-bold text-lg">グループ {group.id}</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 text-gray-500 text-xs">
              <th className="text-left px-3 py-2 w-8">#</th>
              <th className="text-left px-3 py-2">チーム</th>
              <th className="px-2 py-2 text-center">試</th>
              <th className="px-2 py-2 text-center">勝</th>
              <th className="px-2 py-2 text-center">分</th>
              <th className="px-2 py-2 text-center">負</th>
              <th className="px-2 py-2 text-center">得</th>
              <th className="px-2 py-2 text-center">失</th>
              <th className="px-2 py-2 text-center">差</th>
              <th className="px-2 py-2 text-center font-bold text-gray-700">勝点</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((team, idx) => {
              const gd = team.gf - team.ga;
              const isNavigable = navigableTeams.includes(team.code);
              const qualified = idx < 2 && team.pts > 0;
              return (
                <tr key={team.code} className={`border-t border-gray-100 ${qualified ? "bg-green-50" : ""} hover:bg-gray-50 transition-colors`}>
                  <td className="px-3 py-2.5 text-gray-500 font-medium">{idx + 1}</td>
                  <td className="px-3 py-2.5">
                    <div className="flex items-center gap-2">
                      {team.qualified && <span className="text-yellow-500 text-xs">★</span>}
                      <span className="text-lg">{team.flag}</span>
                      {isNavigable ? (
                        <Link href={`/team/${team.code}`} className="font-medium text-[#1a6b3c] hover:underline">
                          {team.name}
                        </Link>
                      ) : (
                        <span className="font-medium text-gray-700">{team.name}</span>
                      )}
                    </div>
                  </td>
                  <td className="px-2 py-2.5 text-center text-gray-600">{team.played}</td>
                  <td className="px-2 py-2.5 text-center text-gray-600">{team.won}</td>
                  <td className="px-2 py-2.5 text-center text-gray-600">{team.drawn}</td>
                  <td className="px-2 py-2.5 text-center text-gray-600">{team.lost}</td>
                  <td className="px-2 py-2.5 text-center text-gray-600">{team.gf}</td>
                  <td className="px-2 py-2.5 text-center text-gray-600">{team.ga}</td>
                  <td className="px-2 py-2.5 text-center text-gray-600">{gd > 0 ? `+${gd}` : gd}</td>
                  <td className="px-2 py-2.5 text-center font-bold text-[#0d3d22]">{team.pts}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
