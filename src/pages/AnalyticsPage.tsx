import { AdminLayout } from "@/components/AdminLayout";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { MetricCard } from "@/components/MetricCard";
import { BarChart3, TrendingUp, Users, ShoppingBag, DollarSign } from "lucide-react";
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
  LineChart,
  Line,
} from "recharts";

const monthlyRevenue = [
  { month: "Jan", revenue: 42000, orders: 340 },
  { month: "Feb", revenue: 48000, orders: 380 },
  { month: "Mar", revenue: 51000, orders: 420 },
  { month: "Apr", revenue: 47000, orders: 390 },
  { month: "May", revenue: 55000, orders: 460 },
  { month: "Jun", revenue: 62000, orders: 510 },
];

const channelData = [
  { channel: "Direct", revenue: 28000 },
  { channel: "Organic", revenue: 18000 },
  { channel: "Paid", revenue: 12000 },
  { channel: "Referral", revenue: 4000 },
];

const conversionData = [
  { week: "W1", rate: 3.2 },
  { week: "W2", rate: 3.5 },
  { week: "W3", rate: 3.1 },
  { week: "W4", rate: 3.8 },
  { week: "W5", rate: 4.1 },
  { week: "W6", rate: 3.9 },
];

export default function AnalyticsPage() {
  return (
    <AdminLayout>
      <div className="p-6 max-w-[1400px]">
        <PageHeader title="Analytics" description="Performance metrics and trends">
          <Button variant="outline" size="sm">Last 6 months</Button>
        </PageHeader>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <MetricCard icon={DollarSign} title="Total Revenue" value="€305,000" change="+18.4%" changeType="positive" />
          <MetricCard icon={ShoppingBag} title="Total Orders" value="2,500" change="+15.2%" changeType="positive" />
          <MetricCard icon={Users} title="New Customers" value="842" change="+22.1%" changeType="positive" />
          <MetricCard icon={TrendingUp} title="Avg. Order Value" value="€122" change="+3.2%" changeType="positive" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          <div className="bg-card-elevated border border-border rounded-xl p-4 shadow-xs">
            <h3 className="text-sm font-heading font-semibold mb-1">Revenue & Orders</h3>
            <p className="text-xs text-muted-foreground mb-4">Monthly overview</p>
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={monthlyRevenue}>
                <defs>
                  <linearGradient id="aRevGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(145, 20%, 42%)" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="hsl(145, 20%, 42%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(35, 15%, 88%)" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "hsl(30, 6%, 50%)" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "hsl(30, 6%, 50%)" }} axisLine={false} tickLine={false} tickFormatter={(v) => `€${v / 1000}k`} />
                <Tooltip contentStyle={{ backgroundColor: "white", border: "1px solid hsl(35, 15%, 88%)", borderRadius: "8px", fontSize: "12px" }} />
                <Area type="monotone" dataKey="revenue" stroke="hsl(145, 20%, 42%)" strokeWidth={2} fill="url(#aRevGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-card-elevated border border-border rounded-xl p-4 shadow-xs">
            <h3 className="text-sm font-heading font-semibold mb-1">Revenue by Channel</h3>
            <p className="text-xs text-muted-foreground mb-4">Attribution breakdown</p>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={channelData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(35, 15%, 88%)" />
                <XAxis dataKey="channel" tick={{ fontSize: 11, fill: "hsl(30, 6%, 50%)" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "hsl(30, 6%, 50%)" }} axisLine={false} tickLine={false} tickFormatter={(v) => `€${v / 1000}k`} />
                <Tooltip contentStyle={{ backgroundColor: "white", border: "1px solid hsl(35, 15%, 88%)", borderRadius: "8px", fontSize: "12px" }} />
                <Bar dataKey="revenue" fill="hsl(145, 20%, 42%)" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-card-elevated border border-border rounded-xl p-4 shadow-xs">
          <h3 className="text-sm font-heading font-semibold mb-1">Conversion Rate</h3>
          <p className="text-xs text-muted-foreground mb-4">Weekly conversion trend</p>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={conversionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(35, 15%, 88%)" />
              <XAxis dataKey="week" tick={{ fontSize: 11, fill: "hsl(30, 6%, 50%)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "hsl(30, 6%, 50%)" }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} />
              <Tooltip contentStyle={{ backgroundColor: "white", border: "1px solid hsl(35, 15%, 88%)", borderRadius: "8px", fontSize: "12px" }} />
              <Line type="monotone" dataKey="rate" stroke="hsl(145, 20%, 42%)" strokeWidth={2} dot={{ r: 3, fill: "hsl(145, 20%, 42%)" }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </AdminLayout>
  );
}
