import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import {
  Pool,
  getAllPools,
  generatePriceChange,
  calculate24hChange,
  getStatus,
  formatTimeAgo,
  dataSources,
  generateChartData,
} from "@/lib/realtime-data";

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

export function useRealtimeData() {
  const [pools, setPools] = useState<Pool[]>(getAllPools());
  const [stats, setStats] = useState<RealtimeStats>({
    totalNav: 0,
    navChange: 0,
    activePoolsCount: 0,
    lastUpdateTime: Date.now(),
  });
  const [sources, setSources] = useState<DataSource[]>(dataSources);

  const updatePrices = useCallback(() => {
    setPools((prevPools) => {
      const updatedPools = prevPools.map((pool) => {
        // Different volatility for different asset types
        let volatility = 0.001;
        if (pool.assetType === "Crypto") volatility = 0.003;
        else if (pool.assetType === "Stock") volatility = 0.001;
        else if (pool.assetType === "Commodity") volatility = 0.002;

        const newNav = generatePriceChange(pool.latestNav, volatility);
        const newChange = calculate24hChange(newNav, pool.previousNav);
        const newMinutesAgo = Math.max(0, pool.minutesAgo - 1);

        // Trigger alert for significant changes
        if (Math.abs(newChange - pool.change24h) > 0.5) {
          const direction = newChange > pool.change24h ? "up" : "down";
          toast.info(`${pool.name} moved ${direction} significantly`, {
            description: `New change: ${newChange.toFixed(2)}%`,
          });
        }

        return {
          ...pool,
          latestNav: newNav,
          change24h: newChange,
          minutesAgo: newMinutesAgo,
          lastUpdated: formatTimeAgo(newMinutesAgo),
          status: getStatus(newMinutesAgo),
        };
      });

      // Calculate total NAV
      const totalNav = updatedPools.reduce((sum, pool) => sum + pool.latestNav, 0);
      const previousTotalNav = updatedPools.reduce((sum, pool) => sum + pool.previousNav, 0);
      const navChange = calculate24hChange(totalNav, previousTotalNav);
      const activePoolsCount = updatedPools.filter((p) => p.status === "Healthy").length;

      setStats({
        totalNav,
        navChange,
        activePoolsCount,
        lastUpdateTime: Date.now(),
      });

      return updatedPools;
    });

    // Update data sources
    setSources((prevSources) =>
      prevSources.map((source) => ({
        ...source,
        value: generatePriceChange(source.value, 0.001),
        lastUpdated: Math.max(0, source.lastUpdated),
      }))
    );
  }, []);

  useEffect(() => {
    // Initial calculation
    const totalNav = pools.reduce((sum, pool) => sum + pool.latestNav, 0);
    const previousTotalNav = pools.reduce((sum, pool) => sum + pool.previousNav, 0);
    setStats({
      totalNav,
      navChange: calculate24hChange(totalNav, previousTotalNav),
      activePoolsCount: pools.filter((p) => p.status === "Healthy").length,
      lastUpdateTime: Date.now(),
    });

    // Update every 2 seconds
    const interval = setInterval(updatePrices, 2000);
    return () => clearInterval(interval);
  }, [updatePrices]);

  return { pools, stats, sources };
}

export function usePoolRealtimeData(poolId: string) {
  const { pools, sources } = useRealtimeData();
  const [chartData, setChartData] = useState<any[]>([]);
  const [aiExplanation, setAiExplanation] = useState("");

  const pool = pools.find((p) => p.id === poolId);

  useEffect(() => {
    if (pool) {
      // Generate chart data based on pool's NAV
      const data = generateChartData(pool.latestNav, 7);
      setChartData(data);

      // Generate AI explanation
      const btcPool = pools.find((p) => p.tag === "BTC");
      const ethPool = pools.find((p) => p.tag === "ETH");
      const btcChange = btcPool?.change24h.toFixed(2) || "0.51";
      const ethChange = ethPool?.change24h.toFixed(2) || "0.67";

      setAiExplanation(
        `Today's NAV ${pool.change24h >= 0 ? "increased" : "decreased"} by ${Math.abs(pool.change24h).toFixed(2)}%. ` +
        `${pool.assetType === "Crypto" ? `Bitcoin moved ${btcChange}% and Ethereum ${ethChange}%.` : ""} ` +
        `${pool.assetType === "Treasury" ? "Treasury yields remained stable with minor adjustments." : ""} ` +
        `${pool.assetType === "Stock" ? "Equity markets showed moderate volatility." : ""} ` +
        `${pool.assetType === "Commodity" ? "Commodity prices reflected global supply dynamics." : ""} ` +
        `The ${pool.riskLevel.toLowerCase()} risk profile was maintained with ${pools.filter(p => p.status === "Healthy").length} healthy data sources.`
      );
    }
  }, [pool, pools]);

  return { pool, chartData, aiExplanation, sources };
}
