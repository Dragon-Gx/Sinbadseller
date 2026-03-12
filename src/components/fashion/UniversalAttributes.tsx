import { useState } from 'react';
import type { Language } from '../../App';

interface UniversalAttributesProps {
  language: Language;
}

export function UniversalAttributes({ language }: UniversalAttributesProps) {
  const [showAttributes, setShowAttributes] = useState(false);
  const [brand, setBrand] = useState('');
  const [countryOfOrigin, setCountryOfOrigin] = useState('');
  const [material, setMaterial] = useState('');
  const [weight, setWeight] = useState('');
  const [fabricType, setFabricType] = useState('');

  const countries = [
    { en: 'China', ar: 'الصين' },
    { en: 'Turkey', ar: 'تركيا' },
    { en: 'Iraq', ar: 'العراق' },
    { en: 'India', ar: 'الهند' },
    { en: 'Bangladesh', ar: 'بنغلاديش' },
    { en: 'Vietnam', ar: 'فيتنام' },
    { en: 'Italy', ar: 'إيطاليا' },
    { en: 'USA', ar: 'الولايات المتحدة' },
    { en: 'Other', ar: 'أخرى' }
  ];

  const t = {
    ar: {
      additionalAttributes: 'خصائص إضافية',
      showAttributes: 'إظهار الخصائص الإضافية',
      hideAttributes: 'إخفاء الخصائص الإضافية',
      optional: 'اختياري',
      brand: 'العلامة التجارية',
      countryOfOrigin: 'بلد المنشأ',
      selectCountry: 'اختر البلد',
      material: 'المادة / الخامة',
      weight: 'الوزن (غرام)',
      fabricType: 'نوع القماش',
      cottonPlaceholder: 'مثال: قطن 100%',
      brandPlaceholder: 'مثال: Nike, Adidas'
    },
    en: {
      additionalAttributes: 'Additional Attributes',
      showAttributes: 'Show Additional Attributes',
      hideAttributes: 'Hide Additional Attributes',
      optional: 'Optional',
      brand: 'Brand Name',
      countryOfOrigin: 'Country of Origin',
      selectCountry: 'Select Country',
      material: 'Material',
      weight: 'Weight (grams)',
      fabricType: 'Fabric Type',
      cottonPlaceholder: 'e.g., 100% Cotton',
      brandPlaceholder: 'e.g., Nike, Adidas'
    }
  };

  return (
    <div className="pt-4 border-t border-gray-200">
      <button
        type="button"
        onClick={() => setShowAttributes(!showAttributes)}
        className="text-sm text-purple-600 hover:text-purple-700 transition-colors mb-3 flex items-center gap-2"
      >
        {showAttributes ? t[language].hideAttributes : t[language].showAttributes}
        <span className="text-xs text-gray-500">({t[language].optional})</span>
      </button>

      {showAttributes && (
        <div className="space-y-4 p-4 bg-gradient-to-br from-purple-50/30 to-blue-50/30 rounded-xl border border-purple-100">
          {/* Brand */}
          <div>
            <label className="block text-xs text-gray-700 mb-2">
              {t[language].brand}
            </label>
            <input
              type="text"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              placeholder={t[language].brandPlaceholder}
              className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400 transition-all"
            />
          </div>

          {/* Country of Origin */}
          <div>
            <label className="block text-xs text-gray-700 mb-2">
              {t[language].countryOfOrigin}
            </label>
            <select
              value={countryOfOrigin}
              onChange={(e) => setCountryOfOrigin(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400 transition-all"
            >
              <option value="">{t[language].selectCountry}</option>
              {countries.map((country, index) => (
                <option key={index} value={country.en}>
                  {language === 'ar' ? country.ar : country.en}
                </option>
              ))}
            </select>
          </div>

          {/* Material */}
          <div>
            <label className="block text-xs text-gray-700 mb-2">
              {t[language].material}
            </label>
            <input
              type="text"
              value={material}
              onChange={(e) => setMaterial(e.target.value)}
              placeholder={t[language].cottonPlaceholder}
              className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400 transition-all"
            />
          </div>

          {/* Fabric Type - Only for clothing */}
          <div>
            <label className="block text-xs text-gray-700 mb-2">
              {t[language].fabricType}
            </label>
            <input
              type="text"
              value={fabricType}
              onChange={(e) => setFabricType(e.target.value)}
              placeholder={t[language].cottonPlaceholder}
              className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400 transition-all"
            />
          </div>

          {/* Weight */}
          <div>
            <label className="block text-xs text-gray-700 mb-2">
              {t[language].weight}
            </label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="300"
              className="w-full sm:w-48 px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400 transition-all"
            />
          </div>
        </div>
      )}
    </div>
  );
}
