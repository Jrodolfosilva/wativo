import { Card, CardContent } from "@/components/ui/card";
import { Users, UserCheck, MessageSquare, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

const stats = [
  { 
    label: "Total de Leads", 
    value: "1.247", 
    change: "+12%",
    trend: "up",
    icon: Users,
    color: "primary"
  },
  { 
    label: "Leads Qualificados", 
    value: "384", 
    change: "+8%",
    trend: "up",
    icon: UserCheck,
    color: "success"
  },
  { 
    label: "Conversas Ativas", 
    value: "52", 
    change: "+23%",
    trend: "up",
    icon: MessageSquare,
    color: "info"
  },
  { 
    label: "Taxa de Conversão", 
    value: "18.4%", 
    change: "+2.1%",
    trend: "up",
    icon: TrendingUp,
    color: "warning"
  },
];

const colorClasses = {
  primary: "bg-primary/10 text-primary border-primary/20",
  success: "bg-success/10 text-success border-success/20",
  info: "bg-info/10 text-info border-info/20",
  warning: "bg-warning/10 text-warning border-warning/20",
};

export function LeadsStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card 
            key={stat.label}
            variant="glass" 
            className="animate-fade-in hover:border-primary/30 transition-all duration-300"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <div className="flex items-center gap-1 mt-2">
                    <span className="text-xs font-medium text-success">{stat.change}</span>
                    <span className="text-xs text-muted-foreground">vs mês anterior</span>
                  </div>
                </div>
                <div className={cn(
                  "p-2.5 rounded-lg border",
                  colorClasses[stat.color as keyof typeof colorClasses]
                )}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
