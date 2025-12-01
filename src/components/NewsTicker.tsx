import { useState } from "react";

const NewsTicker = () => {
  const [isPaused, setIsPaused] = useState(false);

  // Latest tweets from @ERAZNOYLACHOKO
  const tweets = [
    "La copa del mundo no era importante, no era necesaria según los fans de Messi. Claro hasta que se la robaron en Qatar 🇶🇦 Ahora es Messi y la copa del mundo 😂 En fin la hipocresía",
    "El jugador más INFRAVALORADO de la historia. No hubo nadie que le ayudara en el 2014. No pudo jugar la final lamentablemente",
    "Ganó el primer triplete Gracias a Negreira Ahora va a ganar otro, gastando una millonada y saltandose las normas del fairplay.",
  ];

  return (
    <div 
      className="bg-accent py-3 overflow-hidden relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="container mx-auto px-4 flex items-center gap-4">
        
        <div className="flex-1 overflow-hidden">
          <div 
            className="flex gap-12 animate-scroll"
            style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
          >
            {/* Duplicamos los items para crear el efecto infinito */}
            {[...tweets, ...tweets].map((item, index) => (
              <a
                key={index}
                href="https://x.com/ERAZNOYLACHOKO"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black font-medium whitespace-nowrap text-sm md:text-base hover:text-black/80 transition-colors cursor-pointer"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsTicker;
