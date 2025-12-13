// Types for Cholq'ij calendar data (hierarchical structure)
import { TNahualNameId, TNahualNumber } from '../types/index.js';

export interface TrecenaMetadata {
  nahualId: TNahualNameId;  // The nahual that starts this trecena (1-20)
  title: string;             // e.g., "Weaving a New Creation"
  description: string;       // Overall trecena description
}

export interface DayData {
  tone: TNahualNumber;       // 1-13
  nahualId: TNahualNameId;   // 1-20
  title: string;             // e.g., "Weaving a New Creation"
  description: string;       // Full day essence/guidance
}

export interface TrecenaData {
  metadata: TrecenaMetadata;
  days: DayData[];           // Array of 13 days
}

export type CholqijDatabase = Record<TNahualNameId, TrecenaData>;

