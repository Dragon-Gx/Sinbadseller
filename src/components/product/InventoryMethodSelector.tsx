import { useState } from 'react';
import { Package, Computer } from 'lucide-react';
import type { Language } from '../../App';

export type InventoryMethod = 'pos' | 'manual';

interface InventoryMethodSelectorProps {
  language: Language;
  method: InventoryMethod;
  onMethodChange: (method: InventoryMethod) => void;
  sku?: string;
  onSkuChange?: (sku: string) => void;
  quantity?: string;
  onQuantityChange?: (quantity: string) => void;
}

export function InventoryMethodSelector({
  language,
  method,
  onMethodChange,
  sku = '',
  onSkuChange,
  quantity = '',
  onQuantityChange
}: InventoryMethodSelectorProps) {
  const t = {
    ar: {
      inventoryManagement: 'إدارة المخزون',
      selectMethod: 'اختر طريقة إدارة المخزون',
      posSystem: 'الربط مع نظام نقاط البيع / الكمبيوتر',
      manualEntry: 'إدخال المخزون يدوياً',
      posDescription: 'الكمية سيتم إدارتها تلقائياً من النظام الخارجي',
      manualDescription: 'أدخل الكمية المتوفرة يدوياً',
      productCode: 'كود المنتج / SKU',
      productCodePlaceholder: 'مثال: PROD-12345',
      availableQuantity: 'الكمية المتوفرة',
      quantityPlaceholder: '100',
      pieces: 'قطعة',
      autoManaged: 'يُدار تلقائياً',
      required: 'مطلوب'
    },
    en: {
      inventoryManagement: 'Inventory Management',
      selectMethod: 'Select Inventory Method',
      posSystem: 'Link to POS / Computer System',
      manualEntry: 'Manual Inventory Entry',
      posDescription: 'Quantity will be auto-managed by external system',
      manualDescription: 'Enter available quantity manually',
      productCode: 'Product Code / SKU',
      productCodePlaceholder: 'e.g., PROD-12345',
      availableQuantity: 'Available Quantity',
      quantityPlaceholder: '100',
      pieces: 'pieces',
      autoManaged: 'Auto-managed',
      required: 'Required'
    }
  };

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-purple-100">
      <h2 className="text-gray-800 text-lg mb-4">
        {t[language].inventoryManagement}
        <span className="text-red-500 text-sm mr-1">*</span>
      </h2>

      {/* Method Selector - Card Style */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {/* POS System Option */}
        <button
          type="button"
          onClick={() => onMethodChange('pos')}
          className={`
            relative p-4 rounded-xl border-2 transition-all text-start
            ${method === 'pos'
              ? 'border-purple-500 bg-gradient-to-br from-purple-50 to-blue-50 shadow-md'
              : 'border-gray-200 bg-white hover:border-purple-300 hover:bg-purple-50/30'
            }
          `}
        >
          <div className="flex items-start gap-3">
            <div className={`
              p-2 rounded-lg
              ${method === 'pos' ? 'bg-purple-500 text-white' : 'bg-purple-100 text-purple-600'}
            `}>
              <Computer className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h3 className="text-gray-800 text-sm mb-1">
                {t[language].posSystem}
              </h3>
              <p className="text-xs text-gray-500">
                {t[language].posDescription}
              </p>
            </div>
          </div>
          {method === 'pos' && (
            <div className="absolute top-3 right-3">
              <div className="w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            </div>
          )}
        </button>

        {/* Manual Entry Option */}
        <button
          type="button"
          onClick={() => onMethodChange('manual')}
          className={`
            relative p-4 rounded-xl border-2 transition-all text-start
            ${method === 'manual'
              ? 'border-purple-500 bg-gradient-to-br from-purple-50 to-blue-50 shadow-md'
              : 'border-gray-200 bg-white hover:border-purple-300 hover:bg-purple-50/30'
            }
          `}
        >
          <div className="flex items-start gap-3">
            <div className={`
              p-2 rounded-lg
              ${method === 'manual' ? 'bg-purple-500 text-white' : 'bg-purple-100 text-purple-600'}
            `}>
              <Package className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h3 className="text-gray-800 text-sm mb-1">
                {t[language].manualEntry}
              </h3>
              <p className="text-xs text-gray-500">
                {t[language].manualDescription}
              </p>
            </div>
          </div>
          {method === 'manual' && (
            <div className="absolute top-3 right-3">
              <div className="w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            </div>
          )}
        </button>
      </div>

      {/* Conditional Input Fields */}
      <div className="space-y-4">
        {method === 'pos' ? (
          /* POS System - SKU Input */
          <div>
            <label className="block text-sm text-gray-600 mb-2">
              {t[language].productCode}
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="text"
              value={sku}
              onChange={(e) => onSkuChange?.(e.target.value)}
              placeholder={t[language].productCodePlaceholder}
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400 transition-all"
            />
            <p className="text-xs text-blue-600 mt-2 flex items-center gap-1">
              <Computer className="w-3 h-3" />
              {t[language].autoManaged}
            </p>
          </div>
        ) : (
          /* Manual Entry - Quantity Input */
          <div>
            <label className="block text-sm text-gray-600 mb-2">
              {t[language].availableQuantity}
              <span className="text-red-500 ml-1">*</span>
            </label>
            <div className="relative">
              <input
                type="number"
                value={quantity}
                onChange={(e) => onQuantityChange?.(e.target.value)}
                placeholder={t[language].quantityPlaceholder}
                min="0"
                className={`w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400 transition-all ${language === 'ar' ? 'pl-16' : 'pr-16'}`}
              />
              <span className={`absolute top-3 ${language === 'ar' ? 'left-4' : 'right-4'} text-gray-500 text-sm`}>
                {t[language].pieces}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
