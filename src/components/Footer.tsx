import { Radio, Instagram, Facebook, Youtube, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer id="contacto" className="bg-card border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Radio className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold">Erazno y La Chokolata</span>
            </div>
            <p className="text-muted-foreground mb-4">
              El show de radio más divertido. Escúchanos en vivo todos los días
              y no te pierdas nuestros mejores momentos en el podcast.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Youtube className="h-6 w-6" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Mail className="h-6 w-6" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Inicio</a></li>
              <li><a href="#las-10" className="hover:text-primary transition-colors">Las 10 de Erazno</a></li>
              <li><a href="#promociones" className="hover:text-primary transition-colors">Promociones</a></li>
              <li><a href="#shows" className="hover:text-primary transition-colors">Shows</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contacto</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>Email: info@eraznoylachokolata.com</li>
              <li>Teléfono: (555) 123-4567</li>
              <li>Ciudad de México</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 text-center text-muted-foreground text-sm">
          <p>&copy; 2024 Erazno y La Chokolata. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
