import { useState } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Search,
  Filter,
  Download,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  Package,
  Truck,
  CheckCircle2,
  Clock,
  XCircle,
  Eye,
  Printer,
  RefreshCw,
  MapPin,
  Mail,
  Phone,
  X,
  Copy,
  Tag,
  CreditCard,
  Box,
  ChevronRight as ChevronRightIcon,
} from "lucide-react";

type OrderStatus = "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled" | "Returned";
type PaymentStatus = "Paid" | "Pending" | "Refunded" | "Failed";

interface OrderItem {
  sku: string;
  name: string;
  qty: number;
  price: string;
}

interface Order {
  id: string;
  customer: string;
  email: string;
  phone: string;
  items: OrderItem[];
  total: string;
  status: OrderStatus;
  payment: PaymentStatus;
  date: string;
  time: string;
  channel: string;
  shippingAddress: string;
  trackingNumber: string | null;
  carrier: string | null;
  notes: string;
}

const ordersData: Order[] = [
  {
    id: "ORD-4821",
    customer: "Sarah Kim",
    email: "sarah.kim@email.com",
    phone: "+49 170 1234567",
    items: [
      { sku: "NIN-SC-001", name: "Gentle Cleanser 150ml", qty: 2, price: "€48.00" },
      { sku: "NIN-SC-042", name: "Hydrating Serum 30ml", qty: 1, price: "€48.00" },
    ],
    total: "€96.00",
    status: "Processing",
    payment: "Paid",
    date: "2026-03-19",
    time: "09:14",
    channel: "Web",
    shippingAddress: "Friedrichstr. 123, 10117 Berlin, DE",
    trackingNumber: null,
    carrier: null,
    notes: "",
  },
  {
    id: "ORD-4820",
    customer: "Luca Moretti",
    email: "l.moretti@email.it",
    phone: "+39 333 9876543",
    items: [
      { sku: "NIN-BD-007", name: "Body Oil 100ml", qty: 1, price: "€38.00" },
      { sku: "NIN-SC-015", name: "SPF 50 Moisturizer 50ml", qty: 1, price: "€42.00" },
    ],
    total: "€80.00",
    status: "Shipped",
    payment: "Paid",
    date: "2026-03-18",
    time: "15:42",
    channel: "Web",
    shippingAddress: "Via Roma 45, 20121 Milano, IT",
    trackingNumber: "DHL-DE928471625",
    carrier: "DHL Express",
    notes: "Gift wrapping requested",
  },
  {
    id: "ORD-4819",
    customer: "Emma Weber",
    email: "emma.weber@mail.de",
    phone: "+49 151 8765432",
    items: [
      { sku: "NIN-ST-001", name: "Discovery Set", qty: 2, price: "€136.00" },
      { sku: "NIN-HC-003", name: "Shine Serum 50ml", qty: 1, price: "€28.00" },
      { sku: "NIN-TL-002", name: "Jade Roller", qty: 1, price: "€22.00" },
    ],
    total: "€186.00",
    status: "Delivered",
    payment: "Paid",
    date: "2026-03-17",
    time: "11:08",
    channel: "Retail",
    shippingAddress: "Maximilianstr. 78, 80538 München, DE",
    trackingNumber: "DPD-4782916350",
    carrier: "DPD",
    notes: "",
  },
  {
    id: "ORD-4818",
    customer: "Alex Chen",
    email: "alex.chen@email.com",
    phone: "+33 6 12 34 56 78",
    items: [
      { sku: "NIN-SC-033", name: "Night Cream 50ml", qty: 1, price: "€52.00" },
    ],
    total: "€52.00",
    status: "Pending",
    payment: "Pending",
    date: "2026-03-19",
    time: "10:31",
    channel: "Web",
    shippingAddress: "15 Rue de Rivoli, 75001 Paris, FR",
    trackingNumber: null,
    carrier: null,
    notes: "New customer — first order",
  },
  {
    id: "ORD-4817",
    customer: "Marie Dupont",
    email: "m.dupont@email.fr",
    phone: "+33 7 98 76 54 32",
    items: [
      { sku: "NIN-SC-001", name: "Gentle Cleanser 150ml", qty: 1, price: "€24.00" },
      { sku: "NIN-SC-042", name: "Hydrating Serum 30ml", qty: 3, price: "€144.00" },
    ],
    total: "€168.00",
    status: "Shipped",
    payment: "Paid",
    date: "2026-03-18",
    time: "08:22",
    channel: "Web",
    shippingAddress: "22 Avenue des Champs-Élysées, 75008 Paris, FR",
    trackingNumber: "UPS-1Z999AA10123456784",
    carrier: "UPS",
    notes: "",
  },
  {
    id: "ORD-4816",
    customer: "Jan Müller",
    email: "jan.m@email.de",
    phone: "+49 160 5551234",
    items: [
      { sku: "NIN-HC-018", name: "Repair Mask 200ml", qty: 2, price: "€64.00" },
    ],
    total: "€64.00",
    status: "Cancelled",
    payment: "Refunded",
    date: "2026-03-16",
    time: "14:55",
    channel: "Web",
    shippingAddress: "Schillerstr. 10, 04109 Leipzig, DE",
    trackingNumber: null,
    carrier: null,
    notes: "Customer requested cancellation — item out of stock",
  },
  {
    id: "ORD-4815",
    customer: "Sofia Rossi",
    email: "sofia.r@email.it",
    phone: "+39 347 1112233",
    items: [
      { sku: "NIN-BD-012", name: "Hand Cream 75ml", qty: 4, price: "€72.00" },
      { sku: "NIN-BD-007", name: "Body Oil 100ml", qty: 1, price: "€38.00" },
    ],
    total: "€110.00",
    status: "Processing",
    payment: "Paid",
    date: "2026-03-19",
    time: "07:45",
    channel: "Wholesale",
    shippingAddress: "Corso Vittorio Emanuele 200, 00186 Roma, IT",
    trackingNumber: null,
    carrier: null,
    notes: "Wholesale order — bulk pricing applied",
  },
  {
    id: "ORD-4814",
    customer: "Thomas Berger",
    email: "t.berger@mail.at",
    phone: "+43 660 7778899",
    items: [
      { sku: "NIN-SC-015", name: "SPF 50 Moisturizer 50ml", qty: 1, price: "€42.00" },
      { sku: "NIN-SC-033", name: "Night Cream 50ml", qty: 1, price: "€52.00" },
      { sku: "NIN-TL-002", name: "Jade Roller", qty: 1, price: "€22.00" },
    ],
    total: "€116.00",
    status: "Returned",
    payment: "Refunded",
    date: "2026-03-14",
    time: "16:30",
    channel: "Web",
    shippingAddress: "Mariahilfer Str. 55, 1060 Wien, AT",
    trackingNumber: "DHL-DE837261524",
    carrier: "DHL Express",
    notes: "Return — wrong product shipped",
  },
];

const statusBadge = (status: OrderStatus) => {
  switch (status) {
    case "Pending": return "secondary" as const;
    case "Processing": return "warning" as const;
    case "Shipped": return "info" as const;
    case "Delivered": return "success" as const;
    case "Cancelled": return "destructive" as const;
    case "Returned": return "destructive" as const;
  }
};

const paymentBadge = (status: PaymentStatus) => {
  switch (status) {
    case "Paid": return "success" as const;
    case "Pending": return "warning" as const;
    case "Refunded": return "secondary" as const;
    case "Failed": return "destructive" as const;
  }
};

const StatusIcon = ({ status }: { status: OrderStatus }) => {
  const iconClass = "h-3.5 w-3.5";
  switch (status) {
    case "Pending": return <Clock className={`${iconClass} text-muted-foreground`} />;
    case "Processing": return <RefreshCw className={`${iconClass} text-warning`} />;
    case "Shipped": return <Truck className={`${iconClass} text-info`} />;
    case "Delivered": return <CheckCircle2 className={`${iconClass} text-success`} />;
    case "Cancelled": return <XCircle className={`${iconClass} text-danger`} />;
    case "Returned": return <Package className={`${iconClass} text-danger`} />;
  }
};

// Fulfillment timeline steps
const fulfillmentSteps = (status: OrderStatus) => {
  const steps = ["Pending", "Processing", "Shipped", "Delivered"] as const;
  if (status === "Cancelled" || status === "Returned") {
    return { steps, activeIndex: -1, cancelled: true };
  }
  const activeIndex = steps.indexOf(status as typeof steps[number]);
  return { steps, activeIndex, cancelled: false };
};

// Order detail drawer
function OrderDrawer({ order, onClose }: { order: Order; onClose: () => void }) {
  const { steps, activeIndex, cancelled } = fulfillmentSteps(order.status);

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-foreground/20" onClick={onClose} />
      <div className="relative w-full max-w-[540px] bg-card-elevated border-l border-border shadow-lg animate-slide-in-right overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-card-elevated border-b border-border px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="text-sm font-heading font-bold text-foreground">{order.id}</h2>
            <Badge variant={statusBadge(order.status)}>{order.status}</Badge>
          </div>
          <div className="flex items-center gap-1.5">
            <Button variant="outline" size="icon-sm">
              <Printer className="h-3.5 w-3.5" />
            </Button>
            <Button variant="ghost" size="icon-sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="px-6 py-5 space-y-6">
          {/* Fulfillment Timeline */}
          <div>
            <h3 className="text-xs font-heading font-semibold uppercase tracking-wider text-muted-foreground mb-3">Fulfillment</h3>
            {cancelled ? (
              <div className="flex items-center gap-2 p-3 bg-danger-soft rounded-lg border border-danger/10">
                <XCircle className="h-4 w-4 text-danger" />
                <span className="text-sm text-danger font-medium">Order {order.status.toLowerCase()}</span>
              </div>
            ) : (
              <div className="flex items-center gap-0">
                {steps.map((step, i) => {
                  const isCompleted = i <= activeIndex;
                  const isCurrent = i === activeIndex;
                  return (
                    <div key={step} className="flex items-center flex-1">
                      <div className="flex flex-col items-center flex-1">
                        <div
                          className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-medium border-2 transition-colors ${
                            isCompleted
                              ? "bg-primary border-primary text-primary-foreground"
                              : "bg-card-elevated border-border text-muted-foreground"
                          } ${isCurrent ? "ring-2 ring-primary/20" : ""}`}
                        >
                          {isCompleted ? (
                            <CheckCircle2 className="h-3.5 w-3.5" />
                          ) : (
                            i + 1
                          )}
                        </div>
                        <span className={`text-[10px] mt-1.5 font-medium ${isCompleted ? "text-foreground" : "text-muted-foreground"}`}>
                          {step}
                        </span>
                      </div>
                      {i < steps.length - 1 && (
                        <div className={`h-0.5 flex-1 -mt-4 mx-0.5 rounded ${i < activeIndex ? "bg-primary" : "bg-border"}`} />
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* Fulfillment actions */}
            {!cancelled && (
              <div className="mt-4 flex gap-2">
                {order.status === "Pending" && (
                  <Button size="sm" className="flex-1">
                    <RefreshCw className="h-3.5 w-3.5 mr-1.5" />
                    Start Processing
                  </Button>
                )}
                {order.status === "Processing" && (
                  <Button size="sm" className="flex-1">
                    <Truck className="h-3.5 w-3.5 mr-1.5" />
                    Mark as Shipped
                  </Button>
                )}
                {order.status === "Shipped" && (
                  <Button size="sm" className="flex-1">
                    <CheckCircle2 className="h-3.5 w-3.5 mr-1.5" />
                    Mark as Delivered
                  </Button>
                )}
                {order.status !== "Delivered" && (
                  <Button variant="outline" size="sm">
                    <XCircle className="h-3.5 w-3.5 mr-1.5" />
                    Cancel
                  </Button>
                )}
              </div>
            )}
          </div>

          {/* Customer */}
          <div>
            <h3 className="text-xs font-heading font-semibold uppercase tracking-wider text-muted-foreground mb-3">Customer</h3>
            <div className="bg-secondary/50 rounded-lg p-3.5 space-y-2">
              <p className="text-sm font-medium text-foreground">{order.customer}</p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Mail className="h-3 w-3" /> {order.email}
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Phone className="h-3 w-3" /> {order.phone}
              </div>
            </div>
          </div>

          {/* Shipping */}
          <div>
            <h3 className="text-xs font-heading font-semibold uppercase tracking-wider text-muted-foreground mb-3">Shipping</h3>
            <div className="bg-secondary/50 rounded-lg p-3.5 space-y-2.5">
              <div className="flex items-start gap-2">
                <MapPin className="h-3.5 w-3.5 text-muted-foreground mt-0.5 shrink-0" />
                <span className="text-sm text-foreground">{order.shippingAddress}</span>
              </div>
              {order.carrier && (
                <div className="flex items-center gap-2">
                  <Truck className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="text-sm text-foreground">{order.carrier}</span>
                </div>
              )}
              {order.trackingNumber && (
                <div className="flex items-center justify-between bg-card-elevated rounded-md px-3 py-2 border border-border">
                  <span className="font-mono-data text-xs text-foreground">{order.trackingNumber}</span>
                  <Button variant="ghost" size="icon-sm" className="h-6 w-6">
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
              )}

              {/* Shipping Label */}
              {(order.status === "Processing" || order.status === "Shipped") && (
                <div className="pt-1">
                  <Button variant="outline" size="sm" className="w-full">
                    <Printer className="h-3.5 w-3.5 mr-1.5" />
                    Print Shipping Label
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Items */}
          <div>
            <h3 className="text-xs font-heading font-semibold uppercase tracking-wider text-muted-foreground mb-3">Items</h3>
            <div className="border border-border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="text-[10px] font-semibold uppercase tracking-wider">Product</TableHead>
                    <TableHead className="text-[10px] font-semibold uppercase tracking-wider w-12 text-center">Qty</TableHead>
                    <TableHead className="text-[10px] font-semibold uppercase tracking-wider w-20 text-right">Price</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {order.items.map((item) => (
                    <TableRow key={item.sku} className="hover:bg-transparent">
                      <TableCell className="py-2">
                        <span className="text-sm text-foreground">{item.name}</span>
                        <span className="block font-mono-data text-[10px] text-muted-foreground">{item.sku}</span>
                      </TableCell>
                      <TableCell className="py-2 text-center">
                        <span className="font-mono-data text-sm">{item.qty}</span>
                      </TableCell>
                      <TableCell className="py-2 text-right">
                        <span className="font-mono-data text-sm font-medium">{item.price}</span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="flex items-center justify-between px-4 py-2.5 bg-secondary/40 border-t border-border">
                <span className="text-xs font-medium text-muted-foreground">Total</span>
                <span className="font-mono-data text-sm font-semibold text-foreground">{order.total}</span>
              </div>
            </div>
          </div>

          {/* Payment & Meta */}
          <div>
            <h3 className="text-xs font-heading font-semibold uppercase tracking-wider text-muted-foreground mb-3">Details</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-secondary/50 rounded-lg p-3">
                <div className="flex items-center gap-1.5 mb-1">
                  <CreditCard className="h-3 w-3 text-muted-foreground" />
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">Payment</span>
                </div>
                <Badge variant={paymentBadge(order.payment)}>{order.payment}</Badge>
              </div>
              <div className="bg-secondary/50 rounded-lg p-3">
                <div className="flex items-center gap-1.5 mb-1">
                  <Tag className="h-3 w-3 text-muted-foreground" />
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">Channel</span>
                </div>
                <span className="text-sm font-medium text-foreground">{order.channel}</span>
              </div>
              <div className="bg-secondary/50 rounded-lg p-3">
                <div className="flex items-center gap-1.5 mb-1">
                  <Clock className="h-3 w-3 text-muted-foreground" />
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">Date</span>
                </div>
                <span className="font-mono-data text-sm text-foreground">{order.date}</span>
              </div>
              <div className="bg-secondary/50 rounded-lg p-3">
                <div className="flex items-center gap-1.5 mb-1">
                  <Clock className="h-3 w-3 text-muted-foreground" />
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">Time</span>
                </div>
                <span className="font-mono-data text-sm text-foreground">{order.time}</span>
              </div>
            </div>
          </div>

          {/* Notes */}
          {order.notes && (
            <div>
              <h3 className="text-xs font-heading font-semibold uppercase tracking-wider text-muted-foreground mb-2">Notes</h3>
              <p className="text-sm text-muted-foreground bg-secondary/50 rounded-lg p-3">{order.notes}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Status summary cards
const statusCounts = {
  Pending: ordersData.filter((o) => o.status === "Pending").length,
  Processing: ordersData.filter((o) => o.status === "Processing").length,
  Shipped: ordersData.filter((o) => o.status === "Shipped").length,
  Delivered: ordersData.filter((o) => o.status === "Delivered").length,
};

export default function OrdersPage() {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const filteredOrders = activeFilter === "All"
    ? ordersData
    : ordersData.filter((o) => o.status === activeFilter);

  return (
    <AdminLayout>
      <div className="p-6 max-w-[1400px]">
        <PageHeader title="Orders" description="Track and fulfill customer orders">
          <Button variant="outline" size="sm">
            <Download className="h-3.5 w-3.5 mr-1.5" />
            Export
          </Button>
          <Button size="sm">
            <RefreshCw className="h-3.5 w-3.5 mr-1.5" />
            Sync Orders
          </Button>
        </PageHeader>

        {/* Status KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
          {([
            { label: "Pending", count: statusCounts.Pending, icon: Clock, color: "text-muted-foreground", bg: "bg-secondary" },
            { label: "Processing", count: statusCounts.Processing, icon: RefreshCw, color: "text-warning", bg: "bg-warning-soft" },
            { label: "Shipped", count: statusCounts.Shipped, icon: Truck, color: "text-info", bg: "bg-info-soft" },
            { label: "Delivered", count: statusCounts.Delivered, icon: CheckCircle2, color: "text-success", bg: "bg-success-soft" },
          ] as const).map((s) => (
            <button
              key={s.label}
              onClick={() => setActiveFilter(activeFilter === s.label ? "All" : s.label)}
              className={`flex items-center gap-3 p-3 rounded-xl border transition-colors duration-100 text-left ${
                activeFilter === s.label
                  ? "border-primary bg-primary-soft"
                  : "border-border bg-card-elevated hover:bg-secondary/50"
              }`}
            >
              <div className={`h-8 w-8 rounded-lg ${s.bg} flex items-center justify-center`}>
                <s.icon className={`h-4 w-4 ${s.color}`} />
              </div>
              <div>
                <span className="font-mono-data text-lg font-semibold text-foreground">{s.count}</span>
                <span className="block text-[11px] text-muted-foreground">{s.label}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Table Card */}
        <div className="bg-card-elevated border border-border rounded-xl shadow-xs">
          {/* Filter Bar */}
          <div className="flex items-center gap-3 px-4 py-2.5 border-b border-border">
            <div className="flex items-center gap-2 bg-secondary rounded-md px-3 py-1.5 flex-1 max-w-sm">
              <Search className="h-3.5 w-3.5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by order ID, customer, or tracking..."
                className="bg-transparent text-sm outline-none flex-1 placeholder:text-muted-foreground"
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="h-3.5 w-3.5 mr-1.5" />
              Filters
            </Button>
            <div className="flex items-center gap-1.5 ml-auto">
              {["All", "Pending", "Processing", "Shipped", "Delivered", "Cancelled"].map((filter) => (
                <Button
                  key={filter}
                  variant={activeFilter === filter ? "secondary" : "ghost"}
                  size="sm"
                  className="text-xs h-7"
                  onClick={() => setActiveFilter(filter)}
                >
                  {filter}
                </Button>
              ))}
            </div>
          </div>

          {/* Table */}
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-10 px-4">
                  <Checkbox />
                </TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider w-28">
                  <div className="flex items-center gap-1 cursor-pointer">Order <ArrowUpDown className="h-3 w-3" /></div>
                </TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider">Customer</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider w-24">Channel</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider w-24 text-right">
                  <div className="flex items-center gap-1 cursor-pointer justify-end">Total <ArrowUpDown className="h-3 w-3" /></div>
                </TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider w-24">Payment</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider w-28">Status</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider w-28">
                  <div className="flex items-center gap-1 cursor-pointer">Date <ArrowUpDown className="h-3 w-3" /></div>
                </TableHead>
                <TableHead className="w-10" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow
                  key={order.id}
                  className="group cursor-pointer"
                  onClick={() => setSelectedOrder(order)}
                >
                  <TableCell className="px-4 py-2.5" onClick={(e) => e.stopPropagation()}>
                    <Checkbox />
                  </TableCell>
                  <TableCell className="py-2.5">
                    <span className="font-mono-data text-xs font-medium text-foreground">{order.id}</span>
                  </TableCell>
                  <TableCell className="py-2.5">
                    <div>
                      <span className="text-sm font-medium text-foreground">{order.customer}</span>
                      <span className="block text-[11px] text-muted-foreground">{order.email}</span>
                    </div>
                  </TableCell>
                  <TableCell className="py-2.5">
                    <span className="text-xs text-muted-foreground">{order.channel}</span>
                  </TableCell>
                  <TableCell className="py-2.5 text-right">
                    <span className="font-mono-data text-sm font-medium text-foreground">{order.total}</span>
                  </TableCell>
                  <TableCell className="py-2.5">
                    <Badge variant={paymentBadge(order.payment)}>{order.payment}</Badge>
                  </TableCell>
                  <TableCell className="py-2.5">
                    <div className="flex items-center gap-1.5">
                      <StatusIcon status={order.status} />
                      <Badge variant={statusBadge(order.status)}>{order.status}</Badge>
                    </div>
                  </TableCell>
                  <TableCell className="py-2.5">
                    <div>
                      <span className="font-mono-data text-xs text-foreground">{order.date}</span>
                      <span className="block font-mono-data text-[10px] text-muted-foreground">{order.time}</span>
                    </div>
                  </TableCell>
                  <TableCell className="py-2.5">
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedOrder(order);
                      }}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination */}
          <div className="flex items-center justify-between px-4 py-3 border-t border-border">
            <span className="text-xs text-muted-foreground">
              Showing {filteredOrders.length} of {ordersData.length} orders
            </span>
            <div className="flex items-center gap-1">
              <Button variant="outline" size="icon-sm" disabled>
                <ChevronLeft className="h-3.5 w-3.5" />
              </Button>
              <Button variant="secondary" size="sm" className="h-8 w-8 p-0 text-xs">1</Button>
              <Button variant="outline" size="icon-sm" disabled>
                <ChevronRight className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Order Detail Drawer */}
      {selectedOrder && (
        <OrderDrawer order={selectedOrder} onClose={() => setSelectedOrder(null)} />
      )}
    </AdminLayout>
  );
}
