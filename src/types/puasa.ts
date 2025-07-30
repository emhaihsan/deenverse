// src/types/puasa.ts

export interface Niat {
  arabic: string;
  latin: string;
  translation: string;
}

export interface Puasa {
  id: number;
  slug: string;
  title: string;
  category: 'Wajib' | 'Sunnah Muakkad' | 'Sunnah';
  description: string;
  dalil: string[];
  niat: Niat;
  waktu: string;
  tataCara: string[];
  keutamaan?: string[];
  larangan?: string[];
}
