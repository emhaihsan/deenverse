// types/zakat.ts

export interface MadzhabOpinion {
  madzhab: 'Hanafi' | 'Maliki' | 'Syafii' | 'Hambali';
  nisab: string;
  kadar: string;
  syarat: string[];
  catatan?: string;
}

export interface ZakatType {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'wajib' | 'sunnah';
  
  // Penjelasan umum
  definisi: string;
  dalil: {
    quran?: string[];
    hadits?: string[];
  };
  
  // Pendapat madzhab
  madzhabOpinions: MadzhabOpinion[];
  
  // Informasi praktis
  praktis: {
    caraPerhitungan: string;
    contohKasus: string;
    tipsZakat: string[];
  };
  
  // Metadata
  lastUpdated: string;
  sources: string[];
}


export interface ZakatCalculation {
  type: string;
  amount: number;
  nisab: number;
  zakatDue: number;
  isWajib: boolean;
  notes: string[];
}
