import { Plus } from 'lucide-react';
import type { Language } from '../App';

interface AddProductBannerProps {
  language: Language;
  onCreateProduct: () => void;
}

export function AddProductBanner({ language, onCreateProduct }: AddProductBannerProps) {
  const t = {
    ar: {
      title: 'تحتاج إلى إضافة عنصر جديد؟',
      subtitle: 'أضف منتجًا جديدًا إلى متجرك بسهولة',
      button: 'إنشاء منتج'
    },
    en: {
      title: 'Need to add a new item?',
      subtitle: 'Add a new product to your store easily',
      button: 'Create Product'
    }
  };

  return (
    <div className="bg-gradient-to-r from-purple-500 via-blue-500 to-teal-500 rounded-2xl p-6 shadow-lg">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-white text-center sm:text-right">
          <h2 className="mb-1">{t[language].title}</h2>
          <p className="text-white/90 text-sm">{t[language].subtitle}</p>
        </div>
        <button className="bg-white text-purple-600 px-6 py-3 rounded-xl hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center gap-2 whitespace-nowrap" onClick={onCreateProduct}>
          <Plus className="w-5 h-5" />
          <span>{t[language].button}</span>
        </button>
      </div>
    </div>
  );
}