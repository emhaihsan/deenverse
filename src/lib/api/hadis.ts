// lib/api/hadis.ts
import { HadisResponse, HadisRangeResponse, HadisSpecificResponse } from '@/types/hadis';

const BASE_URL = 'https://api.hadith.gading.dev';

export async function getHadisBooks(): Promise<HadisResponse> {
  try {
    const response = await fetch(`${BASE_URL}/books`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching hadis books:', error);
    throw error;
  }
}

export async function getHadisByRange(
  bookId: string,
  startNumber: number,
  endNumber: number
): Promise<HadisRangeResponse> {
  try {
    const response = await fetch(`${BASE_URL}/books/${bookId}?range=${startNumber}-${endNumber}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching hadis by range:', error);
    throw error;
  }
}

export async function getSpecificHadis(
  bookId: string,
  hadisNumber: number
): Promise<HadisSpecificResponse> {
  try {
    const response = await fetch(`${BASE_URL}/books/${bookId}/${hadisNumber}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching specific hadis:', error);
    throw error;
  }
}

// Helper function to get random hadis for daily hadis feature
export async function getRandomHadis() {
  try {
    const booksResponse = await getHadisBooks();
    if (booksResponse.error || !booksResponse.data.length) {
      throw new Error('No hadis books available');
    }

    // Select a random book
    const randomBook = booksResponse.data[Math.floor(Math.random() * booksResponse.data.length)];
    
    // Get a random hadis number from that book
    const randomNumber = Math.floor(Math.random() * randomBook.available) + 1;
    
    const hadisResponse = await getSpecificHadis(randomBook.id, randomNumber);
    return hadisResponse;
  } catch (error) {
    console.error('Error fetching random hadis:', error);
    throw error;
  }
}
