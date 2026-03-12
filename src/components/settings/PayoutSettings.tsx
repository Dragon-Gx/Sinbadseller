import { useState } from 'react';
import type { Language } from '../../App';
import { Wallet, CreditCard, Banknote } from 'lucide-react';
import { SaveConfirmationModal } from '../SaveConfirmationModal';
import { toast } from 'sonner@2.0.3';

interface PayoutSettingsProps {
  language: Language;
}

export function PayoutSettings({ language }: PayoutSettingsProps) {
  const [payoutMethod, setPayoutMethod] = useState('');
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountHolder, setAccountHolder] = useState('');
  const [autoRequestPayout, setAutoRequestPayout] = useState(false);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [requestMethod, setRequestMethod] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const t = {
    ar: {
      title: 'أرباح البائع وطرق السحب',
      subtitle: 'إدارة كيفية استلام البائعين لأموالهم',
      payoutMethod: 'طريقة الدفع',
      selectMethod: 'اختر الطريقة',
      bankTransfer: 'تحويل مصرفي',
      cashPickup: 'استلام نقدي',
      bankName: 'اسم البنك',
      accountNumber: 'رقم الحساب / IBAN',
      accountHolder: 'اسم صاحب الحساب',
      autoRequest: 'طلب محاسبة تلقائية كل أسبوع',
      requestPayout: 'طلب محاسبة',
      note: 'ملاحظة: يتم صرف الأرباح بعد 36 ساعة من تأكيد التسليم (إذا لم يقدم المشتري شكوى)',
      save: 'حفظ التغييرات',
      modalTitle: 'اختر طريقة الاستلام',
      cancel: 'إلغاء',
      confirm: 'تأكيد الطلب',
      saveSuccess: 'تم حفظ التغييرات بنجاح',
      saving: 'جاري الحفظ...'
    },
    en: {
      title: 'Seller Funds & Withdrawal Methods',
      subtitle: 'Manage how sellers receive their money',
      payoutMethod: 'Payout Method',
      selectMethod: 'Select Method',
      bankTransfer: 'Bank Transfer',
      cashPickup: 'Cash Pickup',
      bankName: 'Bank Name',
      accountNumber: 'Account Number / IBAN',
      accountHolder: 'Account Holder Name',
      autoRequest: 'Auto-Request Payout Every Week',
      requestPayout: 'Request a Payout',
      note: 'Note: Payouts are processed 36 hours after confirmed delivery (if buyer submits no complaints)',
      save: 'Save Changes',
      modalTitle: 'Choose Payout Method',
      cancel: 'Cancel',
      confirm: 'Confirm Request',
      saveSuccess: 'Changes have been saved successfully',
      saving: 'Saving...'
    }
  };

  return (
    <>
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 shadow-sm border border-purple-100">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-teal-500 rounded-xl flex items-center justify-center">
            <Wallet className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-gray-800 text-lg">{t[language].title}</h2>
            <p className="text-gray-500 text-xs">{t[language].subtitle}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-xs text-blue-800">{t[language].note}</p>
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-2">{t[language].payoutMethod}</label>
            <select
              value={payoutMethod}
              onChange={(e) => setPayoutMethod(e.target.value)}
              className="w-full px-4 py-2 bg-white border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="">{t[language].selectMethod}</option>
              <option value="bank">{t[language].bankTransfer}</option>
              <option value="cash">{t[language].cashPickup}</option>
            </select>
          </div>

          {payoutMethod === 'bank' && (
            <div className="space-y-4 p-4 bg-green-50/50 rounded-xl">
              <div>
                <label className="block text-sm text-gray-700 mb-2">{t[language].bankName}</label>
                <input
                  type="text"
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  className="w-full px-4 py-2 bg-white border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Rafidain Bank"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">{t[language].accountNumber}</label>
                <input
                  type="text"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  className="w-full px-4 py-2 bg-white border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="IQ00 0000 0000 0000 0000 0000"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">{t[language].accountHolder}</label>
                <input
                  type="text"
                  value={accountHolder}
                  onChange={(e) => setAccountHolder(e.target.value)}
                  className="w-full px-4 py-2 bg-white border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Ahmed Mohammed"
                />
              </div>
            </div>
          )}

          <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-purple-200">
            <span className="text-sm text-gray-700">{t[language].autoRequest}</span>
            <button
              onClick={() => setAutoRequestPayout(!autoRequestPayout)}
              className={`relative w-11 h-5 rounded-full transition-colors ${
                autoRequestPayout ? 'bg-gradient-to-r from-green-500 to-teal-500' : 'bg-gray-300'
              }`}
            >
              <span
                className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-md transition-transform ${
                  autoRequestPayout ? 'left-6' : 'left-0.5'
                }`}
              />
            </button>
          </div>

          <button
            onClick={() => setShowRequestModal(true)}
            className="w-full py-3 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <CreditCard className="w-5 h-5" />
            {t[language].requestPayout}
          </button>

          <button
            onClick={() => setShowConfirmModal(true)}
            disabled={isSaving}
            className="w-full py-2 bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 text-white rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaving ? t[language].saving : t[language].save}
          </button>
        </div>
      </div>

      {/* Request Payout Modal */}
      {showRequestModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <h3 className="text-lg text-gray-800 mb-4">{t[language].modalTitle}</h3>
            
            <div className="space-y-3 mb-6">
              <button
                onClick={() => setRequestMethod('bank')}
                className={`w-full p-4 rounded-xl border-2 transition-all flex items-center gap-3 ${
                  requestMethod === 'bank'
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 hover:border-purple-300'
                }`}
              >
                <CreditCard className={`w-5 h-5 ${requestMethod === 'bank' ? 'text-purple-600' : 'text-gray-400'}`} />
                <span className="text-sm">{t[language].bankTransfer}</span>
              </button>

              <button
                onClick={() => setRequestMethod('cash')}
                className={`w-full p-4 rounded-xl border-2 transition-all flex items-center gap-3 ${
                  requestMethod === 'cash'
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 hover:border-purple-300'
                }`}
              >
                <Banknote className={`w-5 h-5 ${requestMethod === 'cash' ? 'text-purple-600' : 'text-gray-400'}`} />
                <span className="text-sm">{t[language].cashPickup}</span>
              </button>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowRequestModal(false)}
                className="flex-1 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                {t[language].cancel}
              </button>
              <button
                onClick={() => setShowRequestModal(false)}
                className="flex-1 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:shadow-lg"
              >
                {t[language].confirm}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Save Confirmation Modal */}
      <SaveConfirmationModal
        isOpen={showConfirmModal}
        onConfirm={() => {
          setShowConfirmModal(false);
          setIsSaving(true);
          setTimeout(() => {
            setIsSaving(false);
            toast.success(t[language].saveSuccess);
          }, 1000);
        }}
        onCancel={() => setShowConfirmModal(false)}
        language={language}
        type="save"
      />
    </>
  );
}
