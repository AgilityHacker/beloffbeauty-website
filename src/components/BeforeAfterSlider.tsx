'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeAlt?: string;
  afterAlt?: string;
  className?: string;
}

export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeAlt = 'Before',
  afterAlt = 'After',
  className = '',
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    
    setSliderPosition(Math.max(0, Math.min(100, percentage)));
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  const startDragging = () => setIsDragging(true);
  const stopDragging = () => setIsDragging(false);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', stopDragging);
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', stopDragging);

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', stopDragging);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', stopDragging);
      };
    }
  }, [isDragging]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden rounded-2xl select-none ${className}`}
      style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
    >
      {/* After Image (Background) */}
      <div className="relative w-full h-full">
        <Image
          src={afterImage}
          alt={afterAlt}
          fill
          className="object-cover"
          draggable={false}
        />
      </div>

      {/* Before Image (Overlay) */}
      <div
        className="absolute top-0 left-0 h-full overflow-hidden"
        style={{ width: `${sliderPosition}%` }}
      >
        <div className="relative h-full" style={{ width: `${(100 / sliderPosition) * 100}%` }}>
          <Image
            src={beforeImage}
            alt={beforeAlt}
            fill
            className="object-cover"
            draggable={false}
          />
        </div>
      </div>

      {/* Slider Line */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-white shadow-lg"
        style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
      >
        {/* Slider Handle */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-elegant flex items-center justify-center cursor-grab active:cursor-grabbing"
          onMouseDown={startDragging}
          onTouchStart={startDragging}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            className="text-charcoal-700"
          >
            <path
              d="M15 19L8 12L15 5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M9 19L16 12L9 5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </div>

      {/* Labels */}
      <div className="absolute top-4 left-4 bg-charcoal-900/80 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
        Before
      </div>
      <div className="absolute top-4 right-4 bg-blush-600/90 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
        After
      </div>
    </div>
  );
}