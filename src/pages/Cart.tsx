import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Minus, Plus, ArrowRight } from 'lucide-react';
import { useStore } from '../store/useStore';
import { useTranslation } from 'react-i18next';

const Cart = () => {
  const { cart, updateCartItem, removeFromCart, isLoading } = useStore();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleUpdateQuantity = (itemId: string, currentQuantity: number, delta: number, maxStock: number) => {
    const newQuantity = currentQuantity + delta;
    if (newQuantity > 0 && newQuantity <= maxStock) {
      updateCartItem(itemId, newQuantity);
    }
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const shipping = subtotal > 50 ? 0 : 5.99;
  const total = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-32 text-center">
        <h1 className="text-3xl font-serif text-stone-900 mb-6">{t('cart.empty')}</h1>
        <p className="text-stone-500 mb-8">{t('cart.emptyDesc')}</p>
        <Link 
          to="/products" 
          className="inline-block bg-stone-900 text-white px-8 py-4 uppercase tracking-widest text-sm font-medium hover:bg-stone-800 transition-colors"
        >
          {t('cart.continue')}
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <h1 className="text-3xl font-serif text-stone-900 mb-10">{t('cart.title')}</h1>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Cart Items */}
        <div className="flex-grow">
          <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-stone-200 text-sm uppercase tracking-wider text-stone-500 font-medium">
            <div className="col-span-6">{t('cart.product')}</div>
            <div className="col-span-2 text-center">{t('cart.price')}</div>
            <div className="col-span-2 text-center">{t('cart.quantity')}</div>
            <div className="col-span-2 text-right">{t('cart.total')}</div>
          </div>

          <div className={`divide-y divide-stone-200 ${isLoading ? 'opacity-50 pointer-events-none' : ''}`}>
            {cart.map((item) => (
              <div key={item.id} className="py-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                {/* Product Info */}
                <div className="col-span-1 md:col-span-6 flex gap-4">
                  <div className="w-24 h-32 bg-stone-100 flex-shrink-0">
                    <img 
                      src={item.product.image} 
                      alt={item.product.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col justify-center">
                    <Link to={`/products/${item.product.id}`} className="text-stone-900 font-medium hover:text-stone-600 transition-colors">
                      {item.product.name}
                    </Link>
                    <p className="text-stone-500 text-sm mt-1 capitalize">{item.product.category}</p>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-stone-400 hover:text-red-500 flex items-center gap-1 mt-4 text-sm transition-colors w-fit"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>{t('cart.remove')}</span>
                    </button>
                  </div>
                </div>

                {/* Price (Mobile & Desktop) */}
                <div className="col-span-1 md:col-span-2 md:text-center mt-2 md:mt-0">
                  <span className="md:hidden text-stone-500 text-sm mr-2">{t('cart.price')}:</span>
                  <span className="text-stone-900">${item.product.price.toFixed(2)}</span>
                </div>

                {/* Quantity */}
                <div className="col-span-1 md:col-span-2 flex justify-start md:justify-center">
                  <div className="flex items-center border border-stone-300">
                    <button 
                      onClick={() => handleUpdateQuantity(item.id, item.quantity, -1, item.product.stock)}
                      disabled={item.quantity <= 1}
                      className="p-2 text-stone-500 hover:text-stone-900 disabled:opacity-50 transition-colors"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-8 text-center text-stone-900 text-sm">{item.quantity}</span>
                    <button 
                      onClick={() => handleUpdateQuantity(item.id, item.quantity, 1, item.product.stock)}
                      disabled={item.quantity >= item.product.stock}
                      className="p-2 text-stone-500 hover:text-stone-900 disabled:opacity-50 transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Total */}
                <div className="col-span-1 md:col-span-2 text-left md:text-right font-medium">
                  <span className="md:hidden text-stone-500 text-sm mr-2 font-normal">{t('cart.total')}:</span>
                  <span className="text-stone-900">${(item.product.price * item.quantity).toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:w-96">
          <div className="bg-stone-50 p-8 border border-stone-200">
            <h2 className="text-xl font-serif text-stone-900 mb-6">{t('cart.summary')}</h2>
            
            <div className="space-y-4 text-sm mb-6 border-b border-stone-200 pb-6">
              <div className="flex justify-between">
                <span className="text-stone-600">{t('cart.subtotal')}</span>
                <span className="text-stone-900 font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-600">{t('cart.shipping')}</span>
                <span className="text-stone-900 font-medium">{shipping === 0 ? t('cart.free') : `$${shipping.toFixed(2)}`}</span>
              </div>
              {shipping > 0 && (
                <div className="text-xs text-stone-500 mt-1">
                  {t('cart.spendMore', { amount: (50 - subtotal).toFixed(2) })}
                </div>
              )}
            </div>

            <div className="flex justify-between items-end mb-8">
              <span className="text-base text-stone-900 font-medium">{t('cart.total')}</span>
              <span className="text-2xl font-serif text-stone-900">${total.toFixed(2)}</span>
            </div>

            <button 
              onClick={() => navigate('/checkout')}
              className="w-full flex justify-center items-center space-x-2 bg-stone-900 text-white px-8 py-4 uppercase tracking-widest text-sm font-medium hover:bg-stone-800 transition-colors"
            >
              <span>{t('cart.checkout')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;