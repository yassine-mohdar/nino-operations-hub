import { AdminLayout } from "@/components/AdminLayout";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

const settingSections = [
  {
    title: "General",
    description: "Basic store configuration",
    fields: [
      { label: "Store Name", value: "Nino Cosmetics", type: "text" },
      { label: "Store Email", value: "ops@nino.com", type: "text" },
      { label: "Default Currency", value: "EUR (€)", type: "text" },
      { label: "Timezone", value: "Europe/Berlin (CET)", type: "text" },
    ],
  },
  {
    title: "Inventory",
    description: "Stock management settings",
    toggles: [
      { label: "Low stock alerts", description: "Get notified when stock falls below threshold", enabled: true },
      { label: "Auto-reorder", description: "Automatically create purchase orders for low stock items", enabled: false },
      { label: "Track reserved stock", description: "Reserve stock for pending orders", enabled: true },
    ],
  },
  {
    title: "Notifications",
    description: "Email and system notifications",
    toggles: [
      { label: "Order notifications", description: "Receive email for new orders", enabled: true },
      { label: "Daily digest", description: "Summary of daily operations", enabled: true },
      { label: "Stock alerts", description: "Critical stock level warnings", enabled: true },
      { label: "Marketing reports", description: "Weekly marketing performance", enabled: false },
    ],
  },
];

export default function SettingsPage() {
  return (
    <AdminLayout>
      <div className="p-6 max-w-3xl">
        <PageHeader title="Settings" description="Manage your store configuration">
          <Button size="sm">Save Changes</Button>
        </PageHeader>

        <div className="space-y-6">
          {settingSections.map((section) => (
            <div key={section.title} className="bg-card-elevated border border-border rounded-xl shadow-xs">
              <div className="px-5 py-4 border-b border-border">
                <h3 className="text-sm font-heading font-semibold text-foreground">{section.title}</h3>
                <p className="text-xs text-muted-foreground">{section.description}</p>
              </div>
              <div className="p-5">
                {section.fields && (
                  <div className="space-y-4">
                    {section.fields.map((field) => (
                      <div key={field.label} className="grid grid-cols-3 gap-4 items-center">
                        <label className="text-sm text-foreground font-medium">{field.label}</label>
                        <input
                          type="text"
                          defaultValue={field.value}
                          className="col-span-2 h-9 rounded-md border border-border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1"
                        />
                      </div>
                    ))}
                  </div>
                )}
                {section.toggles && (
                  <div className="space-y-4">
                    {section.toggles.map((toggle, i) => (
                      <div key={toggle.label}>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-foreground">{toggle.label}</p>
                            <p className="text-xs text-muted-foreground">{toggle.description}</p>
                          </div>
                          <Switch defaultChecked={toggle.enabled} />
                        </div>
                        {i < section.toggles!.length - 1 && <Separator className="mt-4" />}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
