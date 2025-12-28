import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { 
  Send, 
  Clock, 
  Users, 
  Shield, 
  Play,
  Pause,
  CheckCircle2,
  XCircle,
  Loader2,
  Calendar,
  MessageCircle
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface BroadcastStats {
  total: number;
  sent: number;
  delivered: number;
  failed: number;
}

export function BulkMessaging() {
  const [message, setMessage] = useState("");
  const [humanLikeMode, setHumanLikeMode] = useState(true);
  const [typingStatus, setTypingStatus] = useState(true);
  const [minDelay, setMinDelay] = useState(3);
  const [maxDelay, setMaxDelay] = useState(8);
  const [scheduleEnabled, setScheduleEnabled] = useState(false);
  const [scheduleDate, setScheduleDate] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [stats, setStats] = useState<BroadcastStats | null>(null);
  const { toast } = useToast();

  const handleStartBroadcast = () => {
    if (!message.trim()) {
      toast({
        title: "Mensagem obrigatória",
        description: "Por favor, escreva a mensagem que será enviada.",
        variant: "destructive",
      });
      return;
    }

    if (scheduleEnabled && (!scheduleDate || !scheduleTime)) {
      toast({
        title: "Agendamento incompleto",
        description: "Por favor, selecione data e hora para o agendamento.",
        variant: "destructive",
      });
      return;
    }

    if (scheduleEnabled) {
      toast({
        title: "Broadcast agendado!",
        description: `Envio programado para ${scheduleDate} às ${scheduleTime}.`,
      });
      return;
    }

    // Simulate broadcast
    setIsSending(true);
    setStats({ total: 150, sent: 0, delivered: 0, failed: 0 });

    // Simulate progress
    let sent = 0;
    const interval = setInterval(() => {
      sent += Math.floor(Math.random() * 5) + 1;
      if (sent >= 150) {
        sent = 150;
        clearInterval(interval);
        setIsSending(false);
        toast({
          title: "Broadcast concluído!",
          description: "Todas as mensagens foram enviadas.",
        });
      }
      setStats({
        total: 150,
        sent,
        delivered: Math.floor(sent * 0.95),
        failed: Math.floor(sent * 0.05),
      });
    }, 500);
  };

  const handleStopBroadcast = () => {
    setIsSending(false);
    toast({
      title: "Broadcast pausado",
      description: "O envio foi interrompido.",
      variant: "destructive",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <Card variant="glass" className="animate-fade-in">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-primary/20">
              <Send className="w-6 h-6 text-primary" />
            </div>
            <div>
              <CardTitle>Envio em Massa</CardTitle>
              <CardDescription>
                Envie mensagens para múltiplos contatos com proteção anti-ban
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Message Composer */}
        <div className="lg:col-span-2 space-y-6">
          <Card variant="glass" className="animate-fade-in" style={{ animationDelay: "50ms" }}>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-primary" />
                Mensagem
              </CardTitle>
            </CardHeader>
            <CardContent>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Digite a mensagem que será enviada para todos os contatos selecionados..."
                className="w-full min-h-[200px] px-4 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-y"
              />
              <p className="mt-2 text-xs text-muted-foreground">
                Use {"{nome}"} para personalizar com o nome do contato
              </p>
            </CardContent>
          </Card>

          {/* Scheduling */}
          <Card variant="glass" className="animate-fade-in" style={{ animationDelay: "100ms" }}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  Agendamento
                </CardTitle>
                <Switch
                  checked={scheduleEnabled}
                  onCheckedChange={setScheduleEnabled}
                />
              </div>
            </CardHeader>
            {scheduleEnabled && (
              <CardContent>
                <div className="flex flex-wrap gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Data
                    </label>
                    <input
                      type="date"
                      value={scheduleDate}
                      onChange={(e) => setScheduleDate(e.target.value)}
                      className="h-11 px-4 rounded-lg bg-secondary border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Hora
                    </label>
                    <input
                      type="time"
                      value={scheduleTime}
                      onChange={(e) => setScheduleTime(e.target.value)}
                      className="h-11 px-4 rounded-lg bg-secondary border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                </div>
              </CardContent>
            )}
          </Card>
        </div>

        {/* Settings & Stats */}
        <div className="space-y-6">
          {/* Anti-Ban Settings */}
          <Card variant="glass" className="animate-fade-in" style={{ animationDelay: "150ms" }}>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Shield className="w-5 h-5 text-success" />
                Proteção Anti-Ban
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-secondary">
                <div>
                  <p className="font-medium text-foreground">Modo Humanizado</p>
                  <p className="text-xs text-muted-foreground">Delays aleatórios entre mensagens</p>
                </div>
                <Switch
                  checked={humanLikeMode}
                  onCheckedChange={setHumanLikeMode}
                />
              </div>

              {humanLikeMode && (
                <div className="p-3 rounded-lg bg-secondary space-y-3">
                  <p className="text-sm font-medium text-foreground">Intervalo entre mensagens</p>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={minDelay}
                      onChange={(e) => setMinDelay(parseInt(e.target.value) || 1)}
                      className="w-16 h-9 px-2 rounded-lg bg-background border border-border text-center text-foreground"
                      min="1"
                    />
                    <span className="text-muted-foreground">a</span>
                    <input
                      type="number"
                      value={maxDelay}
                      onChange={(e) => setMaxDelay(parseInt(e.target.value) || 1)}
                      className="w-16 h-9 px-2 rounded-lg bg-background border border-border text-center text-foreground"
                      min="1"
                    />
                    <span className="text-muted-foreground">segundos</span>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between p-3 rounded-lg bg-secondary">
                <div>
                  <p className="font-medium text-foreground">Status "Digitando..."</p>
                  <p className="text-xs text-muted-foreground">Simula digitação antes de enviar</p>
                </div>
                <Switch
                  checked={typingStatus}
                  onCheckedChange={setTypingStatus}
                />
              </div>
            </CardContent>
          </Card>

          {/* Stats */}
          {stats && (
            <Card variant="glass" className="animate-fade-in">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  Relatório
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Total</span>
                  <Badge variant="secondary">{stats.total}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <Loader2 className={cn("w-4 h-4", isSending && "animate-spin")} />
                    Enviados
                  </span>
                  <Badge variant="outline" className="bg-primary/10 text-primary">
                    {stats.sent}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-success" />
                    Entregues
                  </span>
                  <Badge variant="outline" className="bg-success/10 text-success">
                    {stats.delivered}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <XCircle className="w-4 h-4 text-destructive" />
                    Falhas
                  </span>
                  <Badge variant="outline" className="bg-destructive/10 text-destructive">
                    {stats.failed}
                  </Badge>
                </div>

                {/* Progress bar */}
                <div className="mt-4">
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary transition-all duration-300"
                      style={{ width: `${(stats.sent / stats.total) * 100}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 text-center">
                    {Math.round((stats.sent / stats.total) * 100)}% concluído
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Action Button */}
          <Button 
            className="w-full h-12"
            onClick={isSending ? handleStopBroadcast : handleStartBroadcast}
            variant={isSending ? "destructive" : "default"}
          >
            {isSending ? (
              <>
                <Pause className="w-5 h-5 mr-2" />
                Pausar Envio
              </>
            ) : scheduleEnabled ? (
              <>
                <Calendar className="w-5 h-5 mr-2" />
                Agendar Broadcast
              </>
            ) : (
              <>
                <Play className="w-5 h-5 mr-2" />
                Iniciar Broadcast
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Warning */}
      <div className="p-4 rounded-xl bg-warning/10 border border-warning/20">
        <p className="text-sm text-warning">
          <strong>Atenção:</strong> Envie mensagens apenas para contatos que autorizaram o recebimento. 
          O modo humanizado ajuda a evitar bloqueios, mas use com responsabilidade.
        </p>
      </div>
    </div>
  );
}
