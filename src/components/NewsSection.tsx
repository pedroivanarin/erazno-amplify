import { Calendar, TrendingUp } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "./ui/carousel";
import { useState, useEffect } from "react";

const NewsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [api, setApi] = useState<CarouselApi>();
  
  useEffect(() => {
    if (!api) return;
    
    setCurrentIndex(api.selectedScrollSnap());
    
    api.on("select", () => {
      setCurrentIndex(api.selectedScrollSnap());
    });
  }, [api]);
  
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
          <Carousel 
            opts={{ loop: true }}
            className="w-full"
            setApi={setApi}
          >
            <CarouselContent className="py-12">
              {newsItems.map((item, index) => {
                const position = index - currentIndex;
                const isCenter = position === 0;
                
                // Calculate transform based on position
                let rotateY = 0;
                let translateX = 0;
                let translateZ = 0;
                let scale = 1;
                let opacity = 1;
                
                if (position === 0) {
                  // Center card
                  scale = 1.2;
                  translateZ = 100;
                } else if (Math.abs(position) === 1) {
                  // Adjacent cards
                  rotateY = position * 35;
                  translateX = position * 50;
                  translateZ = -50;
                  scale = 0.85;
                  opacity = 0.7;
                } else if (Math.abs(position) === 2) {
                  // Cards further out
                  rotateY = position * 50;
                  translateX = position * 100;
                  translateZ = -100;
                  scale = 0.7;
                  opacity = 0.5;
                } else {
                  // Hidden cards
                  rotateY = position * 60;
                  translateX = position * 120;
                  translateZ = -150;
                  scale = 0.6;
                  opacity = 0.3;
                }

                return (
                  <CarouselItem 
                    key={item.id}
                    className="basis-full md:basis-1/3 lg:basis-1/3"
                    style={{
                      transform: `
                        perspective(1000px)
                        rotateY(${rotateY}deg)
                        translateX(${translateX}px)
                        translateZ(${translateZ}px)
                        scale(${scale})
                      `,
                      opacity: opacity,
                      transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                      transformStyle: 'preserve-3d',
                    }}
                  >
                    <Card 
                      className={`overflow-hidden transition-all duration-500 cursor-pointer border-border mx-4 ${
                        isCenter ? 'shadow-glow ring-2 ring-primary/50' : 'shadow-md'
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
                        <h3 className={`text-lg font-bold transition-colors ${
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
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
