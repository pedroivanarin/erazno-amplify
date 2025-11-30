import { Play, Eye } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const ShowsSection = () => {
  const { data: videos, isLoading } = useQuery({
    queryKey: ["featured-videos"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("featured_videos")
        .select("*")
        .eq("active", true)
        .order("created_at", { ascending: false })
        .limit(8);

      if (error) throw error;
      return data;
    },
  });

  if (isLoading || !videos || videos.length === 0) {
    return null;
  }

  return (
    <section id="shows" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <h2 className="text-4xl font-bold mb-4">Shows Destacados</h2>
          <p className="text-muted-foreground">
            Los mejores clips, entrevistas y momentos más divertidos
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {videos.map((video, index) => (
            <Card
              key={video.id}
              className="overflow-hidden hover:shadow-glow transition-all duration-300 cursor-pointer group border-border animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => window.open(video.video_url, "_blank")}
            >
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={video.thumbnail_url}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-glow">
                    <Play className="h-8 w-8 text-white ml-1" />
                  </div>
                </div>
                {video.duration && (
                  <Badge className="absolute bottom-2 right-2 bg-black/80">
                    {video.duration}
                  </Badge>
                )}
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                  {video.title}
                </h3>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Eye className="h-4 w-4 mr-1" />
                  {video.views} vistas
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShowsSection;
