import { Calendar } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";
import { useState } from "react";

const NewsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const { data: newsItems, isLoading } = useQuery({
    queryKey: ["news-posts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("news_posts")
        .select("*")
        .eq("published", true)
        .order("created_at", { ascending: false })
        .limit(10);

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
          <h2 className="text-4xl font-bold mb-8 text-center">Las 10 de Erazno</h2>
          <p className="text-center text-muted-foreground">No hay noticias disponibles en este momento.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="las-10" className="py-20 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-3">Las 10 de Erazno</h2>
          <p className="text-muted-foreground text-lg">Las últimas noticias y momentos del show</p>
        </div>

        <div className="relative max-w-7xl mx-auto">
          <div className="relative h-[500px] flex items-center justify-center">
            {/* All cards rendered at once with absolute positioning */}
            {newsItems.map((item, index) => {
              const position = index - currentIndex;
              const isCenter = position === 0;
              
              // Calculate horizontal fan layout
              let translateX = 0;
              let translateY = 0;
              let scale = 1;
              let opacity = 1;
              let zIndex = 50;
              let rotate = 0;
              
              if (position === 0) {
                // Center card - featured and largest
                scale = 1.1;
                zIndex = 100;
                opacity = 1;
              } else if (Math.abs(position) === 1) {
                // Adjacent cards - slightly smaller and offset
                translateX = position * 240;
                translateY = Math.abs(position) * 30;
                rotate = position * 8;
                scale = 0.85;
                opacity = 0.95;
                zIndex = 90;
              } else if (Math.abs(position) === 2) {
                // Further cards
                translateX = position * 360;
                translateY = Math.abs(position) * 50;
                rotate = position * 12;
                scale = 0.75;
                opacity = 0.8;
                zIndex = 80;
              } else if (Math.abs(position) === 3) {
                // Even further
                translateX = position * 440;
                translateY = Math.abs(position) * 60;
                rotate = position * 15;
                scale = 0.65;
                opacity = 0.6;
                zIndex = 70;
              } else {
                // Hidden cards
                translateX = position * 500;
                translateY = Math.abs(position) * 70;
                rotate = position * 18;
                scale = 0.55;
                opacity = 0.4;
                zIndex = 60;
              }

              return (
                <div
                  key={item.id}
                  className="absolute inset-0 flex items-center justify-center pointer-events-none"
                  style={{
                    transform: `
                      translateX(${translateX}px)
                      translateY(${translateY}px)
                      rotate(${rotate}deg)
                      scale(${scale})
                    `,
                    opacity: opacity,
                    transition: 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                    zIndex: zIndex,
                  }}
                >
                  <Card 
                    className={`overflow-hidden transition-all duration-500 cursor-pointer border-border w-[320px] pointer-events-auto ${
                      isCenter ? 'shadow-glow ring-2 ring-primary/50' : 'shadow-lg'
                    }`}
                  >
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={item.image_url}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500"
                      />
                    </div>
                    <CardHeader className="pb-3">
                      <h3 className={`text-lg font-bold transition-colors line-clamp-2 ${
                        isCenter ? 'text-primary' : ''
                      }`}>
                        {item.title}
                      </h3>
                    </CardHeader>
                    <CardContent className="pb-3">
                      <p className="text-sm text-muted-foreground line-clamp-2">{item.excerpt}</p>
                    </CardContent>
                    <CardFooter>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3 mr-1" />
                        {formatDistanceToNow(new Date(item.created_at), {
                          addSuffix: true,
                          locale: es,
                        })}
                      </div>
                    </CardFooter>
                  </Card>
                </div>
              );
            })}
          </div>
          
          {/* Navigation Buttons */}
          <button
            onClick={() => {
              const newIndex = currentIndex - 1;
              setCurrentIndex(newIndex < 0 ? newsItems.length - 1 : newIndex);
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-[110] bg-background/80 backdrop-blur-sm border border-border rounded-full p-3 hover:bg-background transition-colors shadow-lg"
            aria-label="Previous"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          
          <button
            onClick={() => {
              setCurrentIndex((currentIndex + 1) % newsItems.length);
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-[110] bg-background/80 backdrop-blur-sm border border-border rounded-full p-3 hover:bg-background transition-colors shadow-lg"
            aria-label="Next"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
