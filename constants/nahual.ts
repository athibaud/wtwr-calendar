import { TNahualNameId, TNahualNumber } from "../types/index.js";

// K'iche' names are kept separate as they are the original names
export const NAHUAL_KICHE: Record<TNahualNameId, string> = {
  1: "Imox",
  2: "Iq'",
  3: "Aq'ab'al",
  4: "K'at",
  5: "Kan",
  6: "Kame",
  7: "Kej",
  8: "Q'anil",
  9: "Toj",
  10: "Tzi'",
  11: "B'atz'",
  12: "E'",
  13: "Aj",
  14: "I'x",
  15: "Tz'ikin",
  16: "Ajmaq",
  17: "No'j",
  18: "Tijax",
  19: "Kawoq",
  20: "Ajpu'",
};

export const TONE_KICHE: Record<TNahualNumber, string> = {
  1: "Jun",
  2: "Keb",
  3: "Oxib",
  4: "Kajib",
  5: "Job",
  6: "Waqib",
  7: "Wuqub",
  8: "Wajxaqib",
  9: "B'eleje'b",
  10: "Lajuj",
  11: "Junlajuj",
  12: "Kab'lajuj",
  13: "Oxlajuj"
};

// Emoji mapping for each nahual (for trecena events)
export const NAHUAL_EMOJIS: Record<TNahualNameId, string> = {
  1: "🌊", // Imox - Water
  2: "💨", // Iq' - Wind  
  3: "🌙", // Aq'ab'al - Night
  4: "🕸️", // K'at - Net
  5: "🐍", // Kan - Serpent
  6: "💀", // Kame - Death
  7: "🦌", // Kej - Deer
  8: "🌾", // Q'anil - Rabbit/Grain
  9: "🌧️", // Toj - Water/Rain
  10: "🐕", // Tzi' - Dog
  11: "🐒", // B'atz' - Monkey
  12: "🛤️", // E' - Road
  13: "🎋", // Aj - Cane
  14: "🐆", // I'x - Jaguar
  15: "🦅", // Tz'ikin - Eagle
  16: "🐝", // Ajmaq - Vulture / Bee
  17: "🧠", // No'j - Thought
  18: "🔪", // Tijax - Knife
  19: "⛈️", // Kawoq - Storm
  20: "☀️", // Ajpu' - Lord/Sun
} as const;

