import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogOut, Newspaper, Gift, Video, Image, TrendingUp, Webhook } from "lucide-react";
import NewsManager from "@/components/admin/NewsManager";
import PromotionsManager from "@/components/admin/PromotionsManager";
import VideosManager from "@/components/admin/VideosManager";
import BannersManager from "@/components/admin/BannersManager";
import TickerManager from "@/components/admin/TickerManager";
import WebhookSetup from "@/components/admin/WebhookSetup";

const Admin = () => {
  const { user, isAdmin, signOut, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      navigate("/auth");
    }
  }, [user, isAdmin, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Cargando...</p>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Panel de Administración</h1>
          <Button variant="outline" onClick={signOut}>
            <LogOut className="mr-2 h-4 w-4" />
            Cerrar Sesión
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="news" className="w-full">
          <TabsList className="grid w-full grid-cols-6 mb-8">
            <TabsTrigger value="news" className="flex items-center gap-2">
              <Newspaper className="h-4 w-4" />
              Noticias
            </TabsTrigger>
            <TabsTrigger value="promotions" className="flex items-center gap-2">
              <Gift className="h-4 w-4" />
              Promociones
            </TabsTrigger>
            <TabsTrigger value="videos" className="flex items-center gap-2">
              <Video className="h-4 w-4" />
              Videos
            </TabsTrigger>
            <TabsTrigger value="banners" className="flex items-center gap-2">
              <Image className="h-4 w-4" />
              Banners
            </TabsTrigger>
            <TabsTrigger value="ticker" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Ticker
            </TabsTrigger>
            <TabsTrigger value="automation" className="flex items-center gap-2">
              <Webhook className="h-4 w-4" />
              Automatización
            </TabsTrigger>
          </TabsList>

          <TabsContent value="news">
            <NewsManager />
          </TabsContent>

          <TabsContent value="promotions">
            <PromotionsManager />
          </TabsContent>

          <TabsContent value="videos">
            <VideosManager />
          </TabsContent>

          <TabsContent value="banners">
            <BannersManager />
          </TabsContent>

          <TabsContent value="ticker">
            <TickerManager />
          </TabsContent>

          <TabsContent value="automation">
            <WebhookSetup />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
