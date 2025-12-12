import { Coins, TrendingUp, Clock, AlertCircle } from "lucide-react";

interface KeyMetricsProps {
  poolId: string;
}

const metrics = [
  {
    label: "Current NAV",
    value: "$10,254,398.21",
    icon: Coins,
  },
  {
    label: "Units Outstanding",
    value: "10,000,000",
    icon: TrendingUp,
  },
  {
    label: "NAV per Token",
    value: "$1.0254",
    icon: Coins,
  },
  {
    label: "Oracle Deviation",
    value: "0.02%",
    icon: AlertCircle,
  },
  {
    label: "Refresh Schedule",
    value: "Every 24 hours",
    icon: Clock,
  },
];

export function KeyMetrics({ poolId }: KeyMetricsProps) {
  return (
    <div className="glass-card p-6 animate-fade-in" style={{ animationDelay: "150ms" }}>
      <h3 className="text-lg font-semibold text-foreground mb-6">Key Metrics</h3>
      <div className="space-y-4">
        {metrics.map((metric, index) => (
          <div
            key={metric.label}
            className="flex items-center justify-between py-3 border-b border-border/30 last:border-0"
          >
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-primary/10 p-2">
                <metric.icon className="h-4 w-4 text-primary" />
              </div>
              <span className="text-sm text-muted-foreground">{metric.label}</span>
            </div>
            <span className="font-medium text-foreground">{metric.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
