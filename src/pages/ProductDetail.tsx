import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ChevronRight, Minus, Plus, ShoppingBag, ArrowLeft } from 'lucide-react';
import { api } from '../services/api';
import type { Product } from '../types';
import { useStore } from '../store/useStore';
import { useTranslation } from 'react-i18next';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useStore();
  const { t } = useTranslation();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      try {
        if (!id) throw new Error('No product ID');
        const data = await api.getProduct(id);
        setProduct(data);
      } catch (err: any) {
        setError(err.message || 'Failed to load product');
      } finally {
        setIsLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleQuantityChange = (delta: number) => {
    if (!product) return;
    const newQuantity = quantity + delta;
    if (newQuantity > 0 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = async () => {
    if (!product) return;
    setIsAdding(true);
    try {
      await addToCart(product.id, quantity);
      // Optional: show success toast or slide-out cart here
    } catch (err: any) {
      alert(err.message || 'Failed to add to cart');
    } finally {
      setIsAdding(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex justify-center items-center">
        <div className="w-8 h-8 border-4 border-stone-200 border-t-stone-900 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-serif text-stone-900 mb-4">{t('product.notFound')}</h2>
        <p className="text-stone-500 mb-8">{error}</p>
        <button onClick={() => navigate('/products')} className="inline-flex items-center space-x-2 text-stone-900 border-b border-stone-900 pb-1">
          <ArrowLeft className="w-4 h-4" />
          <span className="uppercase text-sm tracking-wider font-medium">{t('product.back')}</span>
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      {/* Breadcrumbs */}
      <nav className="flex items-center space-x-2 text-sm text-stone-500 mb-8">
        <Link to="/" className="hover:text-stone-900 transition-colors">{t('product.home')}</Link>
        <ChevronRight className="w-4 h-4" />
        <Link to="/products" className="hover:text-stone-900 transition-colors">{t('product.products')}</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-stone-900">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
        {/* Product Image */}
        <div className="aspect-[4/5] bg-stone-100 overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-serif text-stone-900 mb-2">{product.name}</h1>
            <p className="text-xl text-stone-700">${product.price.toFixed(2)}</p>
          </div>

          <div className="prose prose-stone mb-10">
            <p className="text-stone-600 leading-relaxed">{product.description}</p>
          </div>

          {/* Add to Cart Actions */}
          <div className="mt-auto border-t border-stone-200 pt-8">
            {product.stock > 0 ? (
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <div className="flex items-center border border-stone-300 w-fit">
                  <button 
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    className="p-3 text-stone-500 hover:text-stone-900 disabled:opacity-50 transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center text-stone-900 font-medium">{quantity}</span>
                  <button 
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= product.stock}
                    className="p-3 text-stone-500 hover:text-stone-900 disabled:opacity-50 transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                
                <button 
                  onClick={handleAddToCart}
                  disabled={isAdding}
                  className="flex-1 flex justify-center items-center space-x-2 bg-stone-900 text-white px-8 py-3 uppercase tracking-widest text-sm font-medium hover:bg-stone-800 transition-colors disabled:opacity-70"
                >
                  {isAdding ? (
                    <div className="w-5 h-5 border-2 border-stone-400 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>{t('product.addToCart')}</span>
                    </>
                  )}
                </button>
              </div>
            ) : (
              <div className="bg-stone-100 text-stone-500 text-center py-4 uppercase tracking-widest text-sm font-medium">
                {t('product.outOfStock')}
              </div>
            )}
            
            <p className="text-sm text-stone-500 mt-4 text-center sm:text-left">
              {t('product.shippingInfo')}
            </p>
          </div>

          {/* Ingredients Accordion (simplified for now) */}
          <div className="mt-12 border-t border-stone-200 pt-8">
            <h3 className="text-lg font-serif text-stone-900 mb-4">{t('product.ingredients')}</h3>
            <ul className="list-disc list-inside text-stone-600 space-y-2">
              {product.ingredients.map((ingredient, idx) => (
                <li key={idx}>{ingredient}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;