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
  const url = `https://api.hadith.gading.dev/books/${bookId}/${hadisNumber}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      // Throw an error with the status to be caught below
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    if (data.error) {
      throw new Error(data.message || "Error fetching specific hadis");
    }
    return data;
  } catch (error) {
    // Log the specific endpoint that failed
    console.error(`Error fetching specific hadis from endpoint: ${url}`, error);
    throw error;
  }
}

// Helper function to get random hadis for daily hadis feature
export async function getRandomHadis() {
  const MAX_ATTEMPTS = 5;
  let lastError: unknown = null;

  try {
    const booksResponse = await getHadisBooks();
    if (booksResponse.error || !booksResponse.data.length) {
      throw new Error("No hadis books available");
    }

    // Exclude books with known count issues
    const excludedBooks = ["abu-daud", "ahmad"];
    const availableBooks = booksResponse.data.filter(
      (book) => !excludedBooks.includes(book.id)
    );

    if (!availableBooks.length) {
      throw new Error("No available hadis books after filtering.");
    }

    for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
      const randomBook =
        availableBooks[Math.floor(Math.random() * availableBooks.length)];
      const randomNumber = Math.floor(Math.random() * randomBook.available) + 1;

      try {
        const hadisResponse = await getSpecificHadis(randomBook.id, randomNumber);
        return hadisResponse;
      } catch (error) {
        lastError = error;
        // continue to next attempt
      }
    }
    throw lastError || new Error("Failed to fetch random hadis after multiple attempts.");
  } catch (error) {
    console.error("Error fetching random hadis:", error);
    throw error;
  }
}
