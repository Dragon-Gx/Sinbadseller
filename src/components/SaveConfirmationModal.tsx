import { Check, X } from 'lucide-react';
import type { Language } from '../App';

interface SaveConfirmationModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  language: Language;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'save' | 'permissions';
}

export function SaveConfirmationModal({
  isOpen,
  onConfirm,
  onCancel,
  language,
  title,
  message,
  confirmText,
  cancelText,
  type = 'save'
}: SaveConfirmationModalProps) {
  if (!isOpen) return null;

  const t = {
    ar: {
      saveTitle: 'تأكيد حفظ التغييرات',
      saveMessage: 'هل تريد حفظ هذه التغييرات؟',
      permissionsTitle: 'تأكيد تحديث الصلاحيات',
      permissionsMessage: 'هل أنت متأكد من تحديث هذه الصلاحيات؟',
      confirm: 'تأكيد',
      cancel: 'إلغاء'
    },
    en: {
      saveTitle: 'Confirm Save Changes',
      saveMessage: 'Do you want to save these changes?',
      permissionsTitle: 'Confirm Update Permissions',
      permissionsMessage: 'Are you sure you want to update these permissions?',
      confirm: 'Confirm',
      cancel: 'Cancel'
    }
  };

  const defaultTitle = type === 'permissions' ? t[language].permissionsTitle : t[language].saveTitle;
  const defaultMessage = type === 'permissions' ? t[language].permissionsMessage : t[language].saveMessage;

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onCancel}
      dir={language === 'ar' ? 'rtl' : 'ltr'}
    >
      <div 
        className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl max-w-md w-full p-6 transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
            <Check className="w-7 h-7 text-white" />
          </div>
        </div>

        {/* Title */}
        <h3 className="text-center text-gray-800 text-xl mb-3">
          {title || defaultTitle}
        </h3>

        {/* Message */}
        <p className="text-center text-gray-600 mb-6">
          {message || defaultMessage}
        </p>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <X className="w-4 h-4" />
            <span>{cancelText || t[language].cancel}</span>
          </button>

          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2.5 bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 hover:shadow-lg text-white rounded-lg transition-all flex items-center justify-center gap-2"
          >
            <Check className="w-4 h-4" />
            <span>{confirmText || t[language].confirm}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
