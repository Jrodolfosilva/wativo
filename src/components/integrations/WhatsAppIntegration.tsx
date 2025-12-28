import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { QrCode, Check, RefreshCw, Smartphone, Wifi, WifiOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { QrStatus, Whatsapp } from "./getApiWhatsApp";

export function WhatsAppIntegration() {

  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showQR, setShowQR] = useState<string | false>("");


  const handleConnect = async(event?: React.FormEvent<HTMLFormElement>) => {
   
    event?.preventDefault();
    setIsLoading(true);

    if(event){
      const key = event.currentTarget.number?.value;
      const whatsapp = new Whatsapp(key);
      const qr: string = await whatsapp.initSession().finally(()=>{
        setIsLoading(false);
      });

      if(qr){
        setShowQR(qr);

        
      }   
        teste()
      
    }
    
   
   
  };


  function teste (){
    setTimeout(() => {
          console.log(showQR)
        }, 10000);
  }


  return (
    <Card variant="glass" className="animate-fade-in">

       {showQR && <img src={`${showQR}`} />}




      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={cn(
              "p-2.5 rounded-xl",
              isConnected ? "bg-success/20" : "bg-primary/20"
            )}>
              <Smartphone className={cn(
                "w-6 h-6",
                isConnected ? "text-success" : "text-primary"
              )} />
            </div>
            <div>
              <CardTitle className="flex items-center gap-2">
                WhatsApp Business
                <Badge 
                  variant="outline" 
                  className={cn(
                    "ml-2",
                    isConnected 
                      ? "bg-success/20 text-success border-success/30" 
                      : "bg-muted text-muted-foreground border-muted"
                  )}
                >
                  {isConnected ? (
                    <><Wifi className="w-3 h-3 mr-1" /> Conectado</>
                  ) : (
                    <><WifiOff className="w-3 h-3 mr-1" /> Desconectado</>
                  )}
                </Badge>
              </CardTitle>
              <CardDescription>
                Conecte seu WhatsApp para enviar e receber mensagens automaticamente
              </CardDescription>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {!isConnected && !showQR && (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <QrCode className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Conectar WhatsApp</h3>
            <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto">
              Escaneie o QR Code com seu WhatsApp para conectar sua conta e começar a receber leads automaticamente.
            </p>
            <form onSubmit={handleConnect}>
              <input type="text" placeholder="5511999990000" id="number" name="number" required className="mr-4 mb-4 px-4 py-2 border border-muted rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
              <Button variant="glow" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Gerando QR Code...
                  </>
                ) : (
                  <>
                    <QrCode className="w-4 h-4 mr-2" />
                    Gerar QR Code
                  </>
                )}
              </Button>
            </form>
          </div>
        )}

        {showQR && !isConnected && (
          <div className="text-center py-8">
            <div className="relative inline-block">
              {/* Mock QR Code */}
              <div className="w-48 h-48 bg-foreground rounded-xl p-3 mx-auto mb-4 relative overflow-hidden">
                <div className="w-full h-full bg-background rounded-lg flex items-center justify-center">
                  <div className="grid grid-cols-8 gap-0.5">
                   
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2">
                <div className="w-3 h-3 bg-primary rounded-full animate-pulse" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Escaneie o código com seu WhatsApp
            </p>
            <div className="flex gap-2 justify-center">
              <Button variant="outline" >
                Cancelar
              </Button>
              <Button variant="glow" >
                <Check className="w-4 h-4 mr-2" />
                Simular Conexão
              </Button>
            </div>
          </div>
        )}

        {isConnected && (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-xl bg-success/10 border border-success/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center">
                  <Check className="w-5 h-5 text-success" />
                </div>
                <div>
                  <p className="font-medium text-foreground">+55 11 99999-0000</p>
                  <p className="text-sm text-muted-foreground">Conectado há 2 horas</p>
                </div>
              </div>
              <Button variant="outline" size="sm" >
                Desconectar
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 rounded-xl bg-secondary">
                <p className="text-2xl font-bold text-foreground">247</p>
                <p className="text-sm text-muted-foreground">Mensagens Hoje</p>
              </div>
              <div className="text-center p-4 rounded-xl bg-secondary">
                <p className="text-2xl font-bold text-foreground">18</p>
                <p className="text-sm text-muted-foreground">Novos Leads</p>
              </div>
              <div className="text-center p-4 rounded-xl bg-secondary">
                <p className="text-2xl font-bold text-foreground">98%</p>
                <p className="text-sm text-muted-foreground">Taxa Entrega</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
