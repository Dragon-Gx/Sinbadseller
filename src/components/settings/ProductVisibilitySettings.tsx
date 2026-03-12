import { useState } from 'react';
import type { Language } from '../../App';
import { Eye } from 'lucide-react';

interface ProductVisibilitySettingsProps {
  language: Language;
}

export function ProductVisibilitySettings({ language }: ProductVisibilitySettingsProps) {
  const [showProducts, setShowProducts] = useState(true);

  const t = {
    ar: {
      title: 'التحكم بظهور المنتجات',
      subtitle: 'إدارة رؤية منتجاتك في المتجر',
      label: 'عرض المنتجات في المتجر',
      visible: 'مرئية',
      hidden: 'مخفية',
      note: 'ملاحظة: التسعير يتم إدارته عند نشر المنتج'
    },
    en: {
      title: 'Product Visibility Controls',
      subtitle: 'Manage your products visibility in store',
      label: 'Show Products in Store',
      visible: 'Visible',
      hidden: 'Hidden',
      note: 'Note: Pricing is managed when publishing a product'
    }
  };

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 shadow-sm border border-purple-100">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-teal-500 rounded-xl flex items-center justify-center">
          <Eye className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-gray-800 text-lg">{t[language].title}</h2>
          <p className="text-gray-500 text-xs">{t[language].subtitle}</p>
        </div>
      </div>

      <div className="p-4 bg-blue-50/50 rounded-xl space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-gray-700 mb-1">{t[language].label}</div>
            <div className="text-xs text-gray-500">
              {showProducts ? t[language].visible : t[language].hidden}
            </div>
          </div>
          <button
            onClick={() => setShowProducts(!showProducts)}
            className={`relative w-11 h-5 rounded-full transition-colors ${
              showProducts ? 'bg-gradient-to-r from-blue-500 to-teal-500' : 'bg-gray-300'
            }`}
          >
            <span
              className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-md transition-transform ${
                showProducts ? 'left-6' : 'left-0.5'
              }`}
            />
          </button>
        </div>

        <div className="p-3 bg-white rounded-lg border border-blue-200">
          <p className="text-xs text-gray-600">{t[language].note}</p>
        </div>
      </div>
    </div>
  );
}
