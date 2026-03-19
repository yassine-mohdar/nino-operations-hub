import { AdminLayout } from "@/components/AdminLayout";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
  Plus,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

const inventoryData = [
  { sku: "NIN-SC-001", name: "Gentle Cleanser 150ml", category: "Skincare", stock: 142, reserved: 8, price: "€24.00", status: "In Stock", warehouse: "EU-1" },
  { sku: "NIN-SC-042", name: "Hydrating Serum 30ml", category: "Skincare", stock: 8, reserved: 3, price: "€48.00", status: "Low Stock", warehouse: "EU-1" },
  { sku: "NIN-HC-018", name: "Repair Mask 200ml", category: "Haircare", stock: 3, reserved: 0, price: "€32.00", status: "Critical", warehouse: "EU-2" },
  { sku: "NIN-BD-007", name: "Body Oil 100ml", category: "Body", stock: 12, reserved: 4, price: "€38.00", status: "Low Stock", warehouse: "EU-1" },
  { sku: "NIN-SC-015", name: "SPF 50 Moisturizer 50ml", category: "Skincare", stock: 267, reserved: 22, price: "€42.00", status: "In Stock", warehouse: "EU-1" },
  { sku: "NIN-HC-003", name: "Shine Serum 50ml", category: "Haircare", stock: 89, reserved: 5, price: "€28.00", status: "In Stock", warehouse: "EU-2" },
  { sku: "NIN-ST-001", name: "Discovery Set", category: "Sets", stock: 45, reserved: 12, price: "€68.00", status: "In Stock", warehouse: "EU-1" },
  { sku: "NIN-BD-012", name: "Hand Cream 75ml", category: "Body", stock: 0, reserved: 0, price: "€18.00", status: "Out of Stock", warehouse: "EU-2" },
  { sku: "NIN-SC-033", name: "Night Cream 50ml", category: "Skincare", stock: 156, reserved: 11, price: "€52.00", status: "In Stock", warehouse: "EU-1" },
  { sku: "NIN-TL-002", name: "Jade Roller", category: "Tools", stock: 34, reserved: 2, price: "€22.00", status: "In Stock", warehouse: "EU-2" },
];

const stockBadge = (status: string) => {
  switch (status) {
    case "In Stock": return "success" as const;
    case "Low Stock": return "warning" as const;
    case "Critical": return "destructive" as const;
    case "Out of Stock": return "secondary" as const;
    default: return "secondary" as const;
  }
};

export default function InventoryPage() {
  return (
    <AdminLayout>
      <div className="p-6 max-w-[1400px]">
        <PageHeader title="Inventory" description="Manage stock levels across all warehouses">
          <Button variant="outline" size="sm">
            <Download className="h-3.5 w-3.5 mr-1.5" />
            Export
          </Button>
          <Button size="sm">
            <Plus className="h-3.5 w-3.5 mr-1.5" />
            Add Item
          </Button>
        </PageHeader>

        {/* Filter Bar */}
        <div className="bg-card-elevated border border-border rounded-xl shadow-xs mb-4">
          <div className="flex items-center gap-3 px-4 py-2.5 border-b border-border">
            <div className="flex items-center gap-2 bg-secondary rounded-md px-3 py-1.5 flex-1 max-w-sm">
              <Search className="h-3.5 w-3.5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by SKU, name, or category..."
                className="bg-transparent text-sm outline-none flex-1 placeholder:text-muted-foreground"
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="h-3.5 w-3.5 mr-1.5" />
              Filters
            </Button>
            <div className="flex items-center gap-1.5 ml-auto">
              {["All", "In Stock", "Low Stock", "Out of Stock"].map((filter) => (
                <Button
                  key={filter}
                  variant={filter === "All" ? "secondary" : "ghost"}
                  size="sm"
                  className="text-xs h-7"
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
                <TableHead className="text-xs font-semibold uppercase tracking-wider w-32">
                  <div className="flex items-center gap-1 cursor-pointer">SKU <ArrowUpDown className="h-3 w-3" /></div>
                </TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider">Product</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider w-24">Category</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider w-20 text-right">
                  <div className="flex items-center gap-1 cursor-pointer justify-end">Stock <ArrowUpDown className="h-3 w-3" /></div>
                </TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider w-20 text-right">Reserved</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider w-24 text-right">Price</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider w-24">Status</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider w-16">WH</TableHead>
                <TableHead className="w-10" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {inventoryData.map((item) => (
                <TableRow key={item.sku} className="group cursor-pointer">
                  <TableCell className="px-4 py-2.5">
                    <Checkbox />
                  </TableCell>
                  <TableCell className="py-2.5">
                    <span className="font-mono-data text-xs text-muted-foreground">{item.sku}</span>
                  </TableCell>
                  <TableCell className="py-2.5">
                    <span className="text-sm font-medium text-foreground">{item.name}</span>
                  </TableCell>
                  <TableCell className="py-2.5">
                    <span className="text-xs text-muted-foreground">{item.category}</span>
                  </TableCell>
                  <TableCell className="py-2.5 text-right">
                    <span className="font-mono-data text-sm font-medium text-foreground">{item.stock}</span>
                  </TableCell>
                  <TableCell className="py-2.5 text-right">
                    <span className="font-mono-data text-sm text-muted-foreground">{item.reserved}</span>
                  </TableCell>
                  <TableCell className="py-2.5 text-right">
                    <span className="font-mono-data text-sm font-medium text-foreground">{item.price}</span>
                  </TableCell>
                  <TableCell className="py-2.5">
                    <Badge variant={stockBadge(item.status)}>{item.status}</Badge>
                  </TableCell>
                  <TableCell className="py-2.5">
                    <span className="font-mono-data text-xs text-muted-foreground">{item.warehouse}</span>
                  </TableCell>
                  <TableCell className="py-2.5">
                    <Button variant="ghost" size="icon-sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination */}
          <div className="flex items-center justify-between px-4 py-3 border-t border-border">
            <span className="text-xs text-muted-foreground">Showing 1–10 of 248 items</span>
            <div className="flex items-center gap-1">
              <Button variant="outline" size="icon-sm" disabled>
                <ChevronLeft className="h-3.5 w-3.5" />
              </Button>
              <Button variant="secondary" size="sm" className="h-8 w-8 p-0 text-xs">1</Button>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-xs">2</Button>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-xs">3</Button>
              <span className="text-xs text-muted-foreground px-1">…</span>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-xs">25</Button>
              <Button variant="outline" size="icon-sm">
                <ChevronRight className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
