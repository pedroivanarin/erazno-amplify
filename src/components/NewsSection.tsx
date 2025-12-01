import { Calendar, TrendingUp } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";

const NewsSection = () => {
  const { data: newsItems, isLoading } = useQuery({
    queryKey: ["news-posts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("news_posts")
        .select("*")
        .eq("published", true)
        .order("created_at", { ascending: false })
        .limit(6);

      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return (
      <section id="las-10" className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <p className="text-center text-muted-foreground">Cargando noticias...</p>
        </div>
      </section>
    );
  }

  if (!newsItems || newsItems.length === 0) {
    return (
      <section id="las-10" className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-8">Las 10 de Abner</h2>
          <p className="text-center text-muted-foreground">No hay noticias disponibles en este momento.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="las-10" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-4xl font-bold mb-2">Las 10 de Abner</h2>
            <p className="text-muted-foreground">Las últimas noticias y momentos del show</p>
          </div>
          <Badge variant="outline" className="hidden md:flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            En Tendencia
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsItems.map((item, index) => (
            <Card 
              key={item.id} 
              className="overflow-hidden hover:shadow-glow transition-all duration-300 cursor-pointer group animate-fade-in border-border"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={item.image_url}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <CardHeader>
                <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{item.excerpt}</p>
              </CardContent>
              <CardFooter>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-2" />
                  {formatDistanceToNow(new Date(item.created_at), {
                    addSuffix: true,
                    locale: es,
                  })}
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
