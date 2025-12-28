import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { LeadsStats } from "@/components/leads/LeadsStats";
import { LeadsTable } from "@/components/leads/LeadsTable";
import { WhatsAppIntegration } from "@/components/integrations/WhatsAppIntegration";
import { WebhookIntegration } from "@/components/integrations/WebhookIntegration";
import { AIAgentCard } from "@/components/ai/AIAgentCard";
import { AIAgentForm } from "@/components/ai/AIAgentForm";
import { MessageSequencer } from "@/components/sequences/MessageSequencer";
import { BulkMessaging } from "@/components/broadcast/BulkMessaging";
import { EcommerceWebhooks } from "@/components/ecommerce/EcommerceWebhooks";
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
      {/* Background gradient */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div 
          className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-30"
          style={{ background: "var(--gradient-glow)" }}
        />
        <div 
          className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-20"
          style={{ background: "var(--gradient-glow)" }}
        />
      </div>

      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className={cn(
        "transition-all duration-300 ml-64"
      )}>
        <Header title={currentTab.title} description={currentTab.description} />
        
        <div className="p-6">
          {/* Leads Tab */}
          {activeTab === "leads" && (
            <div className="space-y-6">
              <LeadsStats />
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

          {/* AI Responder Tab */}
          {activeTab === "ai-responder" && (
            <div>
              {showAgentForm ? (
                <AIAgentForm 
                  onBack={handleBackFromForm}
                  editingAgent={editingAgent}
                />
              ) : (
                <AIAgentCard 
                  onCreateNew={handleCreateAgent}
                  onEditAgent={handleEditAgent}
                />
              )}
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

          {/* E-commerce Tab */}
          {activeTab === "ecommerce" && (
            <EcommerceWebhooks />
          )}

          {/* Analytics Tab (Placeholder) */}
          {activeTab === "analytics" && (
            <div className="flex items-center justify-center h-[400px]">
              <div className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📊</span>
                </div>
                <h3 className="font-semibold text-foreground mb-2">Em Desenvolvimento</h3>
                <p className="text-sm text-muted-foreground">
                  O módulo de análises estará disponível em breve.
                </p>
              </div>
            </div>
          )}

          {/* Settings Tab (Placeholder) */}
          {activeTab === "settings" && (
            <div className="flex items-center justify-center h-[400px]">
              <div className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">⚙️</span>
                </div>
                <h3 className="font-semibold text-foreground mb-2">Em Desenvolvimento</h3>
                <p className="text-sm text-muted-foreground">
                  O módulo de configurações estará disponível em breve.
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
