import { useState } from 'react';
import type { Language } from '../../App';

interface ShoeSizeSelectorProps {
  language: Language;
  selectedSizes: number[];
  onSizesChange: (sizes: number[]) => void;
}

export function ShoeSizeSelector({ language, selectedSizes, onSizesChange }: ShoeSizeSelectorProps) {
  // EU Shoe Sizes: 36 to 47
  const shoeSizes = Array.from({ length: 12 }, (_, i) => 36 + i); // [36, 37, ..., 47]

  const t = {
    ar: {
      selectSizes: 'اختر المقاسات المتوفرة',
      euSizes: 'المقاسات الأوروبية',
      selectAll: 'تحديد الكل',
      clearAll: 'إلغاء الكل'
    },
    en: {
      selectSizes: 'Select Available Sizes',
      euSizes: 'EU Sizes',
      selectAll: 'Select All',
      clearAll: 'Clear All'
    }
  };

  const toggleSize = (size: number) => {
    if (selectedSizes.includes(size)) {
      onSizesChange(selectedSizes.filter(s => s !== size));
    } else {
      onSizesChange([...selectedSizes, size]);
    }
  };

  const selectAll = () => {
    onSizesChange(shoeSizes);
  };

  const clearAll = () => {
    onSizesChange([]);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="block text-sm text-gray-700">
          {t[language].selectSizes} ({t[language].euSizes})
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
      
      <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-12 gap-2">
        {shoeSizes.map(size => (
          <button
            key={size}
            type="button"
            onClick={() => toggleSize(size)}
            className={`
              aspect-square rounded-lg border-2 transition-all
              flex items-center justify-center text-sm
              ${selectedSizes.includes(size)
                ? 'bg-gradient-to-br from-purple-500 to-blue-500 border-purple-500 text-white shadow-md'
                : 'bg-white border-gray-200 text-gray-700 hover:border-purple-300 hover:bg-purple-50'
              }
            `}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
}
