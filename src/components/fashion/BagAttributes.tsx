import { useState } from 'react';
import type { Language } from '../../App';

interface BagAttributesProps {
  language: Language;
}

export function BagAttributes({ language }: BagAttributesProps) {
  const [showDimensions, setShowDimensions] = useState(false);
  const [dimensions, setDimensions] = useState({
    length: '',
    width: '',
    height: ''
  });
  const [weight, setWeight] = useState('');

  const t = {
    ar: {
      noDimensions: 'لا توجد مقاسات ثابتة للحقائب',
      optionalDimensions: 'أبعاد اختيارية',
      showDimensions: 'إضافة الأبعاد',
      hideDimensions: 'إخفاء الأبعاد',
      length: 'الطول (سم)',
      width: 'العرض (سم)',
      height: 'الارتفاع (سم)',
      weight: 'الوزن (غرام) - اختياري',
      optional: 'اختياري'
    },
    en: {
      noDimensions: 'No fixed sizes for bags',
      optionalDimensions: 'Optional Dimensions',
      showDimensions: 'Add Dimensions',
      hideDimensions: 'Hide Dimensions',
      length: 'Length (cm)',
      width: 'Width (cm)',
      height: 'Height (cm)',
      weight: 'Weight (grams) - Optional',
      optional: 'Optional'
    }
  };

  return (
    <div className="space-y-4">
      <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-sm text-blue-700 text-center">
          {t[language].noDimensions}
        </p>
      </div>

      <div>
        <button
          type="button"
          onClick={() => setShowDimensions(!showDimensions)}
          className="text-sm text-purple-600 hover:text-purple-700 transition-colors mb-3"
        >
          {showDimensions ? t[language].hideDimensions : t[language].showDimensions} ({t[language].optional})
        </button>

        {showDimensions && (
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs text-gray-600 mb-2">
                  {t[language].length}
                </label>
                <input
                  type="number"
                  value={dimensions.length}
                  onChange={(e) => setDimensions(prev => ({ ...prev, length: e.target.value }))}
                  placeholder="30"
                  className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400 transition-all"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-2">
                  {t[language].width}
                </label>
                <input
                  type="number"
                  value={dimensions.width}
                  onChange={(e) => setDimensions(prev => ({ ...prev, width: e.target.value }))}
                  placeholder="20"
                  className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400 transition-all"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-2">
                  {t[language].height}
                </label>
                <input
                  type="number"
                  value={dimensions.height}
                  onChange={(e) => setDimensions(prev => ({ ...prev, height: e.target.value }))}
                  placeholder="10"
                  className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-gray-600 mb-2">
                {t[language].weight}
              </label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="500"
                className="w-full sm:w-48 px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400 transition-all"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
