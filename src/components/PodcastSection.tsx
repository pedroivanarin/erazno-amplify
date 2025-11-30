import { Headphones } from "lucide-react";

const PodcastSection = () => {
  return (
    <section id="podcast" className="py-16 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-8">
          <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
            <Headphones className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-4xl font-bold mb-4">Escucha Nuestro Podcast</h2>
          <p className="text-muted-foreground">
            Todos los episodios disponibles en tus plataformas favoritas
          </p>
        </div>

        <div className="max-w-3xl mx-auto bg-card rounded-xl shadow-card p-8 border border-border">
          <div className="aspect-video bg-muted rounded-lg flex items-center justify-center mb-4">
            <div className="text-center">
              <Headphones className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Reproductor de Podcast (Spotify/Apple Podcasts)</p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-4 justify-center mt-6">
            <a
              href="#"
              className="px-6 py-3 bg-[#1DB954] text-white rounded-full font-semibold hover:bg-[#1ed760] transition-colors"
            >
              Spotify
            </a>
            <a
              href="#"
              className="px-6 py-3 bg-gradient-to-r from-[#FA233B] to-[#FB5C74] text-white rounded-full font-semibold hover:opacity-90 transition-opacity"
            >
              Apple Podcasts
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PodcastSection;
