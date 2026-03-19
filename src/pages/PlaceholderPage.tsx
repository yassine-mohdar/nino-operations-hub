import { AdminLayout } from "@/components/AdminLayout";
import { PageHeader } from "@/components/PageHeader";
import { Package } from "lucide-react";

interface PlaceholderPageProps {
  title: string;
}

export default function PlaceholderPage({ title }: PlaceholderPageProps) {
  return (
    <AdminLayout>
      <div className="p-6 max-w-[1400px]">
        <PageHeader title={title} description={`Manage ${title.toLowerCase()} operations`} />
        <div className="bg-card-elevated border border-border rounded-xl shadow-xs p-12 flex flex-col items-center justify-center text-center">
          <div className="h-12 w-12 rounded-xl bg-muted flex items-center justify-center mb-4">
            <Package className="h-6 w-6 text-muted-foreground" />
          </div>
          <h3 className="text-sm font-heading font-semibold text-foreground mb-1">Coming Soon</h3>
          <p className="text-xs text-muted-foreground max-w-sm">
            This section is under development. The {title.toLowerCase()} management module will be available shortly.
          </p>
        </div>
      </div>
    </AdminLayout>
  );
}
