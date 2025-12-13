// Real-time data service with live price simulations

export interface Pool {
  id: string;
  name: string;
  tag: string;
  latestNav: number;
  previousNav: number;
  change24h: number;
  lastUpdated: string;
  minutesAgo: number;
  status: "Healthy" | "Needs Review" | "Stale Data";
  assetType: string;
  riskLevel: string;
  description: string;
  symbol?: string;
  price?: number;
}

// Top 30 Cryptocurrencies with real-like data
export const cryptoAssets: Pool[] = [
  { id: "CRYPTO-001", name: "Bitcoin", tag: "BTC", latestNav: 67234.52, previousNav: 66890.21, change24h: 0.51, lastUpdated: "1 min ago", minutesAgo: 1, status: "Healthy", assetType: "Crypto", riskLevel: "High", description: "Digital Gold", symbol: "BTC", price: 67234.52 },
  { id: "CRYPTO-002", name: "Ethereum", tag: "ETH", latestNav: 3521.88, previousNav: 3498.42, change24h: 0.67, lastUpdated: "1 min ago", minutesAgo: 1, status: "Healthy", assetType: "Crypto", riskLevel: "High", description: "Smart Contracts", symbol: "ETH", price: 3521.88 },
  { id: "CRYPTO-003", name: "Tether", tag: "USDT", latestNav: 1.00, previousNav: 1.00, change24h: 0.01, lastUpdated: "1 min ago", minutesAgo: 1, status: "Healthy", assetType: "Crypto", riskLevel: "Low", description: "Stablecoin", symbol: "USDT", price: 1.00 },
  { id: "CRYPTO-004", name: "BNB", tag: "BNB", latestNav: 584.21, previousNav: 579.88, change24h: 0.75, lastUpdated: "2 min ago", minutesAgo: 2, status: "Healthy", assetType: "Crypto", riskLevel: "High", description: "Exchange Token", symbol: "BNB", price: 584.21 },
  { id: "CRYPTO-005", name: "Solana", tag: "SOL", latestNav: 142.65, previousNav: 139.22, change24h: 2.46, lastUpdated: "1 min ago", minutesAgo: 1, status: "Healthy", assetType: "Crypto", riskLevel: "High", description: "High Performance", symbol: "SOL", price: 142.65 },
  { id: "CRYPTO-006", name: "XRP", tag: "XRP", latestNav: 0.52, previousNav: 0.51, change24h: 1.96, lastUpdated: "1 min ago", minutesAgo: 1, status: "Healthy", assetType: "Crypto", riskLevel: "High", description: "Payments", symbol: "XRP", price: 0.52 },
  { id: "CRYPTO-007", name: "USDC", tag: "USDC", latestNav: 1.00, previousNav: 1.00, change24h: 0.00, lastUpdated: "1 min ago", minutesAgo: 1, status: "Healthy", assetType: "Crypto", riskLevel: "Low", description: "Stablecoin", symbol: "USDC", price: 1.00 },
  { id: "CRYPTO-008", name: "Cardano", tag: "ADA", latestNav: 0.45, previousNav: 0.44, change24h: 2.27, lastUpdated: "2 min ago", minutesAgo: 2, status: "Healthy", assetType: "Crypto", riskLevel: "High", description: "Proof of Stake", symbol: "ADA", price: 0.45 },
  { id: "CRYPTO-009", name: "Avalanche", tag: "AVAX", latestNav: 35.82, previousNav: 34.99, change24h: 2.37, lastUpdated: "1 min ago", minutesAgo: 1, status: "Healthy", assetType: "Crypto", riskLevel: "High", description: "Layer 1", symbol: "AVAX", price: 35.82 },
  { id: "CRYPTO-010", name: "Dogecoin", tag: "DOGE", latestNav: 0.12, previousNav: 0.118, change24h: 1.69, lastUpdated: "1 min ago", minutesAgo: 1, status: "Healthy", assetType: "Crypto", riskLevel: "Very High", description: "Meme Coin", symbol: "DOGE", price: 0.12 },
  { id: "CRYPTO-011", name: "Polkadot", tag: "DOT", latestNav: 7.21, previousNav: 7.15, change24h: 0.84, lastUpdated: "2 min ago", minutesAgo: 2, status: "Healthy", assetType: "Crypto", riskLevel: "High", description: "Interoperability", symbol: "DOT", price: 7.21 },
  { id: "CRYPTO-012", name: "Chainlink", tag: "LINK", latestNav: 14.52, previousNav: 14.28, change24h: 1.68, lastUpdated: "1 min ago", minutesAgo: 1, status: "Healthy", assetType: "Crypto", riskLevel: "High", description: "Oracle Network", symbol: "LINK", price: 14.52 },
  { id: "CRYPTO-013", name: "Polygon", tag: "MATIC", latestNav: 0.58, previousNav: 0.57, change24h: 1.75, lastUpdated: "1 min ago", minutesAgo: 1, status: "Healthy", assetType: "Crypto", riskLevel: "High", description: "L2 Scaling", symbol: "MATIC", price: 0.58 },
  { id: "CRYPTO-014", name: "Litecoin", tag: "LTC", latestNav: 84.32, previousNav: 83.55, change24h: 0.92, lastUpdated: "2 min ago", minutesAgo: 2, status: "Healthy", assetType: "Crypto", riskLevel: "High", description: "Digital Silver", symbol: "LTC", price: 84.32 },
  { id: "CRYPTO-015", name: "Uniswap", tag: "UNI", latestNav: 7.85, previousNav: 7.72, change24h: 1.68, lastUpdated: "1 min ago", minutesAgo: 1, status: "Healthy", assetType: "Crypto", riskLevel: "High", description: "DEX Protocol", symbol: "UNI", price: 7.85 },
  { id: "CRYPTO-016", name: "Cosmos", tag: "ATOM", latestNav: 9.12, previousNav: 8.98, change24h: 1.56, lastUpdated: "1 min ago", minutesAgo: 1, status: "Healthy", assetType: "Crypto", riskLevel: "High", description: "Internet of Blockchains", symbol: "ATOM", price: 9.12 },
  { id: "CRYPTO-017", name: "Stellar", tag: "XLM", latestNav: 0.11, previousNav: 0.108, change24h: 1.85, lastUpdated: "2 min ago", minutesAgo: 2, status: "Healthy", assetType: "Crypto", riskLevel: "High", description: "Cross-border Payments", symbol: "XLM", price: 0.11 },
  { id: "CRYPTO-018", name: "Monero", tag: "XMR", latestNav: 158.42, previousNav: 156.88, change24h: 0.98, lastUpdated: "1 min ago", minutesAgo: 1, status: "Healthy", assetType: "Crypto", riskLevel: "High", description: "Privacy Coin", symbol: "XMR", price: 158.42 },
  { id: "CRYPTO-019", name: "Filecoin", tag: "FIL", latestNav: 5.82, previousNav: 5.71, change24h: 1.93, lastUpdated: "2 min ago", minutesAgo: 2, status: "Healthy", assetType: "Crypto", riskLevel: "High", description: "Decentralized Storage", symbol: "FIL", price: 5.82 },
  { id: "CRYPTO-020", name: "Arbitrum", tag: "ARB", latestNav: 1.12, previousNav: 1.09, change24h: 2.75, lastUpdated: "1 min ago", minutesAgo: 1, status: "Healthy", assetType: "Crypto", riskLevel: "High", description: "L2 Rollup", symbol: "ARB", price: 1.12 },
  { id: "CRYPTO-021", name: "Optimism", tag: "OP", latestNav: 2.45, previousNav: 2.38, change24h: 2.94, lastUpdated: "1 min ago", minutesAgo: 1, status: "Healthy", assetType: "Crypto", riskLevel: "High", description: "L2 Rollup", symbol: "OP", price: 2.45 },
  { id: "CRYPTO-022", name: "Aave", tag: "AAVE", latestNav: 92.15, previousNav: 90.82, change24h: 1.46, lastUpdated: "2 min ago", minutesAgo: 2, status: "Healthy", assetType: "Crypto", riskLevel: "High", description: "DeFi Lending", symbol: "AAVE", price: 92.15 },
  { id: "CRYPTO-023", name: "Near Protocol", tag: "NEAR", latestNav: 5.28, previousNav: 5.15, change24h: 2.52, lastUpdated: "1 min ago", minutesAgo: 1, status: "Healthy", assetType: "Crypto", riskLevel: "High", description: "Sharded Blockchain", symbol: "NEAR", price: 5.28 },
  { id: "CRYPTO-024", name: "Injective", tag: "INJ", latestNav: 24.85, previousNav: 24.12, change24h: 3.02, lastUpdated: "1 min ago", minutesAgo: 1, status: "Healthy", assetType: "Crypto", riskLevel: "Very High", description: "DeFi Layer", symbol: "INJ", price: 24.85 },
  { id: "CRYPTO-025", name: "Render", tag: "RNDR", latestNav: 7.42, previousNav: 7.18, change24h: 3.34, lastUpdated: "2 min ago", minutesAgo: 2, status: "Healthy", assetType: "Crypto", riskLevel: "Very High", description: "GPU Rendering", symbol: "RNDR", price: 7.42 },
  { id: "CRYPTO-026", name: "Sui", tag: "SUI", latestNav: 1.85, previousNav: 1.78, change24h: 3.93, lastUpdated: "1 min ago", minutesAgo: 1, status: "Healthy", assetType: "Crypto", riskLevel: "Very High", description: "Layer 1", symbol: "SUI", price: 1.85 },
  { id: "CRYPTO-027", name: "Aptos", tag: "APT", latestNav: 9.52, previousNav: 9.28, change24h: 2.59, lastUpdated: "1 min ago", minutesAgo: 1, status: "Healthy", assetType: "Crypto", riskLevel: "Very High", description: "Layer 1", symbol: "APT", price: 9.52 },
  { id: "CRYPTO-028", name: "Immutable", tag: "IMX", latestNav: 2.18, previousNav: 2.12, change24h: 2.83, lastUpdated: "2 min ago", minutesAgo: 2, status: "Healthy", assetType: "Crypto", riskLevel: "Very High", description: "Gaming NFTs", symbol: "IMX", price: 2.18 },
  { id: "CRYPTO-029", name: "Pepe", tag: "PEPE", latestNav: 0.0000085, previousNav: 0.0000082, change24h: 3.66, lastUpdated: "1 min ago", minutesAgo: 1, status: "Healthy", assetType: "Crypto", riskLevel: "Very High", description: "Meme Coin", symbol: "PEPE", price: 0.0000085 },
  { id: "CRYPTO-030", name: "Mantle", tag: "MNT", latestNav: 0.82, previousNav: 0.79, change24h: 3.80, lastUpdated: "1 min ago", minutesAgo: 1, status: "Healthy", assetType: "Crypto", riskLevel: "Very High", description: "L2 Network", symbol: "MNT", price: 0.82 },
];

// Stocks data
export const stockAssets: Pool[] = [
  { id: "STOCK-001", name: "Apple Inc.", tag: "AAPL", latestNav: 189.42, previousNav: 188.21, change24h: 0.64, lastUpdated: "5 min ago", minutesAgo: 5, status: "Healthy", assetType: "Stock", riskLevel: "Moderate", description: "Technology", symbol: "AAPL", price: 189.42 },
  { id: "STOCK-002", name: "Microsoft Corp.", tag: "MSFT", latestNav: 378.85, previousNav: 376.52, change24h: 0.62, lastUpdated: "5 min ago", minutesAgo: 5, status: "Healthy", assetType: "Stock", riskLevel: "Moderate", description: "Technology", symbol: "MSFT", price: 378.85 },
  { id: "STOCK-003", name: "NVIDIA Corp.", tag: "NVDA", latestNav: 875.28, previousNav: 862.15, change24h: 1.52, lastUpdated: "5 min ago", minutesAgo: 5, status: "Healthy", assetType: "Stock", riskLevel: "High", description: "Semiconductors", symbol: "NVDA", price: 875.28 },
  { id: "STOCK-004", name: "Tesla Inc.", tag: "TSLA", latestNav: 245.62, previousNav: 242.18, change24h: 1.42, lastUpdated: "5 min ago", minutesAgo: 5, status: "Healthy", assetType: "Stock", riskLevel: "High", description: "Electric Vehicles", symbol: "TSLA", price: 245.62 },
  { id: "STOCK-005", name: "Amazon.com Inc.", tag: "AMZN", latestNav: 178.35, previousNav: 176.82, change24h: 0.87, lastUpdated: "5 min ago", minutesAgo: 5, status: "Healthy", assetType: "Stock", riskLevel: "Moderate", description: "E-commerce", symbol: "AMZN", price: 178.35 },
  { id: "STOCK-006", name: "Alphabet Inc.", tag: "GOOGL", latestNav: 141.28, previousNav: 140.15, change24h: 0.81, lastUpdated: "5 min ago", minutesAgo: 5, status: "Healthy", assetType: "Stock", riskLevel: "Moderate", description: "Technology", symbol: "GOOGL", price: 141.28 },
  { id: "STOCK-007", name: "Meta Platforms", tag: "META", latestNav: 485.92, previousNav: 480.25, change24h: 1.18, lastUpdated: "5 min ago", minutesAgo: 5, status: "Healthy", assetType: "Stock", riskLevel: "High", description: "Social Media", symbol: "META", price: 485.92 },
  { id: "STOCK-008", name: "Berkshire Hathaway", tag: "BRK.B", latestNav: 408.52, previousNav: 406.88, change24h: 0.40, lastUpdated: "5 min ago", minutesAgo: 5, status: "Healthy", assetType: "Stock", riskLevel: "Low", description: "Conglomerate", symbol: "BRK.B", price: 408.52 },
  { id: "STOCK-009", name: "JPMorgan Chase", tag: "JPM", latestNav: 195.42, previousNav: 194.28, change24h: 0.59, lastUpdated: "5 min ago", minutesAgo: 5, status: "Healthy", assetType: "Stock", riskLevel: "Moderate", description: "Banking", symbol: "JPM", price: 195.42 },
  { id: "STOCK-010", name: "Johnson & Johnson", tag: "JNJ", latestNav: 158.75, previousNav: 158.12, change24h: 0.40, lastUpdated: "5 min ago", minutesAgo: 5, status: "Healthy", assetType: "Stock", riskLevel: "Low", description: "Healthcare", symbol: "JNJ", price: 158.75 },
  { id: "STOCK-011", name: "Visa Inc.", tag: "V", latestNav: 275.85, previousNav: 274.52, change24h: 0.48, lastUpdated: "5 min ago", minutesAgo: 5, status: "Healthy", assetType: "Stock", riskLevel: "Moderate", description: "Financial Services", symbol: "V", price: 275.85 },
  { id: "STOCK-012", name: "Procter & Gamble", tag: "PG", latestNav: 162.42, previousNav: 161.88, change24h: 0.33, lastUpdated: "5 min ago", minutesAgo: 5, status: "Healthy", assetType: "Stock", riskLevel: "Low", description: "Consumer Goods", symbol: "PG", price: 162.42 },
  { id: "STOCK-013", name: "UnitedHealth Group", tag: "UNH", latestNav: 528.15, previousNav: 525.42, change24h: 0.52, lastUpdated: "5 min ago", minutesAgo: 5, status: "Healthy", assetType: "Stock", riskLevel: "Moderate", description: "Healthcare", symbol: "UNH", price: 528.15 },
  { id: "STOCK-014", name: "Mastercard Inc.", tag: "MA", latestNav: 442.85, previousNav: 440.28, change24h: 0.58, lastUpdated: "5 min ago", minutesAgo: 5, status: "Healthy", assetType: "Stock", riskLevel: "Moderate", description: "Financial Services", symbol: "MA", price: 442.85 },
  { id: "STOCK-015", name: "Walmart Inc.", tag: "WMT", latestNav: 168.52, previousNav: 167.85, change24h: 0.40, lastUpdated: "5 min ago", minutesAgo: 5, status: "Healthy", assetType: "Stock", riskLevel: "Low", description: "Retail", symbol: "WMT", price: 168.52 },
];

// RWA Pools (Traditional Assets)
export const rwaAssets: Pool[] = [
  { id: "POOL-001", name: "USD1 Treasury Pool", tag: "WLFI", latestNav: 10254398.21, previousNav: 10102305.17, change24h: 1.50, lastUpdated: "8 min ago", minutesAgo: 8, status: "Healthy", assetType: "Treasury", riskLevel: "Conservative", description: "Short-Term U.S. Treasuries" },
  { id: "POOL-002", name: "Euro Credit Fund", tag: "ECF", latestNav: 5892451.88, previousNav: 5911341.22, change24h: -0.32, lastUpdated: "15 min ago", minutesAgo: 15, status: "Healthy", assetType: "Credit", riskLevel: "Moderate", description: "European Corporate Credit" },
  { id: "POOL-003", name: "Real Estate Alpha", tag: "REA", latestNav: 25103842.55, previousNav: 24886521.33, change24h: 0.87, lastUpdated: "45 min ago", minutesAgo: 45, status: "Healthy", assetType: "Real Estate", riskLevel: "Aggressive", description: "Commercial Real Estate" },
  { id: "POOL-004", name: "Corporate Bond Yield", tag: "CBY", latestNav: 8421093.12, previousNav: 8408462.88, change24h: 0.15, lastUpdated: "8 min ago", minutesAgo: 8, status: "Healthy", assetType: "Credit", riskLevel: "Moderate", description: "Investment Grade Bonds" },
  { id: "POOL-005", name: "Gold Commodity Fund", tag: "GCF", latestNav: 3281942.77, previousNav: 3248122.45, change24h: 1.04, lastUpdated: "12 min ago", minutesAgo: 12, status: "Healthy", assetType: "Commodity", riskLevel: "Moderate", description: "Physical Gold Backed" },
  { id: "POOL-006", name: "Silver Reserve", tag: "SLV", latestNav: 1542891.55, previousNav: 1528452.18, change24h: 0.94, lastUpdated: "18 min ago", minutesAgo: 18, status: "Healthy", assetType: "Commodity", riskLevel: "Moderate", description: "Physical Silver Backed" },
  { id: "POOL-007", name: "Municipal Bond Fund", tag: "MBF", latestNav: 7821453.22, previousNav: 7798542.11, change24h: 0.29, lastUpdated: "22 min ago", minutesAgo: 22, status: "Healthy", assetType: "Treasury", riskLevel: "Conservative", description: "Tax-Exempt Municipals" },
  { id: "POOL-008", name: "Infrastructure Income", tag: "INF", latestNav: 12453821.88, previousNav: 12385421.55, change24h: 0.55, lastUpdated: "35 min ago", minutesAgo: 35, status: "Healthy", assetType: "Real Estate", riskLevel: "Moderate", description: "Infrastructure Assets" },
  { id: "POOL-009", name: "Oil & Gas Trust", tag: "OGT", latestNav: 4521893.42, previousNav: 4485621.88, change24h: 0.81, lastUpdated: "28 min ago", minutesAgo: 28, status: "Healthy", assetType: "Commodity", riskLevel: "Aggressive", description: "Energy Commodities" },
  { id: "POOL-010", name: "Agricultural Fund", tag: "AGF", latestNav: 2891542.15, previousNav: 2878421.33, change24h: 0.46, lastUpdated: "42 min ago", minutesAgo: 42, status: "Healthy", assetType: "Commodity", riskLevel: "Moderate", description: "Diversified Agriculture" },
  { id: "POOL-011", name: "Asian Credit Index", tag: "ACI", latestNav: 6542891.77, previousNav: 6498542.22, change24h: 0.68, lastUpdated: "55 min ago", minutesAgo: 55, status: "Healthy", assetType: "Credit", riskLevel: "High", description: "Asian Corporate Bonds" },
  { id: "POOL-012", name: "Timber & Forestry", tag: "T&F", latestNav: 3982541.88, previousNav: 3958421.55, change24h: 0.61, lastUpdated: "1 hr ago", minutesAgo: 65, status: "Needs Review", assetType: "Commodity", riskLevel: "Moderate", description: "Sustainable Forestry" },
  { id: "POOL-013", name: "Private Debt Fund", tag: "PDF", latestNav: 15842931.22, previousNav: 15798542.11, change24h: 0.28, lastUpdated: "1 hr ago", minutesAgo: 72, status: "Needs Review", assetType: "Credit", riskLevel: "High", description: "Private Lending" },
  { id: "POOL-014", name: "Emerging Market Bonds", tag: "EMB", latestNav: 8924531.55, previousNav: 8852421.88, change24h: 0.81, lastUpdated: "48 min ago", minutesAgo: 48, status: "Healthy", assetType: "Credit", riskLevel: "High", description: "EM Sovereign Debt" },
  { id: "POOL-015", name: "Data Center REIT", tag: "DCR", latestNav: 11542891.33, previousNav: 11428542.77, change24h: 1.00, lastUpdated: "38 min ago", minutesAgo: 38, status: "Healthy", assetType: "Real Estate", riskLevel: "Moderate", description: "Tech Infrastructure" },
  { id: "POOL-016", name: "Art & Collectibles", tag: "A&C", latestNav: 2145893.21, previousNav: 2138542.88, change24h: 0.34, lastUpdated: "2 hrs ago", minutesAgo: 125, status: "Needs Review", assetType: "Alternative", riskLevel: "Very High", description: "Fine Art Tokenized" },
  { id: "POOL-017", name: "Carbon Credits", tag: "CCR", latestNav: 4521842.55, previousNav: 4485621.11, change24h: 0.81, lastUpdated: "52 min ago", minutesAgo: 52, status: "Healthy", assetType: "Alternative", riskLevel: "High", description: "Environmental Credits" },
  { id: "POOL-018", name: "Wine & Spirits", tag: "W&S", latestNav: 1842591.88, previousNav: 1835421.55, change24h: 0.39, lastUpdated: "3 hrs ago", minutesAgo: 185, status: "Stale Data", assetType: "Alternative", riskLevel: "High", description: "Fine Wine Investment" },
  { id: "POOL-019", name: "Rare Earth Metals", tag: "REM", latestNav: 5921453.22, previousNav: 5858421.88, change24h: 1.08, lastUpdated: "32 min ago", minutesAgo: 32, status: "Healthy", assetType: "Commodity", riskLevel: "High", description: "Strategic Metals" },
  { id: "POOL-020", name: "Luxury Goods Index", tag: "LGI", latestNav: 7842591.55, previousNav: 7798542.22, change24h: 0.56, lastUpdated: "58 min ago", minutesAgo: 58, status: "Healthy", assetType: "Alternative", riskLevel: "Moderate", description: "Premium Brands" },
];

// Combine all assets
export const getAllPools = (): Pool[] => {
  return [...rwaAssets, ...cryptoAssets, ...stockAssets];
};

// Generate random price change
export const generatePriceChange = (basePrice: number, volatility: number = 0.002): number => {
  const change = (Math.random() - 0.5) * 2 * volatility * basePrice;
  return basePrice + change;
};

// Calculate 24h change
export const calculate24hChange = (current: number, previous: number): number => {
  return ((current - previous) / previous) * 100;
};

// Get status based on minutes ago
export const getStatus = (minutesAgo: number): "Healthy" | "Needs Review" | "Stale Data" => {
  if (minutesAgo < 60) return "Healthy";
  if (minutesAgo < 180) return "Needs Review";
  return "Stale Data";
};

// Format time ago
export const formatTimeAgo = (minutes: number): string => {
  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes} min ago`;
  if (minutes < 120) return "1 hr ago";
  if (minutes < 1440) return `${Math.floor(minutes / 60)} hrs ago`;
  return `${Math.floor(minutes / 1440)} days ago`;
};

// Generate chart data
export const generateChartData = (baseValue: number, days: number) => {
  const data = [];
  let currentValue = baseValue;
  const now = Date.now();

  for (let i = days * 24; i >= 0; i--) {
    const timestamp = now - i * 60 * 60 * 1000;
    const change = (Math.random() - 0.48) * baseValue * 0.005;
    currentValue = Math.max(baseValue * 0.85, currentValue + change);
    data.push({
      timestamp,
      date: new Date(timestamp).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit" }),
      nav: currentValue,
    });
  }
  return data;
};

// Data sources for real-time updates
export const dataSources = [
  { name: "Chainlink ETH/USD", type: "Price Oracle" as const, value: 3521.88, lastUpdated: 1 },
  { name: "Chainlink BTC/USD", type: "Price Oracle" as const, value: 67234.52, lastUpdated: 1 },
  { name: "Chainlink EUR/USD", type: "FX" as const, value: 1.0842, lastUpdated: 2 },
  { name: "Treasury Vault", type: "On-Chain Position" as const, value: 10254398, lastUpdated: 5 },
  { name: "NAV Admin Report", type: "Off-Chain Accounting" as const, value: 52950000, lastUpdated: 15 },
  { name: "Stock Oracle Feed", type: "Price Oracle" as const, value: 189.42, lastUpdated: 5 },
];

// AI Explanation templates
export const aiExplanations = [
  "NAV increased due to strong performance in crypto assets. Bitcoin gained {btcChange}% while Ethereum rose {ethChange}%. Treasury positions remained stable with minor yield adjustments.",
  "Market volatility led to mixed results. Crypto holdings showed {cryptoChange}% movement while traditional assets provided {rwaChange}% stability. FX had minimal impact.",
  "Today's NAV reflects ongoing market dynamics. Digital assets contributed {cryptoChange}% to overall performance. Bond yields compressed slightly, boosting fixed income valuations.",
  "Portfolio rebalancing completed. Exposure adjusted across {numAssets} assets. Net result shows {totalChange}% change with improved risk-adjusted returns.",
];
