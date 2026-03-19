import { AdminLayout } from "@/components/AdminLayout";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Edit, Package, TrendingUp, Eye, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const salesData = [
  { month: "Jan", units: 120 },
  { month: "Feb", units: 145 },
  { month: "Mar", units: 132 },
  { month: "Apr", units: 178 },
  { month: "May", units: 165 },
  { month: "Jun", units: 198 },
];

export default function ProductDetailPage() {
  const navigate = useNavigate();

  return (
    <AdminLayout>
      <div className="p-6 max-w-[1400px]">
        <div className="mb-4">
          <Button variant="ghost" size="sm" className="text-xs text-muted-foreground" onClick={() => navigate("/products")}>
            <ArrowLeft className="h-3.5 w-3.5 mr-1" /> Back to Products
          </Button>
        </div>

        <PageHeader title="Hydrating Serum 30ml" description="NIN-SC-042 · Skincare · Created Mar 2024">
          <Badge variant="success">Active</Badge>
          <Button variant="outline" size="sm"><Edit className="h-3.5 w-3.5 mr-1.5" />Edit</Button>
        </PageHeader>

        {/* Quick stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[
            { label: "Price", value: "€48.00", icon: Package },
            { label: "Stock", value: "8 units", icon: Package },
            { label: "Views (30d)", value: "5,120", icon: Eye },
            { label: "Rating", value: "4.9 / 5.0", icon: Star },
          ].map((s) => (
            <div key={s.label} className="bg-card-elevated border border-border rounded-xl p-4 shadow-xs">
              <div className="flex items-center gap-2 mb-1">
                <s.icon className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">{s.label}</span>
              </div>
              <span className="text-lg font-heading font-bold text-foreground">{s.value}</span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Sales Chart */}
          <div className="lg:col-span-2 bg-card-elevated border border-border rounded-xl p-4 shadow-xs">
            <h3 className="text-sm font-heading font-semibold text-foreground mb-1">Sales History</h3>
            <p className="text-xs text-muted-foreground mb-4">Units sold per month</p>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={salesData}>
                <defs>
                  <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(145, 20%, 42%)" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="hsl(145, 20%, 42%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(35, 15%, 88%)" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "hsl(30, 6%, 50%)" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "hsl(30, 6%, 50%)" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: "white", border: "1px solid hsl(35, 15%, 88%)", borderRadius: "8px", fontSize: "12px" }} />
                <Area type="monotone" dataKey="units" stroke="hsl(145, 20%, 42%)" strokeWidth={2} fill="url(#salesGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Details */}
          <div className="bg-card-elevated border border-border rounded-xl p-4 shadow-xs">
            <h3 className="text-sm font-heading font-semibold text-foreground mb-3">Details</h3>
            <div className="space-y-3">
              {[
                ["SKU", "NIN-SC-042"],
                ["Category", "Skincare"],
                ["Weight", "45g"],
                ["Dimensions", "3.2 × 3.2 × 10.5 cm"],
                ["Warehouse", "EU-1"],
                ["Supplier", "Nino Labs"],
                ["Lead Time", "14 days"],
                ["Min. Order", "50 units"],
              ].map(([label, value]) => (
                <div key={label} className="flex items-center justify-between py-1 border-b border-border last:border-0">
                  <span className="text-xs text-muted-foreground">{label}</span>
                  <span className="text-xs font-medium text-foreground font-mono-data">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
