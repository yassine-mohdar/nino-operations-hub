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
import { Search, Filter, Plus, MoreHorizontal, Star, Eye } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

const products = [
  { id: "PRD-001", name: "Gentle Cleanser 150ml", category: "Skincare", price: "€24.00", status: "Active", rating: 4.8, views: 2340 },
  { id: "PRD-002", name: "Hydrating Serum 30ml", category: "Skincare", price: "€48.00", status: "Active", rating: 4.9, views: 5120 },
  { id: "PRD-003", name: "Repair Mask 200ml", category: "Haircare", price: "€32.00", status: "Active", rating: 4.6, views: 1890 },
  { id: "PRD-004", name: "Body Oil 100ml", category: "Body", price: "€38.00", status: "Draft", rating: 0, views: 0 },
  { id: "PRD-005", name: "SPF 50 Moisturizer 50ml", category: "Skincare", price: "€42.00", status: "Active", rating: 4.7, views: 4210 },
  { id: "PRD-006", name: "Discovery Set", category: "Sets", price: "€68.00", status: "Active", rating: 4.9, views: 8430 },
  { id: "PRD-007", name: "Hand Cream 75ml", category: "Body", price: "€18.00", status: "Archived", rating: 4.3, views: 920 },
  { id: "PRD-008", name: "Night Cream 50ml", category: "Skincare", price: "€52.00", status: "Active", rating: 4.8, views: 3670 },
];

const statusBadge = (status: string) => {
  switch (status) {
    case "Active": return "success" as const;
    case "Draft": return "secondary" as const;
    case "Archived": return "outline" as const;
    default: return "secondary" as const;
  }
};

export default function ProductsPage() {
  return (
    <AdminLayout>
      <div className="p-6 max-w-[1400px]">
        <PageHeader title="Products" description="Manage your product catalog">
          <Button size="sm">
            <Plus className="h-3.5 w-3.5 mr-1.5" />
            New Product
          </Button>
        </PageHeader>

        <div className="bg-card-elevated border border-border rounded-xl shadow-xs">
          <div className="flex items-center gap-3 px-4 py-2.5 border-b border-border">
            <div className="flex items-center gap-2 bg-secondary rounded-md px-3 py-1.5 flex-1 max-w-sm">
              <Search className="h-3.5 w-3.5 text-muted-foreground" />
              <input type="text" placeholder="Search products..." className="bg-transparent text-sm outline-none flex-1 placeholder:text-muted-foreground" />
            </div>
            <Button variant="outline" size="sm"><Filter className="h-3.5 w-3.5 mr-1.5" />Filters</Button>
            <div className="flex items-center gap-1.5 ml-auto">
              {["All", "Active", "Draft", "Archived"].map((f) => (
                <Button key={f} variant={f === "All" ? "secondary" : "ghost"} size="sm" className="text-xs h-7">{f}</Button>
              ))}
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-10 px-4"><Checkbox /></TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider">Product</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider w-24">Category</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider w-24 text-right">Price</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider w-20">Status</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider w-20 text-right">Rating</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider w-20 text-right">Views</TableHead>
                <TableHead className="w-10" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((p) => (
                <TableRow key={p.id} className="group cursor-pointer">
                  <TableCell className="px-4 py-2.5"><Checkbox /></TableCell>
                  <TableCell className="py-2.5">
                    <div>
                      <span className="text-sm font-medium text-foreground">{p.name}</span>
                      <span className="block text-[11px] font-mono-data text-muted-foreground">{p.id}</span>
                    </div>
                  </TableCell>
                  <TableCell className="py-2.5 text-xs text-muted-foreground">{p.category}</TableCell>
                  <TableCell className="py-2.5 text-right font-mono-data text-sm font-medium">{p.price}</TableCell>
                  <TableCell className="py-2.5"><Badge variant={statusBadge(p.status)}>{p.status}</Badge></TableCell>
                  <TableCell className="py-2.5 text-right">
                    {p.rating > 0 && (
                      <span className="inline-flex items-center gap-0.5 text-sm font-mono-data">
                        <Star className="h-3 w-3 text-warning fill-warning" />{p.rating}
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="py-2.5 text-right">
                    {p.views > 0 && (
                      <span className="inline-flex items-center gap-1 text-xs text-muted-foreground font-mono-data">
                        <Eye className="h-3 w-3" />{p.views.toLocaleString()}
                      </span>
                    )}
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
        </div>
      </div>
    </AdminLayout>
  );
}
