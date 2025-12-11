# Trinh UI

A React component library focused on minimal aesthetics, vivid Framer Motion animations, and strict accessibility.

🎨 **[View Live Demo →](https://trinh-ui.khoa.ma)**

> ⚠️ **Preview Version**: This library is currently in active development. Component APIs, props, and theming structures are **subject to change without notice** as we refine the design system.

## Features

- **🧩 Modular** - Built with isolated, composable React components
- **✨ Animated** - Spring physics interactions powered by Framer Motion
- **🎨 Customizable** - Zero styles locked in. Fully themeable via CSS variables

## Components

- Color Picker
- Date Picker
- Dropdown & Search (with Autocomplete)
- Input
- Number Input
- Scroll Panel
- Slider
- Switch
- Table
- Textarea
- Tooltip

## Installation

Install `trinh-ui` via your package manager. Dependencies like `framer-motion` are included automatically.

```bash
# npm
npm install trinh-ui

# yarn
yarn add trinh-ui

# pnpm
pnpm add trinh-ui
```

## Quick Start

```tsx
import { Input, Switch, ThemeProvider } from 'trinh-ui';

function App() {
  return (
    <ThemeProvider>
      <Input placeholder="Enter text..." />
      <Switch />
    </ThemeProvider>
  );
}
```

## Theming

The library relies on CSS variables for global styling. Customize by overriding these variables in your root CSS file or using the provided React Context.

### CSS Variables Setup

Add these variables to your global CSS (e.g., `index.css`). Colors are defined in RGB format to support Tailwind's opacity modifiers.

```css
:root {
  /* Core Colors (RGB format) */
  --primary: 24 24 27;        /* Brand Color */
  --surface: 255 255 255;      /* Card / Background */
  --surface-alt: 244 244 245;  /* Secondary Background */
  --border: 228 228 231;       /* Borders */
  --text: 24 24 27;            /* Body Text */
  --text-muted: 113 113 122;   /* Secondary Text */
  --error: 239 68 68;          /* Error State */
  
  /* Global Settings */
  --radius: 0.5rem;            /* Border Radius (8px) */
  --border-width: 1px;         /* Border Width */
}

.dark-mode {
  --primary: 250 250 250;
  --surface: 24 24 27;
  --surface-alt: 39 39 42;
  --border: 63 63 70;
  --text: 250 250 250;
  --text-muted: 161 161 170;
}
```

### Tailwind Configuration

Map your Tailwind theme to use these variables:

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: 'rgb(var(--primary) / <alpha-value>)',
        surface: 'rgb(var(--surface) / <alpha-value>)',
        border: 'rgb(var(--border) / <alpha-value>)',
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
}
```

### Dynamic Runtime Theming

Update theme properties dynamically with JavaScript:

```js
// Update primary color
document.documentElement.style.setProperty('--primary', '99 102 241'); // Indigo

// Change border radius
document.documentElement.style.setProperty('--radius', '1rem');
```

### React Context API

For advanced control, use the `useTheme` hook:

```tsx
import { useTheme } from 'trinh-ui';

export function ThemeSettings() {
  const { primaryColor, borderRadius, updateSettings } = useTheme();
  
  return (
    <div>
      <p>Current Radius: {borderRadius}px</p>
      <button onClick={() => updateSettings({ borderRadius: 12 })}>
        Increase Radius
      </button>
    </div>
  );
}
```

## Development

Run the documentation site locally:

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The documentation site runs on `http://localhost:3001` by default.

## License

MIT
