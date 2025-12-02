import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import AdminLink from "./AdminLink";
import CompactPodcastPlayer from "./CompactPodcastPlayer";
import logo from "@/assets/logo.svg";

const Navigation = () => {
  const location = useLocation();
  
  const navLinks = [
    { name: "Shows Destacados", href: "#podcast" },
    { name: "Las 10 de Erazno", href: "#las-10" },
    { name: "Tienda", href: "#tienda" },
    { name: "Contacto", href: "#contacto" },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const navHeight = 64; // Height of the sticky nav (h-16 = 4rem = 64px)
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navHeight;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <nav className="sticky top-0 z-[9999] border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" onClick={handleLogoClick} className="flex items-center">
            <img src={logo} alt="Erazno y La Chokolata" className="h-12 w-auto" />
          </Link>

          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary cursor-pointer"
                >
                  {link.name}
                </a>
              ))}
            </div>
            <AdminLink />
            <CompactPodcastPlayer />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
