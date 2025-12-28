import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Webhook, Send, Check, AlertCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

export function WebhookIntegration() {
  const [webhookUrl, setWebhookUrl] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<"success" | "error" | null>(null);
  const { toast } = useToast();

  const handleTest = async () => {
    if (!webhookUrl) {
      toast({
        title: "URL necessária",
        description: "Por favor, insira a URL do webhook antes de testar.",
        variant: "destructive",
      });
      return;
    }

    setIsTesting(true);
    setTestResult(null);

    // Simulate webhook test
    setTimeout(() => {
      const success = Math.random() > 0.3;
      setTestResult(success ? "success" : "error");
      setIsTesting(false);
      
      toast({
        title: success ? "Teste bem-sucedido!" : "Falha no teste",
        description: success 
          ? "O webhook respondeu corretamente." 
          : "Não foi possível conectar ao webhook.",
        variant: success ? "default" : "destructive",
      });
    }, 2000);
  };

  return (
    <Card variant="glass" className="animate-fade-in" style={{ animationDelay: "100ms" }}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-info/20">
              <Webhook className="w-6 h-6 text-info" />
            </div>
            <div>
              <CardTitle className="flex items-center gap-2">
                n8n Webhook
                <Badge 
                  variant="outline" 
                  className={cn(
                    "ml-2",
                    isActive && webhookUrl
                      ? "bg-success/20 text-success border-success/30" 
                      : "bg-muted text-muted-foreground border-muted"
                  )}
                >
                  {isActive && webhookUrl ? "Ativo" : "Inativo"}
                </Badge>
              </CardTitle>
              <CardDescription>
                Configure o webhook para integrar com n8n e automatizar fluxos
              </CardDescription>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Webhook URL Input */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            URL do Webhook
          </label>
          <div className="relative">
            <input
              type="url"
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
              placeholder="https://seu-n8n.app/webhook/..."
              className="w-full h-11 px-4 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
            />
            {testResult && (
              <div className={cn(
                "absolute right-3 top-1/2 -translate-y-1/2",
                testResult === "success" ? "text-success" : "text-destructive"
              )}>
                {testResult === "success" ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <AlertCircle className="w-5 h-5" />
                )}
              </div>
            )}
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            Cole a URL do webhook do seu fluxo n8n aqui
          </p>
        </div>

        {/* Toggle and Test */}
        <div className="flex items-center justify-between p-4 rounded-xl bg-secondary">
          <div className="flex items-center gap-3">
            <Switch
              checked={isActive}
              onCheckedChange={setIsActive}
              disabled={!webhookUrl}
            />
            <div>
              <p className="font-medium text-foreground">Encaminhamento Automático</p>
              <p className="text-sm text-muted-foreground">
                Envia dados de novos leads para o webhook
              </p>
            </div>
          </div>
        </div>

        {/* Test Button */}
        <Button 
          variant="outline" 
          className="w-full"
          onClick={handleTest}
          disabled={!webhookUrl || isTesting}
        >
          {isTesting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Testando conexão...
            </>
          ) : (
            <>
              <Send className="w-4 h-4 mr-2" />
              Enviar Teste
            </>
          )}
        </Button>

        {/* Info Box */}
        <div className="p-4 rounded-xl bg-info/10 border border-info/20">
          <p className="text-sm text-info">
            <strong>Dica:</strong> Configure seu fluxo n8n para receber um JSON com os campos: 
            name, phone, email, status, source.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
