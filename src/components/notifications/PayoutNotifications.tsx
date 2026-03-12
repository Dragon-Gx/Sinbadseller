import type { Language } from '../../App';
import { Wallet, TrendingUp } from 'lucide-react';

interface PayoutNotificationsProps {
  language: Language;
}

interface PayoutNotification {
  id: string;
  type: 'added' | 'waiting' | 'transferred' | 'rejected';
  amount: number;
  method: 'bank' | 'cash';
  date: string;
  time: string;
  referenceId: string;
  isRead: boolean;
}

const mockPayouts: PayoutNotification[] = [
  {
    id: '1',
    type: 'added',
    amount: 2450,
    method: 'bank',
    date: '2024-12-05',
    time: '14:30',
    referenceId: 'PAY-2024-001',
    isRead: false
  },
  {
    id: '2',
    type: 'waiting',
    amount: 1800,
    method: 'cash',
    date: '2024-12-04',
    time: '10:15',
    referenceId: 'PAY-2024-002',
    isRead: false
  },
  {
    id: '3',
    type: 'transferred',
    amount: 3200,
    method: 'bank',
    date: '2024-12-03',
    time: '09:00',
    referenceId: 'PAY-2024-003',
    isRead: true
  },
  {
    id: '4',
    type: 'rejected',
    amount: 500,
    method: 'bank',
    date: '2024-12-02',
    time: '16:45',
    referenceId: 'PAY-2024-004',
    isRead: true
  }
];

export function PayoutNotifications({ language }: PayoutNotificationsProps) {
  const t = {
    ar: {
      added: 'تمت إضافة دفعة جديدة إلى محفظتك',
      waiting: 'في انتظار 36 ساعة بعد تأكيد التسليم',
      transferred: 'تم تحويل دفعتك إلى حسابك المصرفي',
      rejected: 'تم رفض طلب الدفع',
      bank: 'تحويل بنكي',
      cash: 'استلام نقدي',
      sar: 'د.ع',
      reference: 'الرقم المرجعي',
      method: 'طريقة الدفع',
      noPayouts: 'لا توجد محاسبات',
      noPayoutsDesc: 'ستظهر تحديثات المحاسبات هنا'
    },
    en: {
      added: 'New payout added to your wallet',
      waiting: 'Waiting 36 hours after delivery confirmation',
      transferred: 'Your payout was transferred to your bank account',
      rejected: 'Payout request rejected',
      bank: 'Bank Transfer',
      cash: 'Cash Pickup',
      sar: 'IQD',
      reference: 'Reference ID',
      method: 'Payment Method',
      noPayouts: 'No payouts',
      noPayoutsDesc: 'Payout updates will appear here'
    }
  };

  const getTypeMessage = (type: string) => {
    const types = {
      added: t[language].added,
      waiting: t[language].waiting,
      transferred: t[language].transferred,
      rejected: t[language].rejected
    };
    return types[type as keyof typeof types];
  };

  const getTypeColor = (type: string) => {
    const colors = {
      added: 'from-green-500 to-emerald-500',
      waiting: 'from-yellow-500 to-orange-500',
      transferred: 'from-blue-500 to-teal-500',
      rejected: 'from-red-500 to-pink-500'
    };
    return colors[type as keyof typeof colors];
  };

  if (mockPayouts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center">
        <Wallet className="w-12 h-12 text-gray-300 mb-3" />
        <p className="text-gray-500 mb-1">{t[language].noPayouts}</p>
        <p className="text-gray-400 text-xs">{t[language].noPayoutsDesc}</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {mockPayouts.map((payout) => (
        <div
          key={payout.id}
          className={`p-4 rounded-xl shadow-sm border ${
            payout.isRead
              ? 'bg-white/70 border-purple-100'
              : 'bg-white border-purple-300'
          }`}
        >
          <div className="flex items-start gap-3">
            {!payout.isRead && (
              <span className="w-2 h-2 bg-red-500 rounded-full mt-2"></span>
            )}
            <div className={`w-10 h-10 bg-gradient-to-br ${getTypeColor(payout.type)} rounded-xl flex items-center justify-center flex-shrink-0`}>
              {payout.type === 'rejected' ? (
                <TrendingUp className="w-5 h-5 text-white transform rotate-180" />
              ) : (
                <Wallet className="w-5 h-5 text-white" />
              )}
            </div>
            
            <div className="flex-1">
              <p className="text-sm text-gray-800 mb-2">
                {getTypeMessage(payout.type)}
              </p>
              
              <div className="space-y-1 mb-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">{t[language].reference}:</span>
                  <span className="text-xs text-gray-700">#{payout.referenceId}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">{t[language].method}:</span>
                  <span className="text-xs text-gray-700">
                    {payout.method === 'bank' ? t[language].bank : t[language].cash}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                <span className="text-lg bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
                  {payout.amount} {t[language].sar}
                </span>
                <span className="text-xs text-gray-400">
                  {payout.date} {payout.time}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}