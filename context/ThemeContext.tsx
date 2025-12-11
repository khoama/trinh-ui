import React, { createContext, useContext, useState, useEffect, PropsWithChildren } from 'react';

interface ThemeSettings {
  primaryColor: string;
  borderRadius: number; // in pixels (for base size)
  borderWidth: number; // in pixels
}

interface ThemeContextType extends ThemeSettings {
  updateSettings: (settings: Partial<ThemeSettings>) => void;
  resetTheme: () => void;
}

const DEFAULT_SETTINGS: ThemeSettings = {
  primaryColor: '#18181b', // Default zinc-900
  borderRadius: 8,
  borderWidth: 1,
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Helper to convert hex to space-separated RGB for Tailwind opacity variable support
const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return null;
  const r = parseInt(result[1], 16);
  const g = parseInt(result[2], 16);
  const b = parseInt(result[3], 16);
  return `${r} ${g} ${b}`;
};

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const [settings, setSettings] = useState<ThemeSettings>(DEFAULT_SETTINGS);

  // Apply CSS variables whenever settings change
  useEffect(() => {
    const root = document.documentElement;

    // Apply Library Scoped Variables
    root.style.setProperty('--radius-ui', `${settings.borderRadius}px`);
    root.style.setProperty('--border-ui', `${settings.borderWidth}px`);

    const rgb = hexToRgb(settings.primaryColor);
    if (rgb) {
      root.style.setProperty('--brand', rgb);
    }

  }, [settings]);

  // Initial Dark Mode sync for primary color
  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark-mode');
    setSettings(prev => ({
      ...prev,
      primaryColor: isDark ? '#fafafa' : '#18181b'
    }));
  }, []);

  const updateSettings = (newSettings: Partial<ThemeSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const resetTheme = () => {
    const isDark = document.documentElement.classList.contains('dark-mode');
    setSettings({
      ...DEFAULT_SETTINGS,
      primaryColor: isDark ? '#fafafa' : '#18181b'
    });
  };

  return (
    <ThemeContext.Provider value={{ ...settings, updateSettings, resetTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};