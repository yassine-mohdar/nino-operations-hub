import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: LucideIcon;
  subtitle?: string;
}

export function MetricCard({ title, value, change, changeType = "neutral", icon: Icon, subtitle }: MetricCardProps) {
  return (
    <div className="bg-card-elevated border border-border rounded-xl p-4 shadow-xs">
      <div className="flex items-start justify-between mb-3">
        <div className="h-8 w-8 rounded-lg bg-primary-soft flex items-center justify-center">
          <Icon className="h-4 w-4 text-primary" />
        </div>
        {change && (
          <span
            className={cn(
              "text-xs font-medium font-mono-data px-1.5 py-0.5 rounded",
              changeType === "positive" && "text-success bg-success-soft",
              changeType === "negative" && "text-danger bg-danger-soft",
              changeType === "neutral" && "text-muted-foreground bg-muted"
            )}
          >
            {change}
          </span>
        )}
      </div>
      <div>
        <p className="text-2xl font-heading font-bold text-foreground tracking-tight">{value}</p>
        <p className="text-xs text-muted-foreground mt-0.5">{title}</p>
        {subtitle && <p className="text-[11px] text-muted-foreground mt-1">{subtitle}</p>}
      </div>
    </div>
  );
}
