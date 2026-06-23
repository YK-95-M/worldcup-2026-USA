import scorersData from "@/src/data/scorers.json";
import alltimeData from "@/src/data/alltime.json";
import StatsRanking from "@/components/StatsRanking";

export default function StatsPage() {
  const data = {
    topScorers: scorersData.topScorers,
    topAssists: scorersData.topAssists,
    allTimeScorers: alltimeData.allTimeScorers,
    allTimeAssists: alltimeData.allTimeAssists,
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-[#0d3d22] mb-2">得点・アシストランキング</h1>
      <p className="text-gray-500 mb-6">今大会 TOP20 / W杯通算 TOP20</p>
      <StatsRanking data={data} />
    </div>
  );
}
