import type { Language } from '../../App';
import { ShoppingBag, Clock } from 'lucide-react';

interface OrderNotificationsProps {
  language: Language;
  onOrderClick: (orderId: string) => void;
}

interface OrderNotification {
  id: string;
  buyerName: string;
  buyerNameAr: string;
  orderType: 'wholesale' | 'retail';
  paymentStatus: 'awaiting' | 'paid';
  orderId: string;
  time: string;
  isRead: boolean;
}

const mockOrders: OrderNotification[] = [
  {
    id: '1',
    buyerName: 'Ahmed Mohammed',
    buyerNameAr: 'أحمد محمد',
    orderType: 'retail',
    paymentStatus: 'paid',
    orderId: 'ORD-2024-001',
    time: '5 دقائق',
    isRead: false
  },
  {
    id: '2',
    buyerName: 'Fatima Ali',
    buyerNameAr: 'فاطمة علي',
    orderType: 'wholesale',
    paymentStatus: 'awaiting',
    orderId: 'ORD-2024-002',
    time: '15 دقيقة',
    isRead: false
  },
  {
    id: '3',
    buyerName: 'Khalid Hassan',
    buyerNameAr: 'خالد حسن',
    orderType: 'retail',
    paymentStatus: 'paid',
    orderId: 'ORD-2024-003',
    time: 'ساعة واحدة',
    isRead: true
  },
  {
    id: '4',
    buyerName: 'Sara Abdullah',
    buyerNameAr: 'سارة عبدالله',
    orderType: 'wholesale',
    paymentStatus: 'paid',
    orderId: 'ORD-2024-004',
    time: 'ساعتان',
    isRead: true
  }
];

export function OrderNotifications({ language, onOrderClick }: OrderNotificationsProps) {
  const t = {
    ar: {
      newOrder: 'طلب جديد',
      wholesale: 'جملة',
      retail: 'تجزئة',
      paid: 'مدفوع',
      awaiting: 'في انتظار التأكيد',
      from: 'من',
      ago: 'منذ',
      noOrders: 'لا توجد إشعارات',
      noOrdersDesc: 'سيتم عرض طلبات جديدة هنا'
    },
    en: {
      newOrder: 'New Order',
      wholesale: 'Wholesale',
      retail: 'Retail',
      paid: 'Paid',
      awaiting: 'Awaiting Confirmation',
      from: 'from',
      ago: 'ago',
      noOrders: 'No notifications',
      noOrdersDesc: 'New orders will appear here'
    }
  };

  const getPaymentStatusBadge = (status: string) => {
    const statusConfig = {
      paid: { bg: 'bg-green-100', text: 'text-green-700', label: t[language].paid },
      awaiting: { bg: 'bg-yellow-100', text: 'text-yellow-700', label: t[language].awaiting }
    };

    const config = statusConfig[status as keyof typeof statusConfig];
    return (
      <span className={`px-2 py-1 ${config.bg} ${config.text} rounded-lg text-xs`}>
        {config.label}
      </span>
    );
  };

  if (mockOrders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center">
        <ShoppingBag className="w-12 h-12 text-gray-300 mb-3" />
        <p className="text-gray-500 mb-1">{t[language].noOrders}</p>
        <p className="text-gray-400 text-xs">{t[language].noOrdersDesc}</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {mockOrders.map((order) => (
        <button
          key={order.id}
          onClick={() => onOrderClick(order.orderId)}
          className={`w-full text-right p-4 rounded-xl shadow-sm hover:shadow-md transition-all border ${
            order.isRead
              ? 'bg-white/70 border-purple-100'
              : 'bg-white border-purple-300'
          }`}
        >
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-2">
              {!order.isRead && (
                <span className="w-2 h-2 bg-red-500 rounded-full"></span>
              )}
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <ShoppingBag className="w-4 h-4 text-white" />
              </div>
            </div>
            <span className={`px-2 py-1 rounded-lg text-xs ${
              order.orderType === 'wholesale'
                ? 'bg-purple-100 text-purple-700'
                : 'bg-blue-100 text-blue-700'
            }`}>
              {order.orderType === 'wholesale' ? t[language].wholesale : t[language].retail}
            </span>
          </div>

          <div className="mb-2">
            <p className="text-sm text-gray-800 mb-1">
              {t[language].newOrder} {t[language].from}{' '}
              <span className="font-medium">
                {language === 'ar' ? order.buyerNameAr : order.buyerName}
              </span>
            </p>
            <p className="text-xs text-gray-500">#{order.orderId}</p>
          </div>

          <div className="flex items-center justify-between">
            {getPaymentStatusBadge(order.paymentStatus)}
            <div className="flex items-center gap-1 text-xs text-gray-400">
              <Clock className="w-3 h-3" />
              <span>{order.time}</span>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}