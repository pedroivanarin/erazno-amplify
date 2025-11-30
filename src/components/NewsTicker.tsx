import { useState } from "react";
import { TrendingUp } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const NewsTicker = () => {
  const [isPaused, setIsPaused] = useState(false);

  const { data: tickerMessages } = useQuery({
    queryKey: ["ticker-messages"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("ticker_messages")
        .select("*")
        .eq("active", true)
        .order("display_order", { ascending: true });

      if (error) throw error;
      return data || [];
    },
    refetchInterval: 30000, // Refresca cada 30 segundos
  });

  // Mensajes por defecto si no hay en la BD
  const defaultMessages = [
    "🔥 Bienvenidos a Erazno y La Chokolata - El show más divertido de la radio",
    "📢 Síguenos en nuestras redes sociales para contenido exclusivo",
    "🎤 Escucha el podcast completo en Spotify y Apple Podcasts",
  ];

  const newsItems = tickerMessages && tickerMessages.length > 0
    ? tickerMessages.map(m => m.message)
    : defaultMessages;

  if (newsItems.length === 0) return null;

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
