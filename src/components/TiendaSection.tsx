import { ShoppingBag, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import tiendaBackground from "@/assets/tienda-background.png";

const TiendaSection = () => {
  return (
    <section id="tienda" className="min-h-screen py-32 bg-muted/50 relative overflow-hidden flex items-center">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${tiendaBackground})` }}></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl">
          <ShoppingBag className="h-16 w-16 mb-6 text-white" />
          <h2 className="text-4xl font-bold mb-4 text-white">Tienda Oficial</h2>
          <p className="text-xl mb-8 text-white/90">
            Playeras, gorras, y mercancía exclusiva del show. 
            ¡Lleva tu estilo Erazno a todas partes!
          </p>
          <Button size="lg" variant="secondary" className="shadow-glow">
            Visitar Tienda
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TiendaSection;
