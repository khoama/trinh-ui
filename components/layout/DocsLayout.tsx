import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Menu, X, Box, Type, Sliders, Hash, Calendar, Palette, Layout, Settings, RotateCcw, FileText, ToggleLeft, Table as TableIcon, ChevronDown, ScrollText } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { ColorPicker } from '../ui/ColorPicker';
import { Slider } from '../ui/Slider';

interface DocsLayoutProps {
  children: React.ReactNode;
  activePage: string;
  onNavigate: (page: string) => void;
}

const MENU_ITEMS = [
  { id: 'welcome', label: 'Introduction', icon: Layout },
  { id: 'colorpicker', label: 'Color Picker', icon: Palette },
  { id: 'datepicker', label: 'Date Picker', icon: Calendar },
  { id: 'dropdown', label: 'Dropdown & Search', icon: ChevronDown },
  { id: 'input', label: 'Input', icon: Type },
  { id: 'number', label: 'Number Input', icon: Hash },
  { id: 'scrollpanel', label: 'Scroll Panel', icon: ScrollText },
  { id: 'slider', label: 'Slider', icon: Sliders },
  { id: 'switch', label: 'Switch', icon: ToggleLeft },
  { id: 'table', label: 'Table', icon: TableIcon },
  { id: 'textarea', label: 'Textarea', icon: FileText },
];

export const DocsLayout: React.FC<DocsLayoutProps> = ({ children, activePage, onNavigate }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { primaryColor, borderRadius, borderWidth, updateSettings, resetTheme } = useTheme();

  // Toggle Dark Mode
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark-mode');
    } else {
      document.documentElement.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  // Sync primary color default when switching modes (optional convenience)
  useEffect(() => {
    // Only auto-switch color if it's one of the defaults
    const lightDefault = '#18181b';
    const darkDefault = '#fafafa';
    
    if (isDarkMode && primaryColor === lightDefault) {
      updateSettings({ primaryColor: darkDefault });
    } else if (!isDarkMode && primaryColor === darkDefault) {
      updateSettings({ primaryColor: lightDefault });
    }
  }, [isDarkMode]);

  const handleNav = (id: string) => {
    onNavigate(id);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex bg-surface text-text transition-colors duration-300">
      
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-surface/80 backdrop-blur-md border-b border-border flex items-center justify-between px-4 z-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-surface">
            <Box size={18} />
          </div>
          <span className="font-bold">Trinh UI</span>
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-text">
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <motion.aside 
        className={`
          fixed lg:sticky top-0 left-0 h-screen w-80 bg-surface-alt/50 border-r border-border backdrop-blur-xl lg:backdrop-blur-none
          flex flex-col z-40 transition-transform duration-300 lg:translate-x-0
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="p-6 hidden lg:flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-surface shadow-lg transition-colors">
            <Box size={18} />
          </div>
          <span className="font-bold text-lg">Trinh UI</span>
        </div>

        <div className="flex-1 overflow-y-auto px-4 space-y-8 py-20 lg:py-4 scrollbar-hide">
          {/* Navigation Section */}
          <div className="space-y-1">
            <div className="text-xs font-bold text-muted uppercase tracking-wider mb-4 px-2">Components</div>
            {MENU_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className={`
                    w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
                    ${isActive 
                      ? 'bg-primary text-surface shadow-md' 
                      : 'text-muted hover:text-text hover:bg-surface-alt'
                    }
                  `}
                >
                  <Icon size={18} className={isActive ? 'opacity-100' : 'opacity-70'} />
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Theme Settings Section */}
          <div className="pt-6 border-t border-border/50">
            <div className="flex items-center justify-between px-2 mb-4">
              <div className="text-xs font-bold text-muted uppercase tracking-wider flex items-center gap-2">
                <Settings size={12} />
                Global Theme
              </div>
              <button 
                onClick={resetTheme}
                className="text-xs text-muted hover:text-primary flex items-center gap-1 transition-colors"
                title="Reset to defaults"
              >
                <RotateCcw size={10} /> Reset
              </button>
            </div>
            
            <div className="space-y-6 px-2">
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted">Primary Color</label>
                <ColorPicker 
                  value={primaryColor} 
                  onChange={(color) => updateSettings({ primaryColor: color })}
                  size="sm"
                />
              </div>

              <div className="space-y-4">
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-medium text-muted">Border Radius</span>
                    <span className="text-muted">{borderRadius}px</span>
                  </div>
                  <Slider 
                    min={0} 
                    max={24} 
                    value={borderRadius} 
                    onChange={(val) => updateSettings({ borderRadius: val })}
                    size="sm"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-medium text-muted">Border Width</span>
                    <span className="text-muted">{borderWidth}px</span>
                  </div>
                  <Slider 
                    min={0} 
                    max={4} 
                    step={1}
                    value={borderWidth} 
                    onChange={(val) => updateSettings({ borderWidth: val })}
                    size="sm"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-border bg-surface-alt/30">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="w-full flex items-center justify-center gap-2 p-2.5 rounded-lg bg-surface border border-border text-text hover:shadow-sm hover:border-primary/30 transition-all"
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            <span className="text-sm font-medium">{isDarkMode ? 'Switch to Light' : 'Switch to Dark'}</span>
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0 pt-20 lg:pt-0">
        <div className="max-w-4xl mx-auto p-6 lg:p-12">
           {children}
        </div>
      </main>

      {/* Mobile Backdrop */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          />
        )}
      </AnimatePresence>
    </div>
  );
};