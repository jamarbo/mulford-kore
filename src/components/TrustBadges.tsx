import { motion } from 'framer-motion';
import { ShieldCheck, Truck, Lock, Award, Headphones } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const TrustBadges = () => {
  const { i18n } = useTranslation();
  const isEs = i18n.language === 'es';

  const badges = [
    {
      icon: ShieldCheck,
      title: isEs ? '100% Originales' : '100% Authentic',
      desc: isEs ? 'Garantía de origen importado' : 'Guaranteed imported origin'
    },
    {
      icon: Truck,
      title: isEs ? 'Envíos a toda Colombia' : 'Nationwide Shipping',
      desc: isEs ? 'Entregas rápidas y seguras' : 'Fast and secure delivery'
    },
    {
      icon: Lock,
      title: isEs ? 'Pago Seguro' : 'Secure Checkout',
      desc: isEs ? 'PSE, Nequi, Tarjetas, Efectivo' : 'Cards, PSE, Local payments'
    },
    {
      icon: Award,
      title: isEs ? 'Calidad Premium' : 'Premium Quality',
      desc: isEs ? 'Skincare de alta cosmética' : 'High luxury skincare'
    },
    {
      icon: Headphones,
      title: isEs ? 'Atención Personalizada' : 'Personalized Care',
      desc: isEs ? 'Asesoría especializada 24/7' : 'Specialized 24/7 support'
    }
  ];

  return (
    <section className="bg-stone-900 border-y border-stone-800/80 py-10 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-8">
          {badges.map((badge, idx) => {
            const Icon = badge.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="flex flex-col items-center text-center p-3 rounded-lg hover:bg-stone-800/50 transition-all duration-300 group cursor-default"
              >
                <div className="w-12 h-12 rounded-full bg-stone-800 border border-stone-700/80 flex items-center justify-center mb-3 group-hover:border-[#D4AF37] group-hover:bg-stone-800/80 transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                  <Icon className="w-5 h-5 text-[#D4AF37] group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h4 className="text-white text-xs font-semibold uppercase tracking-wider mb-1">
                  {badge.title}
                </h4>
                <p className="text-stone-400 text-[11px] font-light leading-tight">
                  {badge.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};