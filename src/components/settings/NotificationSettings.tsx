import { useState } from 'react';
import type { Language } from '../../App';
import { Bell } from 'lucide-react';

interface NotificationSettingsProps {
  language: Language;
}

export function NotificationSettings({ language }: NotificationSettingsProps) {
  const [lowStockAlerts, setLowStockAlerts] = useState(true);
  const [newOrderAlerts, setNewOrderAlerts] = useState(true);
  const [orderProblemAlerts, setOrderProblemAlerts] = useState(true);
  const [accountStatusAlerts, setAccountStatusAlerts] = useState(true);

  const t = {
    ar: {
      title: 'إعدادات الإشعارات',
      subtitle: 'تحكم في الإشعارات التي تتلقاها',
      lowStock: 'تنبيهات انخفاض المخزون',
      newOrder: 'تنبيهات الطلبات الجديدة',
      orderProblem: 'تنبيهات مشاكل الطلبات',
      accountStatus: 'تنبيهات حالة الحساب'
    },
    en: {
      title: 'Notifications',
      subtitle: 'Control the notifications you receive',
      lowStock: 'Low Stock Alerts',
      newOrder: 'New Order Alerts',
      orderProblem: 'Order Problem Alerts',
      accountStatus: 'Account Status Alerts'
    }
  };

  const notifications = [
    { label: t[language].lowStock, state: lowStockAlerts, setState: setLowStockAlerts },
    { label: t[language].newOrder, state: newOrderAlerts, setState: setNewOrderAlerts },
    { label: t[language].orderProblem, state: orderProblemAlerts, setState: setOrderProblemAlerts },
    { label: t[language].accountStatus, state: accountStatusAlerts, setState: setAccountStatusAlerts }
  ];

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 shadow-sm border border-purple-100">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
          <Bell className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-gray-800 text-lg">{t[language].title}</h2>
          <p className="text-gray-500 text-xs">{t[language].subtitle}</p>
        </div>
      </div>

      <div className="space-y-3">
        {notifications.map((notification, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg border border-purple-200">
            <span className="text-sm text-gray-700">{notification.label}</span>
            <button
              onClick={() => notification.setState(!notification.state)}
              className={`relative w-11 h-5 rounded-full transition-colors ${
                notification.state ? 'bg-gradient-to-r from-yellow-500 to-orange-500' : 'bg-gray-300'
              }`}
            >
              <span
                className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-md transition-transform ${
                  notification.state ? 'left-6' : 'left-0.5'
                }`}
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
