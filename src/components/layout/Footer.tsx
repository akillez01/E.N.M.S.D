import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Youtube, Mail, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-dark-green text-cream py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-serif font-bold mb-4">Cânticos da Floresta</h3>
            <p className="mb-4 text-light-cream/90">
              Preservando e divulgando a rica tradição musical da religião Santo Daime, 
              conectando pessoas através da espiritualidade e da cultura.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Visite nossa página no Facebook"
                className="text-light-cream hover:text-light-green transition-colors duration-200"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Visite nosso perfil no Instagram"
                className="text-light-cream hover:text-light-green transition-colors duration-200"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Visite nosso canal no YouTube"
                className="text-light-cream hover:text-light-green transition-colors duration-200"
              >
                <Youtube size={20} />
              </a>
              <a 
                href="mailto:contato@canticosdafloresta.org" 
                aria-label="Envie-nos um email"
                className="text-light-cream hover:text-light-green transition-colors duration-200"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-serif font-bold mb-4">Links Úteis</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-light-cream/90 hover:text-light-green transition-colors duration-200">
                  Sobre o Projeto
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-light-cream/90 hover:text-light-green transition-colors duration-200">
                  Acervo Audiovisual
                </Link>
              </li>
              <li>
                <Link to="/events" className="text-light-cream/90 hover:text-light-green transition-colors duration-200">
                  Agenda de Eventos
                </Link>
              </li>
              <li>
                <Link to="/accessibility" className="text-light-cream/90 hover:text-light-green transition-colors duration-200">
                  Acessibilidade
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-light-cream/90 hover:text-light-green transition-colors duration-200">
                  Contato
                </Link>
              </li>
              <li>
                <Link to="/collaborate" className="text-light-cream/90 hover:text-light-green transition-colors duration-200">
                  Colabore
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-serif font-bold mb-4">Boletim Informativo</h3>
            <p className="mb-4 text-light-cream/90">
              Receba atualizações sobre novos vídeos, eventos e notícias do projeto.
            </p>
            <form className="space-y-2">
              <div>
                <label htmlFor="newsletter-email" className="sr-only">Email</label>
                <input 
                  type="email" 
                  id="newsletter-email"
                  placeholder="Seu email" 
                  className="w-full px-4 py-2 rounded bg-medium-green/30 border border-light-green text-cream placeholder-light-cream/50 focus:outline-none focus:ring-2 focus:ring-light-green"
                  aria-label="Digite seu email para receber nossa newsletter"
                />
              </div>
              <button 
                type="submit" 
                className="w-full px-4 py-2 bg-light-green text-dark-green font-medium rounded hover:bg-medium-green transition-colors duration-200"
                aria-label="Inscrever-se na newsletter"
              >
                Inscrever-se
              </button>
            </form>
          </div>
        </div>
        
        <hr className="border-medium-green/30 my-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-light-cream/70 text-sm mb-4 md:mb-0">
            &copy; {currentYear} Cânticos da Floresta. Todos os direitos reservados.
          </p>
          <p className="text-light-cream/70 text-sm flex items-center">
            Feito com <Heart size={14} className="mx-1 text-spiritual-purple" /> para preservar nossa cultura
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;