import type { Language } from '../../App';
import { Globe } from 'lucide-react';

interface LanguageSettingsProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

export function LanguageSettings({ language, onLanguageChange }: LanguageSettingsProps) {
  const t = {
    ar: {
      title: 'اللغة والمظهر',
      subtitle: 'اختر لغة واجهة المتجر',
      arabic: 'العربية',
      english: 'English',
      rtlNote: 'سيتم تطبيق الاتجاه من اليمين إلى اليسار تلقائيًا',
      ltrNote: 'Left-to-right layout will be applied automatically'
    },
    en: {
      title: 'Language & Display',
      subtitle: 'Choose your store interface language',
      arabic: 'العربية',
      english: 'English',
      rtlNote: 'سيتم تطبيق الاتجاه من اليمين إلى اليسار تلقائيًا',
      ltrNote: 'Left-to-right layout will be applied automatically'
    }
  };

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 shadow-sm border border-purple-100">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-500 rounded-xl flex items-center justify-center">
          <Globe className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-gray-800 text-lg">{t[language].title}</h2>
          <p className="text-gray-500 text-xs">{t[language].subtitle}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <button
          onClick={() => onLanguageChange('ar')}
          className={`p-4 rounded-xl border-2 transition-all ${
            language === 'ar'
              ? 'border-purple-500 bg-purple-50'
              : 'border-gray-200 hover:border-purple-300'
          }`}
        >
          <div className={`mb-2 ${language === 'ar' ? 'text-purple-700' : 'text-gray-700'}`}>
            {t[language].arabic}
          </div>
          <div className="text-xs text-gray-500">{t[language].rtlNote}</div>
        </button>

        <button
          onClick={() => onLanguageChange('en')}
          className={`p-4 rounded-xl border-2 transition-all ${
            language === 'en'
              ? 'border-purple-500 bg-purple-50'
              : 'border-gray-200 hover:border-purple-300'
          }`}
        >
          <div className={`mb-2 ${language === 'en' ? 'text-purple-700' : 'text-gray-700'}`}>
            {t[language].english}
          </div>
          <div className="text-xs text-gray-500">{t[language].ltrNote}</div>
        </button>
      </div>
    </div>
  );
}
