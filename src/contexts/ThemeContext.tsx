import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

type ThemeMode = 'light' | 'dark' | 'high-contrast';
type FontSize = 'normal' | 'large' | 'x-large';

interface ThemeContextType {
  mode: ThemeMode;
  fontSize: FontSize;
  setMode: (mode: ThemeMode) => void;
  setFontSize: (size: FontSize) => void;
  toggleMode: () => void;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [mode, setMode] = useState<ThemeMode>(() => {
    const savedMode = localStorage.getItem('theme-mode');
    return (savedMode as ThemeMode) || 'light';
  });
  
  const [fontSize, setFontSize] = useState<FontSize>(() => {
    const savedSize = localStorage.getItem('font-size');
    return (savedSize as FontSize) || 'normal';
  });

  useEffect(() => {
    localStorage.setItem('theme-mode', mode);
    
    // Apply theme to document
    const root = document.documentElement;
    root.classList.remove('light', 'dark', 'high-contrast');
    root.classList.add(mode);
  }, [mode]);

  useEffect(() => {
    localStorage.setItem('font-size', fontSize);
    
    // Apply font size to document
    const root = document.documentElement;
    root.classList.remove('text-normal', 'text-large', 'text-x-large');
    root.classList.add(`text-${fontSize}`);
  }, [fontSize]);

  const toggleMode = () => {
    setMode(prevMode => {
      if (prevMode === 'light') return 'dark';
      if (prevMode === 'dark') return 'high-contrast';
      return 'light';
    });
  };

  const increaseFontSize = () => {
    setFontSize(prevSize => {
      if (prevSize === 'normal') return 'large';
      if (prevSize === 'large') return 'x-large';
      return prevSize;
    });
  };

  const decreaseFontSize = () => {
    setFontSize(prevSize => {
      if (prevSize === 'x-large') return 'large';
      if (prevSize === 'large') return 'normal';
      return prevSize;
    });
  };

  return (
    <ThemeContext.Provider 
      value={{ 
        mode, 
        fontSize, 
        setMode, 
        setFontSize, 
        toggleMode,
        increaseFontSize,
        decreaseFontSize
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};