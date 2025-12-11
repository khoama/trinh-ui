import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Eye, Copy, Check } from 'lucide-react';

interface StoryProps {
  title: string;
  description?: string;
  code: string;
  children: React.ReactNode;
}

export const Story: React.FC<StoryProps> = ({ title, description, code, children }) => {
  const [showCode, setShowCode] = useState(false);
  const [hasCopied, setHasCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code.trim());
      setHasCopied(true);
      setTimeout(() => setHasCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="mb-12 break-inside-avoid">
      <div className="mb-3">
        <h3 className="text-lg font-bold text-text flex items-center gap-2">
          {title}
        </h3>
        {description && (
          <p className="text-muted text-sm mt-1 max-w-2xl">
            {description}
          </p>
        )}
      </div>

      <div className="rounded-xl border border-border bg-surface">
        {/* Preview Area */}
        <div className="p-6 md:p-8 bg-surface-alt/30 border-b border-border min-h-[120px] flex flex-col justify-center rounded-t-xl">
          {children}
        </div>

        {/* Action Bar */}
        <div className={`flex items-center justify-end px-4 py-2 bg-surface gap-2 transition-all ${showCode ? 'border-b border-border/50' : 'rounded-b-xl'}`}>
          <AnimatePresence>
            {showCode && (
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                onClick={handleCopy}
                className="flex items-center gap-2 text-xs font-medium text-muted hover:text-primary transition-colors py-1.5 px-3 rounded-md hover:bg-surface-alt"
              >
                {hasCopied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                {hasCopied ? 'Copied!' : 'Copy'}
              </motion.button>
            )}
          </AnimatePresence>
          
          <button
            onClick={() => setShowCode(!showCode)}
            className="flex items-center gap-2 text-xs font-medium text-muted hover:text-primary transition-colors py-1.5 px-3 rounded-md hover:bg-surface-alt"
          >
            {showCode ? <Eye size={14} /> : <Code size={14} />}
            {showCode ? 'Hide Code' : 'View Code'}
          </button>
        </div>

        {/* Code Block */}
        <AnimatePresence>
          {showCode && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden bg-code-bg rounded-b-xl"
            >
              <div className="p-4 overflow-x-auto custom-scrollbar">
                <pre className="text-sm font-mono text-code-text leading-relaxed">
                  {code.trim()}
                </pre>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};