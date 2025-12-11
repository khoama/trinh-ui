import React, { useRef, useState, useEffect, useCallback, forwardRef, useImperativeHandle } from 'react';
import { motion, AnimatePresence, useMotionValue } from 'framer-motion';
import { ScrollPanelProps } from '../../types';

const PADDING = 12; // 6px top + 6px bottom (py-1.5)

export const ScrollPanel = forwardRef<HTMLDivElement, ScrollPanelProps>(({
  children,
  className = '',
  orientation = 'vertical',
  height = '100%',
}, ref) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  
  // Expose the content div to the parent via ref
  useImperativeHandle(ref, () => contentRef.current as HTMLDivElement);
  
  // Layout State
  const [thumbSize, setThumbSize] = useState(0);
  const [viewportLength, setViewportLength] = useState(0);
  const [contentLength, setContentLength] = useState(0);
  
  // Motion Value for zero-latency updates
  const thumbPos = useMotionValue(0);
  
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  
  const isVertical = orientation === 'vertical';

  // Calculate Thumb Size & Position
  const updateScrollState = useCallback(() => {
    if (!contentRef.current) return;
    
    const { 
      scrollHeight, scrollWidth, 
      clientHeight, clientWidth, 
      scrollTop, scrollLeft 
    } = contentRef.current;

    const total = isVertical ? scrollHeight : scrollWidth;
    const view = isVertical ? clientHeight : clientWidth;
    const scroll = isVertical ? scrollTop : scrollLeft;

    // Only update state if dimensions change
    if (total !== contentLength) setContentLength(total);
    if (view !== viewportLength) setViewportLength(view);

    if (total > view) {
      // Calculate thumb size based on available track space
      const trackSpace = view - PADDING;
      const ratio = view / total;
      const size = Math.max(20, ratio * trackSpace); 
      
      if (size !== thumbSize) setThumbSize(size);

      // Calculate thumb position directly into MotionValue
      const maxScroll = total - view;
      const maxThumb = trackSpace - size;
      const progress = scroll / maxScroll;
      const pos = progress * maxThumb;
      
      // Update motion value directly if not dragging
      if (!isDragging) {
        thumbPos.set(pos);
      }
    } else {
      if (thumbSize !== 0) setThumbSize(0);
    }
  }, [isVertical, thumbSize, contentLength, viewportLength, thumbPos, isDragging]);

  // Handle ResizeObserver
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    // Initial update
    updateScrollState();

    const observer = new ResizeObserver(() => updateScrollState());
    observer.observe(el);
    if (el.firstElementChild) {
      observer.observe(el.firstElementChild);
    }

    return () => observer.disconnect();
  }, [updateScrollState]);

  // Handle Native Scroll
  const onScroll = () => {
    if (!isDragging) {
      updateScrollState();
    }
  };

  // Handle Dragging
  const handleDrag = () => {
    if (!contentRef.current || !thumbSize) return;

    const trackSpace = viewportLength - PADDING;
    const maxThumb = trackSpace - thumbSize;
    const maxScroll = contentLength - viewportLength;
    
    const currentPos = thumbPos.get();
    
    const boundedPos = Math.max(0, Math.min(maxThumb, currentPos));
    const progress = boundedPos / maxThumb;
    const newScroll = progress * maxScroll;
    
    if (isVertical) {
      contentRef.current.scrollTop = newScroll;
    } else {
      contentRef.current.scrollLeft = newScroll;
    }
  };

  const showScrollbar = thumbSize > 0 && thumbSize < viewportLength;

  return (
    <div 
      className={`relative group overflow-hidden flex flex-col ${className}`}
      style={{ height: height }}
      onMouseEnter={() => {
        setIsHovered(true);
        updateScrollState();
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsDragging(false);
      }}
    >
      {/* Scrollable Content Area */}
      <div 
        ref={contentRef}
        className={`w-full flex-1 min-h-0 overflow-auto no-scrollbar scroll-smooth outline-none`}
        onScroll={onScroll}
        tabIndex={0}
      >
        {children}
      </div>

      {/* Custom Scrollbar Track/Thumb */}
      <AnimatePresence>
        {showScrollbar && (
          <motion.div
            ref={trackRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered || isDragging ? 1 : 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={`
              absolute z-20 bg-transparent pointer-events-none
              ${isVertical 
                ? 'right-0 top-1.5 bottom-1.5 w-5' 
                : 'bottom-0 left-1.5 right-1.5 h-5'
              }
            `}
          >
             {/* Draggable Thumb (Hit Area) */}
             <motion.div
               drag={isVertical ? "y" : "x"}
               dragConstraints={trackRef}
               dragElastic={0}
               dragMomentum={false}
               onDragStart={() => setIsDragging(true)}
               onDrag={handleDrag}
               onDragEnd={() => setIsDragging(false)}
               
               style={isVertical ? { height: thumbSize, y: thumbPos } : { width: thumbSize, x: thumbPos }}
               
               className={`
                 group/thumb cursor-pointer pointer-events-auto relative
                 ${isVertical ? 'w-full' : 'h-full'}
               `}
             >
                {/* Visual Thumb (Inner Bar) */}
                <div className={`
                    absolute rounded-full bg-brand/40 group-hover/thumb:bg-brand/80 group-active/thumb:bg-brand shadow-sm transition-all duration-200
                    ${isVertical 
                        ? 'right-1.5 w-1.5 h-full'
                        : 'bottom-1.5 h-1.5 w-full'
                    }
                `} />
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

ScrollPanel.displayName = "ScrollPanel";