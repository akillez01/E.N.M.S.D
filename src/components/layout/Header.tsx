import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Leaf, LogIn } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { supabase } from '../../lib/supabase';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();
  const { mode } = useTheme();

  const navLinks = [
    { name: 'Início', path: '/' },
    { name: 'Sobre', path: '/about' },
    { name: 'Acervo', path: '/gallery' },
    { name: 'Eventos', path: '/events' },
    { name: 'Acessibilidade', path: '/accessibility' },
    { name: 'Contato', path: '/contact' },
    { name: 'Colabore', path: '/collaborate' },
  ];

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
    };
    checkAuth();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const baseHeaderClasses = 'fixed w-full z-50 transition-all duration-300';
  const scrolledClasses = isScrolled 
    ? 'bg-light-green/95 dark:bg-dark-green/95 shadow-md py-2' 
    : 'bg-transparent py-4';

  return (
    <header className={`${baseHeaderClasses} ${scrolledClasses}`}>
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center gap-2 font-serif text-2xl font-bold text-dark-green dark:text-cream"
            aria-label="Cânticos da Floresta - Página Inicial"
          >
            <Leaf 
              size={36} 
              className="text-medium-green dark:text-light-green transition-transform duration-300 hover:rotate-12" 
            />
            <span className="hidden sm:inline">Cânticos da Floresta</span>
            <span className="sm:hidden">Cânticos</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-md text-base font-medium transition-all duration-200
                  ${location.pathname === link.path 
                    ? 'text-earth-brown dark:text-light-cream bg-cream/20 dark:bg-dark-purple/30' 
                    : 'text-dark-green dark:text-cream hover:bg-light-green/20 dark:hover:bg-dark-purple/20'
                  }`}
              >
                {link.name}
              </Link>
            ))}
            
            {isAuthenticated ? (
              <Link
                to="/admin/videos"
                className="ml-4 flex items-center gap-2 bg-spiritual-purple text-light-cream px-4 py-2 rounded-md hover:bg-spiritual-purple/90 transition-colors"
              >
                Painel Admin
              </Link>
            ) : (
              <Link
                to="/admin/login"
                className="ml-4 flex items-center gap-2 bg-spiritual-purple text-light-cream px-4 py-2 rounded-md hover:bg-spiritual-purple/90 transition-colors"
              >
                <LogIn size={18} />
                Login
              </Link>
            )}
          </div>

          {/* Mobile Navigation Button */}
          <button 
            className="md:hidden p-2 rounded-md text-dark-green dark:text-cream"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile Navigation Menu */}
        <div 
          className={`md:hidden fixed inset-0 z-50 bg-light-green dark:bg-dark-green transform transition-transform duration-300 ease-in-out ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex justify-end p-4">
            <button 
              onClick={() => setIsMenuOpen(false)}
              aria-label="Fechar menu"
              className="p-2 text-dark-green dark:text-cream"
            >
              <X size={24} />
            </button>
          </div>
          <div className="flex flex-col items-center space-y-4 mt-16 text-dark-green dark:text-cream">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 w-4/5 text-center rounded-md text-lg font-medium transition-all duration-200
                  ${location.pathname === link.path 
                    ? 'bg-cream/30 dark:bg-dark-purple/40 font-bold' 
                    : 'hover:bg-cream/20 dark:hover:bg-dark-purple/20'
                  }`}
              >
                {link.name}
              </Link>
            ))}
            
            {isAuthenticated ? (
              <Link
                to="/admin/videos"
                className="w-4/5 text-center bg-spiritual-purple text-light-cream px-4 py-2 rounded-md hover:bg-spiritual-purple/90 transition-colors"
              >
                Painel Admin
              </Link>
            ) : (
              <Link
                to="/admin/login"
                className="w-4/5 text-center bg-spiritual-purple text-light-cream px-4 py-2 rounded-md hover:bg-spiritual-purple/90 transition-colors"
              >
                <LogIn size={18} className="inline mr-2" />
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;