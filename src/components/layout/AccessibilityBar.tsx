import React from 'react';
import { Sun, Moon, ZoomIn, ZoomOut, Contrast } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { Button } from '../ui/button';

const AccessibilityBar: React.FC = () => {
  const { mode, fontSize, toggleMode, increaseFontSize, decreaseFontSize } = useTheme();

  return (
    <div className="bg-primary text-primary-foreground py-1 sticky top-0 z-50">
      <div className="container flex justify-end items-center text-sm">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleMode}
            className="flex items-center gap-1"
            aria-label={`Alternar para modo ${mode === 'light' ? 'escuro' : mode === 'dark' ? 'alto contraste' : 'claro'}`}
          >
            {mode === 'light' && <Moon size={16} />}
            {mode === 'dark' && <Contrast size={16} />}
            {mode === 'high-contrast' && <Sun size={16} />}
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
          
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="hidden sm:inline-flex hover:text-accent"
          >
            <Link 
              to="/accessibility"
              aria-label="Saiba mais sobre as funcionalidades de acessibilidade"
            >
              Mais opções
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AccessibilityBar;