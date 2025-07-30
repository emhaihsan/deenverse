// src/types/shalat.ts

export interface Niat {
  arabic: string;
  latin: string;
  translation: string;
}

export interface TataCaraItem {
  step: number;
  description: string;
  isOptional?: boolean;
}

export interface Shalat {
  id: number;
  slug: string;
  title: string;
  category: 'Wajib' | 'Sunnah Muakkad' | 'Sunnah Ghairu Muakkad' | 'Khusus';
  description: string;
  dalil: string[];
  niat: Niat;
  jumlahRakaat: string;
  tataCara: TataCaraItem[];
  waktu: string;
  keutamaan?: string[];
}
