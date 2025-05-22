import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Leaf, LogIn, Sun, Moon, ZoomIn, ZoomOut } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { Button } from '../ui/button';
import { supabase } from '../../lib/supabase';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();
  const { mode, fontSize, toggleMode, increaseFontSize, decreaseFontSize } = useTheme();

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

  return (
    <header className="fixed w-full z-50 transition-all duration-300">
      {/* Accessibility Bar */}
      <div className="bg-primary/90 text-primary-foreground py-1">
        <div className="container flex justify-end items-center text-sm">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMode}
              className="flex items-center gap-1"
              aria-label={`Alternar para modo ${mode === 'light' ? 'escuro' : mode === 'dark' ? 'alto contraste' : 'claro'}`}
            >
              {mode === 'light' ? <Moon size={16} /> : <Sun size={16} />}
              <span className="hidden sm:inline">
                {mode === 'light' ? 'Modo Escuro' : mode === 'dark' ? 'Alto Contraste' : 'Modo Claro'}
              </span>
            </Button>

            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={decreaseFontSize}
                disabled={fontSize === 'normal'}
                aria-label="Diminuir tamanho da fonte"
              >
                <ZoomOut size={16} />
              </Button>
              
              <span className="hidden sm:inline text-xs">Texto</span>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={increaseFontSize}
                disabled={fontSize === 'x-large'}
                aria-label="Aumentar tamanho da fonte"
              >
                <ZoomIn size={16} />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className={`bg-background/95 shadow-sm transition-all duration-300 ${isScrolled ? 'py-2' : 'py-4'}`}>
        <div className="container flex items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center gap-2 font-serif text-2xl font-bold"
            aria-label="Cânticos da Floresta - Página Inicial"
          >
            <Leaf 
              size={36} 
              className="text-primary transition-transform duration-300 hover:rotate-12" 
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
                    ? 'text-primary bg-primary/10' 
                    : 'text-foreground hover:bg-accent/10'
                  }`}
              >
                {link.name}
              </Link>
            ))}
            
            {isAuthenticated ? (
              <Button asChild variant="default" className="ml-4">
                <Link to="/admin/videos">
                  Painel Admin
                </Link>
              </Button>
            ) : (
              <Button asChild variant="default" className="ml-4">
                <Link to="/admin/login">
                  <LogIn size={18} className="mr-2" />
                  Login
                </Link>
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>

        {/* Mobile Navigation Menu */}
        <div 
          className={`md:hidden fixed inset-0 z-50 bg-background/95 backdrop-blur-sm transform transition-transform duration-300 ease-in-out ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex justify-end p-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Fechar menu"
            >
              <X size={24} />
            </Button>
          </div>
          <div className="flex flex-col items-center space-y-4 mt-16">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 w-4/5 text-center rounded-md text-lg font-medium transition-all duration-200
                  ${location.pathname === link.path 
                    ? 'bg-primary/10 font-bold' 
                    : 'hover:bg-accent/10'
                  }`}
              >
                {link.name}
              </Link>
            ))}
            
            {isAuthenticated ? (
              <Button asChild variant="default" className="w-4/5">
                <Link to="/admin/videos">
                  Painel Admin
                </Link>
              </Button>
            ) : (
              <Button asChild variant="default" className="w-4/5">
                <Link to="/admin/login">
                  <LogIn size={18} className="mr-2" />
                  Login
                </Link>
              </Button>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;