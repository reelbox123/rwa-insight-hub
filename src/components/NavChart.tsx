import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NavChartProps {
  poolId: string;
}

const generateChartData = (days: number) => {
  const data = [];
  const baseValue = 10000000;
  let currentValue = baseValue;

  for (let i = days; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const change = (Math.random() - 0.45) * 100000;
    currentValue = Math.max(baseValue * 0.9, currentValue + change);
    data.push({
      date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      nav: currentValue,
    });
  }
  return data;
};

const timeframes = [
  { label: "24H", days: 1 },
  { label: "7D", days: 7 },
  { label: "30D", days: 30 },
];

export function NavChart({ poolId }: NavChartProps) {
  const [selectedTimeframe, setSelectedTimeframe] = useState(7);
  const data = generateChartData(selectedTimeframe);

  const formatYAxis = (value: number) => {
    return `$${(value / 1000000).toFixed(1)}M`;
  };

  const formatTooltip = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(value);
  };

  return (
    <div className="glass-card p-6 animate-fade-in" style={{ animationDelay: "100ms" }}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">NAV Over Time</h3>
        <div className="flex gap-1 p-1 bg-muted/50 rounded-lg">
          {timeframes.map((tf) => (
            <Button
              key={tf.label}
              variant={selectedTimeframe === tf.days ? "default" : "ghost"}
              size="sm"
              className={cn(
                "h-7 px-3 text-xs",
                selectedTimeframe === tf.days && "shadow-sm"
              )}
              onClick={() => setSelectedTimeframe(tf.days)}
            >
              {tf.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
            <defs>
              <linearGradient id="navGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(165, 100%, 44%)" stopOpacity={0.3} />
                <stop offset="100%" stopColor="hsl(165, 100%, 44%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="hsl(230, 30%, 18%)"
              vertical={false}
            />
            <XAxis
              dataKey="date"
              stroke="hsl(230, 20%, 55%)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="hsl(230, 20%, 55%)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={formatYAxis}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(230, 40%, 8%)",
                border: "1px solid hsl(230, 30%, 18%)",
                borderRadius: "8px",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
              }}
              labelStyle={{ color: "hsl(230, 60%, 98%)" }}
              formatter={(value: number) => [formatTooltip(value), "NAV"]}
            />
            <Area
              type="monotone"
              dataKey="nav"
              stroke="hsl(165, 100%, 44%)"
              strokeWidth={2}
              fill="url(#navGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
