import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Download, 
  Filter, 
  Plus, 
  MoreHorizontal,
  Phone,
  Mail,
  Calendar,
  MessageSquare,
  Bot
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  status: "novo" | "contato" | "qualificado" | "proposta" | "fechado";
  source: string;
  createdAt: string;
  aiActive: boolean;
}

const mockLeads: Lead[] = [
  { id: "1", name: "Maria Silva", phone: "+55 11 99999-0001", email: "maria@email.com", status: "novo", source: "WhatsApp", createdAt: "2024-01-15", aiActive: true },
  { id: "2", name: "João Santos", phone: "+55 11 99999-0002", email: "joao@email.com", status: "contato", source: "Site", createdAt: "2024-01-14", aiActive: true },
  { id: "3", name: "Ana Oliveira", phone: "+55 11 99999-0003", email: "ana@email.com", status: "qualificado", source: "Indicação", createdAt: "2024-01-13", aiActive: false },
  { id: "4", name: "Carlos Lima", phone: "+55 11 99999-0004", email: "carlos@email.com", status: "proposta", source: "WhatsApp", createdAt: "2024-01-12", aiActive: true },
  { id: "5", name: "Patricia Costa", phone: "+55 11 99999-0005", email: "patricia@email.com", status: "fechado", source: "Facebook", createdAt: "2024-01-11", aiActive: false },
  { id: "6", name: "Roberto Alves", phone: "+55 11 99999-0006", email: "roberto@email.com", status: "novo", source: "WhatsApp", createdAt: "2024-01-10", aiActive: true },
];

const statusConfig = {
  novo: { label: "Novo", className: "bg-info/20 text-info border-info/30" },
  contato: { label: "Em Contato", className: "bg-warning/20 text-warning border-warning/30" },
  qualificado: { label: "Qualificado", className: "bg-primary/20 text-primary border-primary/30" },
  proposta: { label: "Proposta", className: "bg-purple-500/20 text-purple-400 border-purple-500/30" },
  fechado: { label: "Fechado", className: "bg-success/20 text-success border-success/30" },
};

export function LeadsTable() {
  const [leads] = useState<Lead[]>(mockLeads);

  const handleExport = () => {
    // CSV export logic
    const csvContent = [
      ["Nome", "Telefone", "Email", "Status", "Origem", "Data"],
      ...leads.map(l => [l.name, l.phone, l.email, l.status, l.source, l.createdAt])
    ].map(row => row.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "leads.csv";
    link.click();
  };

  return (
    <Card variant="glass" className="animate-fade-in">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Leads ({leads.length})
          </CardTitle>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filtrar
          </Button>
          <Button variant="outline" size="sm" onClick={handleExport}>
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </Button>
          <Button variant="glow" size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Novo Lead
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Lead</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Contato</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Status</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Origem</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">IA</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Data</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground">Ações</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead, index) => (
                <tr 
                  key={lead.id}
                  className="border-b border-border/50 hover:bg-secondary/30 transition-colors group"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                        <span className="text-sm font-semibold text-primary">
                          {lead.name.split(" ").map(n => n[0]).join("")}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{lead.name}</p>
                        <p className="text-sm text-muted-foreground">{lead.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-foreground">{lead.phone}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <Badge 
                      variant="outline" 
                      className={cn("font-medium", statusConfig[lead.status].className)}
                    >
                      {statusConfig[lead.status].label}
                    </Badge>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm text-foreground">{lead.source}</span>
                  </td>
                  <td className="py-4 px-4">
                    <div className={cn(
                      "inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium",
                      lead.aiActive 
                        ? "bg-primary/20 text-primary" 
                        : "bg-muted text-muted-foreground"
                    )}>
                      <Bot className="w-3 h-3" />
                      {lead.aiActive ? "Ativo" : "Inativo"}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      {new Date(lead.createdAt).toLocaleDateString("pt-BR")}
                    </div>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MessageSquare className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
