import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

interface SplashScreenProps {
  onFinish?: () => void;
}

export const SplashScreen = ({ onFinish }: SplashScreenProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Show splash animation for exactly 2 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onFinish) onFinish();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: 'blur(16px)', scale: 1.02 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Subtle Golden Ambient Radial Light */}
          <div className="absolute w-[500px] h-[500px] bg-gradient-to-r from-[#D4AF37]/15 via-stone-800/20 to-transparent rounded-full blur-3xl pointer-events-none" />

          {/* Logo Light Sweep Animation */}
          <div className="relative text-center px-4">
            {/* Shimmer Effect Background Light */}
            <motion.div
              initial={{ opacity: 0, x: '-100%' }}
              animate={{ opacity: [0, 0.6, 0], x: ['-100%', '100%'] }}
              transition={{ duration: 1.6, ease: 'easeInOut' }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent blur-md"
            />

            {/* Brand Logo */}
            <motion.h1
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-6xl md:text-7xl font-serif text-white font-extrabold tracking-[0.4em] relative z-10 uppercase drop-shadow-2xl"
            >
              MULFORDKORE
            </motion.h1>

            {/* Subtle Gold Shimmer Bar */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="w-32 md:w-56 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto my-4"
            />

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-xs sm:text-sm uppercase tracking-[0.6em] text-stone-300 font-light"
            >
              K-BEAUTY HIGH COSMETICS
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};