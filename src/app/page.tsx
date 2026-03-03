"use client";

import { useState } from "react";
import { archetypes } from "@/data/meta";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const tierColors = {
  S: "bg-purple-600 hover:bg-purple-700",
  A: "bg-blue-600 hover:bg-blue-700",
  B: "bg-green-600 hover:bg-green-700",
  C: "bg-gray-500 hover:bg-gray-600",
};

function getWinrateColor(winrate: number): string {
  if (winrate > 0.55) return "text-green-500";
  if (winrate >= 0.50) return "text-yellow-500";
  return "text-red-500";
}

function getTrendIcon(trend: string): string {
  if (trend === "up") return "↑";
  if (trend === "down") return "↓";
  return "→";
}

function getTrendColor(trend: string): string {
  if (trend === "up") return "text-green-500";
  if (trend === "down") return "text-red-500";
  return "text-gray-500";
}

function getTierFromWinrate(winrate: number): "S" | "A" | "B" | "C" {
  if (winrate > 0.56) return "S";
  if (winrate >= 0.53) return "A";
  if (winrate >= 0.50) return "B";
  return "C";
}

export default function Home() {
  const [search, setSearch] = useState("");
  const [tierFilter, setTierFilter] = useState<string>("all");

  const filteredArchetypes = archetypes
    .filter((a) => {
      const matchesSearch = a.archetype.toLowerCase().includes(search.toLowerCase());
      const matchesTier = tierFilter === "all" || getTierFromWinrate(a.winrate) === tierFilter;
      return matchesSearch && matchesTier;
    })
    .sort((a, b) => b.winrate - a.winrate);

  return (
    <div className="min-h-screen bg-[#0f0f1a] text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-2 bg-gradient-to-r from-[#e94560] to-[#f59e0b] bg-clip-text text-transparent">
          HearthMind
        </h1>
        <p className="text-center text-gray-400 text-xl mb-8">
          Аналитика меты Hearthstone
        </p>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Поиск архетипа..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-md px-4 py-2 bg-[#1a1a2e] border border-[#333] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#e94560]"
          />
        </div>

        <div className="flex gap-2 mb-6">
          {["all", "S", "A", "B", "C"].map((tier) => (
            <button
              key={tier}
              onClick={() => setTierFilter(tier)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                tierFilter === tier
                  ? tier === "all"
                    ? "bg-white text-[#0f0f1a]"
                    : tierColors[tier as keyof typeof tierColors]
                  : "bg-[#1a1a2e] text-gray-400 hover:bg-[#252540]"
              }`}
            >
              {tier === "all" ? "Все" : tier}
            </button>
          ))}
        </div>

        {filteredArchetypes.length === 0 ? (
          <p className="text-center text-gray-400 py-8">Архетипы не найдены</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="border-[#333] hover:bg-transparent">
                <TableHead className="text-white">Tier</TableHead>
                <TableHead className="text-white">Архетип</TableHead>
                <TableHead className="text-white">Класс</TableHead>
                <TableHead className="text-white">Winrate</TableHead>
                <TableHead className="text-white">Популярность</TableHead>
                <TableHead className="text-white">Тренд</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredArchetypes.map((archetype) => {
                const tier = getTierFromWinrate(archetype.winrate);
                return (
                  <TableRow
                    key={archetype.archetype}
                    className="border-[#333] hover:bg-[#1a1a2e]"
                  >
                    <TableCell>
                      <Link href={`/archetype/${archetype.archetype.toLowerCase().replace(/ /g, "-")}`}>
                        <Badge className={`${tierColors[tier]} cursor-pointer`}>
                          {tier}
                        </Badge>
                      </Link>
                    </TableCell>
                    <TableCell className="font-medium">
                      <Link
                        href={`/archetype/${archetype.archetype.toLowerCase().replace(/ /g, "-")}`}
                        className="hover:text-[#e94560] transition-colors"
                      >
                        {archetype.archetype}
                      </Link>
                    </TableCell>
                    <TableCell>{archetype.playerClass}</TableCell>
                    <TableCell className={getWinrateColor(archetype.winrate)}>
                      {(archetype.winrate * 100).toFixed(1)}%
                    </TableCell>
                    <TableCell>{(archetype.popularity * 100).toFixed(1)}%</TableCell>
                    <TableCell className={getTrendColor(archetype.trend)}>
                      {getTrendIcon(archetype.trend)}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}

        <p className="text-center text-gray-500 mt-8">
          Данные актуальны на патч 32.2
        </p>
      </div>
    </div>
  );
}
