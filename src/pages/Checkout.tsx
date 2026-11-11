import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import { useStore } from '../store/useStore';
import { useTranslation } from 'react-i18next';

const Checkout = () => {
  const { cart, checkout, isLoading } = useStore();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [isSuccess, setIsSuccess] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    country: '',
    postalCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const subtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const shipping = subtotal > 50 ? 0 : 5.99;
  const total = subtotal + shipping;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.email.includes('@')) newErrors.email = 'Valid email is required';
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.address) newErrors.address = 'Address is required';
    if (!formData.cardNumber || formData.cardNumber.length < 16) newErrors.cardNumber = 'Valid card number is required';
    if (!formData.expiryDate) newErrors.expiryDate = 'Expiry date is required';
    if (!formData.cvv) newErrors.cvv = 'CVV is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await checkout();
      setIsSuccess(true);
    } catch (error) {
      console.error('Checkout failed', error);
      alert('Checkout failed. Please try again.');
    }
  };

  if (isSuccess) {
    return (
      <div className="container mx-auto px-4 py-32 text-center max-w-lg">
        <CheckCircle2 className="w-20 h-20 text-stone-900 mx-auto mb-8" />
        <h1 className="text-4xl font-serif text-stone-900 mb-4">{t('checkout.successTitle')}</h1>
        <p className="text-stone-500 mb-8 leading-relaxed">
          {t('checkout.successDesc', { email: formData.email })}
        </p>
        <Link 
          to="/products" 
          className="inline-block bg-stone-900 text-white px-8 py-4 uppercase tracking-widest text-sm font-medium hover:bg-stone-800 transition-colors"
        >
          {t('checkout.continue')}
        </Link>
      </div>
    );
  }

  if (cart.length === 0 && !isSuccess) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <h1 className="text-3xl font-serif text-stone-900 mb-10">{t('checkout.title')}</h1>

      <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 flex-col-reverse lg:flex-row">
        {/* Form */}
        <div className="flex-grow max-w-2xl">
          <form onSubmit={handleSubmit} className="space-y-10">
            {/* Contact Info */}
            <section>
              <h2 className="text-xl font-serif text-stone-900 mb-6 pb-2 border-b border-stone-200">{t('checkout.contactInfo')}</h2>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">{t('checkout.email')}</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full p-3 border ${errors.email ? 'border-red-500' : 'border-stone-300'} focus:ring-1 focus:ring-stone-900 focus:border-stone-900 outline-none transition-all`}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
            </section>

            {/* Shipping Address */}
            <section>
              <h2 className="text-xl font-serif text-stone-900 mb-6 pb-2 border-b border-stone-200">{t('checkout.shippingAddress')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">{t('checkout.firstName')}</label>
                  <input 
                    type="text" 
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={`w-full p-3 border ${errors.firstName ? 'border-red-500' : 'border-stone-300'} focus:ring-1 focus:ring-stone-900 focus:border-stone-900 outline-none`}
                  />
                  {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">{t('checkout.lastName')}</label>
                  <input 
                    type="text" 
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={`w-full p-3 border ${errors.lastName ? 'border-red-500' : 'border-stone-300'} focus:ring-1 focus:ring-stone-900 focus:border-stone-900 outline-none`}
                  />
                  {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-stone-700 mb-1">{t('checkout.address')}</label>
                  <input 
                    type="text" 
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className={`w-full p-3 border ${errors.address ? 'border-red-500' : 'border-stone-300'} focus:ring-1 focus:ring-stone-900 focus:border-stone-900 outline-none`}
                  />
                  {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">{t('checkout.city')}</label>
                  <input 
                    type="text" 
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-stone-300 focus:ring-1 focus:ring-stone-900 focus:border-stone-900 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">{t('checkout.postalCode')}</label>
                  <input 
                    type="text" 
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-stone-300 focus:ring-1 focus:ring-stone-900 focus:border-stone-900 outline-none"
                  />
                </div>
              </div>
            </section>

            {/* Payment (Mock) */}
            <section>
              <h2 className="text-xl font-serif text-stone-900 mb-6 pb-2 border-b border-stone-200">{t('checkout.payment')}</h2>
              <div className="bg-stone-50 p-6 border border-stone-200 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">{t('checkout.cardNumber')}</label>
                  <input 
                    type="text" 
                    name="cardNumber"
                    placeholder="0000 0000 0000 0000"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    className={`w-full p-3 border ${errors.cardNumber ? 'border-red-500' : 'border-stone-300'} focus:ring-1 focus:ring-stone-900 focus:border-stone-900 outline-none`}
                  />
                  {errors.cardNumber && <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1">{t('checkout.expiryDate')}</label>
                    <input 
                      type="text" 
                      name="expiryDate"
                      placeholder="MM/YY"
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      className={`w-full p-3 border ${errors.expiryDate ? 'border-red-500' : 'border-stone-300'} focus:ring-1 focus:ring-stone-900 focus:border-stone-900 outline-none`}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1">{t('checkout.cvv')}</label>
                    <input 
                      type="text" 
                      name="cvv"
                      placeholder="123"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      className={`w-full p-3 border ${errors.cvv ? 'border-red-500' : 'border-stone-300'} focus:ring-1 focus:ring-stone-900 focus:border-stone-900 outline-none`}
                    />
                  </div>
                </div>
              </div>
            </section>

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-stone-900 text-white px-8 py-4 uppercase tracking-widest text-sm font-medium hover:bg-stone-800 transition-colors disabled:opacity-70 flex justify-center items-center"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-stone-400 border-t-white rounded-full animate-spin"></div>
              ) : (
                `${t('checkout.pay')} $${total.toFixed(2)}`
              )}
            </button>
          </form>
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:w-96">
          <div className="bg-stone-50 p-6 lg:p-8 border border-stone-200 sticky top-24">
            <h2 className="text-xl font-serif text-stone-900 mb-6">{t('checkout.summary')}</h2>
            
            <div className="space-y-4 mb-6 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-16 h-20 bg-stone-100 flex-shrink-0 relative">
                    <img 
                      src={item.product.image} 
                      alt={item.product.name} 
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute -top-2 -right-2 bg-stone-900 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-grow flex flex-col justify-center">
                    <h4 className="text-sm font-medium text-stone-900 line-clamp-1">{item.product.name}</h4>
                    <p className="text-sm text-stone-500 mt-1">${item.product.price.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3 text-sm mb-6 border-t border-stone-200 pt-6">
              <div className="flex justify-between">
                <span className="text-stone-600">{t('checkout.subtotal')}</span>
                <span className="text-stone-900 font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-600">{t('checkout.shipping')}</span>
                <span className="text-stone-900 font-medium">{shipping === 0 ? t('checkout.free') : `$${shipping.toFixed(2)}`}</span>
              </div>
            </div>

            <div className="flex justify-between items-end border-t border-stone-200 pt-4">
              <span className="text-base text-stone-900 font-medium">{t('checkout.total')}</span>
              <span className="text-2xl font-serif text-stone-900">${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;