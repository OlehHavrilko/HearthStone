export interface Archetype {
  archetype: string;
  playerClass: string;
  winrate: number;
  popularity: number;
  tier: "S" | "A" | "B" | "C";
  trend: "up" | "down" | "stable";
  description: string;
}

export const archetypes: Archetype[] = [
  {
    archetype: "Zaraleak Rogue",
    playerClass: "Rogue",
    winrate: 0.582,
    popularity: 0.068,
    tier: "S",
    trend: "up",
    description: "Агрессивная колода, основанная на комбо-синергии Заралеака с ядом и незавершёнными существами. Доминирует в мет thanks to high burst potential."
  },
  {
    archetype: "Dragon Druid",
    playerClass: "Druid",
    winrate: 0.568,
    popularity: 0.052,
    tier: "S",
    trend: "stable",
    description: "Контрольная колода с драконами, использующая раннее управление board и мощные late-game драконы. Стабильный выбор для рейтинга."
  },
  {
    archetype: "Pain Warlock",
    playerClass: "Warlock",
    winrate: 0.554,
    popularity: 0.089,
    tier: "A",
    trend: "up",
    description: "Деструктивная колода с синергией получения урона и картами, которые становятся сильнее от урона. Высокая консистентность."
  },
  {
    archetype: "Board Flood Paladin",
    playerClass: "Paladin",
    winrate: 0.541,
    popularity: 0.072,
    tier: "A",
    trend: "stable",
    description: "Агрессивная колода, заливающая доску дешёвыми существами с баффами. Сильна против контрольных дек."
  },
  {
    archetype: "Spell Mage",
    playerClass: "Mage",
    winrate: 0.527,
    popularity: 0.115,
    tier: "B",
    trend: "down",
    description: "Заклинательная колода, использующая мощные spell damage и сжигание. Зависит от удачных муллиганов."
  },
  {
    archetype: "ETC Warrior",
    playerClass: "Warrior",
    winrate: 0.518,
    popularity: 0.041,
    tier: "B",
    trend: "up",
    description: "Комбо-колода с ETC, использующая оружие и берсерк-синергии. Требует точного розыгрыша."
  },
  {
    archetype: "Totem Shaman",
    playerClass: "Shaman",
    winrate: 0.512,
    popularity: 0.063,
    tier: "B",
    trend: "stable",
    description: "Тотемная колода с синергией overload и Totem цена. Хороший агро-контроль гибрид."
  },
  {
    archetype: "Rainbow Death Knight",
    playerClass: "Death Knight",
    winrate: 0.504,
    popularity: 0.098,
    tier: "B",
    trend: "down",
    description: "Rainbow deck использующий все три руны. Гибкая, но не имеет чёткого identity."
  },
  {
    archetype: "Miracle Hunter",
    playerClass: "Hunter",
    winrate: 0.487,
    popularity: 0.034,
    tier: "C",
    trend: "down",
    description: "Миракл-колода с картами charge и combo. Слаба в текущей мете из-за lack of sustain."
  },
  {
    archetype: "Big Priest",
    playerClass: "Priest",
    winrate: 0.461,
    popularity: 0.028,
    tier: "C",
    trend: "stable",
    description: "Рул mill deck с большими существами и ресами. Проигрывает агро-декам из-за медленного старта."
  }
];

export function getTier(winrate: number): "S" | "A" | "B" | "C" {
  if (winrate > 0.56) return "S";
  if (winrate >= 0.53) return "A";
  if (winrate >= 0.50) return "B";
  return "C";
}

export interface Matchup {
  vsArchetype: string;
  winrateAgainst: number;
}

export const matchupsData: { archetype: string; matchups: Matchup[] }[] = [
  {
    archetype: "Zaraleak Rogue",
    matchups: [
      { vsArchetype: "Dragon Druid", winrateAgainst: 0.612 },
      { vsArchetype: "Pain Warlock", winrateAgainst: 0.587 },
      { vsArchetype: "Board Flood Paladin", winrateAgainst: 0.543 },
      { vsArchetype: "Spell Mage", winrateAgainst: 0.478 },
      { vsArchetype: "ETC Warrior", winrateAgainst: 0.521 },
    ],
  },
  {
    archetype: "Dragon Druid",
    matchups: [
      { vsArchetype: "Zaraleak Rogue", winrateAgainst: 0.388 },
      { vsArchetype: "Pain Warlock", winrateAgainst: 0.556 },
      { vsArchetype: "Board Flood Paladin", winrateAgainst: 0.589 },
      { vsArchetype: "Spell Mage", winrateAgainst: 0.612 },
      { vsArchetype: "ETC Warrior", winrateAgainst: 0.534 },
    ],
  },
  {
    archetype: "Pain Warlock",
    matchups: [
      { vsArchetype: "Zaraleak Rogue", winrateAgainst: 0.413 },
      { vsArchetype: "Dragon Druid", winrateAgainst: 0.444 },
      { vsArchetype: "Board Flood Paladin", winrateAgainst: 0.567 },
      { vsArchetype: "Spell Mage", winrateAgainst: 0.598 },
      { vsArchetype: "ETC Warrior", winrateAgainst: 0.523 },
    ],
  },
  {
    archetype: "Board Flood Paladin",
    matchups: [
      { vsArchetype: "Zaraleak Rogue", winrateAgainst: 0.457 },
      { vsArchetype: "Dragon Druid", winrateAgainst: 0.411 },
      { vsArchetype: "Pain Warlock", winrateAgainst: 0.433 },
      { vsArchetype: "Spell Mage", winrateAgainst: 0.589 },
      { vsArchetype: "ETC Warrior", winrateAgainst: 0.612 },
    ],
  },
  {
    archetype: "Spell Mage",
    matchups: [
      { vsArchetype: "Zaraleak Rogue", winrateAgainst: 0.522 },
      { vsArchetype: "Dragon Druid", winrateAgainst: 0.388 },
      { vsArchetype: "Pain Warlock", winrateAgainst: 0.402 },
      { vsArchetype: "Board Flood Paladin", winrateAgainst: 0.411 },
      { vsArchetype: "ETC Warrior", winrateAgainst: 0.567 },
    ],
  },
];
