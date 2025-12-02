import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import tiendaBackground from "@/assets/tienda-background.png";

const TiendaSection = () => {
  return (
    <section id="tienda" className="min-h-screen py-32 bg-muted/50 relative overflow-hidden flex items-center">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${tiendaBackground})` }}></div>
      <div className="absolute inset-0 bg-black/30"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl">
          <h2 className="text-4xl font-bold mb-4 text-white">Vístete Chido.</h2>
          <p className="text-xl mb-8 text-white/90">
            Visita nuestra tienda y encuentra playeras, gorras, y mercancía exclusiva del show. ¡Lleva tu estilo Erazno a todas partes!
          </p>
          <Button 
            size="lg" 
            className="text-lg px-8 py-6 shadow-glow hover:scale-105 transition-transform bg-accent text-accent-foreground hover:bg-accent/90 font-bold flex items-center gap-3"
          >
            Visitar Tienda
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TiendaSection;
