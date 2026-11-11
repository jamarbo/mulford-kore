import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Filter, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { useStore } from '../store/useStore';
import { useTranslation } from 'react-i18next';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { products, categories, fetchProducts, fetchCategories, isLoading, error } = useStore();
  const { t } = useTranslation();
  
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  const currentCategory = searchParams.get('category') || '';
  const currentSort = searchParams.get('sort') || '';
  
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    fetchProducts({ 
      category: currentCategory,
      sort: currentSort
    });
  }, [fetchProducts, currentCategory, currentSort]);

  const handleCategoryChange = (category: string) => {
    if (category) {
      searchParams.set('category', category);
    } else {
      searchParams.delete('category');
    }
    setSearchParams(searchParams);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sort = e.target.value;
    if (sort) {
      searchParams.set('sort', sort);
    } else {
      searchParams.delete('sort');
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-12 text-center md:text-left">
        <h1 className="text-4xl font-serif text-stone-900 mb-4">
          {currentCategory ? categories.find(c => c.id === currentCategory)?.name || t('products.title') : t('products.title')}
        </h1>
        <p className="text-stone-500 max-w-2xl">
          {currentCategory 
            ? categories.find(c => c.id === currentCategory)?.description 
            : t('products.desc')}
        </p>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 pb-4 border-b border-stone-200">
        <button 
          className="md:hidden flex items-center space-x-2 text-stone-600 mb-4 md:mb-0"
          onClick={() => setIsFilterOpen(!isFilterOpen)}
        >
          <Filter className="w-4 h-4" />
          <span className="uppercase text-sm tracking-wider">{t('products.filters')}</span>
        </button>

        <div className={`w-full md:w-auto flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8 ${isFilterOpen ? 'flex' : 'hidden md:flex'}`}>
          <div className="flex space-x-6 overflow-x-auto pb-2 md:pb-0">
            <button 
              onClick={() => handleCategoryChange('')}
              className={`whitespace-nowrap uppercase text-sm font-medium tracking-wider transition-colors ${!currentCategory ? 'text-stone-900 border-b border-stone-900' : 'text-stone-500 hover:text-stone-900'}`}
            >
              {t('products.all')}
            </button>
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`whitespace-nowrap uppercase text-sm font-medium tracking-wider transition-colors ${currentCategory === cat.id ? 'text-stone-900 border-b border-stone-900' : 'text-stone-500 hover:text-stone-900'}`}
              >
                {t(`nav.${cat.id}`) || cat.name}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center space-x-2 text-stone-600 self-end md:self-auto mt-4 md:mt-0">
          <SlidersHorizontal className="w-4 h-4 hidden md:block" />
          <div className="relative">
            <select 
              value={currentSort}
              onChange={handleSortChange}
              className="appearance-none bg-transparent border-none py-1 pr-8 text-sm uppercase tracking-wider font-medium text-stone-600 focus:outline-none cursor-pointer"
              aria-label="Sort products"
            >
              <option value="">{t('products.sortFeatured')}</option>
              <option value="price-asc">{t('products.sortPriceAsc')}</option>
              <option value="price-desc">{t('products.sortPriceDesc')}</option>
              <option value="name-asc">{t('products.sortNameAsc')}</option>
            </select>
            <ChevronDown className="w-4 h-4 absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Grid */}
      {error ? (
        <div className="text-center py-20 text-red-600">
          <p>{error}</p>
          <button onClick={() => fetchProducts()} className="mt-4 underline">Try again</button>
        </div>
      ) : isLoading ? (
        <div className="flex justify-center py-32">
          <div className="w-8 h-8 border-4 border-stone-200 border-t-stone-900 rounded-full animate-spin"></div>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-32">
          <p className="text-stone-500 text-lg">{t('products.empty')}</p>
          <button onClick={() => handleCategoryChange('')} className="mt-4 text-stone-900 underline">{t('products.clearFilters')}</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
          {products.map((product) => (
            <Link key={product.id} to={`/products/${product.id}`} className="group block">
              <div className="aspect-[4/5] overflow-hidden bg-stone-100 mb-4 relative">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                {product.stock < 10 && product.stock > 0 && (
                  <span className="absolute top-2 left-2 bg-white/90 text-stone-900 text-xs px-2 py-1 uppercase tracking-wider font-medium">
                    {t('products.lowStock')}
                  </span>
                )}
                {product.stock === 0 && (
                  <span className="absolute top-2 left-2 bg-stone-900 text-white text-xs px-2 py-1 uppercase tracking-wider font-medium">
                    {t('products.outOfStock')}
                  </span>
                )}
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-stone-900 font-medium group-hover:text-stone-600 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-stone-500 text-sm mt-1 capitalize">{product.category}</p>
                </div>
                <p className="text-stone-900 font-medium">${product.price.toFixed(2)}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;