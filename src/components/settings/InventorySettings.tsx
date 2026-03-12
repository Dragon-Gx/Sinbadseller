import { useState } from 'react';
import type { Language } from '../../App';
import { Package, Link as LinkIcon } from 'lucide-react';
import { SaveConfirmationModal } from '../SaveConfirmationModal';
import { toast } from 'sonner';

interface InventorySettingsProps {
  language: Language;
}

export function InventorySettings({ language }: InventorySettingsProps) {
  const [inventoryMode, setInventoryMode] = useState<'pos' | 'manual'>('manual');
  const [posSystem, setPosSystem] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [branchId, setBranchId] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [currentQuantity, setCurrentQuantity] = useState('');
  const [minQuantity, setMinQuantity] = useState('');
  const [autoHide, setAutoHide] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const t = {
    ar: {
      title: 'نظام المخزون',
      subtitle: 'اختر كيفية إدارة مخزون منتجاتك',
      posOption: 'ربط مع نظام المبيعات',
      manualOption: 'إدخال المخزون يدويًا',
      posSystemType: 'نوع نظام المبيعات',
      selectPos: 'اختر النظام',
      almorabba: 'المربع',
      speedo: 'سبيدو',
      albayan: 'البيان',
      apiKey: 'مفتاح API / الرمز',
      branchId: 'معرف الفرع',
      status: 'الحالة',
      connected: 'متصل',
      notConnected: 'غير متصل',
      connectBtn: 'اتصال',
      currentQty: 'الكمية الحالية',
      minQty: 'تنبيه الحد الأدنى',
      autoHideLabel: 'إخفاء المنتج تلقائيًا عند نفاد المخزون',
      save: 'حفظ التغييرات',
      saveSuccess: 'تم حفظ التغييرات بنجاح',
      saving: 'جاري الحفظ...'
    },
    en: {
      title: 'Inventory System',
      subtitle: 'Choose how to manage your product inventory',
      posOption: 'Connect to POS System',
      manualOption: 'Manual Stock Input',
      posSystemType: 'POS System Type',
      selectPos: 'Select System',
      almorabba: 'Al Morabba',
      speedo: 'Speedo',
      albayan: 'Al Bayan',
      apiKey: 'API Key / Token',
      branchId: 'Store Branch ID',
      status: 'Status',
      connected: 'Connected',
      notConnected: 'Not Connected',
      connectBtn: 'Connect',
      currentQty: 'Current Quantity',
      minQty: 'Minimum Quantity Alert',
      autoHideLabel: 'Auto-Hide Product When Out of Stock',
      save: 'Save Changes',
      saveSuccess: 'Changes have been saved successfully',
      saving: 'Saving...'
    }
  };

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 shadow-sm border border-purple-100">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
          <Package className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-gray-800 text-lg">{t[language].title}</h2>
          <p className="text-gray-500 text-xs">{t[language].subtitle}</p>
        </div>
      </div>

      {/* Mode Selection */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
        <button
          onClick={() => setInventoryMode('pos')}
          className={`p-4 rounded-xl border-2 transition-all text-right ${
            inventoryMode === 'pos'
              ? 'border-purple-500 bg-purple-50'
              : 'border-gray-200 bg-white hover:border-purple-300'
          }`}
        >
          <LinkIcon className={`w-5 h-5 mb-2 ${inventoryMode === 'pos' ? 'text-purple-600' : 'text-gray-400'}`} />
          <div className={`text-sm mb-1 ${inventoryMode === 'pos' ? 'text-purple-700' : 'text-gray-700'}`}>
            {t[language].posOption}
          </div>
        </button>

        <button
          onClick={() => setInventoryMode('manual')}
          className={`p-4 rounded-xl border-2 transition-all text-right ${
            inventoryMode === 'manual'
              ? 'border-purple-500 bg-purple-50'
              : 'border-gray-200 bg-white hover:border-purple-300'
          }`}
        >
          <Package className={`w-5 h-5 mb-2 ${inventoryMode === 'manual' ? 'text-purple-600' : 'text-gray-400'}`} />
          <div className={`text-sm mb-1 ${inventoryMode === 'manual' ? 'text-purple-700' : 'text-gray-700'}`}>
            {t[language].manualOption}
          </div>
        </button>
      </div>

      {/* POS System Fields */}
      {inventoryMode === 'pos' && (
        <div className="space-y-4 p-4 bg-purple-50/50 rounded-xl">
          <div>
            <label className="block text-sm text-gray-700 mb-2">{t[language].posSystemType}</label>
            <select
              value={posSystem}
              onChange={(e) => setPosSystem(e.target.value)}
              className="w-full px-4 py-2 bg-white border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="">{t[language].selectPos}</option>
              <option value="almorabba">{t[language].almorabba}</option>
              <option value="speedo">{t[language].speedo}</option>
              <option value="albayan">{t[language].albayan}</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-2">{t[language].apiKey}</label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full px-4 py-2 bg-white border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="••••••••••••••••"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-2">{t[language].branchId}</label>
            <input
              type="text"
              value={branchId}
              onChange={(e) => setBranchId(e.target.value)}
              className="w-full px-4 py-2 bg-white border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="BR-001"
            />
          </div>

          <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-purple-200">
            <span className="text-sm text-gray-700">{t[language].status}</span>
            <span className={`px-3 py-1 rounded-full text-xs ${
              isConnected ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
            }`}>
              {isConnected ? t[language].connected : t[language].notConnected}
            </span>
          </div>

          <button
            onClick={() => setIsConnected(!isConnected)}
            className="w-full py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all"
          >
            {t[language].connectBtn}
          </button>
        </div>
      )}

      {/* Manual Input Fields */}
      {inventoryMode === 'manual' && (
        <div className="space-y-4 p-4 bg-blue-50/50 rounded-xl">
          <div>
            <label className="block text-sm text-gray-700 mb-2">{t[language].currentQty}</label>
            <input
              type="number"
              value={currentQuantity}
              onChange={(e) => setCurrentQuantity(e.target.value)}
              className="w-full px-4 py-2 bg-white border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="0"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-2">{t[language].minQty}</label>
            <input
              type="number"
              value={minQuantity}
              onChange={(e) => setMinQuantity(e.target.value)}
              className="w-full px-4 py-2 bg-white border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="5"
            />
          </div>

          <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-purple-200">
            <span className="text-sm text-gray-700">{t[language].autoHideLabel}</span>
            <button
              onClick={() => setAutoHide(!autoHide)}
              className={`relative w-11 h-5 rounded-full transition-colors ${
                autoHide ? 'bg-gradient-to-r from-purple-500 to-blue-500' : 'bg-gray-300'
              }`}
            >
              <span
                className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-md transition-transform ${
                  autoHide ? 'left-6' : 'left-0.5'
                }`}
              />
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setShowConfirmModal(true)}
        disabled={isSaving}
        className="w-full mt-4 py-2 bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 text-white rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSaving ? t[language].saving : t[language].save}
      </button>

      <SaveConfirmationModal
        isOpen={showConfirmModal}
        onConfirm={() => {
          setShowConfirmModal(false);
          setIsSaving(true);
          // Simulate saving process
          setTimeout(() => {
            setIsSaving(false);
            toast.success(t[language].saveSuccess);
          }, 1000);
        }}
        onCancel={() => setShowConfirmModal(false)}
        language={language}
        type="save"
      />
    </div>
  );
}