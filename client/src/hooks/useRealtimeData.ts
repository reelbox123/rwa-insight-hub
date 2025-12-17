import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { fetchCryptoPrices, AssetPrice, getTreasuryRates, fetchAllMantlePrices } from "@/lib/price-api";
import { MANTLE_TOKENS, MantleToken, getTokenExplorerUrl } from "@/lib/mantle-tokens";
import { 
  fetchLatestTransactions, 
  fetchLatestBlocks, 
  MantleTransaction, 
  MantleBlock,
  getLatestBlockNumber,
  getExplorerTxUrl
} from "@/lib/mantle-api";

export interface Pool {
  id: string;
  name: string;
  tag: string;
  description: string;
  assetType: "Treasury" | "Crypto" | "Commodity" | "Stock" | "RWA" | "Stablecoin" | "LST" | "DeFi" | "Meme" | "Infrastructure" | "Wrapped" | "Native";
  riskLevel: "Low" | "Medium" | "High";
  latestNav: number;
  previousNav: number;
  change24h: number;
  status: "Healthy" | "Needs Review" | "Stale Data";
  lastUpdated: string;
  minutesAgo: number;
  priceData?: AssetPrice;
  unitPrice?: number;
  unitsOutstanding?: number;
  contractAddress?: string;
  explorerUrl?: string;
  category?: string;
}

interface RealtimeStats {
  totalNav: number;
  navChange: number;
  activePoolsCount: number;
  lastUpdateTime: number;
}

interface DataSource {
  name: string;
  type: "Price Oracle" | "FX" | "On-Chain Position" | "Off-Chain Accounting";
  value: number;
  lastUpdated: number;
}

export interface MantleData {
  latestTransaction: MantleTransaction | null;
  latestBlock: MantleBlock | null;
  recentTransactions: MantleTransaction[];
  recentBlocks: MantleBlock[];
  currentBlockNumber: number;
}

// Convert Mantle tokens to pool definitions
function createPoolDefinitions(): Array<{
  id: string;
  name: string;
  tag: string;
  description: string;
  assetType: Pool["assetType"];
  riskLevel: Pool["riskLevel"];
  baseNav: number;
  unitsOutstanding: number;
  cryptoSymbol: string;
  contractAddress: string;
  category: string;
}> {
  return MANTLE_TOKENS.map((token, index) => {
    // Determine risk level based on category
    let riskLevel: Pool["riskLevel"] = "Medium";
    if (token.category === "Stablecoin" || token.category === "RWA") {
      riskLevel = "Low";
    } else if (token.category === "Meme" || token.category === "DeFi") {
      riskLevel = "High";
    }

    // Calculate base NAV (using market cap as base)
    const baseNav = token.fallbackMarketCap > 0 
      ? Math.min(token.fallbackMarketCap * 0.001, 50000000)
      : token.fallbackPrice * 1000000;

    // Calculate units outstanding
    const unitsOutstanding = baseNav / token.fallbackPrice;

    return {
      id: `POOL-${String(index + 1).padStart(3, "0")}`,
      name: token.name,
      tag: token.symbol,
      description: token.description,
      assetType: token.category as Pool["assetType"],
      riskLevel,
      baseNav,
      unitsOutstanding,
      cryptoSymbol: token.symbol,
      contractAddress: token.contractAddress,
      category: token.category,
    };
  });
}

const POOL_DEFINITIONS = createPoolDefinitions();

function formatTimeAgo(minutes: number): string {
  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${Math.floor(minutes)} min ago`;
  if (minutes < 1440) return `${Math.floor(minutes / 60)} hr ago`;
  return `${Math.floor(minutes / 1440)} days ago`;
}

function getStatus(minutesAgo: number): "Healthy" | "Needs Review" | "Stale Data" {
  if (minutesAgo < 5) return "Healthy";
  if (minutesAgo < 30) return "Needs Review";
  return "Stale Data";
}

// Legacy exports for backward compatibility
export const dataSources: DataSource[] = [];
export const aiExplanations: string[] = [];

export function generatePriceChange(basePrice: number, volatility: number = 0.001): number {
  const change = (Math.random() - 0.5) * 2 * volatility * basePrice;
  return basePrice + change;
}

export function calculate24hChange(current: number, previous: number): number {
  return ((current - previous) / previous) * 100;
}

export function getStatusFromMinutes(minutesAgo: number): "Healthy" | "Needs Review" | "Stale Data" {
  return getStatus(minutesAgo);
}

export function generateChartData(baseValue: number, days: number) {
  const data = [];
  const now = new Date();
  
  for (let i = days; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    const volatility = 0.02;
    const trend = 0.001;
    const randomWalk = (Math.random() - 0.5) * volatility;
    const value = baseValue * (1 + randomWalk + trend * (days - i));
    
    data.push({
      date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      value: Math.max(value, baseValue * 0.8),
    });
  }
  
  return data;
}

export function getAllPools(): Pool[] {
  return POOL_DEFINITIONS.map(def => {
    const token = MANTLE_TOKENS.find(t => t.symbol === def.cryptoSymbol);
    return {
      id: def.id,
      name: def.name,
      tag: def.tag,
      description: def.description,
      assetType: def.assetType,
      riskLevel: def.riskLevel,
      latestNav: def.baseNav,
      previousNav: def.baseNav * 0.99,
      change24h: token?.fallbackChange24h || 0,
      status: "Healthy" as const,
      lastUpdated: "Just now",
      minutesAgo: 0,
      unitPrice: token?.fallbackPrice || def.baseNav / def.unitsOutstanding,
      unitsOutstanding: def.unitsOutstanding,
      contractAddress: def.contractAddress,
      explorerUrl: getTokenExplorerUrl(def.contractAddress),
      category: def.category,
    };
  });
}

export function useRealtimeData() {
  const [pools, setPools] = useState<Pool[]>(getAllPools());
  const [stats, setStats] = useState<RealtimeStats>({
    totalNav: 0,
    navChange: 0,
    activePoolsCount: 0,
    lastUpdateTime: Date.now(),
  });
  const [sources, setSources] = useState<DataSource[]>([]);
  const [mantleData, setMantleData] = useState<MantleData>({
    latestTransaction: null,
    latestBlock: null,
    recentTransactions: [],
    recentBlocks: [],
    currentBlockNumber: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [lastPriceUpdate, setLastPriceUpdate] = useState<Date>(new Date());

  const fetchRealData = useCallback(async () => {
    try {
      // Fetch all Mantle token prices
      const cryptoSymbols = POOL_DEFINITIONS.map(p => p.cryptoSymbol);
      
      const [prices, transactions, blocks, blockNumber] = await Promise.all([
        fetchCryptoPrices(cryptoSymbols),
        fetchLatestTransactions(10),
        fetchLatestBlocks(5),
        getLatestBlockNumber(),
      ]);

      const treasuryRates = getTreasuryRates();

      // Update Mantle data with real transactions
      setMantleData({
        latestTransaction: transactions[0] || null,
        latestBlock: blocks[0] || null,
        recentTransactions: transactions,
        recentBlocks: blocks,
        currentBlockNumber: blockNumber,
      });

      // Update pools with real prices
      const updatedPools: Pool[] = POOL_DEFINITIONS.map(poolDef => {
        const token = MANTLE_TOKENS.find(t => t.symbol === poolDef.cryptoSymbol);
        let latestNav = poolDef.baseNav;
        let priceData: AssetPrice | undefined;
        let change24h = token?.fallbackChange24h || 0;
        let unitPrice = token?.fallbackPrice || poolDef.baseNav / poolDef.unitsOutstanding;

        if (prices.has(poolDef.cryptoSymbol)) {
          priceData = prices.get(poolDef.cryptoSymbol);
          if (priceData) {
            unitPrice = priceData.currentPrice;
            latestNav = unitPrice * poolDef.unitsOutstanding;
            change24h = priceData.priceChangePercentage24h;
          }
        }

        const minutesAgo = Math.random() * 3;

        return {
          id: poolDef.id,
          name: poolDef.name,
          tag: poolDef.tag,
          description: poolDef.description,
          assetType: poolDef.assetType,
          riskLevel: poolDef.riskLevel,
          latestNav,
          previousNav: latestNav / (1 + change24h / 100),
          change24h,
          status: getStatus(minutesAgo),
          lastUpdated: formatTimeAgo(minutesAgo),
          minutesAgo,
          priceData,
          unitPrice,
          unitsOutstanding: poolDef.unitsOutstanding,
          contractAddress: poolDef.contractAddress,
          explorerUrl: getTokenExplorerUrl(poolDef.contractAddress),
          category: poolDef.category,
        };
      });

      setPools(updatedPools);
      setLastPriceUpdate(new Date());

      // Update data sources with real price data
      const updatedSources: DataSource[] = [
        {
          name: "CoinGecko BTC/USD",
          type: "Price Oracle",
          value: prices.get("WBTC")?.currentPrice || prices.get("FBTC")?.currentPrice || 101387,
          lastUpdated: 0,
        },
        {
          name: "CoinGecko ETH/USD",
          type: "Price Oracle",
          value: prices.get("WETH")?.currentPrice || prices.get("mETH")?.currentPrice || 3905,
          lastUpdated: 0,
        },
        {
          name: "CoinGecko MNT/USD",
          type: "Price Oracle",
          value: prices.get("MNT")?.currentPrice || 1.28,
          lastUpdated: 0,
        },
        {
          name: "EUR/USD FX Rate",
          type: "FX",
          value: 1.0523,
          lastUpdated: 1,
        },
        {
          name: "Treasury Yield 10Y",
          type: "Off-Chain Accounting",
          value: treasuryRates["10-Year"],
          lastUpdated: 2,
        },
        {
          name: "Mantle Block Height",
          type: "On-Chain Position",
          value: blockNumber,
          lastUpdated: 0,
        },
      ];
      setSources(updatedSources);

      // Calculate stats
      const totalNav = updatedPools.reduce((sum, pool) => sum + pool.latestNav, 0);
      const previousTotalNav = updatedPools.reduce((sum, pool) => sum + pool.previousNav, 0);
      const navChange = previousTotalNav > 0 ? ((totalNav - previousTotalNav) / previousTotalNav) * 100 : 0;

      setStats({
        totalNav,
        navChange,
        activePoolsCount: updatedPools.filter(p => p.status === "Healthy").length,
        lastUpdateTime: Date.now(),
      });

      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching real-time data:", error);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRealData();
    const interval = setInterval(fetchRealData, 30000);
    return () => clearInterval(interval);
  }, [fetchRealData]);

  return { 
    pools, 
    stats, 
    sources,
    mantleData,
    isLoading,
    lastPriceUpdate,
    refetch: fetchRealData,
  };
}

export function usePoolRealtimeData(poolId: string) {
  const { pools, sources, mantleData, isLoading, lastPriceUpdate } = useRealtimeData();
  const [chartData, setChartData] = useState<any[]>([]);
  const [aiExplanation, setAiExplanation] = useState("");

  const pool = pools.find((p) => p.id === poolId);

  useEffect(() => {
    if (pool) {
      const data = generateChartData(pool.latestNav, 7);
      setChartData(data);

      // Generate detailed AI explanation based on real data
      const direction = pool.change24h >= 0 ? "increased" : "decreased";
      const changeAbs = Math.abs(pool.change24h).toFixed(2);
      
      let explanation = `**${pool.name} (${pool.tag}) NAV Analysis**\n\n`;
      explanation += `Today's NAV ${direction} by ${changeAbs}%. `;
      
      if (pool.priceData) {
        explanation += `\n\n**Current Market Data:**\n`;
        explanation += `• Price: $${pool.priceData.currentPrice.toLocaleString()}\n`;
        explanation += `• 24h High: $${pool.priceData.high24h?.toLocaleString() || "N/A"}\n`;
        explanation += `• 24h Low: $${pool.priceData.low24h?.toLocaleString() || "N/A"}\n`;
        explanation += `• Volume: $${((pool.priceData.volume24h || 0) / 1e6).toFixed(2)}M\n`;
        explanation += `• Market Cap: $${((pool.priceData.marketCap || 0) / 1e9).toFixed(2)}B\n`;
      }
      
      explanation += `\n**Pool Metrics:**\n`;
      explanation += `• Total NAV: $${pool.latestNav.toLocaleString()}\n`;
      explanation += `• Unit Price: $${pool.unitPrice?.toFixed(4) || "N/A"}\n`;
      explanation += `• Units Outstanding: ${pool.unitsOutstanding?.toLocaleString() || "N/A"}\n`;
      explanation += `• Risk Level: ${pool.riskLevel}\n`;
      explanation += `• Status: ${pool.status}\n`;
      
      if (pool.contractAddress) {
        explanation += `\n**On-Chain Reference:**\n`;
        explanation += `• Contract: ${pool.contractAddress.slice(0, 10)}...${pool.contractAddress.slice(-8)}\n`;
        explanation += `• Network: Mantle (Chain ID: 5000)\n`;
      }
      
      if (mantleData.latestTransaction) {
        explanation += `\n**Latest Network Activity:**\n`;
        explanation += `• Block: #${mantleData.currentBlockNumber.toLocaleString()}\n`;
        explanation += `• Recent Tx: ${mantleData.latestTransaction.hash.slice(0, 10)}...\n`;
      }
      
      setAiExplanation(explanation);
    }
  }, [pool, pools, mantleData]);

  return { 
    pool, 
    chartData, 
    aiExplanation, 
    sources,
    mantleData,
    isLoading,
    lastPriceUpdate,
  };
}
