import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Pipette } from 'lucide-react';
import { ColorPickerProps } from '../../types';

// --- Color Math Helpers ---
const hexToRgb = (hex: string) => {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, (_m, r, g, b) => {
    return r + r + g + g + b + b;
  });

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : { r: 0, g: 0, b: 0 };
};

const rgbToHsv = (r: number, g: number, b: number) => {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s, v = max;
  const d = max - min;
  s = max === 0 ? 0 : d / max;
  if (max === min) {
    h = 0;
  } else {
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return { h: h * 360, s: s * 100, v: v * 100 };
};

const hsvToRgb = (h: number, s: number, v: number) => {
  s /= 100;
  v /= 100;
  const c = v * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = v - c;

  let r = 0, g = 0, b = 0;

  if (h >= 0 && h < 60) { r = c; g = x; b = 0; }
  else if (h >= 60 && h < 120) { r = x; g = c; b = 0; }
  else if (h >= 120 && h < 180) { r = 0; g = c; b = x; }
  else if (h >= 180 && h < 240) { r = 0; g = x; b = c; }
  else if (h >= 240 && h < 300) { r = x; g = 0; b = c; }
  else if (h >= 300 && h < 360) { r = c; g = 0; b = x; }

  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255)
  };
};

const rgbToHex = (r: number, g: number, b: number) => {
  const componentToHex = (c: number) => {
    const hex = Math.max(0, Math.min(255, Math.round(c))).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
};

const PRESETS = [
  '#ef4444', '#f97316', '#f59e0b', '#84cc16', 
  '#10b981', '#06b6d4', '#3b82f6', '#6366f1', 
  '#8b5cf6', '#d946ef', '#f43f5e', '#18181b', 
  '#71717a', '#ffffff'
];

const sizeConfig = {
  sm: {
    swatch: 'w-8 h-8 rounded-ui-sm',
    inputH: 'h-8',
    iconSize: 16,
    text: 'text-sm',
    compactSize: 'w-8 h-8'
  },
  md: {
    swatch: 'w-12 h-12 rounded-ui-md',
    inputH: 'h-12',
    iconSize: 20,
    text: 'text-base',
    compactSize: 'w-10 h-10'
  },
  lg: {
    swatch: 'w-14 h-14 rounded-ui-lg',
    inputH: 'h-14',
    iconSize: 24,
    text: 'text-lg',
    compactSize: 'w-12 h-12'
  }
};

export const ColorPicker: React.FC<ColorPickerProps> = ({
  value,
  onChange,
  label,
  presets = PRESETS,
  size = 'md',
  variant = 'default'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const areaRef = useRef<HTMLDivElement>(null);
  const hueRef = useRef<HTMLDivElement>(null);
  
  // Internal HSV state for rendering UI
  const [hsv, setHsv] = useState({ h: 0, s: 0, v: 0 });
  
  // We use a ref to track the latest HSV state inside event listeners without dependency churn
  const hsvRef = useRef({ h: 0, s: 0, v: 0 });
  
  const styles = sizeConfig[size];

  // Sync state from value prop
  useEffect(() => {
    const rgb = hexToRgb(value);
    const newHsv = rgbToHsv(rgb.r, rgb.g, rgb.b);
    
    // Safety check: if the incoming value matches our current calculated RGB,
    // we skip the update to avoid overwriting high-precision internal state (like hue)
    // with lower-precision rounded values or losing hue when saturation is 0.
    const currentRgb = hsvToRgb(hsvRef.current.h, hsvRef.current.s, hsvRef.current.v);
    const isSameColor = 
      Math.abs(currentRgb.r - rgb.r) <= 1 && 
      Math.abs(currentRgb.g - rgb.g) <= 1 && 
      Math.abs(currentRgb.b - rgb.b) <= 1;

    if (!isSameColor) {
      setHsv(newHsv);
      hsvRef.current = newHsv;
    }
  }, [value]);

  // Handle outside click
  useEffect(() => {
    if (variant === 'inline') return;
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [variant]);

  const updateColor = (newHsv: { h: number, s: number, v: number }) => {
    setHsv(newHsv);
    hsvRef.current = newHsv;
    const rgb = hsvToRgb(newHsv.h, newHsv.s, newHsv.v);
    onChange(rgbToHex(rgb.r, rgb.g, rgb.b));
  };
  
  // Simplified Pointer Events Handler Implementation that works globally
  const handlePointerDown = (type: 'area' | 'hue', e: React.PointerEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const areaRect = areaRef.current?.getBoundingClientRect();
    const hueRect = hueRef.current?.getBoundingClientRect();
    
    // Capture pointer to ensure we receive events even if cursor leaves the element
    (e.target as HTMLElement).setPointerCapture(e.pointerId);

    const handlePointerMove = (moveEvent: PointerEvent) => {
      if (type === 'area' && areaRect) {
        const x = Math.max(0, Math.min(1, (moveEvent.clientX - areaRect.left) / areaRect.width));
        const y = Math.max(0, Math.min(1, (moveEvent.clientY - areaRect.top) / areaRect.height));
        updateColor({ ...hsvRef.current, s: x * 100, v: 100 - (y * 100) });
      } else if (type === 'hue' && hueRect) {
        const x = Math.max(0, Math.min(1, (moveEvent.clientX - hueRect.left) / hueRect.width));
        updateColor({ ...hsvRef.current, h: x * 360 });
      }
    };

    const handlePointerUp = (upEvent: PointerEvent) => {
       (e.target as HTMLElement).releasePointerCapture(upEvent.pointerId);
       window.removeEventListener('pointermove', handlePointerMove);
       window.removeEventListener('pointerup', handlePointerUp);
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    
    // Trigger initial update
    handlePointerMove(e.nativeEvent);
  };

  const handleEyeDropper = async () => {
    if (!('EyeDropper' in window)) return;
    try {
      // @ts-ignore
      const eyeDropper = new window.EyeDropper();
      const result = await eyeDropper.open();
      onChange(result.sRGBHex);
    } catch (e) {
      console.log("EyeDropper canceled");
    }
  };

  const currentRgb = hsvToRgb(hsv.h, hsv.s, hsv.v);

  const PickerContent = () => (
    <div className={`flex flex-col gap-4 ${variant === 'inline' ? 'w-full' : 'w-[320px]'}`}>
      {/* 1. Saturation / Value Area */}
      <div 
        className="relative w-full h-40 rounded-ui-md overflow-hidden cursor-crosshair touch-none shadow-inner outline-none focus:ring-2 focus:ring-brand/50"
        ref={areaRef}
        onPointerDown={(e) => handlePointerDown('area', e)}
        style={{
          backgroundColor: `hsl(${hsv.h}, 100%, 50%)`,
          backgroundImage: `
            linear-gradient(to top, #000, transparent),
            linear-gradient(to right, #fff, transparent)
          `
        }}
        role="slider"
        aria-label="Saturation and Brightness"
        aria-valuetext={`Saturation ${Math.round(hsv.s)}%, Brightness ${Math.round(hsv.v)}%`}
        tabIndex={0}
      >
        <motion.div
          className="absolute w-4 h-4 rounded-full border-2 border-white shadow-md -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{
            left: `${hsv.s}%`,
            top: `${100 - hsv.v}%`,
            backgroundColor: value
          }}
          transition={{ duration: 0 }}
        />
      </div>

      {/* 2. Hue Slider */}
      <div className="flex items-center gap-3">
          <div className="flex-1 h-4 relative rounded-full overflow-hidden cursor-pointer touch-none shadow-inner outline-none focus:ring-2 focus:ring-brand/50"
            ref={hueRef}
            onPointerDown={(e) => handlePointerDown('hue', e)}
            role="slider"
            aria-label="Hue"
            aria-valuenow={Math.round(hsv.h)}
            aria-valuemin={0}
            aria-valuemax={360}
            tabIndex={0}
          >
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%)' }} />
            <motion.div 
              className="absolute top-0 bottom-0 w-4 h-4 -ml-2 rounded-full border-2 border-white bg-white/30 backdrop-blur-sm shadow-sm pointer-events-none"
              style={{ left: `${(hsv.h / 360) * 100}%` }}
              transition={{ duration: 0 }}
            />
          </div>
      </div>

      {/* 3. RGB Inputs */}
      <div className="grid grid-cols-4 gap-2">
          {['R', 'G', 'B'].map((channel) => (
            <div key={channel} className="flex flex-col gap-1">
              <label htmlFor={`color-${channel}`} className="text-[10px] font-bold text-muted text-center uppercase">{channel}</label>
              <input
                id={`color-${channel}`}
                type="number"
                min={0}
                max={255}
                value={currentRgb[channel.toLowerCase() as 'r'|'g'|'b']}
                onChange={(e) => {
                  const val = Math.max(0, Math.min(255, parseInt(e.target.value) || 0));
                  const newRgb = { ...currentRgb, [channel.toLowerCase()]: val };
                  onChange(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
                }}
                className="w-full p-1 text-center text-sm rounded-md border border-border border-ui bg-surface-alt focus:border-brand outline-none"
              />
            </div>
          ))}
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold text-muted text-center uppercase">Hex</label>
            <div className="w-full p-1 text-center text-xs flex items-center justify-center rounded-md border border-border border-ui bg-surface-alt text-muted truncate">
              {value}
            </div>
          </div>
      </div>

      {/* 4. Presets */}
      <div>
        <div className="text-[10px] font-bold text-muted mb-2 uppercase tracking-wider" id="presets-label">Presets</div>
        <div className="grid grid-cols-7 gap-2" role="group" aria-labelledby="presets-label">
          {presets.map((color, i) => (
            <motion.button
              key={color}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: i * 0.01 }}
              whileHover={{ scale: 1.2, zIndex: 10 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                onChange(color);
                if (variant !== 'inline') setIsOpen(false);
              }}
              className={`
                w-6 h-6 rounded-md shadow-sm relative overflow-hidden
                ${value.toLowerCase() === color.toLowerCase() ? 'ring-2 ring-brand ring-offset-2 ring-offset-surface' : 'border border-black/5'}
              `}
              style={{ backgroundColor: color }}
              title={color}
              aria-label={`Select color ${color}`}
            >
              {value.toLowerCase() === color.toLowerCase() && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Check size={12} className={color.toLowerCase() === '#ffffff' ? 'text-black' : 'text-white'} strokeWidth={3} />
                </div>
              )}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );

  if (variant === 'inline') {
    return (
      <div className="flex flex-col gap-2 w-full">
        {label && <label className={`text-muted font-medium ${size === 'sm' ? 'text-xs' : 'text-sm'} ml-1`}>{label}</label>}
        <div className="p-4 bg-surface rounded-ui-lg border border-border border-ui w-full max-w-sm">
           <PickerContent />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 w-full relative" ref={containerRef}>
      {label && variant === 'default' && (
        <label className={`text-muted font-medium ${size === 'sm' ? 'text-xs' : 'text-sm'} ml-1`}>{label}</label>
      )}
      
      {variant === 'default' && (
        <div className="flex gap-2 items-center">
          <motion.button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`${styles.swatch} shadow-sm border border-border border-ui shrink-0 relative overflow-hidden group`}
            style={{ backgroundColor: value }}
            aria-label="Toggle color picker"
            aria-expanded={isOpen}
            aria-haspopup="dialog"
          >
             <div className="absolute inset-0 -z-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPjxwYXRoIGZpbGw9IiNjY2MiIGQ9Ik0wIDBoNHY0SDB6bTQgNGg0djRINHoiLz48L3N2Zz4=')] opacity-20" />
          </motion.button>

          <div className="relative flex-1 group">
            <span className={`absolute left-3 top-1/2 -translate-y-1/2 text-muted font-mono select-none ${styles.text}`}>#</span>
            <input
              type="text"
              value={value.replace('#', '')}
              onChange={(e) => onChange(`#${e.target.value}`)}
              className={`w-full ${styles.inputH} pl-7 pr-3 border-ui ${size === 'sm' ? 'rounded-ui-sm' : 'rounded-ui-md'} bg-surface-alt border border-border focus:border-brand focus:ring-2 focus:ring-brand/10 outline-none font-mono uppercase text-text transition-all ${styles.text}`}
              maxLength={6}
              aria-label="Hex color value"
            />
          </div>

          {'EyeDropper' in window && (
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(var(--surface-alt), 1)' }}
              whileTap={{ scale: 0.95 }}
              onClick={handleEyeDropper}
              className={`${styles.swatch} flex items-center justify-center border border-border border-ui bg-surface text-muted hover:text-brand transition-colors`}
              title="Pick color from screen"
              aria-label="Pick color from screen"
            >
              <Pipette size={styles.iconSize} />
            </motion.button>
          )}
        </div>
      )}

      {variant === 'compact' && (
        <div className="flex items-center gap-2">
           <motion.button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`${styles.compactSize} rounded-full border border-border border-ui relative overflow-hidden shadow-sm`}
              style={{ backgroundColor: value }}
              aria-label={label || "Pick color"}
              aria-expanded={isOpen}
           >
              <div className="absolute inset-0 -z-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPjxwYXRoIGZpbGw9IiNjY2MiIGQ9Ik0wIDBoNHY0SDB6bTQgNGg0djRINHoiLz48L3N2Zz4=')] opacity-20" />
           </motion.button>
           {label && <label className={`text-text font-medium ${styles.text}`}>{label}</label>}
        </div>
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ type: "spring", duration: 0.3 }}
            className="absolute top-full left-0 z-50 mt-2 p-4 bg-surface rounded-ui-lg border border-border border-ui shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-label="Color Picker"
          >
             <PickerContent />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};