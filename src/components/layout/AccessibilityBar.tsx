import React from 'react';
import { Sun, Moon, ZoomIn, ZoomOut, Contrast } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const AccessibilityBar: React.FC = () => {
  const { mode, fontSize, toggleMode, increaseFontSize, decreaseFontSize } = useTheme();

  return (
    <div className="bg-dark-green dark:bg-medium-green text-cream dark:text-dark-green py-1 sticky top-0 z-50">
      <div className="container mx-auto px-4 flex justify-end items-center text-sm">
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleMode}
            className="flex items-center gap-1 py-1 px-2 rounded hover:bg-dark-purple/20 transition-colors duration-200"
            aria-label={`Alternar para modo ${mode === 'light' ? 'escuro' : mode === 'dark' ? 'alto contraste' : 'claro'}`}
          >
            {mode === 'light' && <Moon size={16} />}
            {mode === 'dark' && <Contrast size={16} />}
            {mode === 'high-contrast' && <Sun size={16} />}
            <span className="hidden sm:inline">
              {mode === 'light' ? 'Modo Escuro' : mode === 'dark' ? 'Alto Contraste' : 'Modo Claro'}
            </span>
          </button>
          
          <div className="flex items-center gap-1">
            <button
              onClick={decreaseFontSize}
              disabled={fontSize === 'normal'}
              className="p-1 rounded hover:bg-dark-purple/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              aria-label="Diminuir tamanho da fonte"
            >
              <ZoomOut size={16} />
            </button>
            
            <span className="hidden sm:inline text-xs">Texto</span>
            
            <button
              onClick={increaseFontSize}
              disabled={fontSize === 'x-large'}
              className="p-1 rounded hover:bg-dark-purple/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              aria-label="Aumentar tamanho da fonte"
            >
              <ZoomIn size={16} />
            </button>
          </div>
          
          <a 
            href="/accessibility" 
            className="hidden sm:inline text-xs underline hover:text-light-cream dark:hover:text-dark-purple transition-colors duration-200"
            aria-label="Saiba mais sobre as funcionalidades de acessibilidade"
          >
            Mais opções
          </a>
        </div>
      </div>
    </div>
  );
};

export default AccessibilityBar;