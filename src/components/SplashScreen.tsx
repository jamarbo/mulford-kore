import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

interface SplashScreenProps {
  onFinish?: () => void;
}

export const SplashScreen = ({ onFinish }: SplashScreenProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Check if splash has been played in this session to avoid annoyance on every navigate
    const hasSeenSplash = sessionStorage.getItem('mk_splash_seen');
    if (hasSeenSplash) {
      setIsVisible(false);
      if (onFinish) onFinish();
      return;
    }

    const timer = setTimeout(() => {
      setIsVisible(false);
      sessionStorage.setItem('mk_splash_seen', 'true');
      if (onFinish) onFinish();
    }, 2800);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: 'blur(20px)' }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] bg-[#0c0a09] flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute w-[600px] h-[600px] bg-gradient-to-r from-[#D4AF37]/10 via-[#4A0E0E]/20 to-transparent rounded-full blur-3xl pointer-events-none animate-pulse" />

          {/* Logo Container */}
          <div className="relative text-center px-4">
            {/* Shimmer Effect Background Light */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.5 }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              className="absolute -inset-4 bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent blur-xl"
            />

            {/* Brand Logo */}
            <motion.h1
              initial={{ opacity: 0, y: 20, letterSpacing: '0.15em' }}
              animate={{ opacity: 1, y: 0, letterSpacing: '0.35em' }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-6xl md:text-7xl font-serif text-white font-extrabold tracking-[0.35em] relative z-10 uppercase drop-shadow-2xl"
            >
              MULFORDKORE
            </motion.h1>

            {/* Subtle Gold Shimmer Bar */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="w-32 md:w-48 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto my-4"
            />

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.7 }}
              className="text-xs sm:text-sm uppercase tracking-[0.5em] text-stone-300 font-light"
            >
              High Cosmetics Atelier
            </motion.p>
          </div>

          {/* Cinematic Minimal Progress Bar */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100px' }}
            transition={{ duration: 2.2, ease: 'easeInOut' }}
            className="absolute bottom-12 h-[1.5px] bg-[#D4AF37]/60 rounded-full"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};