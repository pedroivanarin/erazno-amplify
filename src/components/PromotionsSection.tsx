import { Gift, ExternalLink } from "lucide-react";
import { Button } from "./ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const PromotionsSection = () => {
  const { data: promotions, isLoading } = useQuery({
    queryKey: ["promotions"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("promotions")
        .select("*")
        .eq("active", true)
        .order("created_at", { ascending: false })
        .limit(4);

      if (error) throw error;
      return data;
    },
  });

  if (isLoading || !promotions || promotions.length === 0) {
    return null;
  }

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
                  src={promo.image_url}
                  alt={promo.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
              </div>
              
              <div className="relative p-8 min-h-[300px] flex flex-col justify-end">
                <h3 className="text-3xl font-bold mb-2 text-white">{promo.title}</h3>
                <p className="text-white/80 mb-4">{promo.description}</p>
                {promo.link && (
                  <Button
                    className="w-fit"
                    variant="secondary"
                    onClick={() => window.open(promo.link, "_blank")}
                  >
                    Participar Ahora
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PromotionsSection;
