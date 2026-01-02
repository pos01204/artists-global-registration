'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ConfettiPiece {
  id: number;
  x: number;
  color: string;
  shape: 'circle' | 'square' | 'star';
  size: number;
  delay: number;
  duration: number;
  rotation: number;
}

interface ConfettiEffectProps {
  isActive: boolean;
  duration?: number;
  pieceCount?: number;
}

const COLORS = ['#FF6F00', '#FFE0B2', '#E65100', '#4CAF50', '#2196F3', '#9C27B0', '#FF4081'];

export default function ConfettiEffect({ 
  isActive, 
  duration = 3000, 
  pieceCount = 50 
}: ConfettiEffectProps) {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isActive) {
      // 조각 생성
      const newPieces: ConfettiPiece[] = Array.from({ length: pieceCount }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        shape: (['circle', 'square', 'star'] as const)[Math.floor(Math.random() * 3)],
        size: Math.random() * 8 + 6,
        delay: Math.random() * 0.5,
        duration: Math.random() * 2 + 2,
        rotation: Math.random() * 720 - 360,
      }));
      
      setPieces(newPieces);
      setShow(true);

      // 지정 시간 후 숨기기
      const timer = setTimeout(() => setShow(false), duration);
      return () => clearTimeout(timer);
    }
  }, [isActive, duration, pieceCount]);

  const renderShape = (piece: ConfettiPiece) => {
    switch (piece.shape) {
      case 'circle':
        return (
          <div
            className="rounded-full"
            style={{
              width: piece.size,
              height: piece.size,
              backgroundColor: piece.color,
            }}
          />
        );
      case 'square':
        return (
          <div
            style={{
              width: piece.size,
              height: piece.size,
              backgroundColor: piece.color,
            }}
          />
        );
      case 'star':
        return (
          <svg
            width={piece.size}
            height={piece.size}
            viewBox="0 0 24 24"
            fill={piece.color}
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        );
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {pieces.map((piece) => (
            <motion.div
              key={piece.id}
              className="absolute"
              style={{ left: `${piece.x}%` }}
              initial={{ 
                y: -20, 
                opacity: 1,
                rotate: 0,
                scale: 0,
              }}
              animate={{ 
                y: '100vh',
                opacity: [1, 1, 0],
                rotate: piece.rotation,
                scale: [0, 1, 1, 0.5],
                x: [0, Math.random() * 100 - 50, Math.random() * 50 - 25],
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: piece.duration,
                delay: piece.delay,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              {renderShape(piece)}
            </motion.div>
          ))}
        </div>
      )}
    </AnimatePresence>
  );
}
