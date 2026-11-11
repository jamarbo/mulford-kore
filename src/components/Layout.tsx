import { Outlet, Link } from 'react-router-dom';
import { ShoppingCart, Menu, Search, User, Globe, X } from 'lucide-react';
import { useStore } from '../store/useStore';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const Layout = () => {
  const { cart, fetchCart } = useStore();
  const { t, i18n } = useTranslation();
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const toggleLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    setShowLangMenu(false);
  };

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-stone-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-stone-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Mobile menu button */}
            <button 
              className="p-2 md:hidden z-50" 
              aria-label="Menu"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-stone-600" />
              ) : (
                <Menu className="w-6 h-6 text-stone-600" />
              )}
            </button>

            {/* Logo */}
            <Link to="/" className="text-xl md:text-2xl font-serif text-stone-900 font-bold tracking-wider">
              {t('brand.name')}
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <Link to="/products" className="text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors">
                {t('nav.shopAll')}
              </Link>
              <Link to="/products?category=skincare" className="text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors">
                {t('nav.skincare')}
              </Link>
              <Link to="/products?category=makeup" className="text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors">
                {t('nav.makeup')}
              </Link>
            </nav>

            {/* Mobile Navigation Menu */}
            {isMobileMenuOpen && (
              <div className="absolute top-16 left-0 right-0 bg-white border-b border-stone-200 p-4 md:hidden shadow-lg">
                <nav className="flex flex-col space-y-4">
                  <Link 
                    to="/products" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors py-2"
                  >
                    {t('nav.shopAll')}
                  </Link>
                  <Link 
                    to="/products?category=skincare" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors py-2"
                  >
                    {t('nav.skincare')}
                  </Link>
                  <Link 
                    to="/products?category=makeup" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors py-2"
                  >
                    {t('nav.makeup')}
                  </Link>
                </nav>
              </div>
            )}

            {/* Icons */}
            <div className="flex items-center space-x-4 md:space-x-6">
              
              {/* Language Switcher */}
              <div className="relative">
                <button 
                  onClick={() => setShowLangMenu(!showLangMenu)}
                  className="flex items-center space-x-1 text-stone-600 hover:text-stone-900 transition-colors"
                  aria-label="Change Language"
                >
                  <Globe className="w-5 h-5" />
                  <span className="text-xs uppercase font-medium hidden md:block">{i18n.language}</span>
                </button>
                {showLangMenu && (
                  <div className="absolute top-full right-0 mt-2 w-24 bg-white border border-stone-200 shadow-lg py-1">
                    <button 
                      onClick={() => toggleLanguage('en')}
                      className={`block w-full text-left px-4 py-2 text-sm hover:bg-stone-50 ${i18n.language === 'en' ? 'font-bold text-stone-900' : 'text-stone-600'}`}
                    >
                      EN
                    </button>
                    <button 
                      onClick={() => toggleLanguage('es')}
                      className={`block w-full text-left px-4 py-2 text-sm hover:bg-stone-50 ${i18n.language === 'es' ? 'font-bold text-stone-900' : 'text-stone-600'}`}
                    >
                      ES
                    </button>
                  </div>
                )}
              </div>

              <button aria-label="Search" className="hidden md:block">
                <Search className="w-5 h-5 text-stone-600 hover:text-stone-900 transition-colors" />
              </button>
              <button aria-label="Account" className="hidden md:block">
                <User className="w-5 h-5 text-stone-600 hover:text-stone-900 transition-colors" />
              </button>
              <Link to="/cart" className="relative group">
                <ShoppingCart className="w-5 h-5 text-stone-600 group-hover:text-stone-900 transition-colors" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-stone-900 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-400 py-12">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white text-lg font-serif mb-4">{t('brand.name')}</h3>
            <p className="text-sm leading-relaxed">
              {t('brand.description')}
            </p>
          </div>
          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-4">{t('footer.shop')}</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/products" className="hover:text-white transition-colors">{t('footer.allProducts')}</Link></li>
              <li><Link to="/products?category=skincare" className="hover:text-white transition-colors">{t('nav.skincare')}</Link></li>
              <li><Link to="/products?category=makeup" className="hover:text-white transition-colors">{t('nav.makeup')}</Link></li>
              <li><Link to="/products?category=fragrance" className="hover:text-white transition-colors">{t('nav.fragrance')}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-4">{t('footer.support')}</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">{t('footer.contact')}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t('footer.faq')}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t('footer.shipping')}</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-4">{t('footer.newsletter')}</h4>
            <p className="text-sm mb-4">{t('footer.newsletterDesc')}</p>
            <div className="flex">
              <input type="email" placeholder={t('footer.emailPlaceholder')} className="bg-stone-800 text-white px-4 py-2 w-full focus:outline-none focus:ring-1 focus:ring-stone-500" aria-label="Email address" />
              <button className="bg-white text-stone-900 px-4 py-2 text-sm font-medium hover:bg-stone-200 transition-colors">
                {t('footer.subscribe')}
              </button>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 mt-12 pt-8 border-t border-stone-800 text-xs text-center">
          &copy; {new Date().getFullYear()} {t('brand.name')}. {t('footer.rights')}
        </div>
      </footer>
    </div>
  );
};

export default Layout;