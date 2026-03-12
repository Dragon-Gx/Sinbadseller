import { useState } from 'react';
import type { Language } from '../../App';

interface PantsSizeSelectorProps {
  language: Language;
  selectedSizes: number[];
  onSizesChange: (sizes: number[]) => void;
}

export function PantsSizeSelector({ language, selectedSizes, onSizesChange }: PantsSizeSelectorProps) {
  const [showLength, setShowLength] = useState(false);
  const [lengthValue, setLengthValue] = useState('');

  // Waist sizes: 28 to 44 (even numbers)
  const waistSizes = Array.from({ length: 9 }, (_, i) => 28 + i * 2); // [28, 30, 32, ..., 44]

  const t = {
    ar: {
      selectWaistSizes: 'اختر مقاسات الخصر',
      waistSizes: 'مقاسات الخصر',
      selectAll: 'تحديد الكل',
      clearAll: 'إلغاء الكل',
      addLength: 'إضافة طول البنطال',
      length: 'الطول (سم)',
      optional: 'اختياري'
    },
    en: {
      selectWaistSizes: 'Select Waist Sizes',
      waistSizes: 'Waist Sizes',
      selectAll: 'Select All',
      clearAll: 'Clear All',
      addLength: 'Add Pants Length',
      length: 'Length (cm)',
      optional: 'Optional'
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
    onSizesChange(waistSizes);
  };

  const clearAll = () => {
    onSizesChange([]);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="block text-sm text-gray-700">
            {t[language].selectWaistSizes}
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
        
        <div className="grid grid-cols-5 sm:grid-cols-9 gap-2">
          {waistSizes.map(size => (
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

      {/* Optional Length */}
      <div className="pt-2 border-t border-gray-200">
        <button
          type="button"
          onClick={() => setShowLength(!showLength)}
          className="text-sm text-purple-600 hover:text-purple-700 transition-colors mb-3"
        >
          {t[language].addLength} ({t[language].optional})
        </button>

        {showLength && (
          <div className="mt-3">
            <label className="block text-xs text-gray-600 mb-2">
              {t[language].length}
            </label>
            <input
              type="number"
              value={lengthValue}
              onChange={(e) => setLengthValue(e.target.value)}
              placeholder="100"
              className="w-full sm:w-48 px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400 transition-all"
            />
          </div>
        )}
      </div>
    </div>
  );
}
