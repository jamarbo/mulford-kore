import { motion } from 'framer-motion';
import { Star, Quote, ShoppingBag } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export const SocialProof = () => {
  const { i18n } = useTranslation();
  const isEs = i18n.language === 'es';

  const reviews = [
    {
      id: 1,
      name: 'Camila Mendoza',
      city: 'Bogotá',
      rating: 5,
      comment: isEs 
        ? 'La calidad del serum de rosa es excepcional. Mi piel cambió totalmente desde la primera semana. MulfordKore nunca decepciona.'
        : 'The rose serum quality is exceptional. My skin completely changed from the first week. MulfordKore never disappoints.',
      product: 'Hydrating Rose Serum',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'
    },
    {
      id: 2,
      name: 'Valentina Restrepo',
      city: 'Medellín',
      rating: 5,
      comment: isEs 
        ? 'El empaque, la rapidez del envío y el terminado de la base luminosa son de otro nivel. Definitivamente cosmética de lujo.'
        : 'The packaging, fast shipping, and glowing foundation finish are next level. Truly luxury cosmetics.',
      product: 'Luminous Foundation',
      image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200'
    },
    {
      id: 3,
      name: 'Isabella Gómez',
      city: 'Cali',
      rating: 5,
      comment: isEs 
        ? 'El tono del labial Velvet Ruby dura impecable todo el día sin resecar. La atención personalizada por WhatsApp fue increíble.'
        : 'The Velvet Ruby shade stays flawless all day without drying. The personalized service was amazing.',
      product: 'Matte Velvet Lipstick - Ruby',
      image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=200'
    }
  ];

  return (
    <section className="py-24 bg-stone-900 text-white border-t border-stone-800">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs uppercase tracking-[0.3em] font-semibold text-[#D4AF37] block mb-3"
          >
            {isEs ? 'Experiencias de Nuestras Clientas' : 'Client Experiences'}
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-serif text-white mb-4"
          >
            {isEs ? 'Lo Que Dicen Quienes Aman MulfordKore' : 'Loved by Beauty Enthusiasts'}
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center space-x-2 text-stone-400 text-sm"
          >
            <div className="flex text-[#D4AF37]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <span className="font-medium text-white">4.9/5.0</span>
            <span>•</span>
            <span>{isEs ? 'Más de 2,400 valoraciones verificadas' : 'Over 2,400 verified reviews'}</span>
          </motion.div>
        </div>

        {/* Reviews Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev, idx) => (
            <motion.div
              key={rev.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="bg-stone-800/50 border border-stone-700/60 p-8 rounded-xl backdrop-blur-sm relative flex flex-col justify-between hover:border-[#D4AF37]/50 transition-all duration-300 hover:shadow-2xl group"
            >
              <Quote className="absolute top-6 right-6 w-8 h-8 text-stone-700/40 group-hover:text-[#D4AF37]/20 transition-colors" />

              <div>
                {/* Rating */}
                <div className="flex text-[#D4AF37] mb-4">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                {/* Comment */}
                <p className="text-stone-300 text-sm leading-relaxed italic mb-6">
                  "{rev.comment}"
                </p>
              </div>

              {/* User info */}
              <div className="pt-4 border-t border-stone-700/60 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img 
                    src={rev.image} 
                    alt={rev.name} 
                    className="w-10 h-10 rounded-full object-cover border border-[#D4AF37]/40"
                  />
                  <div>
                    <h4 className="text-white font-medium text-sm">{rev.name}</h4>
                    <span className="text-xs text-stone-400">{rev.city}</span>
                  </div>
                </div>
                
                <span className="text-[10px] uppercase font-semibold text-[#D4AF37] bg-[#D4AF37]/10 px-2 py-1 rounded border border-[#D4AF37]/20">
                  {isEs ? 'Compra Verificada' : 'Verified'}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Live Order Indicator Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 bg-stone-800/80 border border-stone-700/80 max-w-md mx-auto p-4 rounded-xl flex items-center space-x-4 shadow-xl backdrop-blur-md"
        >
          <div className="relative flex-shrink-0">
            <span className="w-3 h-3 bg-emerald-500 rounded-full block animate-ping absolute" />
            <span className="w-3 h-3 bg-emerald-500 rounded-full block relative" />
          </div>
          <div className="text-xs flex-grow">
            <span className="text-stone-300 font-normal">
              {isEs ? 'Alguien en ' : 'Someone in '}
              <strong className="text-white">Medellín</strong>
              {isEs ? ' acaba de comprar ' : ' just purchased '}
            </span>
            <Link to="/products" className="text-[#D4AF37] font-semibold underline block hover:text-white transition-colors">
              Hydrating Rose Serum
            </Link>
          </div>
          <ShoppingBag className="w-5 h-5 text-stone-400" />
        </motion.div>
      </div>
    </section>
  );
};