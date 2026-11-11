import { motion } from 'framer-motion';
import { ArrowRight, Play, Pause, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { HeroCarousel } from './HeroCarousel';
import type { Product } from '../types';

interface HeroProps {
  products: Product[];
}

export const Hero = ({ products }: HeroProps) => {
  const { i18n } = useTranslation();
  const isEs = i18n.language === 'es';
  
  const [isPlaying, setIsPlaying] = useState(true);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleVideoPlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section className="relative min-h-[92vh] bg-stone-950 text-white flex flex-col justify-between overflow-hidden py-12 md:py-16">
      {/* Background Video Layer with Fallback Image */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Fallback Image while video loads */}
        <div className={`absolute inset-0 transition-opacity duration-1000 ${isVideoLoaded ? 'opacity-0' : 'opacity-40'}`}>
          <img 
            src="https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=2000" 
            alt="MulfordKore Background"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Ambient Video Background */}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          onCanPlay={() => setIsVideoLoaded(true)}
          className={`w-full h-full object-cover scale-105 transition-opacity duration-1000 ${isVideoLoaded ? 'opacity-45' : 'opacity-0'}`}
        >
          {/* High luxury skincare loop video */}
          <source 
            src="https://assets.mixkit.co/videos/preview/mixkit-beautiful-woman-applying-facial-cream-41551-large.mp4" 
            type="video/mp4" 
          />
        </video>

        {/* Cinematic Vignette & Radial Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/95 via-stone-950/75 to-stone-950/40 z-0 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-stone-950/60 via-transparent to-stone-950 z-0 pointer-events-none" />
      </div>

      {/* Video Control Toggle */}
      <button
        onClick={toggleVideoPlay}
        className="absolute top-8 right-8 z-20 w-10 h-10 rounded-full bg-stone-900/60 border border-stone-700/60 backdrop-blur-md flex items-center justify-center text-stone-300 hover:text-white hover:border-[#D4AF37] transition-all duration-300 hidden md:flex"
        aria-label="Toggle background video"
      >
        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
      </button>

      {/* Hero Content */}
      <div className="container mx-auto px-4 relative z-10 my-auto">
        <div className="max-w-2xl">
          {/* Brand Emblem */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center space-x-2 bg-[#D4AF37]/10 border border-[#D4AF37]/30 backdrop-blur-md px-4 py-1.5 rounded-full mb-6"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="text-[11px] uppercase tracking-[0.35em] font-semibold text-[#D4AF37]">
              MulfordKore High Cosmetics
            </span>
          </motion.div>

          {/* Emotional Title */}
          <motion.h1 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-6xl md:text-7xl font-serif text-white mb-6 leading-[1.1] tracking-tight"
          >
            {isEs ? (
              <>
                Descubre la Belleza <br />
                <span className="italic font-normal text-[#D4AF37]">que Habla de Ti</span>
              </>
            ) : (
              <>
                Discover the Beauty <br />
                <span className="italic font-normal text-[#D4AF37]">That Speaks of You</span>
              </>
            )}
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="text-base sm:text-lg md:text-xl text-stone-300 mb-10 font-light leading-relaxed max-w-xl"
          >
            {isEs 
              ? 'Skincare y maquillaje coreano seleccionados para potenciar tu belleza natural.'
              : 'Korean skincare and cosmetics curated to empower your natural beauty.'}
          </motion.p>

          {/* Dual Action CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-4 sm:space-y-0 sm:space-x-5"
          >
            {/* Primary Gold CTA */}
            <Link 
              to="/products" 
              className="group relative inline-flex items-center justify-center space-x-3 bg-[#D4AF37] text-stone-950 px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] rounded transition-all duration-300 hover:bg-white hover:shadow-[0_0_25px_rgba(212,175,55,0.5)] hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>{isEs ? 'Comprar Ahora' : 'Shop Now'}</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            {/* Secondary Glassmorphism CTA */}
            <Link 
              to="/products" 
              className="inline-flex items-center justify-center space-x-2 bg-stone-900/60 border border-stone-700/80 text-white px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] rounded backdrop-blur-md hover:bg-stone-800 hover:border-white/50 transition-all duration-300"
            >
              <span>{isEs ? 'Explorar Colección' : 'Explore Collection'}</span>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Marquee Carousel Section */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="relative z-10 mt-12"
      >
        <div className="container mx-auto px-4 mb-3 flex items-center justify-between">
          <h3 className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-semibold">
            {isEs ? 'Destacados del Catálogo' : 'Featured Catalog'}
          </h3>
          <span className="text-[11px] text-stone-400 hidden sm:inline-block italic">
            {isEs ? 'Pasa el cursor para pausar' : 'Hover to pause'}
          </span>
        </div>
        <HeroCarousel products={products} />
      </motion.div>
    </section>
  );
};