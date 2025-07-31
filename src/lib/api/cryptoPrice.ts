// Fallback price in case API fails (last known price in IDR)
const FALLBACK_ETH_PRICE = 63670000; // Default fallback ETH price in IDR
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes cache
const SLIPPAGE_PERCENTAGE = 0.005; // 0.5% slippage

interface CryptoPrice {
  n: string;     // coin name
  id: number;
  cd: string;    // coin code
  c: number;     // close price (we'll use this)
  tt: number;    // transaction type
  h: number;     // high price
  l: number;     // low price
  o: number;     // open price
  v: number;     // volume
  cp: number;    // change percentage
  st?: number;   // status (optional)
}

interface CachedPrice {
  price: number;
  timestamp: number;
}

// In-memory cache
let ethPriceCache: CachedPrice | null = null;

/**
 * Fetches the current Ethereum price in IDR from Reku API with slippage applied
 * @returns Promise with the current ETH price in IDR with slippage
 */
export const getEthereumPrice = async (): Promise<number> => {
  // Return cached price if it's still valid
  if (ethPriceCache && Date.now() - ethPriceCache.timestamp < CACHE_DURATION) {
    return ethPriceCache.price;
  }

  try {
    const response = await fetch('https://api.reku.id/v2/price');
    
    if (!response.ok) {
      throw new Error('Failed to fetch crypto prices');
    }
    
    const data: CryptoPrice[] = await response.json();
    const ethData = data.find(coin => coin.cd === 'ETH');
    
    if (ethData) {
      // Apply 0.5% slippage to the close price (less favorable for the user)
      const priceWithSlippage = ethData.c * (1 + SLIPPAGE_PERCENTAGE);
      
      // Update cache with price including slippage
      ethPriceCache = {
        price: priceWithSlippage,
        timestamp: Date.now()
      };
      
      return priceWithSlippage;
    }
    
    throw new Error('Ethereum price data not available');
  } catch (error) {
    console.error('Error fetching Ethereum price:', error);
    // Return fallback price if available in cache, otherwise use default fallback
    return ethPriceCache?.price || FALLBACK_ETH_PRICE * (1 + SLIPPAGE_PERCENTAGE);
  }
};

/**
 * Converts IDR amount to ETH based on current market price with slippage
 * @param idrAmount Amount in IDR to convert to ETH
 * @returns Promise with the equivalent ETH amount (accounting for slippage)
 */
export const convertIdrToEth = async (idrAmount: number): Promise<number> => {
  try {
    // Get price with slippage already applied
    const ethPrice = await getEthereumPrice();
    return idrAmount / ethPrice;
  } catch (error) {
    console.error('Error converting IDR to ETH:', error);
    throw new Error('Gagal mengkonversi IDR ke ETH');
  }
};

/**
 * Gets the current ETH price without slippage (for display purposes only)
 * @returns Promise with the current ETH price in IDR without slippage
 */
export const getDisplayEthereumPrice = async (): Promise<number> => {
  try {
    const response = await fetch('https://api.reku.id/v2/price');
    
    if (!response.ok) {
      throw new Error('Failed to fetch crypto prices');
    }
    
    const data: CryptoPrice[] = await response.json();
    const ethData = data.find(coin => coin.cd === 'ETH');
    
    if (ethData) {
      return ethData.c; // Return close price without slippage
    }
    
    throw new Error('Ethereum price data not available');
  } catch (error) {
    console.error('Error fetching display Ethereum price:', error);
    return FALLBACK_ETH_PRICE;
  }
};

/**
 * Formats ETH amount to a readable string with appropriate decimal places
 * @param ethAmount Amount in ETH
 * @returns Formatted string with 6 decimal places
 */
export const formatEth = (ethAmount: number): string => {
  return ethAmount.toFixed(6);
};
