'use client';

import { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ConfettiEffectProps {
  isActive: boolean;
  duration?: number;
  pieceCount?: number;
}

interface ConfettiPiece {
  id: number;
  x: number;
  color: string;
  delay: number;
  rotation: number;
  size: number;
}

const COLORS = [
  '#FF6F00', // idus orange
  '#FFB74D', // light orange
  '#FFF176', // yellow
  '#81C784', // green
  '#64B5F6', // blue
  '#BA68C8', // purple
  '#F06292', // pink
];

export default function ConfettiEffect({ 
  isActive, 
  duration = 3000, 
  pieceCount = 50 
}: ConfettiEffectProps) {
  const [show, setShow] = useState(false);

  const pieces = useMemo<ConfettiPiece[]>(() => {
    return Array.from({ length: pieceCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      delay: Math.random() * 0.5,
      rotation: Math.random() * 360,
      size: Math.random() * 8 + 6,
    }));
  }, [pieceCount]);

  useEffect(() => {
    if (isActive) {
      setShow(true);
      const timer = setTimeout(() => setShow(false), duration);
      return () => clearTimeout(timer);
    }
  }, [isActive, duration]);

  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {pieces.map((piece) => (
            <motion.div
              key={piece.id}
              className="absolute"
              style={{
                left: `${piece.x}%`,
                top: -20,
                width: piece.size,
                height: piece.size,
                backgroundColor: piece.color,
                borderRadius: Math.random() > 0.5 ? '50%' : '2px',
              }}
              initial={{
                y: -20,
                rotate: 0,
                opacity: 1,
                scale: 0,
              }}
              animate={{
                y: window.innerHeight + 100,
                rotate: piece.rotation + 720,
                opacity: [1, 1, 1, 0],
                scale: [0, 1, 1, 0.5],
                x: [0, Math.random() * 100 - 50, Math.random() * 100 - 50],
              }}
              transition={{
                duration: 3,
                delay: piece.delay,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            />
          ))}
        </div>
      )}
    </AnimatePresence>
  );
}
