import { archetypes } from "@/data/meta";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const tierColors = {
  S: "bg-purple-600 hover:bg-purple-700",
  A: "bg-blue-600 hover:bg-blue-700",
  B: "bg-green-600 hover:bg-green-700",
  C: "bg-gray-500 hover:bg-gray-600",
};

function getTierFromWinrate(winrate: number): "S" | "A" | "B" | "C" {
  if (winrate > 0.56) return "S";
  if (winrate >= 0.53) return "A";
  if (winrate >= 0.50) return "B";
  return "C";
}

function getWinrateColor(winrate: number): string {
  if (winrate > 0.55) return "text-green-500";
  if (winrate >= 0.50) return "text-yellow-500";
  return "text-red-500";
}

interface PageProps {
  params: Promise<{
    name: string;
  }>;
}

export default async function ArchetypePage({ params }: PageProps) {
  const { name } = await params;
  const archetype = archetypes.find(
    (a) => a.archetype.toLowerCase().replace(/ /g, "-") === name.toLowerCase()
  );

  if (!archetype) {
    notFound();
  }

  const tier = getTierFromWinrate(archetype.winrate);

  return (
    <div className="min-h-screen bg-[#0f0f1a] text-white p-8">
      <div className="max-w-2xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors"
        >
          ← Назад
        </Link>

        <Card className="bg-[#1a1a2e] border-[#333]">
          <CardContent className="p-8">
            <div className="flex items-center gap-4 mb-4">
              <h1 className="text-3xl font-bold">{archetype.archetype}</h1>
              <Badge className={`${tierColors[tier]} text-lg px-3 py-1`}>
                {tier}
              </Badge>
            </div>

            <p className="text-xl text-gray-300 mb-6">{archetype.playerClass}</p>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <div>
                <p className="text-gray-400 text-sm mb-1">Winrate</p>
                <p className={`text-4xl font-bold ${getWinrateColor(archetype.winrate)}`}>
                  {(archetype.winrate * 100).toFixed(1)}%
                </p>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">Популярность</p>
                <p className="text-4xl font-bold">
                  {(archetype.popularity * 100).toFixed(1)}%
                </p>
              </div>
            </div>

            <div className="border-t border-[#333] pt-6">
              <p className="text-gray-400 text-sm mb-2">Описание</p>
              <p className="text-gray-200 leading-relaxed">{archetype.description}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
