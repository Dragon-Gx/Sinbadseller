import { useState } from 'react';
import { ArrowRight, Edit2, Eye, ToggleLeft, SlidersHorizontal } from 'lucide-react';
import { toast } from 'sonner';
import type { Product, Language } from '../App';

interface ActiveProductsPageProps {
  products: Product[];
  language: Language;
  onBack: () => void;
  onSelectProduct: (product: Product) => void;
  onToggleProduct: (id: string) => void;
}

type SortOption = 'newest' | 'price-low' | 'price-high' | 'quantity';

export function ActiveProductsPage({ 
  products, 
  language, 
  onBack, 
  onSelectProduct,
  onToggleProduct 
}: ActiveProductsPageProps) {
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | 'retail' | 'wholesale'>('all');
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [showFilters, setShowFilters] = useState(false);

  const t = {
    ar: {
      back: 'رجوع',
      activeProducts: 'المنتجات النشطة',
      totalProducts: 'إجمالي المنتجات',
      filters: 'الفلاتر',
      allCategories: 'كل الفئات',
      allTypes: 'كل الأنواع',
      retail: 'تجزئة',
      wholesale: 'جملة',
      both: 'كلاهما',
      sortBy: 'ترتيب حسب',
      newest: 'الأحدث',
      priceLow: 'السعر: من الأقل للأعلى',
      priceHigh: 'السعر: من الأعلى للأقل',
      quantity: 'الكمية المتاحة',
      currency: 'د.ع',
      available: 'متوفر',
      pieces: 'قطعة',
      view: 'عرض',
      edit: 'تعديل',
      disable: 'تعطيل',
      active: 'نشط',
      noProducts: 'لا توجد منتجات نشطة',
      noProductsDesc: 'لا توجد منتجات تطابق المعايير المحددة',
      productDisabled: 'تم تعطيل المنتج بنجاح',
      productDisabledDesc: 'لن يظهر المنتج للمشترين بعد الآن'
    },
    en: {
      back: 'Back',
      activeProducts: 'Active Products',
      totalProducts: 'Total Products',
      filters: 'Filters',
      allCategories: 'All Categories',
      allTypes: 'All Types',
      retail: 'Retail',
      wholesale: 'Wholesale',
      both: 'Both',
      sortBy: 'Sort By',
      newest: 'Newest',
      priceLow: 'Price: Low to High',
      priceHigh: 'Price: High to Low',
      quantity: 'Available Quantity',
      currency: 'IQD',
      available: 'Available',
      pieces: 'pieces',
      view: 'View',
      edit: 'Edit',
      disable: 'Disable',
      active: 'Active',
      noProducts: 'No Active Products',
      noProductsDesc: 'No products match the selected criteria',
      productDisabled: 'Product disabled successfully',
      productDisabledDesc: 'This product will no longer be visible to buyers'
    }
  };

  // Filter active products only
  const activeProducts = products.filter(p => p.status === 'active');

  // Apply filters
  let filteredProducts = activeProducts.filter(product => {
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    const matchesType = typeFilter === 'all' || 
      (typeFilter === 'retail' && (product.sellingType === 'retail' || product.sellingType === 'both')) ||
      (typeFilter === 'wholesale' && (product.sellingType === 'wholesale' || product.sellingType === 'both'));
    return matchesCategory && matchesType;
  });

  // Apply sorting
  filteredProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return (b.createdAt || '').localeCompare(a.createdAt || '');
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'quantity':
        return b.stock - a.stock;
      default:
        return 0;
    }
  });

  // Get unique categories
  const categories = ['all', ...Array.from(new Set(activeProducts.map(p => p.category)))];

  const getProductType = (product: Product) => {
    if (product.sellingType === 'retail') return t[language].retail;
    if (product.sellingType === 'wholesale') return t[language].wholesale;
    if (product.sellingType === 'both') return t[language].both;
    return t[language].retail; // default
  };

  const handleDisableProduct = (e: React.MouseEvent, productId: string, productName: string) => {
    e.stopPropagation();
    onToggleProduct(productId);
    toast.success(t[language].productDisabled, {
      description: t[language].productDisabledDesc,
      duration: 3000
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-teal-50 pb-8" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-purple-600 hover:text-purple-700 mb-4 transition-colors"
          >
            <ArrowRight className={`w-5 h-5 ${language === 'en' ? 'rotate-180' : ''}`} />
            <span className="text-sm">{t[language].back}</span>
          </button>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-gray-800 text-2xl">{t[language].activeProducts}</h1>
              <p className="text-gray-500 text-sm mt-1">
                {t[language].totalProducts}: {filteredProducts.length}
              </p>
            </div>
            
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-white/70 backdrop-blur-sm rounded-xl border border-purple-200 hover:bg-white transition-all"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span className="text-sm">{t[language].filters}</span>
            </button>
          </div>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 mb-4 shadow-sm border border-purple-100">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Category Filter */}
              <div>
                <label className="block text-sm text-gray-600 mb-2">
                  {t[language].allCategories}
                </label>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                >
                  <option value="all">{t[language].allCategories}</option>
                  {categories.filter(c => c !== 'all').map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Type Filter */}
              <div>
                <label className="block text-sm text-gray-600 mb-2">
                  {t[language].allTypes}
                </label>
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value as 'all' | 'retail' | 'wholesale')}
                  className="w-full px-3 py-2 bg-white border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                >
                  <option value="all">{t[language].allTypes}</option>
                  <option value="retail">{t[language].retail}</option>
                  <option value="wholesale">{t[language].wholesale}</option>
                </select>
              </div>

              {/* Sort By */}
              <div>
                <label className="block text-sm text-gray-600 mb-2">
                  {t[language].sortBy}
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="w-full px-3 py-2 bg-white border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                >
                  <option value="newest">{t[language].newest}</option>
                  <option value="price-low">{t[language].priceLow}</option>
                  <option value="price-high">{t[language].priceHigh}</option>
                  <option value="quantity">{t[language].quantity}</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-12 text-center shadow-sm border border-purple-100">
            <div className="text-gray-400 mb-2 text-lg">{t[language].noProducts}</div>
            <p className="text-gray-500 text-sm">{t[language].noProductsDesc}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredProducts.map(product => (
              <div
                key={product.id}
                onClick={() => onSelectProduct(product)}
                className="bg-white/70 backdrop-blur-sm rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-purple-100 group cursor-pointer"
              >
                {/* Product Image */}
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                  <img
                    src={product.image}
                    alt={language === 'ar' ? product.nameAr : product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  {/* Status Badge */}
                  <div className="absolute top-2 right-2">
                    <span className="px-2 py-1 bg-green-500 text-white rounded-full text-xs">
                      {t[language].active}
                    </span>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-3 space-y-2">
                  {/* Name */}
                  <h3 className="text-sm text-gray-800 line-clamp-1">
                    {language === 'ar' ? product.nameAr : product.name}
                  </h3>

                  {/* Price */}
                  <div className="text-lg bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 bg-clip-text text-transparent">
                    {product.price} {t[language].currency}
                  </div>

                  {/* Product Type */}
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">{getProductType(product)}</span>
                    <span className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded">
                      {product.stock} {t[language].pieces}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 pt-2 border-t border-purple-100">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectProduct(product);
                      }}
                      className="flex-1 flex items-center justify-center gap-1 px-3 py-1.5 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors text-xs"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      {t[language].view}
                    </button>
                    
                    <button
                      onClick={(e) => handleDisableProduct(e, product.id, product.name)}
                      className="flex-1 flex items-center justify-center gap-1 px-3 py-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-xs"
                    >
                      <ToggleLeft className="w-3.5 h-3.5" />
                      {t[language].disable}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}