import { useState } from 'react';
import type { Language } from '../../App';

interface ClothingSizeSelectorProps {
  language: Language;
  selectedSizes: string[];
  onSizesChange: (sizes: string[]) => void;
  showMeasurements?: boolean;
}

export function ClothingSizeSelector({ 
  language, 
  selectedSizes, 
  onSizesChange,
  showMeasurements = false 
}: ClothingSizeSelectorProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [measurements, setMeasurements] = useState({
    chest: '',
    length: '',
    sleeveLength: ''
  });

  const clothingSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];

  const t = {
    ar: {
      selectSizes: 'اختر المقاسات المتوفرة',
      letterSizes: 'المقاسات الحرفية',
      selectAll: 'تحديد الكل',
      clearAll: 'إلغاء الكل',
      advancedMeasurements: 'قياسات تفصيلية (اختياري)',
      showAdvanced: 'إظهار القياسات التفصيلية',
      hideAdvanced: 'إخفاء القياسات التفصيلية',
      chest: 'محيط الصدر (سم)',
      length: 'الطول (سم)',
      sleeveLength: 'طول الكم (سم)'
    },
    en: {
      selectSizes: 'Select Available Sizes',
      letterSizes: 'Letter Sizes',
      selectAll: 'Select All',
      clearAll: 'Clear All',
      advancedMeasurements: 'Advanced Measurements (Optional)',
      showAdvanced: 'Show Advanced Measurements',
      hideAdvanced: 'Hide Advanced Measurements',
      chest: 'Chest (cm)',
      length: 'Length (cm)',
      sleeveLength: 'Sleeve Length (cm)'
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
    onSizesChange(clothingSizes);
  };

  const clearAll = () => {
    onSizesChange([]);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="block text-sm text-gray-700">
            {t[language].selectSizes} ({t[language].letterSizes})
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
        
        <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
          {clothingSizes.map(size => (
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

      {/* Optional Advanced Measurements */}
      {showMeasurements && (
        <div className="pt-2 border-t border-gray-200">
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="text-sm text-purple-600 hover:text-purple-700 transition-colors mb-3"
          >
            {showAdvanced ? t[language].hideAdvanced : t[language].showAdvanced}
          </button>

          {showAdvanced && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">
              <div>
                <label className="block text-xs text-gray-600 mb-2">
                  {t[language].chest}
                </label>
                <input
                  type="number"
                  value={measurements.chest}
                  onChange={(e) => setMeasurements(prev => ({ ...prev, chest: e.target.value }))}
                  placeholder="90"
                  className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400 transition-all"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-2">
                  {t[language].length}
                </label>
                <input
                  type="number"
                  value={measurements.length}
                  onChange={(e) => setMeasurements(prev => ({ ...prev, length: e.target.value }))}
                  placeholder="70"
                  className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400 transition-all"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-2">
                  {t[language].sleeveLength}
                </label>
                <input
                  type="number"
                  value={measurements.sleeveLength}
                  onChange={(e) => setMeasurements(prev => ({ ...prev, sleeveLength: e.target.value }))}
                  placeholder="60"
                  className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400 transition-all"
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
