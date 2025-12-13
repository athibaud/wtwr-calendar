import { CholqijDatabase, DayData, TrecenaData } from './types.js';
import { TNahualNameId } from '../types/index.js';

// Import all 20 trecenas
import { trecenaImox } from './trecenas/trecena-01-imox.js';
import { trecenaIq } from './trecenas/trecena-02-iq.js';
import { trecenaAqabal } from './trecenas/trecena-03-aqabal.js';
import { trecenaKat } from './trecenas/trecena-04-kat.js';
import { trecenaKan } from './trecenas/trecena-05-kan.js';
import { trecenaKame } from './trecenas/trecena-06-kame.js';
import { trecenaKej } from './trecenas/trecena-07-kej.js';
import { trecenaQanil } from './trecenas/trecena-08-qanil.js';
import { trecenaToj } from './trecenas/trecena-09-toj.js';
import { trecenaTzi } from './trecenas/trecena-10-tzi.js';
import { trecenaBatz } from './trecenas/trecena-11-batz.js';
import { trecenaE } from './trecenas/trecena-12-e.js';
import { trecenaAj } from './trecenas/trecena-13-aj.js';
import { trecenaIx } from './trecenas/trecena-14-ix.js';
import { trecenaTzikin } from './trecenas/trecena-15-tzikin.js';
import { trecenaAjmaq } from './trecenas/trecena-16-ajmaq.js';
import { trecenaNoj } from './trecenas/trecena-17-noj.js';
import { trecenaTijax } from './trecenas/trecena-18-tijax.js';
import { trecenaKawoq } from './trecenas/trecena-19-kawoq.js';
import { trecenaAjpu } from './trecenas/trecena-20-ajpu.js';

// Main Cholq'ij database - hierarchical structure by nahual ID
export const CHOLQIJ_DB: CholqijDatabase = {
  1: trecenaImox,
  2: trecenaIq,
  3: trecenaAqabal,
  4: trecenaKat,
  5: trecenaKan,
  6: trecenaKame,
  7: trecenaKej,
  8: trecenaQanil,
  9: trecenaToj,
  10: trecenaTzi,
  11: trecenaBatz,
  12: trecenaE,
  13: trecenaAj,
  14: trecenaIx,
  15: trecenaTzikin,
  16: trecenaAjmaq,
  17: trecenaNoj,
  18: trecenaTijax,
  19: trecenaKawoq,
  20: trecenaAjpu,
};

// Helper function to get day data by tone and nahual
export function getDayData(tone: number, nahualId: number): DayData | null {
  // Search through all trecenas to find the matching day using functional approach
  return Object.values(CHOLQIJ_DB)
    .flatMap(trecena => trecena.days)
    .find(day => day.tone === tone && day.nahualId === nahualId) || null;
}

// Helper function to get trecena metadata
export function getTrecenaData(nahualId: number): TrecenaData | null {
  return CHOLQIJ_DB[nahualId as TNahualNameId] || null;
}

