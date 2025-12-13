import { Navbar } from "@/components/Navbar";
import { StatsCard } from "@/components/StatsCard";
import { PoolsTable } from "@/components/PoolsTable";
import { Layers, DollarSign, Clock, RefreshCw } from "lucide-react";
import { useRealtimeData } from "@/hooks/useRealtimeData";

const Index = () => {
  const { pools, stats } = useRealtimeData();

  const formatNav = (value: number) => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(2)}M`;
    return `$${value.toFixed(2)}`;
  };

  const timeSinceUpdate = () => {
    const seconds = Math.floor((Date.now() - stats.lastUpdateTime) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    return `${Math.floor(seconds / 60)}m ago`;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-4">
        {/* Page Header */}
        <div className="mb-4 animate-fade-in">
          <h1 className="text-xl font-bold text-foreground mb-1">
            NAV Overview
          </h1>
          <p className="text-xs text-muted-foreground">
            Real-time NAV transparency for tokenized RWA pools
          </p>
        </div>

        {/* Stats Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
          <StatsCard
            title="Active RWA Pools"
            value={stats.activePoolsCount.toString()}
            subtitle="Currently healthy"
            icon={Layers}
            delay={0}
          />
          <StatsCard
            title="Total On-Chain NAV"
            value={formatNav(stats.totalNav)}
            subtitle="Combined value"
            icon={DollarSign}
            trend={{ 
              value: `${stats.navChange >= 0 ? "+" : ""}${stats.navChange.toFixed(2)}% (24h)`, 
              positive: stats.navChange >= 0 
            }}
            delay={50}
          />
          <StatsCard
            title="Last Update"
            value={timeSinceUpdate()}
            subtitle="Most recent"
            icon={Clock}
            delay={100}
          />
          <StatsCard
            title="Refresh Rate"
            value="2s"
            subtitle="Real-time updates"
            icon={RefreshCw}
            delay={150}
          />
        </div>

        {/* Pools Table */}
        <PoolsTable pools={pools} />
      </main>
    </div>
  );
};

export default Index;
