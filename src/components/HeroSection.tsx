import { Button } from "./ui/button";
import { ChevronDown } from "lucide-react";

const HeroSection = () => {
  const scrollToPodcast = () => {
    document.getElementById("podcast")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 gradient-hero opacity-90"></div>
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1200')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
      
      <div className="container mx-auto px-4 relative z-10 text-center animate-slide-up">
        <h1 className="text-5xl md:text-7xl font-black mb-6 text-white drop-shadow-lg">
          Abner y Nepetronic
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto">
          El show más divertido de la radio. ¡Escúchanos en vivo o disfruta de nuestros mejores momentos!
        </p>
        <Button 
          onClick={scrollToPodcast}
          size="lg" 
          className="text-lg px-8 py-6 shadow-glow hover:scale-105 transition-transform"
        >
          Escucha el Podcast Aquí
        </Button>
        
        <div className="mt-12 animate-bounce">
          <ChevronDown className="h-8 w-8 text-white mx-auto" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
