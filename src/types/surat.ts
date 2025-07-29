// src/types/surat.ts
export interface Ayat {
    nomorAyat: number;
    teksArab: string;
    teksLatin: string;
    teksIndonesia: string;
  }
  
  export interface SuratData {
    nomor: number;
    nama: string;
    namaLatin: string;
    jumlahAyat: number;
    tempatTurun: string;
    arti: string;
    deskripsi: string;
    audioFull: {
      [key: string]: string;
    };
    ayat: Ayat[];
  }
  
  export interface SuratListItem {
    nomor: number;
    nama: string;
    namaLatin: string;
    jumlahAyat: number;
    tempatTurun: string;
    arti: string;
    deskripsi: string;
    audioFull: {
      [key: string]: string;
    };
  }
  
  export interface TafsirAyat {
    ayat: number;
    teks: string;
  }
  
  export interface TafsirData {
    nomor: number;
    nama: string;
    namaLatin: string;
    jumlahAyat: number;
    tempatTurun: string;
    arti: string;
    deskripsi: string;
    audioFull: {
      [key: string]: string;
    };
    tafsir: TafsirAyat[];
  }
  
  export interface TafsirApiResponse {
    code: number;
    message: string;
    data: TafsirData;
  }
  
  export interface ApiResponse {
    code: number;
    message: string;
    data: SuratData;
  }
  
  export interface DailyAyatData {
    ayat: Ayat;
    surat: { nomor: number; nama: string; namaLatin: string };
  }