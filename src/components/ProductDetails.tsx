import { ArrowRight } from 'lucide-react';
import type { Product, Language } from '../App';

interface ProductDetailsProps {
  product: Product;
  language: Language;
  onBack: () => void;
}

export function ProductDetails({ product, language, onBack }: ProductDetailsProps) {
  const t = {
    ar: {
      back: 'رجوع',
      productDetails: 'تفاصيل المنتج',
      price: 'السعر',
      currency: 'د.ع',
      stock: 'الكمية المتوفرة',
      pieces: 'قطعة',
      description: 'الوصف',
      category: 'الفئة',
      status: 'الحالة',
      active: 'نشط',
      pending: 'معلق',
      outOfStock: 'نفذ من المخزون',
      images: 'صور المنتج',
      retailPrice: 'سعر التجزئة',
      wholesalePrice: 'سعر الجملة',
      sku: 'رمز المنتج',
      inventoryMethod: 'طريقة المخزون',
      sellingType: 'نوع البيع',
      retail: 'تجزئة',
      wholesale: 'جملة',
      both: 'تجزئة + جملة',
      pos: 'نظام نقاط البيع',
      manual: 'يدوي'
    },
    en: {
      back: 'Back',
      productDetails: 'Product Details',
      price: 'Price',
      currency: 'IQD',
      stock: 'Stock Quantity',
      pieces: 'pieces',
      description: 'Description',
      category: 'Category',
      status: 'Status',
      active: 'Active',
      pending: 'Pending',
      outOfStock: 'Out of Stock',
      images: 'Product Images',
      retailPrice: 'Retail Price',
      wholesalePrice: 'Wholesale Price',
      sku: 'SKU',
      inventoryMethod: 'Inventory Method',
      sellingType: 'Selling Type',
      retail: 'Retail',
      wholesale: 'Wholesale',
      both: 'Both',
      pos: 'POS System',
      manual: 'Manual'
    }
  };

  const getStatusText = () => {
    if (product.status === 'out-of-stock') return t[language].outOfStock;
    if (product.status === 'pending') return t[language].pending;
    return t[language].active;
  };

  const getSellingTypeText = () => {
    if (product.sellingType === 'retail') return t[language].retail;
    if (product.sellingType === 'wholesale') return t[language].wholesale;
    if (product.sellingType === 'both') return t[language].both;
    return '';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-teal-50 pb-8" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-purple-600 hover:text-purple-700 mb-4 transition-colors"
          >
            <ArrowRight className={`w-5 h-5 ${language === 'en' ? 'rotate-180' : ''}`} />
            <span className="text-sm">{t[language].back}</span>
          </button>
          <h1 className="text-gray-800 text-2xl">{t[language].productDetails}</h1>
        </div>

        {/* Product Images */}
        {product.images && product.images.length > 0 && (
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-purple-100 mb-4">
            <h2 className="text-gray-800 text-lg mb-4">{t[language].images}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {product.images.map((img, index) => (
                <div key={index} className="aspect-square">
                  <img 
                    src={img} 
                    alt={`Product ${index + 1}`} 
                    className="w-full h-full object-cover rounded-lg border-2 border-gray-200"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Product Information */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-purple-100 mb-4">
          <h2 className="text-gray-800 text-lg mb-4">
            {language === 'ar' ? product.nameAr : product.name}
          </h2>
          
          <div className="space-y-4">
            {/* Price */}
            <div className="flex items-center justify-between py-3 border-b border-gray-200">
              <span className="text-gray-600">{t[language].price}</span>
              <span className="text-lg bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 bg-clip-text text-transparent">
                {product.price} {t[language].currency}
              </span>
            </div>

            {/* Retail Price */}
            {product.retailPrice && (
              <div className="flex items-center justify-between py-3 border-b border-gray-200">
                <span className="text-gray-600">{t[language].retailPrice}</span>
                <span className="text-gray-800">{product.retailPrice} {t[language].currency}</span>
              </div>
            )}

            {/* Wholesale Price */}
            {product.wholesalePrice && (
              <div className="flex items-center justify-between py-3 border-b border-gray-200">
                <span className="text-gray-600">{t[language].wholesalePrice}</span>
                <span className="text-gray-800">{product.wholesalePrice} {t[language].currency}</span>
              </div>
            )}

            {/* Stock */}
            <div className="flex items-center justify-between py-3 border-b border-gray-200">
              <span className="text-gray-600">{t[language].stock}</span>
              <span className="text-gray-800">{product.stock} {t[language].pieces}</span>
            </div>

            {/* Category */}
            <div className="flex items-center justify-between py-3 border-b border-gray-200">
              <span className="text-gray-600">{t[language].category}</span>
              <span className="text-gray-800">{product.category}</span>
            </div>

            {/* Status */}
            <div className="flex items-center justify-between py-3 border-b border-gray-200">
              <span className="text-gray-600">{t[language].status}</span>
              <span className={`px-3 py-1 rounded-full text-sm ${
                product.status === 'active' ? 'bg-green-100 text-green-700' :
                product.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                'bg-red-100 text-red-700'
              }`}>
                {getStatusText()}
              </span>
            </div>

            {/* SKU */}
            {product.sku && (
              <div className="flex items-center justify-between py-3 border-b border-gray-200">
                <span className="text-gray-600">{t[language].sku}</span>
                <span className="text-gray-800 font-mono">{product.sku}</span>
              </div>
            )}

            {/* Selling Type */}
            {product.sellingType && (
              <div className="flex items-center justify-between py-3 border-b border-gray-200">
                <span className="text-gray-600">{t[language].sellingType}</span>
                <span className="text-gray-800">{getSellingTypeText()}</span>
              </div>
            )}

            {/* Inventory Method */}
            {product.inventoryMethod && (
              <div className="flex items-center justify-between py-3 border-b border-gray-200">
                <span className="text-gray-600">{t[language].inventoryMethod}</span>
                <span className="text-gray-800">
                  {product.inventoryMethod === 'pos' ? t[language].pos : t[language].manual}
                </span>
              </div>
            )}

            {/* Description */}
            {(product.description || product.descriptionAr) && (
              <div className="pt-4">
                <h3 className="text-gray-700 mb-2">{t[language].description}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {language === 'ar' ? product.descriptionAr : product.description}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
