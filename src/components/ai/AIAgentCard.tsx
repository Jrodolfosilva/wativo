import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { 
  Bot, 
  Plus, 
  Edit2, 
  Trash2, 
  MessageSquare,
  Zap,
  MoreHorizontal
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Agent {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  conversations: number;
  successRate: number;
}

const mockAgents: Agent[] = [
  { 
    id: "1", 
    name: "Vendedor Virtual", 
    description: "Atendente focado em vendas e qualificação de leads",
    isActive: true, 
    conversations: 156,
    successRate: 78
  },
  { 
    id: "2", 
    name: "Suporte Técnico", 
    description: "Atendimento para dúvidas técnicas e suporte",
    isActive: false, 
    conversations: 89,
    successRate: 92
  },
];

interface AIAgentCardProps {
  onCreateNew: () => void;
  onEditAgent: (agent: Agent) => void;
}

export function AIAgentCard({ onCreateNew, onEditAgent }: AIAgentCardProps) {
  const [agents, setAgents] = useState<Agent[]>(mockAgents);

  const toggleAgent = (id: string) => {
    setAgents(prev => prev.map(agent => 
      agent.id === id ? { ...agent, isActive: !agent.isActive } : agent
    ));
  };

  return (
    <Card variant="glass" className="animate-fade-in">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-primary/20">
            <Bot className="w-6 h-6 text-primary" />
          </div>
          <div>
            <CardTitle>Atendentes IA</CardTitle>
            <CardDescription>
              Configure seus agentes virtuais para atendimento automatizado
            </CardDescription>
          </div>
        </div>
        <Button variant="glow" size="sm" onClick={onCreateNew}>
          <Plus className="w-4 h-4 mr-2" />
          Novo Agente
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {agents.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
              <Bot className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Nenhum agente criado</h3>
            <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto">
              Crie seu primeiro atendente virtual para automatizar o atendimento aos seus leads.
            </p>
            <Button variant="glow" onClick={onCreateNew}>
              <Plus className="w-4 h-4 mr-2" />
              Criar Primeiro Agente
            </Button>
          </div>
        ) : (
          agents.map((agent, index) => (
            <div
              key={agent.id}
              className={cn(
                "p-4 rounded-xl border transition-all duration-300 hover:border-primary/30",
                agent.isActive 
                  ? "bg-primary/5 border-primary/20" 
                  : "bg-secondary/50 border-border"
              )}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "p-2 rounded-lg",
                    agent.isActive ? "bg-primary/20" : "bg-muted"
                  )}>
                    <Bot className={cn(
                      "w-5 h-5",
                      agent.isActive ? "text-primary" : "text-muted-foreground"
                    )} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground flex items-center gap-2">
                      {agent.name}
                      {agent.isActive && (
                        <Badge variant="outline" className="bg-success/20 text-success border-success/30 text-xs">
                          <Zap className="w-3 h-3 mr-1" />
                          Ativo
                        </Badge>
                      )}
                    </h4>
                    <p className="text-sm text-muted-foreground">{agent.description}</p>
                  </div>
                </div>
                <Switch
                  checked={agent.isActive}
                  onCheckedChange={() => toggleAgent(agent.id)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MessageSquare className="w-4 h-4" />
                    <span>{agent.conversations} conversas</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-success font-medium">{agent.successRate}%</span>
                    <span className="text-muted-foreground ml-1">taxa de sucesso</span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8"
                    onClick={() => onEditAgent(agent)}
                  >
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
