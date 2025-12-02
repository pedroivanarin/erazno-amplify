import { Instagram, Facebook, Heart, MessageCircle } from "lucide-react";
import { Card, CardContent } from "./ui/card";

const SocialWall = () => {
  const socialPosts = [
    {
      id: 1,
      platform: "instagram",
      username: "@eraznoylachokolata",
      content: "¡Qué show tan increíble el de hoy! 🔥 #Erazno #LaChokolata",
      likes: 1234,
      comments: 89,
      image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400",
    },
    {
      id: 2,
      platform: "facebook",
      username: "Erazno y La Chokolata",
      content: "¿Ya viste el nuevo segmento? ¡Comenta qué te pareció! 😂",
      likes: 2341,
      comments: 156,
      image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400",
    },
    {
      id: 3,
      platform: "instagram",
      username: "@eraznoylachokolata",
      content: "Behind the scenes 📸 #RadioLife",
      likes: 987,
      comments: 45,
      image: "https://images.unsplash.com/photo-1589903308904-1010c2294adc?w=400",
    },
  ];

  return (
    <section id="contacto" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Síguenos en Redes</h2>
          <p className="text-muted-foreground">Hazte chido. Síguenos en nuestras redes.</p>
          <div className="flex items-center justify-center gap-4 mt-6">
            <a
              href="#"
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold hover:opacity-90 transition-opacity"
            >
              <Instagram className="h-5 w-5" />
              Instagram
            </a>
            <a
              href="#"
              className="flex items-center gap-2 px-6 py-3 bg-[#1877F2] text-white rounded-full font-semibold hover:opacity-90 transition-opacity"
            >
              <Facebook className="h-5 w-5" />
              Facebook
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {socialPosts.map((post, index) => (
            <Card
              key={post.id}
              className="overflow-hidden hover:shadow-glow transition-all duration-300 border-border animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={post.image}
                  alt="Social post"
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  {post.platform === "instagram" ? (
                    <Instagram className="h-5 w-5 text-pink-600" />
                  ) : (
                    <Facebook className="h-5 w-5 text-[#1877F2]" />
                  )}
                  <span className="text-sm font-semibold">{post.username}</span>
                </div>
                <p className="text-sm mb-3">{post.content}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Heart className="h-4 w-4" />
                    {post.likes}
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="h-4 w-4" />
                    {post.comments}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialWall;
