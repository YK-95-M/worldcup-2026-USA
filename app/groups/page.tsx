import groupsData from "@/src/data/groups.json";
import GroupTable from "@/components/GroupTable";

export default function GroupsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-[#0d3d22] mb-2">グループステージ</h1>
      <p className="text-gray-500 mb-6">★ = 突破確定 / 上位2チームが決勝トーナメントへ進出</p>
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {groupsData.groups.map((group) => (
          <GroupTable key={group.id} group={group as any} />
        ))}
      </div>
    </div>
  );
}
