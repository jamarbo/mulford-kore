import { Link } from 'react-router-dom';
import type { Product } from '../types';

interface HeroCarouselProps {
  products: Product[];
}

export const HeroCarousel = ({ products }: HeroCarouselProps) => {
  // Take a selection of products for the marquee (or default ones if empty)
  const items = products.length > 0 ? products : [];

  // Duplicate items twice to ensure smooth seamless 60fps infinite marquee loop
  const marqueeItems = [...items, ...items, ...items];

  return (
    <div className="w-full overflow-hidden relative py-4 group/marquee">
      {/* Gradient Vignette Mask Edge Effects */}
      <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-[#4A0E0E] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-[#4A0E0E] to-transparent z-10 pointer-events-none" />

      {/* Marquee Track */}
      <div className="flex space-x-6 w-max animate-marquee group-hover/marquee:[animation-play-state:paused]">
        {marqueeItems.map((product, idx) => (
          <Link
            key={`${product.id}-${idx}`}
            to={`/products/${product.id}`}
            className="group/card relative flex-shrink-0 w-56 md:w-64 bg-[#3B0B0B]/80 border border-[#D4AF37]/30 rounded-lg p-3 overflow-hidden transition-all duration-300 hover:scale-105 hover:border-[#D4AF37] hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]"
          >
            {/* Image Container */}
            <div className="aspect-square w-full overflow-hidden rounded-md bg-stone-950/40 mb-3 relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover object-center group-hover/card:scale-110 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              <span className="absolute top-2 left-2 bg-[#4A0E0E]/90 text-[#D4AF37] text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 border border-[#D4AF37]/40 rounded">
                {product.category}
              </span>
            </div>

            {/* Product Details */}
            <div className="flex flex-col justify-between">
              <h4 className="text-white text-sm font-medium line-clamp-1 group-hover/card:text-[#D4AF37] transition-colors">
                {product.name}
              </h4>
              <div className="flex justify-between items-center mt-2">
                <span className="text-[#D4AF37] font-semibold text-sm">
                  ${product.price.toFixed(2)}
                </span>
                <span className="text-xs uppercase tracking-wider text-stone-300 font-medium group-hover/card:underline">
                  Ver más →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};