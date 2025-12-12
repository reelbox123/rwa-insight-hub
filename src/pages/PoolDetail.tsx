import { useParams, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { NavChart } from "@/components/NavChart";
import { KeyMetrics } from "@/components/KeyMetrics";
import { DataSources } from "@/components/DataSources";
import { AIExplanation } from "@/components/AIExplanation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowUpRight, ExternalLink } from "lucide-react";

const poolData: Record<string, {
  name: string;
  symbol: string;
  assetType: string;
  riskLevel: string;
  network: string;
  latestNav: number;
  previousNav: number;
  change24h: number;
  lastUpdated: string;
}> = {
  "POOL-001": {
    name: "USD1 Treasury Pool",
    symbol: "WLFI",
    assetType: "Short-Term U.S. Treasuries",
    riskLevel: "Conservative",
    network: "Mantle Mainnet",
    latestNav: 10254398.21,
    previousNav: 10102305.17,
    change24h: 1.5,
    lastUpdated: "8 minutes ago",
  },
  "POOL-002": {
    name: "Euro Credit Fund",
    symbol: "ECF",
    assetType: "European Corporate Credit",
    riskLevel: "Moderate",
    network: "Mantle Mainnet",
    latestNav: 5892451.88,
    previousNav: 5911341.22,
    change24h: -0.32,
    lastUpdated: "45 minutes ago",
  },
  "POOL-003": {
    name: "Real Estate Alpha",
    symbol: "REA",
    assetType: "Commercial Real Estate",
    riskLevel: "Aggressive",
    network: "Mantle Mainnet",
    latestNav: 25103842.55,
    previousNav: 24886521.33,
    change24h: 0.87,
    lastUpdated: "3 hours ago",
  },
  "POOL-004": {
    name: "Corporate Bond Yield",
    symbol: "CBY",
    assetType: "Investment Grade Bonds",
    riskLevel: "Moderate",
    network: "Mantle Mainnet",
    latestNav: 8421093.12,
    previousNav: 8408462.88,
    change24h: 0.15,
    lastUpdated: "8 minutes ago",
  },
  "POOL-005": {
    name: "Commodity Basket Fund",
    symbol: "CMB",
    assetType: "Diversified Commodities",
    riskLevel: "Aggressive",
    network: "Mantle Mainnet",
    latestNav: 3281942.77,
    previousNav: 3323122.45,
    change24h: -1.24,
    lastUpdated: "28 hours ago",
  },
};

const PoolDetail = () => {
  const { poolId } = useParams<{ poolId: string }>();
  const navigate = useNavigate();

  const pool = poolId ? poolData[poolId] : null;

  if (!pool) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center py-20">
            <h1 className="text-2xl font-bold text-foreground mb-4">Pool not found</h1>
            <Button onClick={() => navigate("/")}>Return to Overview</Button>
          </div>
        </main>
      </div>
    );
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(value);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          className="mb-6 gap-2 text-muted-foreground hover:text-foreground"
          onClick={() => navigate("/")}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Overview
        </Button>

        {/* Hero Card */}
        <div className="glass-card p-6 lg:p-8 mb-8 animate-fade-in glow-primary">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            {/* Left Side */}
            <div className="space-y-4">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  {pool.name}
                </h1>
                <p className="text-lg text-muted-foreground">
                  {pool.symbol} · {pool.network}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">{pool.assetType}</Badge>
                <Badge variant="muted">{pool.riskLevel}</Badge>
                <Badge variant="outline">#{poolId}</Badge>
              </div>
            </div>

            {/* Right Side */}
            <div className="lg:text-right space-y-3">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Latest NAV</p>
                <p className="text-4xl font-bold text-foreground">
                  {formatCurrency(pool.latestNav)}
                </p>
              </div>

              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">
                  Prev NAV: {formatCurrency(pool.previousNav)}
                </p>
                <div className={`flex items-center gap-1 lg:justify-end ${
                  pool.change24h >= 0 ? "text-success" : "text-destructive"
                }`}>
                  <ArrowUpRight className={`h-4 w-4 ${pool.change24h < 0 ? "rotate-90" : ""}`} />
                  <span className="font-semibold">
                    {pool.change24h >= 0 ? "+" : ""}{pool.change24h.toFixed(2)}% (24h)
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 lg:justify-end">
                <div className="status-dot status-healthy" />
                <span className="text-sm text-muted-foreground">
                  Updated {pool.lastUpdated}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Charts & Metrics Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <NavChart poolId={poolId || ""} />
          </div>
          <div>
            <KeyMetrics poolId={poolId || ""} />
          </div>
        </div>

        {/* Data Sources & AI Explanation */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <DataSources />
          <AIExplanation poolId={poolId || ""} />
        </div>
      </main>
    </div>
  );
};

export default PoolDetail;
