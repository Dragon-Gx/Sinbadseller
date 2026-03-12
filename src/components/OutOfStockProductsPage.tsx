import { useState } from 'react';
import { ArrowRight, ArrowLeft, Package, DollarSign, Eye, RefreshCw, X, Check } from 'lucide-react';
import type { Language, Product } from '../App';

interface OutOfStockProductsPageProps {
  products: Product[];
  language: Language;
  onBack: () => void;
  onSelectProduct: (product: Product) => void;
  onRestockProduct: (productId: string, newStock: number) => void;
}

export function OutOfStockProductsPage({ 
  products, 
  language, 
  onBack, 
  onSelectProduct,
  onRestockProduct 
}: OutOfStockProductsPageProps) {
  const [restockingProduct, setRestockingProduct] = useState<Product | null>(null);
  const [newStockAmount, setNewStockAmount] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'name' | 'price'>('date');

  const t = {
    ar: {
      title: 'المنتجات نفذت من المخزون',
      subtitle: 'إدارة وإعادة تخزين المنتجات المباعة',
      back: 'رجوع',
      noProducts: 'لا توجد منتجات نفذت من المخزون',
      noProductsDesc: 'جميع منتجاتك متوفرة في المخزون',
      sortBy: 'ترتيب حسب',
      sortDate: 'التاريخ',
      sortName: 'الاسم',
      sortPrice: 'السعر',
      restock: 'إعادة التخزين',
      view: 'عرض',
      price: 'السعر',
      outOfStockSince: 'نفذت منذ',
      sar: 'د.ع',
      restockTitle: 'إعادة تخزين المنتج',
      currentStock: 'الكمية الحالية',
      newStock: 'الكمية الجديدة',
      enterQuantity: 'أدخل الكمية الجديدة',
      cancel: 'إلغاء',
      confirm: 'تأكيد',
      items: 'منتج',
      soldOut: 'نفذ من المخزون',
      units: 'وحدة'
    },
    en: {
      title: 'Out of Stock Products',
      subtitle: 'Manage and restock sold-out products',
      back: 'Back',
      noProducts: 'No out of stock products',
      noProductsDesc: 'All your products are in stock',
      sortBy: 'Sort by',
      sortDate: 'Date',
      sortName: 'Name',
      sortPrice: 'Price',
      restock: 'Restock',
      view: 'View',
      price: 'Price',
      outOfStockSince: 'Out of stock since',
      sar: 'IQD',
      restockTitle: 'Restock Product',
      currentStock: 'Current Stock',
      newStock: 'New Stock',
      enterQuantity: 'Enter new quantity',
      cancel: 'Cancel',
      confirm: 'Confirm',
      items: 'items',
      soldOut: 'Sold Out',
      units: 'units'
    }
  };

  // Filter only out of stock products (stock === 0)
  const outOfStockProducts = products.filter(p => p.stock === 0);

  // Sort products
  const sortedProducts = [...outOfStockProducts].sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(b.createdAt || '').getTime() - new Date(a.createdAt || '').getTime();
    } else if (sortBy === 'name') {
      const nameA = language === 'ar' ? a.nameAr : a.name;
      const nameB = language === 'ar' ? b.nameAr : b.name;
      return nameA.localeCompare(nameB);
    } else {
      return b.price - a.price;
    }
  });

  const handleRestockClick = (product: Product) => {
    setRestockingProduct(product);
    setNewStockAmount('');
  };

  const handleRestockConfirm = () => {
    if (restockingProduct && newStockAmount && parseInt(newStockAmount) > 0) {
      onRestockProduct(restockingProduct.id, parseInt(newStockAmount));
      setRestockingProduct(null);
      setNewStockAmount('');
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return language === 'ar' ? 'غير محدد' : 'Not specified';
    const date = new Date(dateString);
    return date.toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const BackIcon = language === 'ar' ? ArrowRight : ArrowLeft;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-teal-50" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="bg-white/70 backdrop-blur-md border-b border-purple-100 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors"
            >
              <BackIcon className="w-5 h-5" />
              <span>{t[language].back}</span>
            </button>
            
            <div className="text-center flex-1 mx-4">
              <h1 className="bg-gradient-to-r from-red-500 via-orange-500 to-red-600 bg-clip-text text-transparent text-xl sm:text-2xl">
                {t[language].title}
              </h1>
              <p className="text-gray-500 text-sm mt-1">{t[language].subtitle}</p>
            </div>

            <div className="w-20 sm:w-24"></div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Stats & Sort */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="bg-white/70 backdrop-blur-sm rounded-xl px-4 py-2 border border-red-100">
            <span className="text-gray-600 text-sm">
              {sortedProducts.length} {t[language].items}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-gray-600 text-sm">{t[language].sortBy}:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'date' | 'name' | 'price')}
              className="bg-white/70 backdrop-blur-sm border border-purple-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="date">{t[language].sortDate}</option>
              <option value="name">{t[language].sortName}</option>
              <option value="price">{t[language].sortPrice}</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        {sortedProducts.length === 0 ? (
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-12 text-center border border-purple-100">
            <Package className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-xl text-gray-600 mb-2">{t[language].noProducts}</h3>
            <p className="text-gray-400">{t[language].noProductsDesc}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sortedProducts.map((product) => {
              const productName = language === 'ar' ? product.nameAr : product.name;
              
              return (
                <div
                  key={product.id}
                  className="bg-white/70 backdrop-blur-sm rounded-xl border border-red-100 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Product Image */}
                  <div className="relative h-48 bg-gray-100">
                    <img
                      src={product.image}
                      alt={productName}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full text-xs">
                      {t[language].soldOut}
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-4">
                    <h3 className="text-lg mb-2 line-clamp-2">{productName}</h3>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">{t[language].price}:</span>
                        <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                          {product.price} {t[language].sar}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">{t[language].currentStock}:</span>
                        <span className="text-red-600">
                          0 {t[language].units}
                        </span>
                      </div>

                      {product.createdAt && (
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">{t[language].outOfStockSince}:</span>
                          <span className="text-gray-600 text-xs">
                            {formatDate(product.createdAt)}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleRestockClick(product)}
                        className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-lg hover:shadow-md transition-all duration-300 flex items-center justify-center gap-2 text-sm"
                      >
                        <RefreshCw className="w-4 h-4" />
                        {t[language].restock}
                      </button>
                      
                      <button
                        onClick={() => onSelectProduct(product)}
                        className="bg-white/80 backdrop-blur-sm border border-purple-200 text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-50 transition-all duration-300 flex items-center justify-center gap-2 text-sm"
                      >
                        <Eye className="w-4 h-4" />
                        {t[language].view}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* Restock Modal */}
      {restockingProduct && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl" dir={language === 'ar' ? 'rtl' : 'ltr'}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">
                {t[language].restockTitle}
              </h3>
              <button
                onClick={() => setRestockingProduct(null)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Product Preview */}
            <div className="flex items-center gap-3 mb-6 p-3 bg-gray-50 rounded-lg">
              <img
                src={restockingProduct.image}
                alt={language === 'ar' ? restockingProduct.nameAr : restockingProduct.name}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h4 className="line-clamp-2 text-sm mb-1">
                  {language === 'ar' ? restockingProduct.nameAr : restockingProduct.name}
                </h4>
                <p className="text-xs text-gray-500">
                  {restockingProduct.price} {t[language].sar}
                </p>
              </div>
            </div>

            {/* Current Stock */}
            <div className="mb-4 p-3 bg-red-50 rounded-lg border border-red-100">
              <div className="text-sm text-gray-600 mb-1">{t[language].currentStock}</div>
              <div className="text-red-600">0 {t[language].units}</div>
            </div>

            {/* New Stock Input */}
            <div className="mb-6">
              <label className="block text-sm text-gray-600 mb-2">
                {t[language].newStock}
              </label>
              <input
                type="number"
                min="1"
                value={newStockAmount}
                onChange={(e) => setNewStockAmount(e.target.value)}
                placeholder={t[language].enterQuantity}
                className="w-full px-4 py-3 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
                autoFocus
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => setRestockingProduct(null)}
                className="flex-1 px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                {t[language].cancel}
              </button>
              <button
                onClick={handleRestockConfirm}
                disabled={!newStockAmount || parseInt(newStockAmount) <= 0}
                className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-3 rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Check className="w-5 h-5" />
                {t[language].confirm}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
