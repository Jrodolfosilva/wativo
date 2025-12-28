import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { 
  Mail, 
  Plus, 
  Clock, 
  Trash2, 
  GripVertical,
  ChevronDown,
  ChevronUp,
  Save,
  Play,
  Pause
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface SequenceStep {
  id: string;
  order: number;
  message: string;
  delayValue: number;
  delayUnit: "minutes" | "hours" | "days";
  isActive: boolean;
}

const defaultSteps: SequenceStep[] = [
  {
    id: "1",
    order: 1,
    message: "Olá! 👋 Obrigado pelo seu interesse. Como posso ajudá-lo hoje?",
    delayValue: 0,
    delayUnit: "minutes",
    isActive: true,
  },
  {
    id: "2",
    order: 1,
    message: "Olá! 👋Como posso ajudá-lo hoje?",
    delayValue: 0,
    delayUnit: "minutes",
    isActive: true,
  },
];

export function MessageSequencer() {
  const [steps, setSteps] = useState<SequenceStep[]>(defaultSteps);
  const [sequenceName, setSequenceName] = useState("Nova Sequência");
  const [isSequenceActive, setIsSequenceActive] = useState(false);
  const [expandedStep, setExpandedStep] = useState<string | null>("1");
  const { toast } = useToast();

  const addStep = () => {
    if (steps.length >= 7) {
      toast({
        title: "Limite atingido",
        description: "Você pode adicionar no máximo 7 mensagens por sequência.",
        variant: "destructive",
      });
      return;
    }

    const newStep: SequenceStep = {
      id: Date.now().toString(),
      order: steps.length + 1,
      message: "",
      delayValue: 24,
      delayUnit: "hours",
      isActive: true,
    };

    setSteps([...steps, newStep]);
    setExpandedStep(newStep.id);
  };

  const removeStep = (id: string) => {
    if (steps.length <= 1) {
      toast({
        title: "Ação não permitida",
        description: "A sequência precisa ter pelo menos uma mensagem.",
        variant: "destructive",
      });
      return;
    }

    setSteps(steps.filter((s) => s.id !== id).map((s, i) => ({ ...s, order: i + 1 })));
  };

  const updateStep = (id: string, updates: Partial<SequenceStep>) => {
    setSteps(steps.map((s) => (s.id === id ? { ...s, ...updates } : s)));
  };

  const moveStep = (id: string, direction: "up" | "down") => {
    const index = steps.findIndex((s) => s.id === id);
    if (
      (direction === "up" && index === 0) ||
      (direction === "down" && index === steps.length - 1)
    ) {
      return;
    }

    const newSteps = [...steps];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    [newSteps[index], newSteps[targetIndex]] = [newSteps[targetIndex], newSteps[index]];
    setSteps(newSteps.map((s, i) => ({ ...s, order: i + 1 })));
  };

  const handleSave = () => {
    toast({
      title: "Sequência salva!",
      description: `"${sequenceName}" foi salva com ${steps.length} mensagens.`,
    });
  };

  const getDelayText = (step: SequenceStep) => {
    if (step.order === 1) return "Imediato";
    const unitLabels = { minutes: "min", hours: "h", days: "d" };
    return `+${step.delayValue}${unitLabels[step.delayUnit]}`;
  };

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <Card variant="glass" className="animate-fade-in">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-primary/20">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <div>
                <CardTitle className="flex items-center gap-2">
                  Sequenciador de Mensagens
                  <Badge 
                    variant="outline" 
                    className={cn(
                      "ml-2",
                      isSequenceActive
                        ? "bg-success/20 text-success border-success/30" 
                        : "bg-muted text-muted-foreground border-muted"
                    )}
                  >
                    {isSequenceActive ? "Ativo" : "Inativo"}
                  </Badge>
                </CardTitle>
                <CardDescription>
                  Crie fluxos de nutrição com até 7 mensagens automáticas
                </CardDescription>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Switch
                checked={isSequenceActive}
                onCheckedChange={setIsSequenceActive}
              />
              <Button onClick={handleSave}>
                <Save className="w-4 h-4 mr-2" />
                Salvar
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Nome da Sequência
            </label>
            <input
              type="text"
              value={sequenceName}
              onChange={(e) => setSequenceName(e.target.value)}
              className="w-full max-w-md h-11 px-4 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
            />
          </div>
        </CardContent>
      </Card>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border" />

        {/* Steps */}
        <div className="space-y-4">
          {steps.map((step, index) => (
            <Card 
              key={step.id} 
              variant="glass" 
              className="animate-fade-in relative ml-4"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Timeline dot */}
              <div className={cn(
                "absolute -left-4 top-6 w-4 h-4 rounded-full border-2 border-background",
                step.isActive ? "bg-primary" : "bg-muted"
              )} />

              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <GripVertical className="w-5 h-5 text-muted-foreground cursor-grab" />
                    <Badge variant="secondary" className="bg-primary/10 text-primary">
                      Passo {step.order}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      <Clock className="w-3 h-3 mr-1" />
                      {getDelayText(step)}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={step.isActive}
                      onCheckedChange={(checked) => updateStep(step.id, { isActive: checked })}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => moveStep(step.id, "up")}
                      disabled={index === 0}
                    >
                      <ChevronUp className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => moveStep(step.id, "down")}
                      disabled={index === steps.length - 1}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setExpandedStep(expandedStep === step.id ? null : step.id)}
                    >
                      {expandedStep === step.id ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeStep(step.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              {expandedStep === step.id && (
                <CardContent className="space-y-4 pt-2">
                  {/* Delay settings (not for first step) */}
                  {step.order > 1 && (
                    <div className="flex items-center gap-4">
                      <label className="text-sm font-medium text-foreground whitespace-nowrap">
                        Enviar após:
                      </label>
                      <input
                        type="number"
                        value={step.delayValue}
                        onChange={(e) => updateStep(step.id, { delayValue: parseInt(e.target.value) || 0 })}
                        className="w-20 h-10 px-3 rounded-lg bg-secondary border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                        min="1"
                      />
                      <select
                        value={step.delayUnit}
                        onChange={(e) => updateStep(step.id, { delayUnit: e.target.value as SequenceStep["delayUnit"] })}
                        className="h-10 px-3 rounded-lg bg-secondary border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                      >
                        <option value="minutes">Minutos</option>
                        <option value="hours">Horas</option>
                        <option value="days">Dias</option>
                      </select>
                    </div>
                  )}

                  {/* Message content */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Mensagem
                    </label>
                    <textarea
                      value={step.message}
                      onChange={(e) => updateStep(step.id, { message: e.target.value })}
                      placeholder="Digite a mensagem que será enviada..."
                      className="w-full min-h-[120px] px-4 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-y"
                    />
                    <p className="mt-1 text-xs text-muted-foreground">
                      Use {"{nome}"} para personalizar com o nome do lead
                    </p>
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>

        {/* Add step button */}
        <div className="relative ml-4 mt-4">
          <div className={cn(
            "absolute -left-4 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-dashed",
            steps.length < 7 ? "border-primary/50" : "border-muted"
          )} />
          <Button
            variant="outline"
            className="w-full border-dashed"
            onClick={addStep}
            disabled={steps.length >= 7}
          >
            <Plus className="w-4 h-4 mr-2" />
            Adicionar Mensagem ({steps.length}/7)
          </Button>
        </div>
      </div>

      {/* Info box */}
      <div className="p-4 rounded-xl bg-info/10 border border-info/20">
        <p className="text-sm text-info">
          <strong>Dica:</strong> Sequências são executadas automaticamente quando um novo lead entra no sistema. 
          Configure intervalos estratégicos para maximizar o engajamento.
        </p>
      </div>
    </div>
  );
}
