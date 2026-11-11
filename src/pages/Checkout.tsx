import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, CreditCard, Smartphone, Landmark, Banknote, ShieldCheck, AlertCircle } from 'lucide-react';
import { useStore } from '../store/useStore';
import { useTranslation } from 'react-i18next';
import type { PaymentMethodType, PaymentDetails, Order } from '../types';

type PaymentStatus = 'idle' | 'processing' | 'success' | 'error';

const Checkout = () => {
  const { cart, checkout, isLoading } = useStore();
  const { t } = useTranslation();
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>('idle');
  const [paymentErrorMessage, setPaymentErrorMessage] = useState<string | null>(null);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  const [formData, setFormData] = useState({
    email: 'contacto@mulfordkore.com',
    firstName: 'Natalia',
    lastName: 'Rojas',
    address: 'Calle 100 # 15-20',
    city: 'Bogotá',
    country: 'Colombia',
    postalCode: '110111',
    // Payment details
    paymentMethod: 'credit' as PaymentMethodType,
    cardName: 'NATALIA ROJAS',
    cardNumber: '4532 0150 2039 4930',
    expiryDate: '12/28',
    cvv: '123',
    bank: 'bancolombia',
    documentType: 'CC',
    documentNumber: '1012345678',
    nequiPhone: '3001234567',
    cashOutlet: 'efecty'
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const subtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const shipping = subtotal > 50 ? 0 : 5.99;
  const total = subtotal + shipping;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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

    // Payment validation based on selected method
    if (formData.paymentMethod === 'credit' || formData.paymentMethod === 'debit') {
      if (!formData.cardName) newErrors.cardName = 'Name on card is required';
      if (!formData.cardNumber || formData.cardNumber.length < 15) newErrors.cardNumber = 'Valid card number is required';
      if (!formData.expiryDate) newErrors.expiryDate = 'Expiry date is required';
      if (!formData.cvv || formData.cvv.length < 3) newErrors.cvv = 'Valid CVV is required';
    } else if (formData.paymentMethod === 'pse') {
      if (!formData.bank) newErrors.bank = 'Please select a bank';
      if (!formData.documentNumber) newErrors.documentNumber = 'Document number is required';
    } else if (formData.paymentMethod === 'nequi') {
      if (!formData.nequiPhone || formData.nequiPhone.length < 10) newErrors.nequiPhone = 'Valid 10-digit mobile number is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPaymentErrorMessage(null);
    if (!validateForm()) return;

    if (cart.length === 0) {
      setPaymentStatus('error');
      setPaymentErrorMessage('Your cart is empty');
      return;
    }

    setPaymentStatus('processing');

    const paymentDetails: PaymentDetails = {
      method: formData.paymentMethod,
      cardNumber: (formData.paymentMethod === 'credit' || formData.paymentMethod === 'debit') ? formData.cardNumber : undefined,
      cardName: (formData.paymentMethod === 'credit' || formData.paymentMethod === 'debit') ? formData.cardName : undefined,
      expiryDate: (formData.paymentMethod === 'credit' || formData.paymentMethod === 'debit') ? formData.expiryDate : undefined,
      cvv: (formData.paymentMethod === 'credit' || formData.paymentMethod === 'debit') ? formData.cvv : undefined,
      bank: formData.paymentMethod === 'pse' ? formData.bank : undefined,
      documentType: formData.paymentMethod === 'pse' ? formData.documentType : undefined,
      documentNumber: formData.paymentMethod === 'pse' ? formData.documentNumber : undefined,
      phone: formData.paymentMethod === 'nequi' ? formData.nequiPhone : undefined,
      cashOutlet: formData.paymentMethod === 'cash' ? formData.cashOutlet as any : undefined,
    };

    try {
      const order = await checkout(paymentDetails);
      setCompletedOrder(order);
      setPaymentStatus('success');
    } catch (error: any) {
      console.error('Checkout failed', error);
      setPaymentStatus('error');
      setPaymentErrorMessage(error?.message || t('checkout.errorMsg'));
    }
  };

  if (paymentStatus === 'success') {
    return (
      <div className="container mx-auto px-4 py-16 max-w-2xl">
        <div className="text-center mb-10">
          <CheckCircle2 className="w-16 h-16 text-stone-900 mx-auto mb-4" />
          <h1 className="text-3xl md:text-4xl font-serif text-stone-900 mb-2">{t('checkout.successMsg')}</h1>
        </div>

        {/* Purchased Items Summary */}
        {completedOrder && (
          <div className="bg-stone-50 border border-stone-200 p-6 md:p-8 mb-8 text-left">
            <div className="flex justify-between items-center pb-4 mb-6 border-b border-stone-200 text-sm text-stone-600">
              <div>
                <span className="font-semibold text-stone-900">{t('checkout.orderId')}: </span>
                <span>#{completedOrder.id}</span>
              </div>
              <div>
                <span className="font-semibold text-stone-900">{t('checkout.orderDate')}: </span>
                <span>{new Date(completedOrder.createdAt).toLocaleDateString()}</span>
              </div>
            </div>

            <h2 className="text-lg font-serif text-stone-900 mb-4">{t('checkout.orderSummaryTitle')}</h2>

            <div className="divide-y divide-stone-200 mb-6">
              {completedOrder.items.map((item) => (
                <div key={item.id} className="py-3 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <img 
                      src={item.product.image} 
                      alt={item.product.name} 
                      className="w-12 h-14 object-cover bg-stone-100"
                    />
                    <div>
                      <h4 className="text-sm font-medium text-stone-900">{item.product.name}</h4>
                      <p className="text-xs text-stone-500">{t('cart.quantity')}: {item.quantity}</p>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-stone-900">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-stone-200 pt-4 space-y-2 text-sm">
              <div className="flex justify-between text-stone-600">
                <span>{t('checkout.payment')}</span>
                <span className="font-medium text-stone-900 capitalize">
                  {completedOrder.paymentDetails?.method ? t(`checkout.methods.${completedOrder.paymentDetails.method}`) : ''}
                </span>
              </div>
              <div className="flex justify-between text-base font-serif font-bold text-stone-900 pt-2 border-t border-stone-200">
                <span>{t('checkout.total')}</span>
                <span>${completedOrder.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        )}

        <div className="text-center">
          <Link 
            to="/products" 
            className="inline-block bg-stone-900 text-white px-8 py-4 uppercase tracking-widest text-sm font-medium hover:bg-stone-800 transition-colors"
          >
            {t('checkout.continue')}
          </Link>
        </div>
      </div>
    );
  }

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
      <h1 className="text-3xl font-serif text-stone-900 mb-10">{t('checkout.title')}</h1>

      {paymentStatus === 'error' && (
        <div className="mb-8 p-4 bg-red-50 border border-red-200 text-red-700 rounded-none flex items-center space-x-3">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span className="text-sm font-medium">{paymentErrorMessage || t('checkout.errorMsg')}</span>
        </div>
      )}

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

            {/* Payment Section */}
            <section>
              <h2 className="text-xl font-serif text-stone-900 mb-2 pb-2 border-b border-stone-200">{t('checkout.payment')}</h2>
              <p className="text-sm text-stone-500 mb-6">{t('checkout.selectPayment')}</p>

              {/* Payment Methods Selector Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                {/* Credit Card */}
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'credit' }))}
                  className={`p-4 border text-left flex flex-col justify-between items-start transition-all relative ${
                    formData.paymentMethod === 'credit'
                      ? 'border-stone-900 bg-stone-900 text-white shadow-md'
                      : 'border-stone-200 bg-white text-stone-700 hover:border-stone-400'
                  }`}
                >
                  <CreditCard className="w-6 h-6 mb-2" />
                  <span className="text-xs font-semibold leading-tight">{t('checkout.methods.credit')}</span>
                </button>

                {/* Debit Card */}
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'debit' }))}
                  className={`p-4 border text-left flex flex-col justify-between items-start transition-all relative ${
                    formData.paymentMethod === 'debit'
                      ? 'border-stone-900 bg-stone-900 text-white shadow-md'
                      : 'border-stone-200 bg-white text-stone-700 hover:border-stone-400'
                  }`}
                >
                  <CreditCard className="w-6 h-6 mb-2" />
                  <span className="text-xs font-semibold leading-tight">{t('checkout.methods.debit')}</span>
                </button>

                {/* PSE */}
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'pse' }))}
                  className={`p-4 border text-left flex flex-col justify-between items-start transition-all relative ${
                    formData.paymentMethod === 'pse'
                      ? 'border-stone-900 bg-stone-900 text-white shadow-md'
                      : 'border-stone-200 bg-white text-stone-700 hover:border-stone-400'
                  }`}
                >
                  <Landmark className="w-6 h-6 mb-2" />
                  <span className="text-xs font-semibold leading-tight">{t('checkout.methods.pse')}</span>
                </button>

                {/* Nequi */}
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'nequi' }))}
                  className={`p-4 border text-left flex flex-col justify-between items-start transition-all relative ${
                    formData.paymentMethod === 'nequi'
                      ? 'border-stone-900 bg-stone-900 text-white shadow-md'
                      : 'border-stone-200 bg-white text-stone-700 hover:border-stone-400'
                  }`}
                >
                  <Smartphone className="w-6 h-6 mb-2" />
                  <span className="text-xs font-semibold leading-tight">{t('checkout.methods.nequi')}</span>
                </button>

                {/* Cash */}
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'cash' }))}
                  className={`p-4 border text-left flex flex-col justify-between items-start transition-all relative ${
                    formData.paymentMethod === 'cash'
                      ? 'border-stone-900 bg-stone-900 text-white shadow-md'
                      : 'border-stone-200 bg-white text-stone-700 hover:border-stone-400'
                  }`}
                >
                  <Banknote className="w-6 h-6 mb-2" />
                  <span className="text-xs font-semibold leading-tight">{t('checkout.methods.cash')}</span>
                </button>
              </div>

              {/* Dynamic Payment Fields */}
              <div className="bg-stone-50 p-6 border border-stone-200">
                {/* Credit / Debit Card Fields */}
                {(formData.paymentMethod === 'credit' || formData.paymentMethod === 'debit') && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-1">{t('checkout.cardName')}</label>
                      <input 
                        type="text" 
                        name="cardName"
                        placeholder="NATALIA ROJAS"
                        value={formData.cardName}
                        onChange={handleInputChange}
                        className={`w-full p-3 border ${errors.cardName ? 'border-red-500' : 'border-stone-300'} bg-white focus:ring-1 focus:ring-stone-900 focus:border-stone-900 outline-none`}
                      />
                      {errors.cardName && <p className="text-red-500 text-xs mt-1">{errors.cardName}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-1">{t('checkout.cardNumber')}</label>
                      <input 
                        type="text" 
                        name="cardNumber"
                        placeholder="0000 0000 0000 0000"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        className={`w-full p-3 border ${errors.cardNumber ? 'border-red-500' : 'border-stone-300'} bg-white focus:ring-1 focus:ring-stone-900 focus:border-stone-900 outline-none`}
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
                          className={`w-full p-3 border ${errors.expiryDate ? 'border-red-500' : 'border-stone-300'} bg-white focus:ring-1 focus:ring-stone-900 focus:border-stone-900 outline-none`}
                        />
                        {errors.expiryDate && <p className="text-red-500 text-xs mt-1">{errors.expiryDate}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-stone-700 mb-1">{t('checkout.cvv')}</label>
                        <input 
                          type="text" 
                          name="cvv"
                          placeholder="123"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          className={`w-full p-3 border ${errors.cvv ? 'border-red-500' : 'border-stone-300'} bg-white focus:ring-1 focus:ring-stone-900 focus:border-stone-900 outline-none`}
                        />
                        {errors.cvv && <p className="text-red-500 text-xs mt-1">{errors.cvv}</p>}
                      </div>
                    </div>
                  </div>
                )}

                {/* PSE Fields */}
                {formData.paymentMethod === 'pse' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-1">{t('checkout.pseBank')}</label>
                      <select
                        name="bank"
                        value={formData.bank}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-stone-300 bg-white focus:ring-1 focus:ring-stone-900 focus:border-stone-900 outline-none cursor-pointer"
                      >
                        <option value="bancolombia">Bancolombia</option>
                        <option value="davivienda">Davivienda</option>
                        <option value="banco_de_bogota">Banco de Bogotá</option>
                        <option value="bbva">BBVA Colombia</option>
                        <option value="lulo">Lulo Bank</option>
                        <option value="rappipay">RappiPay</option>
                        <option value="nu">Nu Colombia</option>
                      </select>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-stone-700 mb-1">{t('checkout.pseDocType')}</label>
                        <select
                          name="documentType"
                          value={formData.documentType}
                          onChange={handleInputChange}
                          className="w-full p-3 border border-stone-300 bg-white focus:ring-1 focus:ring-stone-900 focus:border-stone-900 outline-none cursor-pointer"
                        >
                          <option value="CC">CC</option>
                          <option value="CE">CE</option>
                          <option value="NIT">NIT</option>
                          <option value="PP">Pasaporte</option>
                        </select>
                      </div>
                      <div className="col-span-2">
                        <label className="block text-sm font-medium text-stone-700 mb-1">{t('checkout.pseDocNumber')}</label>
                        <input
                          type="text"
                          name="documentNumber"
                          placeholder="1012345678"
                          value={formData.documentNumber}
                          onChange={handleInputChange}
                          className={`w-full p-3 border ${errors.documentNumber ? 'border-red-500' : 'border-stone-300'} bg-white focus:ring-1 focus:ring-stone-900 focus:border-stone-900 outline-none`}
                        />
                        {errors.documentNumber && <p className="text-red-500 text-xs mt-1">{errors.documentNumber}</p>}
                      </div>
                    </div>
                  </div>
                )}

                {/* Nequi Fields */}
                {formData.paymentMethod === 'nequi' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-1">{t('checkout.nequiPhone')}</label>
                      <div className="flex">
                        <span className="p-3 bg-stone-200 border border-r-0 border-stone-300 text-stone-600 text-sm font-medium flex items-center">+57</span>
                        <input 
                          type="text" 
                          name="nequiPhone"
                          placeholder="300 123 4567"
                          value={formData.nequiPhone}
                          onChange={handleInputChange}
                          className={`w-full p-3 border ${errors.nequiPhone ? 'border-red-500' : 'border-stone-300'} bg-white focus:ring-1 focus:ring-stone-900 focus:border-stone-900 outline-none`}
                        />
                      </div>
                      {errors.nequiPhone && <p className="text-red-500 text-xs mt-1">{errors.nequiPhone}</p>}
                    </div>
                    <p className="text-xs text-stone-500 flex items-center space-x-1">
                      <ShieldCheck className="w-4 h-4 text-stone-600 flex-shrink-0 mr-1" />
                      <span>{t('checkout.nequiNote')}</span>
                    </p>
                  </div>
                )}

                {/* Cash Fields */}
                {formData.paymentMethod === 'cash' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-1">{t('checkout.cashOutlet')}</label>
                      <select
                        name="cashOutlet"
                        value={formData.cashOutlet}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-stone-300 bg-white focus:ring-1 focus:ring-stone-900 focus:border-stone-900 outline-none cursor-pointer"
                      >
                        <option value="efecty">Efecty</option>
                        <option value="baloto">Vía Baloto</option>
                        <option value="gana">Gana</option>
                      </select>
                    </div>
                    <p className="text-xs text-stone-500 flex items-center space-x-1">
                      <ShieldCheck className="w-4 h-4 text-stone-600 flex-shrink-0 mr-1" />
                      <span>{t('checkout.cashNote')}</span>
                    </p>
                  </div>
                )}
              </div>
            </section>

            <button 
              type="submit"
              disabled={isLoading || paymentStatus === 'processing'}
              className="w-full bg-stone-900 text-white px-8 py-4 uppercase tracking-widest text-sm font-medium hover:bg-stone-800 transition-colors disabled:opacity-70 flex justify-center items-center"
            >
              {paymentStatus === 'processing' || isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 border-2 border-stone-400 border-t-white rounded-full animate-spin"></div>
                  <span>{t('checkout.processing')}</span>
                </div>
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
              <div className="flex justify-between pt-2 border-t border-stone-200">
                <span className="text-stone-600">{t('checkout.payment')}</span>
                <span className="text-stone-900 font-medium capitalize">{t(`checkout.methods.${formData.paymentMethod}`)}</span>
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