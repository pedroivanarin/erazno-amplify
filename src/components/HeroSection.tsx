import { Button } from "./ui/button";
import heroBackground from "@/assets/hero-background.png";
import { Play } from "lucide-react";

const HeroSection = () => {
  const scrollToPodcast = () => {
    document.getElementById("podcast")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBackground})` }}
      ></div>
      <div className="absolute inset-0 bg-black/30"></div>
      
      <div className="container mx-auto px-4 relative z-10 animate-slide-up">
        <div className="max-w-2xl">
          <p className="text-sm md:text-base uppercase tracking-wider text-accent font-semibold mb-3">
            Episodio Especial.
          </p>
          <h1 className="text-[2.7rem] md:text-[4.05rem] font-black mb-6 text-white drop-shadow-lg leading-tight">
            Desde Las Vegas <br />
            en los Latin Grammy
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90">
            Platicamos con Luciano Luna, Mar Solis, Regulo Caro, Danny Lux, Alison Solis, Banda Renovación y más...
          </p>
          <Button 
            onClick={scrollToPodcast}
            size="lg" 
            className="text-lg px-8 py-6 shadow-glow hover:scale-105 transition-transform bg-accent text-accent-foreground hover:bg-accent/90 font-bold flex items-center gap-3"
          >
            Escúchalo ahora
            <Play className="h-5 w-5 fill-current" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
