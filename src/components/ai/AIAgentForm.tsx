import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  Bot, 
  ArrowLeft, 
  Save,
  Sparkles,
  FileText,
  MessageSquare
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AIAgentFormProps {
  onBack: () => void;
  editingAgent?: {
    id: string;
    name: string;
    description: string;
  } | null;
}

export function AIAgentForm({ onBack, editingAgent }: AIAgentFormProps) {
  const [name, setName] = useState(editingAgent?.name || "");
  const [description, setDescription] = useState(editingAgent?.description || "");
  const [salesScript, setSalesScript] = useState("");
  const [knowledgeBase, setKnowledgeBase] = useState("");
  const [greeting, setGreeting] = useState("");
  const { toast } = useToast();

  const handleSave = () => {
    if (!name.trim()) {
      toast({
        title: "Nome obrigatório",
        description: "Por favor, dê um nome ao seu agente.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: editingAgent ? "Agente atualizado!" : "Agente criado!",
      description: `O agente "${name}" foi ${editingAgent ? 'atualizado' : 'criado'} com sucesso.`,
    });
    onBack();
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h2 className="text-xl font-bold text-foreground">
            {editingAgent ? "Editar Agente" : "Novo Agente IA"}
          </h2>
          <p className="text-sm text-muted-foreground">
            Configure seu atendente virtual
          </p>
        </div>
      </div>

      {/* Basic Info */}
      <Card variant="glass">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/20">
              <Bot className="w-5 h-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">Informações Básicas</CardTitle>
              <CardDescription>Identifique seu agente</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Nome do Agente
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Vendedor Virtual"
              className="w-full h-11 px-4 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Descrição
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ex: Atendente focado em vendas e qualificação"
              className="w-full h-11 px-4 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
            />
          </div>
        </CardContent>
      </Card>

      {/* Greeting */}
      <Card variant="glass">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-success/20">
              <MessageSquare className="w-5 h-5 text-success" />
            </div>
            <div>
              <CardTitle className="text-lg">Mensagem de Boas-vindas</CardTitle>
              <CardDescription>Primeira mensagem enviada ao lead</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Textarea
            value={greeting}
            onChange={(e) => setGreeting(e.target.value)}
            placeholder="Olá! 👋 Sou o assistente virtual da [Empresa]. Como posso ajudar você hoje?"
            className="min-h-[100px] bg-secondary border-border"
          />
          <p className="mt-2 text-xs text-muted-foreground">
            Use {"{{nome}}"} para inserir o nome do lead dinamicamente
          </p>
        </CardContent>
      </Card>

      {/* Sales Script */}
      <Card variant="glass">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-warning/20">
              <Sparkles className="w-5 h-5 text-warning" />
            </div>
            <div>
              <CardTitle className="text-lg">Script de Vendas</CardTitle>
              <CardDescription>Roteiro de conversa e argumentos de venda</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Textarea
            value={salesScript}
            onChange={(e) => setSalesScript(e.target.value)}
            placeholder="Descreva o roteiro de conversa, perguntas de qualificação, objeções comuns e como responder a elas..."
            className="min-h-[200px] bg-secondary border-border"
          />
        </CardContent>
      </Card>

      {/* Knowledge Base */}
      <Card variant="glass">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-info/20">
              <FileText className="w-5 h-5 text-info" />
            </div>
            <div>
              <CardTitle className="text-lg">Base de Conhecimento</CardTitle>
              <CardDescription>Informações sobre produtos, preços e empresa</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Textarea
            value={knowledgeBase}
            onChange={(e) => setKnowledgeBase(e.target.value)}
            placeholder="Adicione informações sobre seus produtos, serviços, preços, políticas de pagamento, FAQs..."
            className="min-h-[200px] bg-secondary border-border"
          />
          <div className="mt-4 p-4 rounded-lg bg-info/10 border border-info/20">
            <p className="text-sm text-info">
              <strong>Dica:</strong> Quanto mais detalhada a base de conhecimento, 
              melhor será a capacidade do agente de responder perguntas dos leads.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex items-center justify-end gap-3">
        <Button variant="outline" onClick={onBack}>
          Cancelar
        </Button>
        <Button variant="glow" onClick={handleSave}>
          <Save className="w-4 h-4 mr-2" />
          {editingAgent ? "Salvar Alterações" : "Criar Agente"}
        </Button>
      </div>
    </div>
  );
}
