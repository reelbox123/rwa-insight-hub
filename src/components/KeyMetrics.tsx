import { useState, useEffect } from "react";
import { Coins, TrendingUp, Clock, AlertCircle } from "lucide-react";
import { generatePriceChange } from "@/lib/realtime-data";

interface KeyMetricsProps {
  poolId: string;
  baseNav?: number;
}

export function KeyMetrics({ poolId, baseNav = 10254398.21 }: KeyMetricsProps) {
  const [metrics, setMetrics] = useState({
    currentNav: baseNav,
    unitsOutstanding: 10000000,
    navPerToken: baseNav / 10000000,
    oracleDeviation: 0.02,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) => {
        const newNav = generatePriceChange(prev.currentNav, 0.001);
        return {
          currentNav: newNav,
          unitsOutstanding: prev.unitsOutstanding,
          navPerToken: newNav / prev.unitsOutstanding,
          oracleDeviation: Math.max(0, Math.min(0.1, prev.oracleDeviation + (Math.random() - 0.5) * 0.005)),
        };
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const formatValue = (value: number, decimals: number = 2) => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(decimals)}M`;
    if (value >= 1000) return `$${(value / 1000).toFixed(decimals)}K`;
    return `$${value.toFixed(4)}`;
  };

  const metricsData = [
    {
      label: "Current NAV",
      value: formatValue(metrics.currentNav),
      icon: Coins,
    },
    {
      label: "Units Outstanding",
      value: metrics.unitsOutstanding.toLocaleString(),
      icon: TrendingUp,
    },
    {
      label: "NAV per Token",
      value: `$${metrics.navPerToken.toFixed(4)}`,
      icon: Coins,
    },
    {
      label: "Oracle Deviation",
      value: `${metrics.oracleDeviation.toFixed(3)}%`,
      icon: AlertCircle,
    },
    {
      label: "Refresh Schedule",
      value: "Every 2s",
      icon: Clock,
    },
  ];

  return (
    <div className="glass-card p-4 animate-fade-in" style={{ animationDelay: "150ms" }}>
      <h3 className="text-xs font-semibold text-foreground mb-4">Key Metrics</h3>
      <div className="space-y-2.5">
        {metricsData.map((metric) => (
          <div
            key={metric.label}
            className="flex items-center justify-between py-2 border-b border-border/30 last:border-0"
          >
            <div className="flex items-center gap-2">
              <div className="rounded-md bg-primary/10 p-1.5">
                <metric.icon className="h-3 w-3 text-primary" />
              </div>
              <span className="text-[10px] text-muted-foreground">{metric.label}</span>
            </div>
            <span className="text-xs font-medium text-foreground tabular-nums">{metric.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
