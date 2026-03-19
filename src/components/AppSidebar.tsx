import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  BarChart3,
  Settings,
  Users,
  Truck,
  MessageSquare,
  ChevronDown,
  Box,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";

const mainNav = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Inventory", url: "/inventory", icon: Package },
  { title: "Products", url: "/products", icon: ShoppingBag },
  { title: "Orders", url: "/orders", icon: Box },
];

const operationsNav = [
  { title: "Shipping", url: "/shipping", icon: Truck },
  { title: "Customers", url: "/customers", icon: Users },
  { title: "Support", url: "/support", icon: MessageSquare },
];

const analyticsNav = [
  { title: "Analytics", url: "/analytics", icon: BarChart3 },
  { title: "Settings", url: "/settings", icon: Settings },
];

function NavSection({ label, items, collapsed }: { label: string; items: typeof mainNav; collapsed: boolean }) {
  return (
    <SidebarGroup>
      {!collapsed && (
        <SidebarGroupLabel className="text-[11px] font-medium uppercase tracking-wider text-sidebar-muted px-3 mb-1">
          {label}
        </SidebarGroupLabel>
      )}
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild className="h-8">
                <NavLink
                  to={item.url}
                  end={item.url === "/"}
                  className="flex items-center gap-2.5 px-3 py-1.5 text-[13px] font-medium text-sidebar-foreground rounded-md hover:bg-sidebar-accent transition-colors duration-100"
                  activeClassName="bg-sidebar-accent text-sidebar-accent-foreground"
                >
                  <item.icon className="h-4 w-4 shrink-0" />
                  {!collapsed && <span>{item.title}</span>}
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      <SidebarHeader className="px-4 py-4">
        <div className="flex items-center gap-2.5">
          <div className="h-7 w-7 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-heading font-bold text-xs">N</span>
          </div>
          {!collapsed && (
            <div>
              <span className="font-heading font-bold text-sm text-sidebar-foreground tracking-tight">Nino</span>
              <span className="text-[10px] text-sidebar-muted ml-1.5 font-medium">Admin</span>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2 gap-1">
        <NavSection label="Main" items={mainNav} collapsed={collapsed} />
        <NavSection label="Operations" items={operationsNav} collapsed={collapsed} />
        <NavSection label="System" items={analyticsNav} collapsed={collapsed} />
      </SidebarContent>

      <SidebarFooter className="px-4 py-3 border-t border-sidebar-border">
        {!collapsed && (
          <div className="flex items-center gap-2.5">
            <div className="h-7 w-7 rounded-md bg-secondary flex items-center justify-center">
              <span className="text-xs font-medium text-secondary-foreground">JD</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-sidebar-foreground truncate">Jane Doe</p>
              <p className="text-[11px] text-sidebar-muted truncate">Operations Lead</p>
            </div>
            <ChevronDown className="h-3.5 w-3.5 text-sidebar-muted" />
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
