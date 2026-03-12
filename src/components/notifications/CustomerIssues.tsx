import { useState } from 'react';
import type { Language } from '../../App';
import { AlertCircle, X } from 'lucide-react';

interface CustomerIssuesProps {
  language: Language;
}

interface Issue {
  id: string;
  type: 'complaint' | 'return' | 'delivery' | 'product';
  orderId: string;
  description: string;
  descriptionAr: string;
  status: 'pending' | 'under-review' | 'resolved';
  time: string;
  isRead: boolean;
  details: string;
  detailsAr: string;
}

const mockIssues: Issue[] = [
  {
    id: '1',
    type: 'complaint',
    orderId: 'ORD-2024-001',
    description: 'Product not as described',
    descriptionAr: 'المنتج لا يطابق الوصف',
    status: 'pending',
    time: '10 دقائق',
    isRead: false,
    details: 'Customer claims the product color is different from the images. Requesting clarification.',
    detailsAr: 'يدعي العميل أن لون المنتج مختلف عن الصور. يطلب توضيحًا.'
  },
  {
    id: '2',
    type: 'return',
    orderId: 'ORD-2024-015',
    description: 'Return request - wrong size',
    descriptionAr: 'طلب استرجاع - مقاس خاطئ',
    status: 'under-review',
    time: '3 ساعات',
    isRead: false,
    details: 'Customer received wrong size. Requesting return and exchange.',
    detailsAr: 'استلم العميل مقاس خاطئ. يطلب الاسترجاع والاستبدال.'
  },
  {
    id: '3',
    type: 'delivery',
    orderId: 'ORD-2024-008',
    description: 'Delivery delay issue',
    descriptionAr: 'مشكلة تأخير التوصيل',
    status: 'resolved',
    time: 'أمس',
    isRead: true,
    details: 'Delivery was delayed due to weather conditions. Issue has been resolved.',
    detailsAr: 'تأخر التسليم بسبب الظروف الجوية. تم حل المشكلة.'
  }
];

export function CustomerIssues({ language }: CustomerIssuesProps) {
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);

  const t = {
    ar: {
      complaint: 'شكوى',
      return: 'طلب استرجاع',
      delivery: 'مشكلة توصيل',
      product: 'مشكلة في المنتج',
      pending: 'معلق',
      underReview: 'قيد المراجعة',
      resolved: 'تم الحل',
      details: 'التفاصيل',
      close: 'إغلاق',
      noIssues: 'لا توجد مشاكل',
      noIssuesDesc: 'ستظهر شكاوى العملاء هنا',
      ago: 'منذ'
    },
    en: {
      complaint: 'Complaint',
      return: 'Return Request',
      delivery: 'Delivery Issue',
      product: 'Product Issue',
      pending: 'Pending',
      underReview: 'Under Review',
      resolved: 'Resolved',
      details: 'Details',
      close: 'Close',
      noIssues: 'No issues',
      noIssuesDesc: 'Customer issues will appear here',
      ago: 'ago'
    }
  };

  const getIssueTypeLabel = (type: string) => {
    const types = {
      complaint: t[language].complaint,
      return: t[language].return,
      delivery: t[language].delivery,
      product: t[language].product
    };
    return types[type as keyof typeof types];
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { bg: 'bg-yellow-100', text: 'text-yellow-700', label: t[language].pending },
      'under-review': { bg: 'bg-blue-100', text: 'text-blue-700', label: t[language].underReview },
      resolved: { bg: 'bg-green-100', text: 'text-green-700', label: t[language].resolved }
    };

    const config = statusConfig[status as keyof typeof statusConfig];
    return (
      <span className={`px-2 py-1 ${config.bg} ${config.text} rounded-lg text-xs`}>
        {config.label}
      </span>
    );
  };

  if (mockIssues.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center">
        <AlertCircle className="w-12 h-12 text-gray-300 mb-3" />
        <p className="text-gray-500 mb-1">{t[language].noIssues}</p>
        <p className="text-gray-400 text-xs">{t[language].noIssuesDesc}</p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-3">
        {mockIssues.map((issue) => (
          <button
            key={issue.id}
            onClick={() => setSelectedIssue(issue)}
            className={`w-full text-right p-4 rounded-xl shadow-sm hover:shadow-md transition-all border ${
              issue.isRead
                ? 'bg-white/70 border-purple-100'
                : 'bg-white border-purple-300'
            }`}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                {!issue.isRead && (
                  <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                )}
                <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-orange-500 rounded-lg flex items-center justify-center">
                  <AlertCircle className="w-4 h-4 text-white" />
                </div>
              </div>
              <span className="px-2 py-1 bg-red-100 text-red-700 rounded-lg text-xs">
                {getIssueTypeLabel(issue.type)}
              </span>
            </div>

            <div className="mb-2">
              <p className="text-sm text-gray-800 mb-1">
                {language === 'ar' ? issue.descriptionAr : issue.description}
              </p>
              <p className="text-xs text-gray-500">#{issue.orderId}</p>
            </div>

            <div className="flex items-center justify-between">
              {getStatusBadge(issue.status)}
              <span className="text-xs text-gray-400">{issue.time}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Issue Detail Modal */}
      {selectedIssue && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg text-gray-800">
                {getIssueTypeLabel(selectedIssue.type)}
              </h3>
              <button
                onClick={() => setSelectedIssue(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <div className="space-y-3 mb-6">
              <div>
                <p className="text-xs text-gray-500 mb-1">{language === 'ar' ? 'رقم الطلب' : 'Order ID'}</p>
                <p className="text-sm text-gray-800">#{selectedIssue.orderId}</p>
              </div>

              <div>
                <p className="text-xs text-gray-500 mb-1">{language === 'ar' ? 'الحالة' : 'Status'}</p>
                {getStatusBadge(selectedIssue.status)}
              </div>

              <div>
                <p className="text-xs text-gray-500 mb-2">{t[language].details}</p>
                <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">
                  {language === 'ar' ? selectedIssue.detailsAr : selectedIssue.details}
                </p>
              </div>
            </div>

            <button
              onClick={() => setSelectedIssue(null)}
              className="w-full py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all"
            >
              {t[language].close}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
