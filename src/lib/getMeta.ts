import { archetypes, type Archetype, matchupsData } from "@/data/meta";
import { createClient } from "@supabase/supabase-js";

interface DbArchetype {
  id: number;
  archetype: string;
  player_class: string;
  winrate: number;
  popularity: number;
  tier: string;
  trend: string;
  patch: string;
  games_count: number;
  updated_at: string;
}

export async function getMeta(): Promise<{
  archetypes: Archetype[];
  matchups: typeof matchupsData;
}> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return { archetypes, matchups: matchupsData };
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    
    const { data: dbArchetypes, error: archetypeError } = await supabase
      .from("meta_snapshots")
      .select("*")
      .order("winrate", { ascending: false });

    if (archetypeError || !dbArchetypes || dbArchetypes.length === 0) {
      return { archetypes, matchups: matchupsData };
    }

    const mappedArchetypes: Archetype[] = dbArchetypes.map((row: DbArchetype) => ({
      archetype: row.archetype,
      playerClass: row.player_class,
      winrate: row.winrate,
      popularity: row.popularity,
      tier: row.tier as "S" | "A" | "B" | "C",
      trend: row.trend as "up" | "down" | "stable",
      description: archetypes.find(a => a.archetype === row.archetype)?.description || "",
    }));

    return { archetypes: mappedArchetypes, matchups: matchupsData };
  } catch {
    return { archetypes, matchups: matchupsData };
  }
}
