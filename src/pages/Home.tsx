import { Link } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { SplashScreen } from '../components/SplashScreen';
import { Hero } from '../components/Hero';
import { TrustBadges } from '../components/TrustBadges';
import { SocialProof } from '../components/SocialProof';

const Home = () => {
  const { products, fetchProducts, isLoading } = useStore();
  const { t } = useTranslation();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const featuredProducts = products.slice(0, 4);

  return (
    <div>
      {/* 2-3 Second Splash Screen Intro */}
      <SplashScreen />

      {/* Cinematic Hero Video Section */}
      <Hero products={products} />

      {/* Immediate Trust Badges Bar */}
      <TrustBadges />

      {/* Featured Products */}
      <section className="py-24 container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-serif text-stone-900 mb-4"
          >
            {t('home.curated')}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-stone-500"
          >
            {t('home.curatedDesc')}
          </motion.p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-4 border-stone-200 border-t-stone-900 rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <Link to={`/products/${product.id}`} className="group block">
                  <div className="aspect-[4/5] overflow-hidden bg-stone-100 mb-4 rounded-lg relative">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <h3 className="text-stone-900 font-medium group-hover:text-stone-600 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-stone-500 mt-1 font-semibold">${product.price.toFixed(2)}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
        
        <div className="mt-16 text-center">
          <Link to="/products" className="inline-block border-b border-stone-900 text-stone-900 pb-1 hover:text-stone-600 hover:border-stone-600 transition-colors uppercase tracking-wider text-sm font-medium">
            {t('home.viewAll')}
          </Link>
        </div>
      </section>

      {/* Social Proof Section (Reviews + Real-time notifications) */}
      <SocialProof />

      {/* Meet the Founder Section */}
      <section className="py-24 bg-stone-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
            {/* Image Side */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="w-full lg:w-1/2 relative group"
            >
              <div className="absolute inset-0 bg-stone-200 translate-x-4 translate-y-4 transition-transform duration-500 group-hover:translate-x-6 group-hover:translate-y-6 rounded-lg" />
              <img 
                src="/founder.png" 
                alt={t('home.founderName')}
                className="relative z-10 w-full h-auto aspect-[3/4] object-cover object-center grayscale hover:grayscale-0 transition-all duration-700 ease-in-out rounded-lg shadow-xl"
                loading="lazy"
              />
            </motion.div>
            
            {/* Text Side */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="w-full lg:w-1/2 flex flex-col justify-center"
            >
              <div className="max-w-xl">
                <h2 className="text-sm font-bold uppercase tracking-widest text-stone-500 mb-4">{t('home.founderTitle')}</h2>
                <h3 className="text-4xl md:text-5xl font-serif text-stone-900 mb-8">{t('home.founderName')}</h3>
                
                <div className="relative">
                  <span className="absolute -top-6 -left-4 text-6xl text-stone-200 font-serif leading-none">"</span>
                  <p className="text-xl md:text-2xl text-stone-700 leading-relaxed font-serif italic mb-8 relative z-10 pl-4 border-l-2 border-stone-900">
                    {t('home.founderQuote').replace(/^"|"$/g, '')}
                  </p>
                </div>
                
                <p className="text-stone-500 uppercase tracking-widest text-sm font-medium">
                  — {t('home.founderRole')}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-stone-950 text-white py-24 border-t border-stone-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h3 className="text-xl font-serif mb-4 text-[#D4AF37]">{t('home.values.cleanTitle')}</h3>
              <p className="text-stone-400 text-sm leading-relaxed">{t('home.values.cleanDesc')}</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}>
              <h3 className="text-xl font-serif mb-4 text-[#D4AF37]">{t('home.values.crueltyTitle')}</h3>
              <p className="text-stone-400 text-sm leading-relaxed">{t('home.values.crueltyDesc')}</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
              <h3 className="text-xl font-serif mb-4 text-[#D4AF37]">{t('home.values.susTitle')}</h3>
              <p className="text-stone-400 text-sm leading-relaxed">{t('home.values.susDesc')}</p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
