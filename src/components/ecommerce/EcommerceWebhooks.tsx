import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { 
  ShoppingCart, 
  Copy, 
  Check, 
  Plus,
  Trash2,
  CreditCard,
  Package,
  AlertTriangle,
  ExternalLink,
  Settings
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface WebhookEndpoint {
  id: string;
  name: string;
  event: "abandoned_cart" | "payment_pending" | "order_confirmed";
  url: string;
  isActive: boolean;
  platform: "shopify" | "woocommerce" | "other";
}

const eventConfig = {
  abandoned_cart: {
    label: "Carrinho Abandonado",
    icon: ShoppingCart,
    color: "text-warning",
    bgColor: "bg-warning/20",
  },
  payment_pending: {
    label: "Pagamento Pendente",
    icon: CreditCard,
    color: "text-info",
    bgColor: "bg-info/20",
  },
  order_confirmed: {
    label: "Pedido Confirmado",
    icon: Package,
    color: "text-success",
    bgColor: "bg-success/20",
  },
};

const defaultEndpoints: WebhookEndpoint[] = [
  {
    id: "1",
    name: "Recuperação de Carrinho",
    event: "abandoned_cart",
    url: "https://seu-dominio.com/api/webhook/cart-recovery",
    isActive: true,
    platform: "shopify",
  },
];

export function EcommerceWebhooks() {
  const [endpoints, setEndpoints] = useState<WebhookEndpoint[]>(defaultEndpoints);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const { toast } = useToast();

  // Form state
  const [newEndpoint, setNewEndpoint] = useState({
    name: "",
    event: "abandoned_cart" as WebhookEndpoint["event"],
    platform: "shopify" as WebhookEndpoint["platform"],
  });

  const generateWebhookUrl = () => {
    const baseUrl = window.location.origin;
    const uniqueId = Date.now().toString(36);
    return `${baseUrl}/api/webhook/${uniqueId}`;
  };

  const handleCopyUrl = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
    toast({
      title: "URL copiada!",
      description: "Cole esta URL no painel da sua loja.",
    });
  };

  const handleCreateEndpoint = () => {
    if (!newEndpoint.name.trim()) {
      toast({
        title: "Nome obrigatório",
        description: "Por favor, dê um nome para este webhook.",
        variant: "destructive",
      });
      return;
    }

    const endpoint: WebhookEndpoint = {
      id: Date.now().toString(),
      name: newEndpoint.name,
      event: newEndpoint.event,
      url: generateWebhookUrl(),
      isActive: true,
      platform: newEndpoint.platform,
    };

    setEndpoints([...endpoints, endpoint]);
    setNewEndpoint({ name: "", event: "abandoned_cart", platform: "shopify" });
    setShowCreateForm(false);

    toast({
      title: "Webhook criado!",
      description: "Copie a URL e configure na sua plataforma de e-commerce.",
    });
  };

  const handleDeleteEndpoint = (id: string) => {
    setEndpoints(endpoints.filter((e) => e.id !== id));
    toast({
      title: "Webhook removido",
      description: "O endpoint foi excluído.",
    });
  };

  const toggleEndpoint = (id: string, isActive: boolean) => {
    setEndpoints(endpoints.map((e) => (e.id === id ? { ...e, isActive } : e)));
  };

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <Card variant="glass" className="animate-fade-in">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-primary/20">
                <ShoppingCart className="w-6 h-6 text-primary" />
              </div>
              <div>
                <CardTitle>Webhooks E-commerce</CardTitle>
                <CardDescription>
                  Receba eventos de Shopify, WooCommerce e outras plataformas
                </CardDescription>
              </div>
            </div>
            <Button onClick={() => setShowCreateForm(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Novo Webhook
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Create Form */}
      {showCreateForm && (
        <Card variant="glass" className="animate-fade-in border-primary/30">
          <CardHeader>
            <CardTitle className="text-lg">Criar Novo Webhook</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Nome do Webhook
              </label>
              <input
                type="text"
                value={newEndpoint.name}
                onChange={(e) => setNewEndpoint({ ...newEndpoint, name: e.target.value })}
                placeholder="Ex: Recuperação Loja Principal"
                className="w-full h-11 px-4 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Evento
                </label>
                <select
                  value={newEndpoint.event}
                  onChange={(e) => setNewEndpoint({ ...newEndpoint, event: e.target.value as WebhookEndpoint["event"] })}
                  className="w-full h-11 px-4 rounded-lg bg-secondary border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  <option value="abandoned_cart">Carrinho Abandonado</option>
                  <option value="payment_pending">Pagamento Pendente</option>
                  <option value="order_confirmed">Pedido Confirmado</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Plataforma
                </label>
                <select
                  value={newEndpoint.platform}
                  onChange={(e) => setNewEndpoint({ ...newEndpoint, platform: e.target.value as WebhookEndpoint["platform"] })}
                  className="w-full h-11 px-4 rounded-lg bg-secondary border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  <option value="shopify">Shopify</option>
                  <option value="woocommerce">WooCommerce</option>
                  <option value="other">Outra</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <Button onClick={handleCreateEndpoint}>
                <Plus className="w-4 h-4 mr-2" />
                Criar Webhook
              </Button>
              <Button variant="outline" onClick={() => setShowCreateForm(false)}>
                Cancelar
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Endpoints List */}
      <div className="grid gap-4 md:grid-cols-2">
        {endpoints.map((endpoint, index) => {
          const config = eventConfig[endpoint.event];
          const Icon = config.icon;

          return (
            <Card 
              key={endpoint.id} 
              variant="glass" 
              className="animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={cn("p-2 rounded-lg", config.bgColor)}>
                      <Icon className={cn("w-5 h-5", config.color)} />
                    </div>
                    <div>
                      <CardTitle className="text-base">{endpoint.name}</CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary" className="text-xs">
                          {config.label}
                        </Badge>
                        <Badge variant="outline" className="text-xs capitalize">
                          {endpoint.platform}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <Switch
                    checked={endpoint.isActive}
                    onCheckedChange={(checked) => toggleEndpoint(endpoint.id, checked)}
                  />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* URL Display */}
                <div className="p-3 rounded-lg bg-secondary">
                  <p className="text-xs text-muted-foreground mb-1">URL do Webhook:</p>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 text-xs text-foreground truncate">
                      {endpoint.url}
                    </code>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleCopyUrl(endpoint.id, endpoint.url)}
                    >
                      {copiedId === endpoint.id ? (
                        <Check className="w-4 h-4 text-success" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between">
                  <Button variant="outline" size="sm">
                    <Settings className="w-4 h-4 mr-2" />
                    Configurar Resposta
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteEndpoint(endpoint.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Empty State */}
      {endpoints.length === 0 && !showCreateForm && (
        <Card variant="glass" className="animate-fade-in">
          <CardContent className="py-12 text-center">
            <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
              <ShoppingCart className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Nenhum webhook configurado</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Crie webhooks para receber eventos da sua loja online.
            </p>
            <Button onClick={() => setShowCreateForm(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Criar Primeiro Webhook
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Integration Guide */}
      <Card variant="glass" className="animate-fade-in">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <ExternalLink className="w-5 h-5 text-primary" />
            Como Integrar
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="p-4 rounded-lg bg-secondary">
              <h4 className="font-medium text-foreground mb-2">1. Copie a URL</h4>
              <p className="text-sm text-muted-foreground">
                Clique no botão de copiar ao lado da URL do webhook desejado.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-secondary">
              <h4 className="font-medium text-foreground mb-2">2. Configure na Loja</h4>
              <p className="text-sm text-muted-foreground">
                Cole a URL no painel de webhooks da sua plataforma de e-commerce.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-secondary">
              <h4 className="font-medium text-foreground mb-2">3. Defina a Resposta</h4>
              <p className="text-sm text-muted-foreground">
                Configure qual mensagem será enviada quando o evento ocorrer.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Warning */}
      <div className="p-4 rounded-xl bg-warning/10 border border-warning/20">
        <p className="text-sm text-warning flex items-start gap-2">
          <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <span>
            <strong>Importante:</strong> As URLs de webhook são únicas e sensíveis. 
            Não compartilhe publicamente. Se uma URL for comprometida, exclua-a e crie uma nova.
          </span>
        </p>
      </div>
    </div>
  );
}
