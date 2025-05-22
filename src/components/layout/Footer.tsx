import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Youtube, Mail, Heart, Leaf } from 'lucide-react';
import { Button } from '../ui/button';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 font-serif text-xl font-bold mb-4">
              <Leaf size={24} className="text-accent" />
              <span>Cânticos da Floresta</span>
            </div>
            <p className="mb-4 text-primary-foreground/90">
              Preservando e divulgando a rica tradição musical da religião Santo Daime, 
              conectando pessoas através da espiritualidade e da cultura.
            </p>
            <div className="flex space-x-4">
              <Button
                variant="ghost"
                size="icon"
                asChild
                className="text-primary-foreground hover:text-accent"
              >
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="Visite nossa página no Facebook"
                >
                  <Facebook size={20} />
                </a>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                asChild
                className="text-primary-foreground hover:text-accent"
              >
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="Visite nosso perfil no Instagram"
                >
                  <Instagram size={20} />
                </a>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                asChild
                className="text-primary-foreground hover:text-accent"
              >
                <a 
                  href="https://youtube.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="Visite nosso canal no YouTube"
                >
                  <Youtube size={20} />
                </a>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                asChild
                className="text-primary-foreground hover:text-accent"
              >
                <a 
                  href="mailto:contato@canticosdafloresta.org"
                  aria-label="Envie-nos um email"
                >
                  <Mail size={20} />
                </a>
              </Button>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-serif font-bold mb-4">Links Úteis</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-primary-foreground/90 hover:text-accent transition-colors duration-200">
                  Sobre o Projeto
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-primary-foreground/90 hover:text-accent transition-colors duration-200">
                  Acervo Audiovisual
                </Link>
              </li>
              <li>
                <Link to="/events" className="text-primary-foreground/90 hover:text-accent transition-colors duration-200">
                  Agenda de Eventos
                </Link>
              </li>
              <li>
                <Link to="/accessibility" className="text-primary-foreground/90 hover:text-accent transition-colors duration-200">
                  Acessibilidade
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-primary-foreground/90 hover:text-accent transition-colors duration-200">
                  Contato
                </Link>
              </li>
              <li>
                <Link to="/collaborate" className="text-primary-foreground/90 hover:text-accent transition-colors duration-200">
                  Colabore
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-serif font-bold mb-4">Boletim Informativo</h3>
            <p className="mb-4 text-primary-foreground/90">
              Receba atualizações sobre novos vídeos, eventos e notícias do projeto.
            </p>
            <form className="space-y-2">
              <div>
                <label htmlFor="newsletter-email" className="sr-only">Email</label>
                <input 
                  type="email" 
                  id="newsletter-email"
                  placeholder="Seu email" 
                  className="w-full px-4 py-2 rounded bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder-primary-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent"
                  aria-label="Digite seu email para receber nossa newsletter"
                />
              </div>
              <Button type="submit" variant="secondary" className="w-full">
                Inscrever-se
              </Button>
            </form>
          </div>
        </div>
        
        <hr className="border-primary-foreground/20 my-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-primary-foreground/70 text-sm mb-4 md:mb-0">
            &copy; {currentYear} Cânticos da Floresta. Todos os direitos reservados.
          </p>
          <p className="text-primary-foreground/70 text-sm flex items-center">
            Feito com <Heart size={14} className="mx-1 text-accent" /> para preservar nossa cultura
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;