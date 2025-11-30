import { ShoppingBag, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

const TiendaSection = () => {
  return (
    <section id="tienda" className="py-16 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="relative overflow-hidden rounded-2xl shadow-card">
            <div className="absolute inset-0 gradient-hero opacity-90"></div>
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=1200')] bg-cover bg-center opacity-20"></div>
            
            <div className="relative z-10 p-12 text-center text-white">
              <ShoppingBag className="h-16 w-16 mx-auto mb-6" />
              <h2 className="text-4xl font-bold mb-4">Tienda Oficial</h2>
              <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
                Playeras, gorras, y mercancía exclusiva del show. 
                ¡Lleva tu estilo Erazno a todas partes!
              </p>
              <Button size="lg" variant="secondary" className="shadow-glow">
                Visitar Tienda
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TiendaSection;
