import { AdminLayout } from "@/components/AdminLayout";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";

export default function CreateProductPage() {
  const navigate = useNavigate();

  return (
    <AdminLayout>
      <div className="p-6 max-w-3xl">
        <div className="mb-4">
          <Button variant="ghost" size="sm" className="text-xs text-muted-foreground" onClick={() => navigate("/products")}>
            <ArrowLeft className="h-3.5 w-3.5 mr-1" /> Back to Products
          </Button>
        </div>

        <PageHeader title="Create Product" description="Add a new product to your catalog">
          <Button variant="outline" size="sm">Save as Draft</Button>
          <Button size="sm">Publish</Button>
        </PageHeader>

        <div className="space-y-6">
          {/* Basic Info */}
          <div className="bg-card-elevated border border-border rounded-xl shadow-xs">
            <div className="px-5 py-4 border-b border-border">
              <h3 className="text-sm font-heading font-semibold">Basic Information</h3>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground block mb-1.5">Product Name</label>
                <input type="text" placeholder="e.g. Hydrating Serum 30ml" className="w-full h-9 rounded-md border border-border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground block mb-1.5">SKU</label>
                  <input type="text" placeholder="NIN-XX-000" className="w-full h-9 rounded-md border border-border bg-background px-3 text-sm font-mono-data focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground block mb-1.5">Category</label>
                  <select className="w-full h-9 rounded-md border border-border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1">
                    <option>Skincare</option>
                    <option>Haircare</option>
                    <option>Body</option>
                    <option>Sets</option>
                    <option>Tools</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground block mb-1.5">Description</label>
                <textarea rows={4} placeholder="Product description..." className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1 resize-none" />
              </div>
            </div>
          </div>

          {/* Pricing & Stock */}
          <div className="bg-card-elevated border border-border rounded-xl shadow-xs">
            <div className="px-5 py-4 border-b border-border">
              <h3 className="text-sm font-heading font-semibold">Pricing & Stock</h3>
            </div>
            <div className="p-5 space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground block mb-1.5">Price (€)</label>
                  <input type="text" placeholder="0.00" className="w-full h-9 rounded-md border border-border bg-background px-3 text-sm font-mono-data focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground block mb-1.5">Cost (€)</label>
                  <input type="text" placeholder="0.00" className="w-full h-9 rounded-md border border-border bg-background px-3 text-sm font-mono-data focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground block mb-1.5">Initial Stock</label>
                  <input type="number" placeholder="0" className="w-full h-9 rounded-md border border-border bg-background px-3 text-sm font-mono-data focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1" />
                </div>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">Track inventory</p>
                  <p className="text-xs text-muted-foreground">Enable stock level tracking for this product</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </div>

          {/* Shipping */}
          <div className="bg-card-elevated border border-border rounded-xl shadow-xs">
            <div className="px-5 py-4 border-b border-border">
              <h3 className="text-sm font-heading font-semibold">Shipping</h3>
            </div>
            <div className="p-5">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground block mb-1.5">Weight (g)</label>
                  <input type="number" placeholder="0" className="w-full h-9 rounded-md border border-border bg-background px-3 text-sm font-mono-data focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground block mb-1.5">Length × Width (cm)</label>
                  <input type="text" placeholder="0 × 0" className="w-full h-9 rounded-md border border-border bg-background px-3 text-sm font-mono-data focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground block mb-1.5">Height (cm)</label>
                  <input type="number" placeholder="0" className="w-full h-9 rounded-md border border-border bg-background px-3 text-sm font-mono-data focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
