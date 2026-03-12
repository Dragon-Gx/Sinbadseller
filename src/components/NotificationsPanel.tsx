import { useState } from 'react';
import { X } from 'lucide-react';
import type { Language } from '../App';
import { OrderNotifications } from './notifications/OrderNotifications';
import { CustomerIssues } from './notifications/CustomerIssues';
import { PayoutNotifications } from './notifications/PayoutNotifications';
import { OrderDetailView } from './notifications/OrderDetailView';

interface NotificationsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

type TabType = 'orders' | 'issues' | 'payouts';

export interface OrderNotification {
  id: string;
  buyerName: string;
  orderType: 'wholesale' | 'retail';
  paymentStatus: 'awaiting' | 'paid';
  orderId: string;
  time: string;
  isRead: boolean;
}

export function NotificationsPanel({ isOpen, onClose, language }: NotificationsPanelProps) {
  const [activeTab, setActiveTab] = useState<TabType>('orders');
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  const t = {
    ar: {
      title: 'الإشعارات',
      orders: 'الطلبات',
      issues: 'مشاكل العملاء',
      payouts: 'المحاسبات'
    },
    en: {
      title: 'Notifications',
      orders: 'Orders',
      issues: 'Customer Issues',
      payouts: 'Payouts'
    }
  };

  if (!isOpen && !selectedOrderId) return null;

  // Show order detail view if an order is selected
  if (selectedOrderId) {
    return (
      <OrderDetailView
        orderId={selectedOrderId}
        language={language}
        onBack={() => setSelectedOrderId(null)}
      />
    );
  }

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Sliding Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-gradient-to-br from-purple-50 via-blue-50 to-teal-50 shadow-2xl z-50 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-lg border-b border-purple-100 p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-gray-800 text-lg">{t[language].title}</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-purple-50 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mt-4">
            <button
              onClick={() => setActiveTab('orders')}
              className={`flex-1 px-3 py-2 rounded-lg text-sm transition-all ${
                activeTab === 'orders'
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-md'
                  : 'bg-white text-gray-600 hover:bg-purple-50'
              }`}
            >
              {t[language].orders}
            </button>
            <button
              onClick={() => setActiveTab('issues')}
              className={`flex-1 px-3 py-2 rounded-lg text-sm transition-all ${
                activeTab === 'issues'
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-md'
                  : 'bg-white text-gray-600 hover:bg-purple-50'
              }`}
            >
              {t[language].issues}
            </button>
            <button
              onClick={() => setActiveTab('payouts')}
              className={`flex-1 px-3 py-2 rounded-lg text-sm transition-all ${
                activeTab === 'payouts'
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-md'
                  : 'bg-white text-gray-600 hover:bg-purple-50'
              }`}
            >
              {t[language].payouts}
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="h-[calc(100%-140px)] overflow-y-auto p-4">
          {activeTab === 'orders' && (
            <OrderNotifications
              language={language}
              onOrderClick={(orderId) => setSelectedOrderId(orderId)}
            />
          )}
          {activeTab === 'issues' && <CustomerIssues language={language} />}
          {activeTab === 'payouts' && <PayoutNotifications language={language} />}
        </div>
      </div>
    </>
  );
}