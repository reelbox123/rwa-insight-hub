import { Badge } from "@/components/ui/badge";
import { Database, LineChart, Globe, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

interface DataSource {
  name: string;
  type: "Price Oracle" | "FX" | "On-Chain Position" | "Off-Chain Accounting";
  lastValue: string;
  lastUpdated: string;
}

const dataSources: DataSource[] = [
  {
    name: "Chainlink ETH/USD Feed",
    type: "Price Oracle",
    lastValue: "Price: $3,215.42",
    lastUpdated: "2 min ago",
  },
  {
    name: "Chainlink EUR/USD Feed",
    type: "FX",
    lastValue: "FX: 1.0842",
    lastUpdated: "5 min ago",
  },
  {
    name: "Treasury Vault Position",
    type: "On-Chain Position",
    lastValue: "Holdings: $10.2M",
    lastUpdated: "12 min ago",
  },
  {
    name: "NAV Administrator Report",
    type: "Off-Chain Accounting",
    lastValue: "Daily NAV: $10,254,398",
    lastUpdated: "8 hours ago",
  },
];

const getTypeIcon = (type: DataSource["type"]) => {
  switch (type) {
    case "Price Oracle":
      return LineChart;
    case "FX":
      return Globe;
    case "On-Chain Position":
      return Database;
    case "Off-Chain Accounting":
      return FileText;
  }
};

const getTypeBadgeVariant = (type: DataSource["type"]) => {
  switch (type) {
    case "Price Oracle":
      return "secondary";
    case "FX":
      return "warning";
    case "On-Chain Position":
      return "success";
    case "Off-Chain Accounting":
      return "muted";
  }
};

export function DataSources() {
  return (
    <div className="glass-card p-6 animate-fade-in" style={{ animationDelay: "200ms" }}>
      <h3 className="text-lg font-semibold text-foreground mb-6">
        Data Sources & Inputs
      </h3>

      <div className="space-y-4">
        {dataSources.map((source, index) => {
          const Icon = getTypeIcon(source.type);
          return (
            <div
              key={source.name}
              className="flex items-start gap-4 p-4 rounded-lg bg-muted/30 border border-border/30 hover:border-primary/20 transition-colors"
            >
              <div className="rounded-lg bg-primary/10 p-2.5 shrink-0">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="font-medium text-foreground text-sm">
                    {source.name}
                  </span>
                  <Badge variant={getTypeBadgeVariant(source.type)} className="shrink-0">
                    {source.type}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{source.lastValue}</span>
                  <span className="text-xs text-muted-foreground">
                    {source.lastUpdated}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 p-4 rounded-lg bg-secondary/10 border border-secondary/20">
        <p className="text-xs text-muted-foreground leading-relaxed">
          All inputs are hashed and referenced in the on-chain NAVRegistry for
          auditability. Each data point is cryptographically verified before
          inclusion in NAV calculations.
        </p>
      </div>
    </div>
  );
}
