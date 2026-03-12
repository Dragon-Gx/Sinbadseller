import { useState } from 'react';
import { Store, Warehouse, TrendingUp } from 'lucide-react';
import type { Language } from '../../App';

export type SellingType = 'retail' | 'wholesale' | 'both';

interface SellingTypeSelectorProps {
  language: Language;
  sellingType: SellingType;
  onSellingTypeChange: (type: SellingType) => void;
  retailPrice?: string;
  onRetailPriceChange?: (price: string) => void;
  wholesalePrice?: string;
  onWholesalePriceChange?: (price: string) => void;
}

export function SellingTypeSelector({
  language,
  sellingType,
  onSellingTypeChange,
  retailPrice = '',
  onRetailPriceChange,
  wholesalePrice = '',
  onWholesalePriceChange
}: SellingTypeSelectorProps) {
  const t = {
    ar: {
      sellingType: 'نوع البيع',
      selectSellingType: 'اختر نوع البيع',
      retail: 'تجزئة',
      wholesale: 'جملة',
      both: 'تجزئة + جملة',
      retailDescription: 'بيع بسعر التجزئة للأفراد',
      wholesaleDescription: 'بيع بسعر الجملة للتجار',
      bothDescription: 'متاح للتجزئة والجملة معاً',
      retailPrice: 'سعر التجزئة',
      wholesalePrice: 'سعر الجملة',
      currency: 'د.ع',
      required: 'مطلوب',
      pricePerUnit: 'السعر للقطعة الواحدة'
    },
    en: {
      sellingType: 'Selling Type',
      selectSellingType: 'Select Selling Type',
      retail: 'Retail',
      wholesale: 'Wholesale',
      both: 'Both',
      retailDescription: 'Sell at retail price to individuals',
      wholesaleDescription: 'Sell at wholesale price to merchants',
      bothDescription: 'Available for both retail and wholesale',
      retailPrice: 'Retail Price',
      wholesalePrice: 'Wholesale Price',
      currency: 'IQD',
      required: 'Required',
      pricePerUnit: 'Price per unit'
    }
  };

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-purple-100">
      <h2 className="text-gray-800 text-lg mb-4">
        {t[language].sellingType}
        <span className="text-red-500 text-sm mr-1">*</span>
      </h2>

      {/* Selling Type Selector - Card Style */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {/* Retail Option */}
        <button
          type="button"
          onClick={() => onSellingTypeChange('retail')}
          className={`
            relative p-4 rounded-xl border-2 transition-all text-start
            ${sellingType === 'retail'
              ? 'border-purple-500 bg-gradient-to-br from-purple-50 to-blue-50 shadow-md'
              : 'border-gray-200 bg-white hover:border-purple-300 hover:bg-purple-50/30'
            }
          `}
        >
          <div className="flex flex-col items-center text-center gap-2">
            <div className={`
              p-3 rounded-lg
              ${sellingType === 'retail' ? 'bg-purple-500 text-white' : 'bg-purple-100 text-purple-600'}
            `}>
              <Store className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-gray-800 text-sm mb-1">
                {t[language].retail}
              </h3>
              <p className="text-xs text-gray-500">
                {t[language].retailDescription}
              </p>
            </div>
          </div>
          {sellingType === 'retail' && (
            <div className="absolute top-3 right-3">
              <div className="w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            </div>
          )}
        </button>

        {/* Wholesale Option */}
        <button
          type="button"
          onClick={() => onSellingTypeChange('wholesale')}
          className={`
            relative p-4 rounded-xl border-2 transition-all text-start
            ${sellingType === 'wholesale'
              ? 'border-purple-500 bg-gradient-to-br from-purple-50 to-blue-50 shadow-md'
              : 'border-gray-200 bg-white hover:border-purple-300 hover:bg-purple-50/30'
            }
          `}
        >
          <div className="flex flex-col items-center text-center gap-2">
            <div className={`
              p-3 rounded-lg
              ${sellingType === 'wholesale' ? 'bg-purple-500 text-white' : 'bg-purple-100 text-purple-600'}
            `}>
              <Warehouse className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-gray-800 text-sm mb-1">
                {t[language].wholesale}
              </h3>
              <p className="text-xs text-gray-500">
                {t[language].wholesaleDescription}
              </p>
            </div>
          </div>
          {sellingType === 'wholesale' && (
            <div className="absolute top-3 right-3">
              <div className="w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            </div>
          )}
        </button>

        {/* Both Option */}
        <button
          type="button"
          onClick={() => onSellingTypeChange('both')}
          className={`
            relative p-4 rounded-xl border-2 transition-all text-start
            ${sellingType === 'both'
              ? 'border-purple-500 bg-gradient-to-br from-purple-50 to-blue-50 shadow-md'
              : 'border-gray-200 bg-white hover:border-purple-300 hover:bg-purple-50/30'
            }
          `}
        >
          <div className="flex flex-col items-center text-center gap-2">
            <div className={`
              p-3 rounded-lg
              ${sellingType === 'both' ? 'bg-purple-500 text-white' : 'bg-purple-100 text-purple-600'}
            `}>
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-gray-800 text-sm mb-1">
                {t[language].both}
              </h3>
              <p className="text-xs text-gray-500">
                {t[language].bothDescription}
              </p>
            </div>
          </div>
          {sellingType === 'both' && (
            <div className="absolute top-3 right-3">
              <div className="w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            </div>
          )}
        </button>
      </div>

      {/* Price Fields Based on Selection */}
      <div className="space-y-4">
        {(sellingType === 'retail' || sellingType === 'both') && (
          <div>
            <label className="block text-sm text-gray-600 mb-2">
              {t[language].retailPrice}
              <span className="text-red-500 ml-1">*</span>
            </label>
            <div className="relative">
              <input
                type="number"
                value={retailPrice}
                onChange={(e) => onRetailPriceChange?.(e.target.value)}
                placeholder="25000"
                min="0"
                className={`w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400 transition-all ${language === 'ar' ? 'pl-16' : 'pr-16'}`}
              />
              <span className={`absolute top-3 ${language === 'ar' ? 'left-4' : 'right-4'} text-gray-500`}>
                {t[language].currency}
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {t[language].pricePerUnit}
            </p>
          </div>
        )}

        {(sellingType === 'wholesale' || sellingType === 'both') && (
          <div>
            <label className="block text-sm text-gray-600 mb-2">
              {t[language].wholesalePrice}
              <span className="text-red-500 ml-1">*</span>
            </label>
            <div className="relative">
              <input
                type="number"
                value={wholesalePrice}
                onChange={(e) => onWholesalePriceChange?.(e.target.value)}
                placeholder="20000"
                min="0"
                className={`w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400 transition-all ${language === 'ar' ? 'pl-16' : 'pr-16'}`}
              />
              <span className={`absolute top-3 ${language === 'ar' ? 'left-4' : 'right-4'} text-gray-500`}>
                {t[language].currency}
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {t[language].pricePerUnit}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
