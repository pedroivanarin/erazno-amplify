import { Calendar, TrendingUp } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";

const NewsSection = () => {
  const newsItems = [
    {
      id: 1,
      title: "¡Nuevo segmento en el show!",
      excerpt: "Esta semana estrenamos un nuevo segmento donde responderemos todas sus preguntas...",
      image: "https://images.unsplash.com/photo-1589903308904-1010c2294adc?w=400",
      date: "Hace 2 horas",
    },
    {
      id: 2,
      title: "Entrevista exclusiva con artista sorpresa",
      excerpt: "No se pierdan la entrevista más esperada de la semana este viernes...",
      image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400",
      date: "Hace 5 horas",
    },
    {
      id: 3,
      title: "Los mejores momentos de la semana",
      excerpt: "Revive los momentos más divertidos y controversiales de esta semana...",
      image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400",
      date: "Hace 1 día",
    },
  ];

  return (
    <section id="las-10" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-4xl font-bold mb-2">Las 10 de Erazno</h2>
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
                  src={item.image}
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
                  {item.date}
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
