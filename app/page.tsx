import Link from "next/link";
import scorersData from "@/src/data/scorers.json";

export default function Home() {
  const top5 = scorersData.topScorers.slice(0, 5);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <section className="bg-gradient-to-br from-[#0d3d22] to-[#1a6b3c] text-white rounded-2xl p-8 mb-8 shadow-xl">
        <div className="text-center">
          <div className="text-6xl mb-4">🏆</div>
          <h1 className="text-3xl md:text-5xl font-bold text-[#c9a84c] mb-2">
            FIFA ワールドカップ 2026
          </h1>
          <p className="text-xl text-white/80 mb-6">北中米大会 — アメリカ・カナダ・メキシコ</p>
          <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto">
            <div className="bg-white/10 rounded-xl p-4">
              <div className="text-3xl font-bold text-[#c9a84c]">48</div>
              <div className="text-sm text-white/70">出場国</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <div className="text-3xl font-bold text-[#c9a84c]">104</div>
              <div className="text-sm text-white/70">総試合数</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <div className="text-3xl font-bold text-[#c9a84c]">12</div>
              <div className="text-sm text-white/70">グループ</div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white rounded-xl p-6 mb-6 shadow-md border-l-4 border-[#1a6b3c]">
        <div className="flex items-center gap-3">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
          <div>
            <h2 className="font-bold text-[#0d3d22] text-lg">現在のフェーズ：グループステージ 進行中</h2>
            <p className="text-sm text-gray-500">第2節完了 / 第3節 6月24〜27日開催予定</p>
          </div>
        </div>
      </section>

      <div className="grid md:grid-cols-2 gap-6">
        <section className="bg-white rounded-xl p-6 shadow-md">
          <h2 className="text-xl font-bold text-[#0d3d22] mb-4">⚽ 得点ランキング TOP5</h2>
          <div className="space-y-3">
            {top5.map((player, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold text-white ${
                  i === 0 ? "bg-[#c9a84c]" : i === 1 ? "bg-gray-400" : i === 2 ? "bg-amber-600" : "bg-[#1a6b3c]"
                }`}>
                  {player.rank}
                </span>
                <span className="text-xl">{player.flag}</span>
                <div className="flex-1">
                  <div className="font-semibold text-gray-800">{player.name}</div>
                  <div className="text-xs text-gray-500">{player.country} / {player.club}</div>
                </div>
                <div className="text-2xl font-bold text-[#1a6b3c]">{player.goals}</div>
                <div className="text-xs text-gray-400">点</div>
              </div>
            ))}
          </div>
          <Link href="/stats" className="mt-4 block text-center text-sm text-[#1a6b3c] hover:text-[#0d3d22] font-medium">
            全ランキングを見る →
          </Link>
        </section>

        <section className="space-y-4">
          <Link href="/groups" className="block bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow border border-transparent hover:border-[#1a6b3c]">
            <div className="flex items-center gap-4">
              <div className="text-4xl">📊</div>
              <div>
                <h3 className="text-lg font-bold text-[#0d3d22]">グループステージ</h3>
                <p className="text-sm text-gray-500">12グループ（A～L）の順位表を見る</p>
              </div>
              <span className="ml-auto text-gray-300">→</span>
            </div>
          </Link>
          <Link href="/bracket" className="block bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow border border-transparent hover:border-[#1a6b3c]">
            <div className="flex items-center gap-4">
              <div className="text-4xl">🏙️</div>
              <div>
                <h3 className="text-lg font-bold text-[#0d3d22]">トーナメント表</h3>
                <p className="text-sm text-gray-500">ラウンド32から決勝までの組み合わせ</p>
              </div>
              <span className="ml-auto text-gray-300">→</span>
            </div>
          </Link>
          <Link href="/stats" className="block bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow border border-transparent hover:border-[#1a6b3c]">
            <div className="flex items-center gap-4">
              <div className="text-4xl">📈</div>
              <div>
                <h3 className="text-lg font-bold text-[#0d3d22]">得点・アシストランキング</h3>
                <p className="text-sm text-gray-500">今大会＆歴代通算ランキング</p>
              </div>
              <span className="ml-auto text-gray-300">→</span>
            </div>
          </Link>
        </section>
      </div>

      <section className="mt-6 bg-gradient-to-r from-white to-blue-50 rounded-xl p-6 shadow-md border border-blue-100">
        <h2 className="text-xl font-bold text-[#0d3d22] mb-4">🇯🇵 注目：グループF（日本グループ）</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { flag: "🇳🇱", name: "オランダ", pts: 6, rank: 1, code: "NED" },
            { flag: "🇯🇵", name: "日本", pts: 3, rank: 2, code: "JPN" },
            { flag: "🇸🇪", name: "スウェーデン", pts: 3, rank: 3, code: "SWE" },
            { flag: "🇹🇳", name: "チュニジア", pts: 0, rank: 4, code: "TUN" },
          ].map((team) => (
            <Link key={team.code} href={`/team/${team.code}`}
              className="bg-white rounded-lg p-4 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="text-3xl mb-1">{team.flag}</div>
              <div className="font-bold text-gray-800">{team.name}</div>
              <div className="text-sm text-gray-500">{team.pts}pt / {team.rank}位</div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
