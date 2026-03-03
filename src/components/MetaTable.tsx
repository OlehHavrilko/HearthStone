"use client";

import { useState } from "react";
import { type Archetype, type Matchup } from "@/data/meta";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

interface MetaTableProps {
  initialArchetypes: Archetype[];
  initialMatchups: { archetype: string; matchups: Matchup[] }[];
}

export default function MetaTable({ initialArchetypes, initialMatchups }: MetaTableProps) {
  const [search, setSearch] = useState("");
  const [tierFilter, setTierFilter] = useState<string>("all");

  const filteredArchetypes = initialArchetypes
    .filter((a) => {
      const matchesSearch = a.archetype.toLowerCase().includes(search.toLowerCase());
      const matchesTier = tierFilter === "all" || getTierFromWinrate(a.winrate) === tierFilter;
      return matchesSearch && matchesTier;
    })
    .sort((a, b) => b.winrate - a.winrate);

  return (
    <>
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

      <div className="mt-12">
        <h2 className="text-2xl font-bold text-center mb-6">
          Матчапы топ-5 архетипов
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {initialMatchups.map((item) => (
            <Card key={item.archetype} className="bg-[#1a1a2e] border-[#333]">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-white">
                  {item.archetype}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1">
                  {item.matchups.map((matchup) => (
                    <li
                      key={matchup.vsArchetype}
                      className="flex justify-between text-sm"
                    >
                      <span className="text-gray-400">{matchup.vsArchetype}</span>
                      <span
                        className={
                          matchup.winrateAgainst > 0.5
                            ? "text-green-500"
                            : "text-red-500"
                        }
                      >
                        {(matchup.winrateAgainst * 100).toFixed(1)}%
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
