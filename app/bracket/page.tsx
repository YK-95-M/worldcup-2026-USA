import bracketData from "@/src/data/bracket.json";
import TournamentBracket from "@/components/TournamentBracket";

export default function BracketPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-[#0d3d22] mb-2">トーナメント表</h1>
      <p className="text-gray-500 mb-6">
        グループ上位2チーム（各グループ）＋3位の上位8チームが決勝トーナメントへ進出
      </p>
      <TournamentBracket data={bracketData as any} />
    </div>
  );
}
