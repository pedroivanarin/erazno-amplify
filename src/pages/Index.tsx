import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import NewsTicker from "@/components/NewsTicker";
import PodcastSection from "@/components/PodcastSection";
import NewsSection from "@/components/NewsSection";
import PromotionsSection from "@/components/PromotionsSection";
import ShowsSection from "@/components/ShowsSection";
import TiendaSection from "@/components/TiendaSection";
import SocialWall from "@/components/SocialWall";
import Footer from "@/components/Footer";
const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <NewsTicker />
      <HeroSection />
      <PodcastSection />
      <NewsSection />
      <PromotionsSection />
      <ShowsSection />
      <TiendaSection />
      <SocialWall />
      <Footer />
    </div>
  );
};

export default Index;
