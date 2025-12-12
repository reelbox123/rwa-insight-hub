import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, ArrowUpRight, ArrowDownRight, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

interface Pool {
  id: string;
  name: string;
  tag: string;
  latestNav: number;
  change24h: number;
  lastUpdated: string;
  minutesAgo: number;
  status: "Healthy" | "Needs Review" | "Stale Data";
  assetType: string;
}

const mockPools: Pool[] = [
  {
    id: "POOL-001",
    name: "USD1 Treasury Pool",
    tag: "WLFI",
    latestNav: 10254398.21,
    change24h: 1.5,
    lastUpdated: "12 min ago",
    minutesAgo: 12,
    status: "Healthy",
    assetType: "Treasury",
  },
  {
    id: "POOL-002",
    name: "Euro Credit Fund",
    tag: "ECF",
    latestNav: 5892451.88,
    change24h: -0.32,
    lastUpdated: "45 min ago",
    minutesAgo: 45,
    status: "Healthy",
    assetType: "Credit",
  },
  {
    id: "POOL-003",
    name: "Real Estate Alpha",
    tag: "REA",
    latestNav: 25103842.55,
    change24h: 0.87,
    lastUpdated: "3 hours ago",
    minutesAgo: 180,
    status: "Needs Review",
    assetType: "Real Estate",
  },
  {
    id: "POOL-004",
    name: "Corporate Bond Yield",
    tag: "CBY",
    latestNav: 8421093.12,
    change24h: 0.15,
    lastUpdated: "8 min ago",
    minutesAgo: 8,
    status: "Healthy",
    assetType: "Credit",
  },
  {
    id: "POOL-005",
    name: "Commodity Basket Fund",
    tag: "CMB",
    latestNav: 3281942.77,
    change24h: -1.24,
    lastUpdated: "28 hours ago",
    minutesAgo: 1680,
    status: "Stale Data",
    assetType: "Commodity",
  },
];

export function PoolsTable() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [showRecent, setShowRecent] = useState(false);
  const [assetTypeFilter, setAssetTypeFilter] = useState("all");

  const filteredPools = mockPools.filter((pool) => {
    const matchesSearch =
      pool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pool.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRecent = !showRecent || pool.minutesAgo <= 1440;
    const matchesType =
      assetTypeFilter === "all" ||
      pool.assetType.toLowerCase() === assetTypeFilter.toLowerCase();
    return matchesSearch && matchesRecent && matchesType;
  });

  const getStatusBadge = (status: Pool["status"]) => {
    switch (status) {
      case "Healthy":
        return <Badge variant="success">{status}</Badge>;
      case "Needs Review":
        return <Badge variant="warning">{status}</Badge>;
      case "Stale Data":
        return <Badge variant="destructive">{status}</Badge>;
    }
  };

  const getStatusDot = (minutesAgo: number) => {
    if (minutesAgo < 60) return "status-dot status-healthy";
    if (minutesAgo < 1440) return "status-dot status-warning";
    return "status-dot status-stale";
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  return (
    <div className="glass-card overflow-hidden animate-fade-in" style={{ animationDelay: "200ms" }}>
      {/* Filters Header */}
      <div className="border-b border-border/50 p-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search pools by name or ID..."
              className="pl-10 bg-muted/50 border-border/50"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Switch
                id="recent-filter"
                checked={showRecent}
                onCheckedChange={setShowRecent}
              />
              <Label htmlFor="recent-filter" className="text-sm text-muted-foreground whitespace-nowrap">
                Last 24h only
              </Label>
            </div>
            <Select value={assetTypeFilter} onValueChange={setAssetTypeFilter}>
              <SelectTrigger className="w-[150px] bg-muted/50 border-border/50">
                <SelectValue placeholder="Asset type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="treasury">Treasury</SelectItem>
                <SelectItem value="credit">Credit</SelectItem>
                <SelectItem value="real estate">Real Estate</SelectItem>
                <SelectItem value="commodity">Commodity</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border/50 bg-muted/30">
              <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Pool
              </th>
              <th className="px-6 py-4 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Latest NAV
              </th>
              <th className="px-6 py-4 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Change (24h)
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Last Updated
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Status
              </th>
              <th className="px-6 py-4 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/30">
            {filteredPools.map((pool, index) => (
              <tr
                key={pool.id}
                className="group cursor-pointer transition-colors hover:bg-muted/30"
                onClick={() => navigate(`/pool/${pool.id}`)}
                style={{ animationDelay: `${300 + index * 50}ms` }}
              >
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                      {pool.name}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {pool.tag} · #{pool.id}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <span className="font-semibold text-foreground">
                    {formatCurrency(pool.latestNav)}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div
                    className={cn(
                      "inline-flex items-center gap-1 font-medium",
                      pool.change24h >= 0 ? "text-success" : "text-destructive"
                    )}
                  >
                    {pool.change24h >= 0 ? (
                      <ArrowUpRight className="h-4 w-4" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4" />
                    )}
                    {Math.abs(pool.change24h).toFixed(2)}%
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className={getStatusDot(pool.minutesAgo)} />
                    <span className="text-sm text-muted-foreground">
                      {pool.lastUpdated}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">{getStatusBadge(pool.status)}</td>
                <td className="px-6 py-4 text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-2 text-primary hover:text-primary hover:bg-primary/10"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/pool/${pool.id}`);
                    }}
                  >
                    <Eye className="h-4 w-4" />
                    View Details
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredPools.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="rounded-full bg-muted p-4 mb-4">
              <Search className="h-6 w-6 text-muted-foreground" />
            </div>
            <p className="text-lg font-medium text-foreground">No pools found</p>
            <p className="text-sm text-muted-foreground mt-1">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
