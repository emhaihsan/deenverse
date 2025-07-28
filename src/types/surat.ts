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
  
  export interface ApiResponse {
    code: number;
    message: string;
    data: SuratData;
  }
  
  export interface DailyAyatData {
    ayat: Ayat;
    surat: { nomor: number; nama: string; namaLatin: string };
  }