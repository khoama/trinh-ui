import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Zap, PenTool, Code, Palette, Settings, Package, Terminal, Braces, AlertTriangle } from 'lucide-react';

export const Welcome = ({ onNavigate }: { onNavigate: (page: string) => void }) => {
  return (
    <div className="space-y-16 animate-in fade-in duration-500">
      
      {/* Preview Warning Banner */}
      <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-4 text-amber-700 dark:text-amber-400">
        <AlertTriangle size={24} className="shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h3 className="font-bold text-sm uppercase tracking-wide">Preview Version</h3>
          <p className="text-sm opacity-90 leading-relaxed">
            This library is currently in active development. Component APIs, props, and theming structures are <strong>subject to change without notice</strong> as we refine the design system.
          </p>
        </div>
      </div>

      {/* Hero Section */}
      <div className="space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold text-text tracking-tight">Trinh UI</h1>
        <p className="text-xl text-muted max-w-2xl leading-relaxed">
          A React component library focused on minimal aesthetics, vivid Framer Motion animations, and strict accessibility.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { icon: Layers, title: "Modular", desc: "Built with isolated, composable React components." },
          { icon: Zap, title: "Animated", desc: "Spring physics interactions powered by Framer Motion." },
          { icon: PenTool, title: "Customizable", desc: "Zero styles locked in. Fully themeable via CSS variables." }
        ].map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-6 rounded-2xl bg-surface border border-border hover:shadow-lg transition-all cursor-default"
          >
            <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-4">
              <item.icon size={24} />
            </div>
            <h3 className="font-bold text-lg mb-2">{item.title}</h3>
            <p className="text-muted text-sm">{item.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Installation Guide */}
      <div className="space-y-8">
        <div className="border-b border-border pb-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-surface-alt rounded-lg">
              <Package size={20} className="text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-text">Installation</h2>
          </div>
          <p className="text-muted">
            Install <code>trinh-ui</code> via your package manager. Dependencies like <code>framer-motion</code> are now included automatically.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <div className="bg-code-bg p-5 rounded-xl border border-border relative group">
            <div className="absolute top-3 right-4 text-xs font-mono text-muted/50 select-none">npm</div>
            <div className="flex items-center gap-3">
              <Terminal size={16} className="text-muted" />
              <pre className="text-sm font-mono text-code-text">
{`npm install trinh-ui`}
              </pre>
            </div>
          </div>

          <div className="bg-code-bg p-5 rounded-xl border border-border relative group">
             <div className="absolute top-3 right-4 text-xs font-mono text-muted/50 select-none">yarn</div>
             <div className="flex items-center gap-3">
              <Terminal size={16} className="text-muted" />
              <pre className="text-sm font-mono text-code-text">
{`yarn add trinh-ui`}
              </pre>
            </div>
          </div>
          
          <div className="bg-code-bg p-5 rounded-xl border border-border relative group">
             <div className="absolute top-3 right-4 text-xs font-mono text-muted/50 select-none">pnpm</div>
             <div className="flex items-center gap-3">
              <Terminal size={16} className="text-muted" />
              <pre className="text-sm font-mono text-code-text">
{`pnpm add trinh-ui`}
              </pre>
            </div>
          </div>
        </div>
      </div>

      {/* Theming Guide */}
      <div className="space-y-8">
        <div className="border-b border-border pb-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-surface-alt rounded-lg">
              <Palette size={20} className="text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-text">Theming Guide</h2>
          </div>
          <p className="text-muted">
            The library relies on CSS variables for global styling. You can customize the look and feel by overriding these variables in your root CSS file or using the provided React Context.
          </p>
        </div>

        {/* Step 1: CSS Variables */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-text flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-primary text-surface text-xs flex items-center justify-center">1</span>
            CSS Variables Setup
          </h3>
          <p className="text-muted text-sm">
            Add these variables to your global CSS (e.g., <code>index.css</code>). Colors are defined in RGB format to support Tailwind's opacity modifiers.
          </p>
          <div className="bg-code-bg p-6 rounded-xl border border-border overflow-x-auto relative group">
            <pre className="text-sm font-mono text-code-text leading-relaxed">
{`:root {
  /* Core Colors (RGB format) */
  --primary: 24 24 27;       /* Brand Color */
  --surface: 255 255 255;    /* Card / Background */
  --surface-alt: 244 244 245; /* Secondary Background */
  --border: 228 228 231;     /* Borders */
  --text: 24 24 27;          /* Body Text */
  --text-muted: 113 113 122; /* Secondary Text */
  --error: 239 68 68;        /* Error State */

  /* Global Settings */
  --radius: 0.5rem;          /* Border Radius (8px) */
  --border-width: 1px;       /* Border Width */
}

.dark-mode {
  --primary: 250 250 250;
  --surface: 24 24 27;
  --surface-alt: 39 39 42;
  --border: 63 63 70;
  --text: 250 250 250;
  --text-muted: 161 161 170;
}`}
            </pre>
          </div>
        </div>

        {/* Step 2: Tailwind Config */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-text flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-primary text-surface text-xs flex items-center justify-center">2</span>
            Tailwind Configuration
          </h3>
          <p className="text-muted text-sm">
            Map your Tailwind theme to use these variables. This ensures all components react instantly to variable changes.
          </p>
          <div className="bg-code-bg p-6 rounded-xl border border-border overflow-x-auto">
            <pre className="text-sm font-mono text-code-text leading-relaxed">
{`// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: 'rgb(var(--primary) / <alpha-value>)',
        surface: 'rgb(var(--surface) / <alpha-value>)',
        // ... map other colors
      },
      borderRadius: {
        DEFAULT: 'calc(var(--radius) - 2px)',
        lg: 'var(--radius)',
      },
      borderWidth: {
        DEFAULT: 'var(--border-width)',
      }
    }
  }
}`}
            </pre>
          </div>
        </div>

        {/* Step 3: Runtime Customization */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-text flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-primary text-surface text-xs flex items-center justify-center">3</span>
            Dynamic Runtime Theming (Vanilla JS)
          </h3>
          <p className="text-muted text-sm">
            You can manually update the document style properties with JavaScript to change themes on the fly.
          </p>
          <div className="bg-code-bg p-6 rounded-xl border border-border overflow-x-auto">
             <pre className="text-sm font-mono text-code-text leading-relaxed">
{`// Example: Updating the primary color dynamically
document.documentElement.style.setProperty('--primary', '99 102 241'); // Indigo

// Example: Changing border radius
document.documentElement.style.setProperty('--radius', '1rem');`}
            </pre>
          </div>
        </div>

        {/* Step 4: Provider Setup */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-text flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-primary text-surface text-xs flex items-center justify-center">4</span>
            Provider Setup
          </h3>
          <p className="text-muted text-sm">
            To use the React Context API features, wrap your application root with the <code>ThemeProvider</code>.
          </p>
          <div className="bg-code-bg p-6 rounded-xl border border-border overflow-x-auto">
             <pre className="text-sm font-mono text-code-text leading-relaxed">
{`import { ThemeProvider } from 'trinh-ui';

const App = () => (
  <ThemeProvider>
    <YourApp />
  </ThemeProvider>
);`}
            </pre>
          </div>
        </div>

        {/* Step 5: React Context API */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-text flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-primary text-surface text-xs flex items-center justify-center">5</span>
            React Context API
          </h3>
          <p className="text-muted text-sm">
            For advanced control, use the <code>useTheme</code> hook to read or update global settings programmatically. This is useful for building settings panels or theme switchers.
          </p>
          <div className="bg-code-bg p-6 rounded-xl border border-border overflow-x-auto relative group">
            <pre className="text-sm font-mono text-code-text leading-relaxed">
{`import { useTheme } from 'trinh-ui';

export const MyComponent = () => {
  const { 
    primaryColor, 
    borderRadius, 
    updateSettings 
  } = useTheme();

  return (
    <div>
      <p>Current Radius: {borderRadius}px</p>
      <button onClick={() => updateSettings({ borderRadius: 12 })}>
        Increase Radius
      </button>
    </div>
  );
};`}
            </pre>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="p-8 rounded-3xl bg-surface-alt border border-border flex flex-col items-center text-center space-y-6">
        <h2 className="text-2xl font-bold">Ready to build?</h2>
        <p className="text-muted max-w-lg">
          Explore the components to see how they behave with your current theme settings.
        </p>
        <button
          onClick={() => onNavigate('input')}
          className="px-8 py-3 bg-primary text-surface rounded-xl font-medium hover:scale-105 active:scale-95 transition-transform shadow-lg shadow-primary/20"
        >
          Browse Components
        </button>
      </div>
    </div>
  );
};