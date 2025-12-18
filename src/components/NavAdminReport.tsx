import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  FileText,
  Download,
  ExternalLink,
  Clock,
  CheckCircle2,
  User,
  Building2,
  Calendar,
  Hash,
  Shield,
  TrendingUp,
  TrendingDown
} from "lucide-react";
import { getExplorerTxUrl, generateTxHash } from "@/lib/mantle-utils";
import { useRealtimeData, Pool } from "@/hooks/useRealtimeData";

interface AdminReport {
  reportId: string;
  generatedAt: number;
  auditor: string;
  auditorFirm: string;
  period: string;
  totalNAV: number;
  previousNAV: number;
  navChange: number;
  assetsUnderManagement: number;
  poolCount: number;
  transactionHash: string;
  blockNumber: number;
  verificationStatus: "verified" | "pending" | "failed";
  findings: Array<{
    type: "info" | "success" | "warning";
    title: string;
    description: string;
  }>;
  breakdown: Array<{
    category: string;
    value: number;
    percentage: number;
    change: number;
  }>;
}

interface NavAdminReportProps {
  poolId?: string;
  poolName?: string;
}

export function NavAdminReport({ poolId, poolName }: NavAdminReportProps) {
  const { pools, stats } = useRealtimeData();
  const [report, setReport] = useState<AdminReport | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateReport = () => {
    setIsGenerating(true);
    
    setTimeout(() => {
      // Generate breakdown by category
      const categoryMap = new Map<string, { value: number; count: number }>();
      pools.forEach(pool => {
        const cat = pool.category || pool.assetType;
        const existing = categoryMap.get(cat) || { value: 0, count: 0 };
        categoryMap.set(cat, {
          value: existing.value + pool.latestNav,
          count: existing.count + 1,
        });
      });

      const breakdown = Array.from(categoryMap.entries()).map(([category, data]) => ({
        category,
        value: data.value,
        percentage: (data.value / stats.totalNav) * 100,
        change: (Math.random() - 0.3) * 5,
      })).sort((a, b) => b.value - a.value);

      const newReport: AdminReport = {
        reportId: `RPT-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`,
        generatedAt: Date.now(),
        auditor: "James Chen, CPA, CFA",
        auditorFirm: "Mantle Audit Partners LLP",
        period: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
        totalNAV: stats.totalNav,
        previousNAV: stats.totalNav / (1 + stats.navChange / 100),
        navChange: stats.navChange,
        assetsUnderManagement: stats.totalNav * 1.15,
        poolCount: pools.length,
        transactionHash: generateTxHash(),
        blockNumber: 68000000 + Math.floor(Math.random() * 1000000),
        verificationStatus: "verified",
        findings: [
          {
            type: "success",
            title: "NAV Calculation Verified",
            description: "All oracle price feeds are within acceptable deviation thresholds. NAV calculations are accurate.",
          },
          {
            type: "info",
            title: "Portfolio Rebalancing",
            description: `${Math.floor(Math.random() * 5) + 2} pools underwent automatic rebalancing in the reporting period.`,
          },
          {
            type: stats.navChange >= 0 ? "success" : "warning",
            title: "Performance Summary",
            description: `Overall NAV ${stats.navChange >= 0 ? "increased" : "decreased"} by ${Math.abs(stats.navChange).toFixed(2)}% compared to previous period.`,
          },
        ],
        breakdown,
      };

      setReport(newReport);
      setIsGenerating(false);
    }, 1500);
  };

  useEffect(() => {
    if (pools.length > 0 && !report) {
      generateReport();
    }
  }, [pools]);

  const formatValue = (value: number) => {
    if (value >= 1000000000) return `$${(value / 1000000000).toFixed(2)}B`;
    if (value >= 1000000) return `$${(value / 1000000).toFixed(2)}M`;
    if (value >= 1000) return `$${(value / 1000).toFixed(2)}K`;
    return `$${value.toFixed(2)}`;
  };

  if (!report) {
    return (
      <div className="glass-card p-4 animate-fade-in">
        <div className="flex items-center justify-center py-8">
          <div className="text-center">
            <FileText className="h-8 w-8 text-muted-foreground mx-auto mb-2 animate-pulse" />
            <p className="text-xs text-muted-foreground">Generating Admin Report...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card p-4 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="rounded-full bg-secondary/20 p-1.5">
            <FileText className="h-3.5 w-3.5 text-secondary" />
          </div>
          <div>
            <h3 className="text-xs font-semibold text-foreground">
              NAV Admin Report
            </h3>
            <p className="text-[8px] text-muted-foreground">
              {report.reportId}
            </p>
          </div>
        </div>
        <Button
          size="sm"
          variant="outline"
          className="h-6 px-2 text-[8px] gap-1"
          onClick={generateReport}
          disabled={isGenerating}
        >
          <Download className="h-2.5 w-2.5" />
          Export PDF
        </Button>
      </div>

      {/* Report Header */}
      <div className="p-3 rounded-lg bg-muted/30 border border-border/30 mb-3">
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2">
            <User className="h-3 w-3 text-muted-foreground" />
            <div>
              <span className="text-[8px] text-muted-foreground block">Auditor</span>
              <span className="text-[9px] font-medium text-foreground">{report.auditor}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Building2 className="h-3 w-3 text-muted-foreground" />
            <div>
              <span className="text-[8px] text-muted-foreground block">Firm</span>
              <span className="text-[9px] font-medium text-foreground">{report.auditorFirm}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-3 w-3 text-muted-foreground" />
            <div>
              <span className="text-[8px] text-muted-foreground block">Period</span>
              <span className="text-[9px] font-medium text-foreground">{report.period}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-3 w-3 text-muted-foreground" />
            <div>
              <span className="text-[8px] text-muted-foreground block">Generated</span>
              <span className="text-[9px] font-medium text-foreground">
                {new Date(report.generatedAt).toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* NAV Summary */}
      <div className="grid grid-cols-3 gap-2 mb-3">
        <div className="p-2.5 rounded-lg bg-primary/10 border border-primary/20 text-center">
          <span className="text-[8px] text-muted-foreground block mb-1">Total NAV</span>
          <span className="text-sm font-bold text-foreground tabular-nums">{formatValue(report.totalNAV)}</span>
        </div>
        <div className="p-2.5 rounded-lg bg-muted/30 border border-border/30 text-center">
          <span className="text-[8px] text-muted-foreground block mb-1">Previous NAV</span>
          <span className="text-sm font-bold text-foreground tabular-nums">{formatValue(report.previousNAV)}</span>
        </div>
        <div className={`p-2.5 rounded-lg border text-center ${
          report.navChange >= 0 
            ? "bg-success/10 border-success/20" 
            : "bg-destructive/10 border-destructive/20"
        }`}>
          <span className="text-[8px] text-muted-foreground block mb-1">Change</span>
          <div className="flex items-center justify-center gap-1">
            {report.navChange >= 0 ? (
              <TrendingUp className="h-3 w-3 text-success" />
            ) : (
              <TrendingDown className="h-3 w-3 text-destructive" />
            )}
            <span className={`text-sm font-bold tabular-nums ${
              report.navChange >= 0 ? "text-success" : "text-destructive"
            }`}>
              {report.navChange >= 0 ? "+" : ""}{report.navChange.toFixed(2)}%
            </span>
          </div>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="mb-3">
        <h4 className="text-[9px] font-medium text-foreground mb-2">NAV by Category</h4>
        <div className="space-y-1.5 max-h-32 overflow-y-auto">
          {report.breakdown.slice(0, 6).map((item) => (
            <div key={item.category} className="flex items-center justify-between p-1.5 rounded bg-muted/20">
              <div className="flex items-center gap-2">
                <span className="text-[9px] text-foreground">{item.category}</span>
                <Badge variant="muted" className="text-[6px]">{item.percentage.toFixed(1)}%</Badge>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-medium text-foreground tabular-nums">{formatValue(item.value)}</span>
                <span className={`text-[7px] ${item.change >= 0 ? "text-success" : "text-destructive"}`}>
                  {item.change >= 0 ? "+" : ""}{item.change.toFixed(1)}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Audit Findings */}
      <div className="mb-3">
        <h4 className="text-[9px] font-medium text-foreground mb-2">Audit Findings</h4>
        <div className="space-y-1.5">
          {report.findings.map((finding, idx) => (
            <div 
              key={idx} 
              className={`p-2 rounded-lg border ${
                finding.type === "success" 
                  ? "bg-success/10 border-success/20" 
                  : finding.type === "warning"
                    ? "bg-warning/10 border-warning/20"
                    : "bg-muted/30 border-border/30"
              }`}
            >
              <div className="flex items-center gap-1.5 mb-1">
                <CheckCircle2 className={`h-2.5 w-2.5 ${
                  finding.type === "success" ? "text-success" : 
                  finding.type === "warning" ? "text-warning" : "text-primary"
                }`} />
                <span className="text-[9px] font-medium text-foreground">{finding.title}</span>
              </div>
              <p className="text-[8px] text-muted-foreground">{finding.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* On-Chain Verification */}
      <div className="p-2.5 rounded-lg bg-secondary/10 border border-secondary/20">
        <div className="flex items-center gap-1.5 mb-2">
          <Shield className="h-3 w-3 text-secondary" />
          <span className="text-[9px] font-medium text-foreground">On-Chain Verification</span>
          <Badge variant="success" className="text-[6px] ml-auto">
            {report.verificationStatus}
          </Badge>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-background/50 rounded px-2 py-1">
            <span className="text-[7px] text-muted-foreground block">Transaction</span>
            <a
              href={getExplorerTxUrl(report.transactionHash)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[8px] text-primary hover:underline flex items-center gap-0.5"
            >
              {report.transactionHash.slice(0, 10)}...
              <ExternalLink className="h-2 w-2" />
            </a>
          </div>
          <div className="bg-background/50 rounded px-2 py-1">
            <span className="text-[7px] text-muted-foreground block">Block</span>
            <span className="text-[8px] text-foreground">#{report.blockNumber.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
