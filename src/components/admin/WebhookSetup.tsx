import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Webhook, Copy, CheckCircle2, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const WebhookSetup = () => {
  const [testMessage, setTestMessage] = useState("🔥 Post de prueba desde las redes sociales");
  const [testPlatform, setTestPlatform] = useState("instagram");
  const [isLoading, setIsLoading] = useState(false);

  const webhookUrl = `${window.location.origin.replace(/:\d+/, '')}.supabase.co/functions/v1/social-post-webhook`;
  const actualWebhookUrl = "https://vdmhirxnhxdxukdkbixw.supabase.co/functions/v1/social-post-webhook";

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("URL copiada al portapapeles");
  };

  const testWebhook = async () => {
    if (!testMessage.trim()) {
      toast.error("Por favor ingresa un mensaje de prueba");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(actualWebhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: testMessage,
          platform: testPlatform,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("¡Mensaje enviado! Revisa el ticker en la página principal");
        setTestMessage("");
      } else {
        toast.error(`Error: ${data.error || 'Error desconocido'}`);
      }
    } catch (error) {
      console.error("Error testing webhook:", error);
      toast.error("Error al enviar el mensaje. Verifica la consola para más detalles.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Webhook className="h-6 w-6 text-primary" />
          Automatización de Redes Sociales
        </h2>
        <p className="text-muted-foreground text-sm mt-1">
          Conecta tus redes sociales para que los posts aparezcan automáticamente en el ticker
        </p>
      </div>

      <Tabs defaultValue="test" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="test">Probar Webhook</TabsTrigger>
          <TabsTrigger value="zapier">Zapier</TabsTrigger>
          <TabsTrigger value="n8n">n8n</TabsTrigger>
        </TabsList>

        <TabsContent value="test" className="space-y-4">
          <Card className="border-border">
            <CardHeader>
              <CardTitle>Probar el Webhook</CardTitle>
              <CardDescription>
                Envía un mensaje de prueba para verificar que todo funciona
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="test-message">Mensaje</Label>
                <Input
                  id="test-message"
                  value={testMessage}
                  onChange={(e) => setTestMessage(e.target.value)}
                  placeholder="🔥 Mensaje de prueba"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="test-platform">Plataforma</Label>
                <select
                  id="test-platform"
                  value={testPlatform}
                  onChange={(e) => setTestPlatform(e.target.value)}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background"
                >
                  <option value="facebook">📘 Facebook</option>
                  <option value="instagram">📸 Instagram</option>
                  <option value="twitter">🐦 Twitter</option>
                  <option value="linkedin">💼 LinkedIn</option>
                  <option value="tiktok">🎵 TikTok</option>
                </select>
              </div>

              <Button onClick={testWebhook} disabled={isLoading} className="w-full">
                {isLoading ? "Enviando..." : "Enviar Mensaje de Prueba"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="zapier" className="space-y-4">
          <Card className="border-border">
            <CardHeader>
              <CardTitle>Configuración con Zapier</CardTitle>
              <CardDescription>La forma más fácil de automatizar</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>URL del Webhook</Label>
                <div className="flex gap-2">
                  <Input
                    value={actualWebhookUrl}
                    readOnly
                    className="font-mono text-sm"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => copyToClipboard(actualWebhookUrl)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="bg-muted p-4 rounded-lg space-y-2">
                <h4 className="font-semibold">Pasos para Zapier:</h4>
                <ol className="list-decimal list-inside space-y-1 text-sm">
                  <li>Crea una cuenta en <a href="https://zapier.com" target="_blank" className="text-primary hover:underline">zapier.com</a></li>
                  <li>Crea un nuevo Zap</li>
                  <li><strong>Trigger</strong>: Selecciona tu red social (ej: "Facebook Pages" → "New Post")</li>
                  <li><strong>Action</strong>: "Webhooks by Zapier" → "POST"</li>
                  <li>Pega la URL de arriba</li>
                  <li>En el payload JSON agrega:
                    <pre className="bg-background p-2 rounded mt-2 text-xs overflow-x-auto">
{`{
  "message": "[texto del post]",
  "platform": "facebook"
}`}
                    </pre>
                  </li>
                  <li>Prueba y activa el Zap</li>
                </ol>
              </div>

              <Button
                variant="secondary"
                className="w-full"
                onClick={() => window.open("https://zapier.com/apps/webhooks/integrations", "_blank")}
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Abrir Zapier
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="n8n" className="space-y-4">
          <Card className="border-border">
            <CardHeader>
              <CardTitle>Configuración con n8n</CardTitle>
              <CardDescription>Para usuarios más avanzados</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>URL del Webhook</Label>
                <div className="flex gap-2">
                  <Input
                    value={actualWebhookUrl}
                    readOnly
                    className="font-mono text-sm"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => copyToClipboard(actualWebhookUrl)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="bg-muted p-4 rounded-lg space-y-2">
                <h4 className="font-semibold">Pasos para n8n:</h4>
                <ol className="list-decimal list-inside space-y-1 text-sm">
                  <li>Instala n8n: <code className="bg-background px-1 rounded">npm install -g n8n</code></li>
                  <li>O usa <a href="https://n8n.cloud" target="_blank" className="text-primary hover:underline">n8n.cloud</a></li>
                  <li>Crea un nuevo workflow</li>
                  <li>Agrega un trigger de tu red social</li>
                  <li>Agrega un nodo "HTTP Request":
                    <ul className="list-disc list-inside ml-4 mt-1">
                      <li>Method: POST</li>
                      <li>URL: (la de arriba)</li>
                      <li>Body: JSON con message y platform</li>
                    </ul>
                  </li>
                  <li>Activa el workflow</li>
                </ol>
              </div>

              <Button
                variant="secondary"
                className="w-full"
                onClick={() => window.open("https://n8n.io", "_blank")}
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Ir a n8n.io
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card className="border-green-500/50 bg-green-500/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-600 dark:text-green-400">
            <CheckCircle2 className="h-5 w-5" />
            Funcionalidades Automáticas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-1 text-sm text-muted-foreground">
            <li>✓ Agrega emojis según la plataforma automáticamente</li>
            <li>✓ Limita mensajes a 280 caracteres (perfecto para tickers)</li>
            <li>✓ Mantiene solo los últimos 20 mensajes activos</li>
            <li>✓ Desactiva mensajes antiguos automáticamente</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default WebhookSetup;
