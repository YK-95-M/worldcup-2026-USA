"use client";
import { useState } from "react";

interface Player {
  rank: number;
  name: string;
  country: string;
  flag: string;
  club: string;
  goals?: number;
  assists?: number;
  tournaments?: number;
}

interface StatsData {
  topScorers: Player[];
  topAssists: Player[];
  allTimeScorers: Player[];
  allTimeAssists: Player[];
}

const TABS = [
  { key: "topScorers", label: "今大会 得点", icon: "⚽" },
  { key: "topAssists", label: "今大会 アシスト", icon: "🎯" },
  { key: "allTimeScorers", label: "通算 得点", icon: "🏅" },
  { key: "allTimeAssists", label: "通算 アシスト", icon: "📊" },
] as const;

type TabKey = typeof TABS[number]["key"];

export default function StatsRanking({ data }: { data: StatsData }) {
  const [activeTab, setActiveTab] = useState<TabKey>("topScorers");

  const players = data[activeTab] as Player[];
  const valueKey = activeTab.includes("Scorer") || activeTab.includes("Scorer") ? "goals" : "assists";
  const isGoals = activeTab.includes("Scorer");

  return (
    <div>
      {/* タブ */}
      <div className="flex flex-wrap gap-2 mb-6">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
              activeTab === tab.key
                ? "bg-[#1a6b3c] text-white shadow-md"
                : "bg-white text-gray-600 hover:bg-gray-50 shadow-sm"
            }`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* ランキング表 */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-[#0d3d22] to-[#1a6b3c] text-white text-sm">
                <th className="px-4 py-3 text-left w-12">#</th>
                <th className="px-4 py-3 text-left">選手名</th>
                <th className="px-4 py-3 text-left">国</th>
                <th className="px-4 py-3 text-left hidden md:table-cell">クラブ</th>
                {activeTab.startsWith("allTime") && (
                  <th className="px-4 py-3 text-center hidden md:table-cell">出場大会</th>
                )}
                <th className="px-4 py-3 text-center">{isGoals ? "得点" : "アシスト"}</th>
              </tr>
            </thead>
            <tbody>
              {players.map((player, i) => {
                const value = isGoals ? player.goals : player.assists;
                const isTop3 = i < 3;
                return (
                  <tr key={i} className={`border-t border-gray-100 ${isTop3 ? "bg-amber-50" : "hover:bg-gray-50"} transition-colors`}>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-sm font-bold text-white ${
                        i === 0 ? "bg-[#c9a84c]" : i === 1 ? "bg-gray-400" : i === 2 ? "bg-amber-600" : "bg-gray-200 text-gray-600"
                      }`}>
                        {player.rank}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-semibold text-gray-800">{player.name}</td>
                    <td className="px-4 py-3">
                      <span className="flex items-center gap-2">
                        <span className="text-xl">{player.flag}</span>
                        <span className="text-sm text-gray-600 hidden sm:inline">{player.country}</span>
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500 hidden md:table-cell">{player.club}</td>
                    {activeTab.startsWith("allTime") && (
                      <td className="px-4 py-3 text-center text-sm text-gray-500 hidden md:table-cell">
                        {player.tournaments}大会
                      </td>
                    )}
                    <td className="px-4 py-3 text-center">
                      <span className="text-2xl font-bold text-[#1a6b3c]">{value}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
