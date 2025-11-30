import { Gift, ExternalLink } from "lucide-react";
import { Button } from "./ui/button";

const PromotionsSection = () => {
  const promotions = [
    {
      id: 1,
      title: "¡Gana Boletos para el Concierto!",
      description: "Escucha y participa para ganar pases dobles",
      image: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=600",
    },
    {
      id: 2,
      title: "Sorteo Mensual de $1000",
      description: "Regístrate y participa automáticamente",
      image: "https://images.unsplash.com/photo-1607863680198-23d4b2565df0?w=600",
    },
  ];

  return (
    <section id="promociones" className="py-16 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-secondary/10 rounded-full mb-4">
            <Gift className="h-8 w-8 text-secondary" />
          </div>
          <h2 className="text-4xl font-bold mb-4">Promociones Activas</h2>
          <p className="text-muted-foreground">¡No te pierdas estas increíbles oportunidades!</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {promotions.map((promo) => (
            <div
              key={promo.id}
              className="relative overflow-hidden rounded-xl shadow-card group cursor-pointer"
            >
              <div className="absolute inset-0">
                <img
                  src={promo.image}
                  alt={promo.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
              </div>
              
              <div className="relative p-8 min-h-[300px] flex flex-col justify-end">
                <h3 className="text-3xl font-bold mb-2 text-white">{promo.title}</h3>
                <p className="text-white/80 mb-4">{promo.description}</p>
                <Button className="w-fit" variant="secondary">
                  Participar Ahora
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PromotionsSection;
