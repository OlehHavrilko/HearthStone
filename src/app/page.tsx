import { getMeta } from "@/lib/getMeta";
import MetaTable from "@/components/MetaTable";

export default async function Home() {
  const { archetypes, matchups } = await getMeta();

  return (
    <div className="min-h-screen bg-[#0f0f1a] text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-2 bg-gradient-to-r from-[#e94560] to-[#f59e0b] bg-clip-text text-transparent">
          HearthMind
        </h1>
        <p className="text-center text-gray-400 text-xl mb-8">
          Аналитика меты Hearthstone
        </p>

        <MetaTable initialArchetypes={archetypes} initialMatchups={matchups} />

        <p className="text-center text-gray-500 mt-8">
          Данные актуальны на патч 32.2
        </p>
      </div>
    </div>
  );
}
