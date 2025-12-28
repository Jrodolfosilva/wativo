import { useState } from "react";
import { cn } from "@/lib/utils";
import { 
  Users, 
  Plug, 
  Bot, 
  ChevronLeft, 
  ChevronRight,
  MessageSquare,
  BarChart3,
  Settings,
  Mail,
  Send,
  ShoppingCart
} from "lucide-react";

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const menuItems = [
  { id: "leads", label: "Leads", icon: Users },
  { id: "integrations", label: "Integrações", icon: Plug },
  { id: "ai-responder", label: "Atendente IA", icon: Bot },
  { id: "sequences", label: "Sequências", icon: Mail },
  { id: "broadcast", label: "Envio em Massa", icon: Send },
  { id: "ecommerce", label: "E-commerce", icon: ShoppingCart },
];

const secondaryItems = [
  { id: "analytics", label: "Análises", icon: BarChart3 },
  { id: "settings", label: "Configurações", icon: Settings },
];

export function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300 flex flex-col",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-sidebar-border">
        <div className={cn("flex items-center gap-3 transition-opacity", collapsed && "opacity-0")}>
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <MessageSquare className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-bold text-lg text-sidebar-foreground">WhatsApp CRM</span>
        </div>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-lg hover:bg-sidebar-accent transition-colors text-sidebar-foreground"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 py-4 px-2 overflow-y-auto">
        <div className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group",
                  activeTab === item.id
                    ? "bg-primary/10 text-primary border border-primary/20"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                )}
              >
                <Icon className={cn(
                  "w-5 h-5 flex-shrink-0 transition-transform group-hover:scale-110",
                  activeTab === item.id && "text-primary"
                )} />
                <span className={cn(
                  "font-medium transition-opacity",
                  collapsed && "opacity-0 w-0 overflow-hidden"
                )}>
                  {item.label}
                </span>
                {activeTab === item.id && !collapsed && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />
                )}
              </button>
            );
          })}
        </div>

        {/* Secondary Navigation */}
        <div className="mt-8 pt-4 border-t border-sidebar-border space-y-1">
          {secondaryItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group",
                  activeTab === item.id
                    ? "bg-primary/10 text-primary border border-primary/20"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                )}
              >
                <Icon className="w-5 h-5 flex-shrink-0 transition-transform group-hover:scale-110" />
                <span className={cn(
                  "font-medium transition-opacity",
                  collapsed && "opacity-0 w-0 overflow-hidden"
                )}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className={cn(
        "p-4 border-t border-sidebar-border transition-opacity",
        collapsed && "opacity-0"
      )}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
            <span className="text-sm font-semibold text-primary">JD</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-sidebar-foreground truncate">João Demo</p>
            <p className="text-xs text-muted-foreground truncate">joao@empresa.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
