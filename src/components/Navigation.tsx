import { Link } from "react-router-dom";
import { Radio } from "lucide-react";
import { Button } from "./ui/button";
import AdminLink from "./AdminLink";

const Navigation = () => {
  const navLinks = [
    { name: "Inicio", href: "/" },
    { name: "Las 10 de Abner", href: "#las-10" },
    { name: "Promociones", href: "#promociones" },
    { name: "Shows Destacados", href: "#shows" },
    { name: "Tienda", href: "#tienda" },
    { name: "Contacto", href: "#contacto" },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Radio className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold gradient-accent bg-clip-text text-transparent">
              Abner y Nepetronic
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <AdminLink />
            <Button variant="default" size="sm" className="hidden md:flex">
              En Vivo
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
