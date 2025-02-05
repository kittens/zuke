'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

type Position = {
  x: number;
  y: number;
};

export default function Toast({ message, isVisible, onClose }: ToastProps) {
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          style={{
            position: 'fixed',
            top: `${position.y + 20}px`,
            left: `${position.x}px`,
            transform: 'translate(-50%, 0)',
            zIndex: 50,
            pointerEvents: 'none',
          }}
        >
          <div className="bg-[#242529] text-white px-4 py-2 rounded-md shadow-lg">
            <p className="text-sm whitespace-nowrap font-suisse-intl">
              {message}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 