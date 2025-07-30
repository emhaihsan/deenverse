// Fallback price in case API fails (last known price)
const FALLBACK_GOLD_PRICE = 1215000; // Price per gram in IDR
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes cache

interface GoldPriceResponse {
  data: {
    sell: number;
    buy: number;
    type: string;
    info: string;
    weight: number | null;
    unit: string;
  }[];
  meta: {
    url: string;
    engine: string;
  };
}

interface CachedPrice {
  price: number;
  timestamp: number;
}

// In-memory cache
let priceCache: CachedPrice | null = null;

/**
 * Fetches the current gold price from the API
 * @returns Promise with the current gold sell price in IDR/gram
 */
export const getCurrentGoldPrice = async (): Promise<number> => {
  // Return cached price if it's still valid
  if (priceCache && Date.now() - priceCache.timestamp < CACHE_DURATION) {
    return priceCache.price;
  }

  try {
    const response = await fetch('https://logam-mulia-api.vercel.app/prices/anekalogam');
    
    if (!response.ok) {
      throw new Error('Failed to fetch gold price');
    }
    
    const data: GoldPriceResponse = await response.json();
    
    if (data.data && data.data.length > 0) {
      const sellPrice = data.data[0].sell;
      // Update cache
      priceCache = {
        price: sellPrice,
        timestamp: Date.now()
      };
      return sellPrice;
    }
    
    throw new Error('No price data available');
  } catch (error) {
    console.error('Error fetching gold price:', error);
    // Return fallback price if available in cache, otherwise use default fallback
    return priceCache?.price || FALLBACK_GOLD_PRICE;
  }
};

/**
 * Calculates the nisab amount based on current gold price
 * @param goldPrice Optional gold price, will be fetched if not provided
 * @returns Promise with the nisab amount in IDR
 */
export const getNisabAmount = async (goldPrice?: number): Promise<number> => {
  const currentPrice = goldPrice || await getCurrentGoldPrice();
  return Math.round(85 * currentPrice); // 85 grams of gold
};
