import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useStore } from '../store/useStore';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const Home = () => {
  const { products, fetchProducts, isLoading } = useStore();
  const { t } = useTranslation();
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const featuredProducts = products.slice(0, 4);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[85vh] bg-stone-900 flex items-center overflow-hidden">
        {/* Background Overlay & Skeleton Fallback */}
        <div className={`absolute inset-0 z-0 transition-opacity duration-1000 ${imageLoaded ? 'opacity-100' : 'opacity-20'}`}>
          <img 
            src="https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=2000" 
            alt="Cosmetics flatlay editorial" 
            onLoad={() => setImageLoaded(true)}
            className="w-full h-full object-cover animate-hero-bg"
          />
        </div>
        
        {/* Vignette & Gradient for depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/80 via-stone-950/40 to-transparent z-0"></div>

        {/* Hero Content */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-xl">
            {/* Tagline */}
            <span className="inline-block text-xs uppercase tracking-[0.3em] font-medium text-stone-300 mb-4 animate-text-appear">
              MulfordKore Atelier
            </span>
            
            <h1 className="text-5xl md:text-7xl font-serif text-white mb-6 leading-tight animate-text-appear">
              {t('home.heroTitle1')} <br />
              <span className="italic font-normal text-stone-200">{t('home.heroTitle2')}</span>
            </h1>

            <p className="text-lg md:text-xl text-stone-300 mb-10 font-light leading-relaxed animate-text-delay">
              {t('home.heroDesc')}
            </p>

            <div className="animate-btn-delay">
              <Link 
                to="/products" 
                className="group relative inline-flex items-center space-x-3 bg-white text-stone-900 px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] overflow-hidden transition-all duration-300 hover:bg-stone-200 hover:shadow-2xl hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-stone-900"
              >
                <span className="relative z-10">{t('home.shopCollection')}</span>
                <ArrowRight className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-serif text-stone-900 mb-4">{t('home.curated')}</h2>
          <p className="text-stone-500">{t('home.curatedDesc')}</p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-4 border-stone-200 border-t-stone-900 rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <Link key={product.id} to={`/products/${product.id}`} className="group block">
                <div className="aspect-[4/5] overflow-hidden bg-stone-100 mb-4">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h3 className="text-stone-900 font-medium group-hover:text-stone-600 transition-colors">
                  {product.name}
                </h3>
                <p className="text-stone-500 mt-1">${product.price.toFixed(2)}</p>
              </Link>
            ))}
          </div>
        )}
        
        <div className="mt-16 text-center">
          <Link to="/products" className="inline-block border-b border-stone-900 text-stone-900 pb-1 hover:text-stone-600 hover:border-stone-600 transition-colors uppercase tracking-wider text-sm font-medium">
            {t('home.viewAll')}
          </Link>
        </div>
      </section>

      {/* Meet the Founder Section */}
      <section className="py-24 bg-stone-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
            {/* Image Side */}
            <div className="w-full lg:w-1/2 relative group">
              <div className="absolute inset-0 bg-stone-200 translate-x-4 translate-y-4 transition-transform duration-500 group-hover:translate-x-6 group-hover:translate-y-6"></div>
              <img 
                src="/founder.png" 
                alt={t('home.founderName')}
                className="relative z-10 w-full h-auto aspect-[3/4] object-cover object-center grayscale hover:grayscale-0 transition-all duration-700 ease-in-out"
                loading="lazy"
              />
            </div>
            
            {/* Text Side */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center">
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
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-stone-900 text-white py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div>
              <h3 className="text-xl font-serif mb-4">{t('home.values.cleanTitle')}</h3>
              <p className="text-stone-400 text-sm leading-relaxed">{t('home.values.cleanDesc')}</p>
            </div>
            <div>
              <h3 className="text-xl font-serif mb-4">{t('home.values.crueltyTitle')}</h3>
              <p className="text-stone-400 text-sm leading-relaxed">{t('home.values.crueltyDesc')}</p>
            </div>
            <div>
              <h3 className="text-xl font-serif mb-4">{t('home.values.susTitle')}</h3>
              <p className="text-stone-400 text-sm leading-relaxed">{t('home.values.susDesc')}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;