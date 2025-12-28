import { error } from "console";
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
export type InitResponse = {
  error: boolean;
  message: string;
  key: string;
  webhook: {
    enabled: boolean;
    webhookUrl: null | string;
  };
  qrcode: {
    url: string;
  };
  browser: {
    platform: string;
    browser: string;
    version: string;
  };
};

export type QrStatus = {
  QrCode: Promise<string | undefined>;
};
const url = import.meta.env.VITE_URL_INSTANCE_WHATSAPP;

export class Whatsapp {
  private apiUrl: string;
  public key: string;

  constructor(key: string) {
    this.apiUrl = url || "";
    this.key = key;
  }

  public async initSession() {
    if (!this.apiUrl) {
      throw new Error("API URL is not defined");
    }
    try {
      const qrcode = await fetch(`${this.apiUrl}/init?key=${this.key}`);

      const data = await qrcode.json();

      return await this.buscarQrCode(data);
    } catch (error) {
      console.log(error);
      return "Erro na requisição";
    }
  }

  public async buscarQrCode(data: InitResponse): Promise<string> {
    const urlQR = data.qrcode.url;
    if (!urlQR) return;

    await delay(2000); // Aguarda 2 segundos antes de fazer a requisição

    try {
      const response = await fetch(urlQR);
      const htmlTexto = await response.text(); // Pega o retorno como string
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlTexto, "text/html");
      const imgElement = doc.getElementById("qrcode_box");

      if (imgElement) {
        const qrCodeBase64 = imgElement.getAttribute("src");
        console.log(imgElement);
        console.log("Sucesso! O Base64 começa com:", qrCodeBase64);
        return qrCodeBase64;
      } else {
        console.error("Imagem do QR Code não encontrada no HTML retornado.");
        return "Imagem do QR Code não encontrada";
      }
    } catch (erro) {
      console.error("Erro na requisição:", erro);
      return "Erro na requisição";
    }
  }
}

