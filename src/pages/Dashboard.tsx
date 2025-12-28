import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { LeadsStats } from "@/components/leads/LeadsStats";
import { LeadsTable } from "@/components/leads/LeadsTable";
import { WhatsAppIntegration } from "@/components/integrations/WhatsAppIntegration";
import { WebhookIntegration } from "@/components/integrations/WebhookIntegration";
import { MessageSequencer } from "@/components/sequences/MessageSequencer";
import { BulkMessaging } from "@/components/broadcast/BulkMessaging";
import { cn } from "@/lib/utils";

const tabConfig = {
  leads: {
    title: "Gestão de Leads",
    description: "Gerencie e acompanhe todos os seus leads",
  },
  integrations: {
    title: "Integrações",
    description: "Configure suas conexões com WhatsApp e automações",
  },
  "ai-responder": {
    title: "Atendente IA",
    description: "Configure seus agentes virtuais de atendimento",
  },
  sequences: {
    title: "Sequências de Mensagens",
    description: "Crie fluxos de nutrição automatizados com até 7 mensagens",
  },
  broadcast: {
    title: "Envio em Massa",
    description: "Envie mensagens para múltiplos contatos com proteção anti-ban",
  },
  ecommerce: {
    title: "E-commerce",
    description: "Configure webhooks para recuperação de carrinho e pedidos",
  },
  analytics: {
    title: "Análises",
    description: "Métricas e relatórios de performance",
  },
  settings: {
    title: "Configurações",
    description: "Preferências e configurações da conta",
  },
};

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("leads");
  const [showAgentForm, setShowAgentForm] = useState(false);
  const [editingAgent, setEditingAgent] = useState<any>(null);

  const currentTab = tabConfig[activeTab as keyof typeof tabConfig] || tabConfig.leads;

  const handleCreateAgent = () => {
    setEditingAgent(null);
    setShowAgentForm(true);
  };

  const handleEditAgent = (agent: any) => {
    setEditingAgent(agent);
    setShowAgentForm(true);
  };

  const handleBackFromForm = () => {
    setShowAgentForm(false);
    setEditingAgent(null);
  };

  return (
    <div className="min-h-screen bg-background">

      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className={cn("transition-all duration-300 ml-64"  )}>
        <Header title={currentTab.title} description={currentTab.description} />
        
        <div className="p-6">
          {/* Leads Tab */}
          {activeTab === "leads" && (
            <div className="space-y-6">
              <LeadsTable />
            </div>
          )}

          {/* Integrations Tab */}
          {activeTab === "integrations" && (
            <div className="grid gap-6 lg:grid-cols-2">
              <WhatsAppIntegration />
              <WebhookIntegration />
            </div>
          )}

         

          {/* Sequences Tab */}
          {activeTab === "sequences" && (
            <MessageSequencer />
          )}

          {/* Broadcast Tab */}
          {activeTab === "broadcast" && (
            <BulkMessaging />
          )}

        </div>
      </main>

      
    </div>
  );
}
