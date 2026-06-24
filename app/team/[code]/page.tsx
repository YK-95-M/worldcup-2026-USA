import { notFound } from "next/navigation";
import teamsData from "@/src/data/teams.json";
import groupsData from "@/src/data/groups.json";
import FormationView from "@/components/FormationView";
import PlayerList from "@/components/PlayerList";

export function generateStaticParams() {
  return teamsData.teams.map((t) => ({ code: t.code }));
}

export default function TeamPage({ params }: { params: { code: string } }) {
  const team = teamsData.teams.find((t) => t.code === params.code);
  if (!team) notFound();

  const group = groupsData.groups.find((g) => g.id === team.group);
  const sorted = group
    ? [...group.teams].sort((a, b) => {
        if (b.pts !== a.pts) return b.pts - a.pts;
        return (b.gf - b.ga) - (a.gf - a.ga);
      })
    : [];
  const teamInGroup = sorted.find((t) => t.code === team.code);
  const teamRank = sorted.findIndex((t) => t.code === team.code) + 1;

  const groupMatches = (group as any)?.matches ?? [];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* ヘッダー */}
      <div className="bg-gradient-to-br from-[#0d3d22] to-[#1a6b3c] text-white rounded-2xl p-6 mb-6 shadow-xl">
        <div className="flex items-center gap-6">
          <div className="text-7xl">{team.flag}</div>
          <div>
            <h1 className="text-3xl font-bold">{team.name}</h1>
            <p className="text-white/70">{team.nameEn}</p>
            <div className="flex gap-4 mt-3">
              <div className="bg-white/10 rounded-lg px-3 py-1.5">
                <span className="text-white/60 text-xs">FIFAランク</span>
                <div className="text-xl font-bold text-[#c9a84c]">#{team.fifaRank}</div>
              </div>
              <div className="bg-white/10 rounded-lg px-3 py-1.5">
                <span className="text-white/60 text-xs">グループ</span>
                <div className="text-xl font-bold text-[#c9a84c]">{team.group}</div>
              </div>
              <div className="bg-white/10 rounded-lg px-3 py-1.5">
                <span className="text-white/60 text-xs">現在の順位</span>
                <div className="text-xl font-bold text-[#c9a84c]">{teamRank}位</div>
              </div>
              <div className="bg-white/10 rounded-lg px-3 py-1.5">
                <span className="text-white/60 text-xs">フォーメーション</span>
                <div className="text-xl font-bold text-[#c9a84c]">{team.formation}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {/* フォーメーション図 */}
        <section className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100">
            <h2 className="font-bold text-[#0d3d22]">フォーメーション ({team.formation})</h2>
          </div>
          <div className="p-4">
            <FormationView
              players={team.players as any}
              formation={team.formationPositions as any}
            />
          </div>
        </section>

        {/* グループ内順位 */}
        <section className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100">
            <h2 className="font-bold text-[#0d3d22]">グループ {team.group} 順位表</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-gray-500 text-xs">
                  <th className="px-3 py-2 text-left">#</th>
                  <th className="px-3 py-2 text-left">チーム</th>
                  <th className="px-2 py-2 text-center">試</th>
                  <th className="px-2 py-2 text-center">勝</th>
                  <th className="px-2 py-2 text-center">得失</th>
                  <th className="px-2 py-2 text-center font-bold text-gray-700">勝点</th>
                </tr>
              </thead>
              <tbody>
                {sorted.map((t, idx) => (
                  <tr key={t.code} className={`border-t border-gray-100 ${t.code === team.code ? "bg-[#e8f5ed]" : ""}`}>
                    <td className="px-3 py-2 text-gray-500">{idx + 1}</td>
                    <td className="px-3 py-2">
                      <span className="flex items-center gap-2">
                        <span>{t.flag}</span>
                        <span className={`font-medium ${t.code === team.code ? "text-[#1a6b3c] font-bold" : "text-gray-700"}`}>{t.name}</span>
                      </span>
                    </td>
                    <td className="px-2 py-2 text-center text-gray-600">{t.played}</td>
                    <td className="px-2 py-2 text-center text-gray-600">{t.won}</td>
                    <td className="px-2 py-2 text-center text-gray-600">{t.gf - t.ga > 0 ? `+${t.gf - t.ga}` : t.gf - t.ga}</td>
                    <td className="px-2 py-2 text-center font-bold text-[#0d3d22]">{t.pts}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 試合結果 */}
          {groupMatches.length > 0 && (
            <div className="px-4 pb-4 pt-2">
              <h3 className="font-bold text-[#0d3d22] mb-2 text-sm">試合結果</h3>
              <div className="space-y-2">
                {groupMatches
                  .filter((m: any) => m.home === team.code || m.away === team.code)
                  .map((m: any, i: number) => {
                    const homeTeam = sorted.find((t) => t.code === m.home);
                    const awayTeam = sorted.find((t) => t.code === m.away);
                    return (
                      <div key={i} className={`flex items-center gap-2 text-sm rounded-lg px-3 py-2 ${m.played ? "bg-green-50" : "bg-gray-50"}`}>
                        <span>{homeTeam?.flag}</span>
                        <span className="font-medium">{homeTeam?.name}</span>
                        <span className="mx-2 font-bold text-gray-800">
                          {m.played ? `${m.homeScore} - ${m.awayScore}` : "vs"}
                        </span>
                        <span className="font-medium">{awayTeam?.name}</span>
                        <span>{awayTeam?.flag}</span>
                        {!m.played && <span className="ml-auto text-xs text-gray-400">未実施</span>}
                      </div>
                    );
                  })}
              </div>
            </div>
          )}
        </section>
      </div>

      {/* 選手一覧 */}
      <section className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-100">
          <h2 className="font-bold text-[#0d3d22]">選手一覧</h2>
        </div>
        <PlayerList players={team.players as any} />
      </section>
    </div>
  );
}
