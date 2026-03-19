import { Bell, Search, SidebarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";

export function Topbar() {
  const { toggleSidebar } = useSidebar();

  return (
    <header className="h-12 flex items-center justify-between border-b border-border bg-card-elevated px-4 shrink-0">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon-sm" onClick={toggleSidebar}>
          <SidebarIcon className="h-4 w-4" />
        </Button>
        <div className="hidden sm:flex items-center gap-2 ml-2">
          <div className="flex items-center gap-2 bg-secondary rounded-md px-3 py-1.5 w-64">
            <Search className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Search anything...</span>
            <kbd className="ml-auto text-[10px] font-mono-data text-muted-foreground bg-background rounded px-1.5 py-0.5 border border-border">⌘K</kbd>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon-sm" className="relative">
          <Bell className="h-4 w-4" />
          <span className="absolute top-1 right-1.5 h-1.5 w-1.5 rounded-full bg-danger" />
        </Button>
        <div className="h-7 w-7 rounded-md bg-primary flex items-center justify-center ml-2 cursor-pointer">
          <span className="text-primary-foreground text-xs font-medium">JD</span>
        </div>
      </div>
    </header>
  );
}
