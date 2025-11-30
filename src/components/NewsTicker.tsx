import { useState, useEffect } from "react";
import { TrendingUp } from "lucide-react";

const NewsTicker = () => {
  const [isPaused, setIsPaused] = useState(false);

  // Estas serían las últimas publicaciones de redes sociales
  const newsItems = [
    "🔥 Nuevo episodio disponible: Entrevista exclusiva con Bad Bunny",
    "📢 ¡Participa en nuestro sorteo de $1000! Detalles en promociones",
    "🎤 Esta semana: Los 10 momentos más polémicos del mes",
    "⭐ Síguenos en Instagram @eraznoylachokolata para contenido exclusivo",
    "🎧 Ya está disponible el episodio especial de aniversario",
    "🏆 Gracias por hacernos el #1 en streaming esta semana",
  ];

  return (
    <div className="bg-gradient-to-r from-primary via-secondary to-primary py-3 overflow-hidden relative">
      <div className="container mx-auto px-4 flex items-center gap-4">
        <div className="flex items-center gap-2 text-white font-bold shrink-0">
          <TrendingUp className="h-5 w-5 animate-pulse" />
          <span className="hidden sm:inline">EN VIVO</span>
        </div>
        
        <div 
          className="flex-1 overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className={`flex gap-12 ${isPaused ? '' : 'animate-scroll'}`}>
            {/* Duplicamos los items para crear el efecto infinito */}
            {[...newsItems, ...newsItems].map((item, index) => (
              <span
                key={index}
                className="text-white font-medium whitespace-nowrap text-sm md:text-base"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsTicker;
