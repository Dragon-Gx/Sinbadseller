import { useState } from 'react';
import type { Language } from '../../App';

interface KidsSizeSelectorProps {
  language: Language;
  selectedSizes: string[];
  onSizesChange: (sizes: string[]) => void;
}

export function KidsSizeSelector({ language, selectedSizes, onSizesChange }: KidsSizeSelectorProps) {
  const kidsSizes = [
    'Newborn',
    '0-3M',
    '3-6M',
    '6-12M',
    '1Y',
    '2Y',
    '3Y',
    '4Y',
    '5Y',
    '6Y',
    '7Y',
    '8Y',
    '9Y',
    '10Y',
    '11Y',
    '12Y'
  ];

  const kidsSizesAr = [
    'حديث الولادة',
    '0-3 شهور',
    '3-6 شهور',
    '6-12 شهر',
    'سنة',
    'سنتان',
    '3 سنوات',
    '4 سنوات',
    '5 سنوات',
    '6 سنوات',
    '7 سنوات',
    '8 سنوات',
    '9 سنوات',
    '10 سنوات',
    '11 سنة',
    '12 سنة'
  ];

  const t = {
    ar: {
      selectSizes: 'اختر المقاسات المتوفرة',
      ageSizes: 'المقاسات حسب العمر',
      selectAll: 'تحديد الكل',
      clearAll: 'إلغاء الكل'
    },
    en: {
      selectSizes: 'Select Available Sizes',
      ageSizes: 'Age-Based Sizes',
      selectAll: 'Select All',
      clearAll: 'Clear All'
    }
  };

  const toggleSize = (size: string) => {
    if (selectedSizes.includes(size)) {
      onSizesChange(selectedSizes.filter(s => s !== size));
    } else {
      onSizesChange([...selectedSizes, size]);
    }
  };

  const selectAll = () => {
    onSizesChange(kidsSizes);
  };

  const clearAll = () => {
    onSizesChange([]);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="block text-sm text-gray-700">
          {t[language].selectSizes} ({t[language].ageSizes})
        </label>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={selectAll}
            className="text-xs px-3 py-1 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors"
          >
            {t[language].selectAll}
          </button>
          <button
            type="button"
            onClick={clearAll}
            className="text-xs px-3 py-1 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            {t[language].clearAll}
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
        {kidsSizes.map((size, index) => (
          <button
            key={size}
            type="button"
            onClick={() => toggleSize(size)}
            className={`
              px-2 py-3 rounded-lg border-2 transition-all
              flex items-center justify-center text-xs sm:text-sm
              ${selectedSizes.includes(size)
                ? 'bg-gradient-to-br from-purple-500 to-blue-500 border-purple-500 text-white shadow-md'
                : 'bg-white border-gray-200 text-gray-700 hover:border-purple-300 hover:bg-purple-50'
              }
            `}
          >
            {language === 'ar' ? kidsSizesAr[index] : size}
          </button>
        ))}
      </div>
    </div>
  );
}
