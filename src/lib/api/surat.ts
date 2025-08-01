// src/lib/api/surat.ts
import { ApiResponse, DailyAyatData, SuratListItem, TafsirApiResponse } from "@/types/surat";

const API_BASE_URL = "https://equran.id/api/v2";

export async function getAllSurat(): Promise<SuratListItem[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/surat`);
    const result = await response.json();
    
    if (result.code === 200 && result.data) {
      return result.data;
    }
    return [];
  } catch (error) {
    console.error("Error fetching surat list:", error);
    return [];
  }
}

export async function getSurat(suratId: number): Promise<ApiResponse> {
  const response = await fetch(`${API_BASE_URL}/surat/${suratId}`);
  return response.json();
}

export async function getTafsir(suratId: number): Promise<TafsirApiResponse> {
  const response = await fetch(`${API_BASE_URL}/tafsir/${suratId}`);
  return response.json();
}

export async function getRandomAyat(): Promise<DailyAyatData | null> {
  try {
    const randomSuratId = Math.floor(Math.random() * 114) + 1;
    const response = await getSurat(randomSuratId);
    
    if (response.code === 200 && response.data) {
      const suratData = response.data;
      const randomAyatIndex = Math.floor(Math.random() * suratData.ayat.length);
      const randomAyat = suratData.ayat[randomAyatIndex];

      return {
        ayat: randomAyat,
        surat: {
          nomor: suratData.nomor,
          nama: suratData.nama,
          namaLatin: suratData.namaLatin,
        },
      };
    }
    return null;
  } catch (error) {
    console.error("Error fetching random ayat:", error);
    return null;
  }
}