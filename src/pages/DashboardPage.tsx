import { AdminLayout } from "@/components/AdminLayout";
import { MetricCard } from "@/components/MetricCard";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Package,
  ShoppingBag,
  TrendingUp,
  AlertTriangle,
  ArrowRight,
  Clock,
  DollarSign,
  Truck,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const revenueData = [
  { name: "Mon", revenue: 4200, orders: 32 },
  { name: "Tue", revenue: 5800, orders: 45 },
  { name: "Wed", revenue: 4900, orders: 38 },
  { name: "Thu", revenue: 6300, orders: 52 },
  { name: "Fri", revenue: 7100, orders: 61 },
  { name: "Sat", revenue: 5400, orders: 42 },
  { name: "Sun", revenue: 3900, orders: 28 },
];

const categoryData = [
  { name: "Skincare", value: 12400 },
  { name: "Haircare", value: 8900 },
  { name: "Body", value: 6700 },
  { name: "Sets", value: 5200 },
  { name: "Tools", value: 3100 },
];

const recentOrders = [
  { id: "ORD-4821", customer: "Sarah Kim", total: "€128.00", status: "Processing", time: "12 min ago" },
  { id: "ORD-4820", customer: "Luca Moretti", total: "€89.50", status: "Shipped", time: "34 min ago" },
  { id: "ORD-4819", customer: "Emma Weber", total: "€245.00", status: "Delivered", time: "1h ago" },
  { id: "ORD-4818", customer: "Alex Chen", total: "€67.00", status: "Processing", time: "2h ago" },
  { id: "ORD-4817", customer: "Marie Dupont", total: "€192.00", status: "Shipped", time: "3h ago" },
];

const lowStockItems = [
  { sku: "NIN-SC-042", name: "Hydrating Serum 30ml", stock: 8, threshold: 25 },
  { sku: "NIN-HC-018", name: "Repair Mask 200ml", stock: 3, threshold: 15 },
  { sku: "NIN-BD-007", name: "Body Oil 100ml", stock: 12, threshold: 20 },
];

const statusColor = (status: string) => {
  switch (status) {
    case "Processing": return "warning" as const;
    case "Shipped": return "info" as const;
    case "Delivered": return "success" as const;
    default: return "secondary" as const;
  }
};

export default function DashboardPage() {
  return (
    <AdminLayout>
      <div className="p-6 max-w-[1400px]">
        <PageHeader title="Dashboard" description="Overview of your operations today">
          <Button variant="outline" size="sm">
            <Clock className="h-3.5 w-3.5 mr-1.5" />
            Last 7 days
          </Button>
        </PageHeader>

        {/* KPI Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <MetricCard
            icon={DollarSign}
            title="Revenue"
            value="€37,600"
            change="+12.3%"
            changeType="positive"
            subtitle="vs. last week"
          />
          <MetricCard
            icon={ShoppingBag}
            title="Orders"
            value="298"
            change="+8.1%"
            changeType="positive"
            subtitle="vs. last week"
          />
          <MetricCard
            icon={Package}
            title="Units Sold"
            value="1,429"
            change="-2.4%"
            changeType="negative"
            subtitle="vs. last week"
          />
          <MetricCard
            icon={Truck}
            title="Pending Shipments"
            value="47"
            change="12 urgent"
            changeType="neutral"
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          <div className="lg:col-span-2 bg-card-elevated border border-border rounded-xl p-4 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-heading font-semibold text-foreground">Revenue Trend</h3>
                <p className="text-xs text-muted-foreground">Daily revenue this week</p>
              </div>
              <div className="flex gap-1">
                <Button variant="ghost" size="sm" className="text-xs h-7">Week</Button>
                <Button variant="secondary" size="sm" className="text-xs h-7">Month</Button>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(145, 20%, 42%)" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="hsl(145, 20%, 42%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(35, 15%, 88%)" />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: "hsl(30, 6%, 50%)" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "hsl(30, 6%, 50%)" }} axisLine={false} tickLine={false} tickFormatter={(v) => `€${v / 1000}k`} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid hsl(35, 15%, 88%)",
                    borderRadius: "8px",
                    fontSize: "12px",
                    boxShadow: "0 4px 6px -1px rgba(0,0,0,0.06)",
                  }}
                  formatter={(value: number) => [`€${value.toLocaleString()}`, "Revenue"]}
                />
                <Area type="monotone" dataKey="revenue" stroke="hsl(145, 20%, 42%)" strokeWidth={2} fill="url(#revenueGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-card-elevated border border-border rounded-xl p-4 shadow-xs">
            <div className="mb-4">
              <h3 className="text-sm font-heading font-semibold text-foreground">Top Categories</h3>
              <p className="text-xs text-muted-foreground">Revenue by category</p>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={categoryData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(35, 15%, 88%)" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 10, fill: "hsl(30, 6%, 50%)" }} axisLine={false} tickLine={false} tickFormatter={(v) => `€${v / 1000}k`} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fill: "hsl(30, 6%, 50%)" }} axisLine={false} tickLine={false} width={70} />
                <Bar dataKey="value" fill="hsl(145, 20%, 42%)" radius={[0, 4, 4, 0]} barSize={18} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Recent Orders */}
          <div className="lg:col-span-2 bg-card-elevated border border-border rounded-xl shadow-xs">
            <div className="flex items-center justify-between px-4 py-3 border-b border-border">
              <h3 className="text-sm font-heading font-semibold text-foreground">Recent Orders</h3>
              <Button variant="ghost" size="sm" className="text-xs h-7 text-primary">
                View all <ArrowRight className="h-3 w-3 ml-1" />
              </Button>
            </div>
            <div className="divide-y divide-border">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between px-4 py-2.5 hover:bg-muted/30 transition-colors duration-100">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono-data text-muted-foreground w-20">{order.id}</span>
                    <span className="text-sm text-foreground">{order.customer}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant={statusColor(order.status)}>{order.status}</Badge>
                    <span className="text-sm font-mono-data font-medium text-foreground w-20 text-right">{order.total}</span>
                    <span className="text-[11px] text-muted-foreground w-16 text-right">{order.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Low Stock Alert */}
          <div className="bg-card-elevated border border-border rounded-xl shadow-xs">
            <div className="flex items-center justify-between px-4 py-3 border-b border-border">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-3.5 w-3.5 text-warning" />
                <h3 className="text-sm font-heading font-semibold text-foreground">Low Stock</h3>
              </div>
              <Badge variant="warning">{lowStockItems.length}</Badge>
            </div>
            <div className="divide-y divide-border">
              {lowStockItems.map((item) => (
                <div key={item.sku} className="px-4 py-3 hover:bg-muted/30 transition-colors duration-100">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-foreground font-medium">{item.name}</span>
                    <span className="text-sm font-mono-data font-semibold text-danger">{item.stock}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono-data text-muted-foreground">{item.sku}</span>
                    <span className="text-[11px] text-muted-foreground">Min: {item.threshold}</span>
                  </div>
                  <div className="mt-2 h-1 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-danger"
                      style={{ width: `${Math.min((item.stock / item.threshold) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="px-4 py-2.5 border-t border-border">
              <Button variant="ghost" size="sm" className="w-full text-xs h-7 text-primary">
                Adjust stock <ArrowRight className="h-3 w-3 ml-1" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
