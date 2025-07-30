// src/types/haji.ts

export interface Section {
  title: string;
  // Content can be a single paragraph or a list of points
  content: string | string[];
}

export interface PillarOrWajib {
  title: string;
  explanation: string;
}

export interface HajiUmrahTopic {
  id: 'haji' | 'umroh';
  title: string;
  definition: Section;
  history: Section;
  wisdom: Section;
  virtues: Section;
  hukum: Section;
  pillars: {
    title: string;
    items: PillarOrWajib[];
    notes?: string;
  };
  wajib: {
    title: string;
    items: PillarOrWajib[];
    notes?: string;
  };
  // Properties specific to Haji
  syaratWajib?: Section;
  perbedaanRukunWajib?: Section;
}

export interface HajiData {
  haji: HajiUmrahTopic;
  umroh: HajiUmrahTopic;
}

export interface HajiArticle {
  id: number;
  slug: string;
  title: string;
  summary: string;
  content: Section[];
}
