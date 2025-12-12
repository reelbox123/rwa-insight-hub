import { Navbar } from "@/components/Navbar";
import { StatsCard } from "@/components/StatsCard";
import { PoolsTable } from "@/components/PoolsTable";
import { Layers, DollarSign, Clock, RefreshCw } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            NAV Overview
          </h1>
          <p className="text-lg text-muted-foreground">
            Real-time NAV transparency for tokenized RWA pools on Mantle.
          </p>
        </div>

        {/* Stats Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatsCard
            title="Total Pools"
            value="5"
            subtitle="Active RWA pools"
            icon={Layers}
            delay={0}
          />
          <StatsCard
            title="Total On-Chain NAV"
            value="$52.95M"
            subtitle="Combined pool value"
            icon={DollarSign}
            trend={{ value: "+1.2% (24h)", positive: true }}
            delay={50}
          />
          <StatsCard
            title="Last Update (Global)"
            value="8 min ago"
            subtitle="Most recent NAV update"
            icon={Clock}
            delay={100}
          />
          <StatsCard
            title="Avg Refresh Interval"
            value="24h"
            subtitle="Typical update frequency"
            icon={RefreshCw}
            delay={150}
          />
        </div>

        {/* Pools Table */}
        <PoolsTable />
      </main>
    </div>
  );
};

export default Index;
