import { useState } from 'react';
import { ArrowRight, ArrowLeft, TrendingUp, ShoppingBag, Package, CreditCard, Building2, Calendar } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import type { Language } from '../App';

interface Order {
  id: string;
  date: string;
  amount: number;
  products: number;
  paymentMethod: 'electronic' | 'bank';
}

interface SalesAnalyticsPageProps {
  language: Language;
  onBack: () => void;
}

// Mock sales data for the current month
const mockOrders: Order[] = [
  { id: '1', date: '2024-12-01', amount: 1250, products: 5, paymentMethod: 'electronic' },
  { id: '2', date: '2024-12-01', amount: 890, products: 3, paymentMethod: 'bank' },
  { id: '3', date: '2024-12-02', amount: 2100, products: 8, paymentMethod: 'electronic' },
  { id: '4', date: '2024-12-03', amount: 1450, products: 6, paymentMethod: 'electronic' },
  { id: '5', date: '2024-12-03', amount: 780, products: 2, paymentMethod: 'bank' },
  { id: '6', date: '2024-12-04', amount: 3200, products: 12, paymentMethod: 'bank' },
  { id: '7', date: '2024-12-05', amount: 1680, products: 7, paymentMethod: 'electronic' },
  { id: '8', date: '2024-12-06', amount: 950, products: 4, paymentMethod: 'electronic' },
  { id: '9', date: '2024-12-07', amount: 2400, products: 9, paymentMethod: 'bank' },
  { id: '10', date: '2024-12-08', amount: 1120, products: 5, paymentMethod: 'electronic' },
  { id: '11', date: '2024-12-09', amount: 1890, products: 8, paymentMethod: 'electronic' },
  { id: '12', date: '2024-12-10', amount: 2670, products: 10, paymentMethod: 'bank' },
  { id: '13', date: '2024-12-11', amount: 1340, products: 6, paymentMethod: 'electronic' },
  { id: '14', date: '2024-12-12', amount: 980, products: 4, paymentMethod: 'bank' },
  { id: '15', date: '2024-12-13', amount: 2150, products: 9, paymentMethod: 'electronic' },
  { id: '16', date: '2024-12-14', amount: 1560, products: 7, paymentMethod: 'electronic' },
  { id: '17', date: '2024-12-15', amount: 3100, products: 13, paymentMethod: 'bank' },
  { id: '18', date: '2024-12-16', amount: 1780, products: 8, paymentMethod: 'electronic' },
  { id: '19', date: '2024-12-17', amount: 2240, products: 10, paymentMethod: 'bank' },
  { id: '20', date: '2024-12-18', amount: 1450, products: 6, paymentMethod: 'electronic' },
  { id: '21', date: '2024-12-19', amount: 2890, products: 11, paymentMethod: 'electronic' },
  { id: '22', date: '2024-12-20', amount: 1670, products: 7, paymentMethod: 'bank' },
  { id: '23', date: '2024-12-21', amount: 2330, products: 9, paymentMethod: 'electronic' },
  { id: '24', date: '2024-12-22', amount: 1920, products: 8, paymentMethod: 'bank' },
  { id: '25', date: '2024-12-23', amount: 2560, products: 10, paymentMethod: 'electronic' },
];

export function SalesAnalyticsPage({ language, onBack }: SalesAnalyticsPageProps) {
  const [viewMode, setViewMode] = useState<'daily' | 'weekly'>('daily');

  const t = {
    ar: {
      title: 'إجمالي المبيعات',
      subtitle: 'ديسمبر 2024',
      back: 'رجوع',
      totalRevenue: 'إجمالي الإيرادات',
      totalOrders: 'إجمالي الطلبات',
      productsSold: 'المنتجات المباعة',
      paymentMethods: 'طرق الدفع',
      electronic: 'الدفع الإلكتروني',
      bank: 'التحويل البنكي',
      salesTrend: 'اتجاه المبيعات',
      daily: 'يومي',
      weekly: 'أسبوعي',
      sar: 'د.ع',
      order: 'طلب',
      product: 'منتج',
      amount: 'المبلغ',
      date: 'التاريخ',
      recentOrders: 'الطلبات الأخيرة',
      thisMonth: 'هذا الشهر',
      avgOrderValue: 'متوسط قيمة الطلب',
      topSellingDay: 'أفضل يوم مبيعات',
      growth: 'النمو'
    },
    en: {
      title: 'Total Sales',
      subtitle: 'December 2024',
      back: 'Back',
      totalRevenue: 'Total Revenue',
      totalOrders: 'Total Orders',
      productsSold: 'Products Sold',
      paymentMethods: 'Payment Methods',
      electronic: 'Electronic Payment',
      bank: 'Bank Transfer',
      salesTrend: 'Sales Trend',
      daily: 'Daily',
      weekly: 'Weekly',
      sar: 'IQD',
      order: 'Order',
      product: 'Product',
      amount: 'Amount',
      date: 'Date',
      recentOrders: 'Recent Orders',
      thisMonth: 'This Month',
      avgOrderValue: 'Avg Order Value',
      topSellingDay: 'Top Selling Day',
      growth: 'Growth'
    }
  };

  // Calculate statistics
  const totalRevenue = mockOrders.reduce((sum, order) => sum + order.amount, 0);
  const totalOrders = mockOrders.length;
  const totalProducts = mockOrders.reduce((sum, order) => sum + order.products, 0);
  const avgOrderValue = Math.round(totalRevenue / totalOrders);

  const electronicPayments = mockOrders.filter(o => o.paymentMethod === 'electronic');
  const bankPayments = mockOrders.filter(o => o.paymentMethod === 'bank');
  
  const electronicTotal = electronicPayments.reduce((sum, order) => sum + order.amount, 0);
  const bankTotal = bankPayments.reduce((sum, order) => sum + order.amount, 0);

  // Payment method pie chart data
  const paymentData = [
    { name: t[language].electronic, value: electronicTotal, count: electronicPayments.length },
    { name: t[language].bank, value: bankTotal, count: bankPayments.length }
  ];

  const COLORS = ['#8b5cf6', '#06b6d4'];

  // Prepare daily chart data
  const dailyData = mockOrders.reduce((acc: any[], order) => {
    const date = new Date(order.date).toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US', { month: 'short', day: 'numeric' });
    const existing = acc.find(item => item.date === date);
    
    if (existing) {
      existing.amount += order.amount;
      existing.orders += 1;
    } else {
      acc.push({ date, amount: order.amount, orders: 1 });
    }
    
    return acc;
  }, []);

  // Prepare weekly chart data
  const weeklyData = mockOrders.reduce((acc: any[], order) => {
    const date = new Date(order.date);
    const weekNum = Math.ceil(date.getDate() / 7);
    const weekLabel = language === 'ar' ? `الأسبوع ${weekNum}` : `Week ${weekNum}`;
    const existing = acc.find(item => item.week === weekLabel);
    
    if (existing) {
      existing.amount += order.amount;
      existing.orders += 1;
    } else {
      acc.push({ week: weekLabel, amount: order.amount, orders: 1 });
    }
    
    return acc;
  }, []);

  // Find top selling day
  const topDay = dailyData.reduce((max, item) => item.amount > max.amount ? item : max, dailyData[0]);

  const BackIcon = language === 'ar' ? ArrowRight : ArrowLeft;
  const chartData = viewMode === 'daily' ? dailyData : weeklyData;
  const xAxisKey = viewMode === 'daily' ? 'date' : 'week';

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-teal-50" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="bg-white/70 backdrop-blur-md border-b border-purple-100 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors"
            >
              <BackIcon className="w-5 h-5" />
              <span>{t[language].back}</span>
            </button>
            
            <div className="text-center flex-1 mx-4">
              <h1 className="bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 bg-clip-text text-transparent text-xl sm:text-2xl">
                {t[language].title}
              </h1>
              <p className="text-gray-500 text-sm mt-1">{t[language].subtitle}</p>
            </div>

            <div className="w-20 sm:w-24"></div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Total Revenue */}
          <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-purple-100 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between mb-2">
              <div className="bg-gradient-to-br from-purple-100 to-blue-100 p-3 rounded-lg">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <p className="text-gray-500 text-sm mb-1">{t[language].totalRevenue}</p>
            <p className="text-2xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              {totalRevenue.toLocaleString()} {t[language].sar}
            </p>
          </div>

          {/* Total Orders */}
          <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-blue-100 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between mb-2">
              <div className="bg-gradient-to-br from-blue-100 to-teal-100 p-3 rounded-lg">
                <ShoppingBag className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <p className="text-gray-500 text-sm mb-1">{t[language].totalOrders}</p>
            <p className="text-2xl bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
              {totalOrders}
            </p>
          </div>

          {/* Products Sold */}
          <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-teal-100 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between mb-2">
              <div className="bg-gradient-to-br from-teal-100 to-purple-100 p-3 rounded-lg">
                <Package className="w-6 h-6 text-teal-600" />
              </div>
            </div>
            <p className="text-gray-500 text-sm mb-1">{t[language].productsSold}</p>
            <p className="text-2xl bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent">
              {totalProducts}
            </p>
          </div>

          {/* Average Order Value */}
          <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-purple-100 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between mb-2">
              <div className="bg-gradient-to-br from-purple-100 to-pink-100 p-3 rounded-lg">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <p className="text-gray-500 text-sm mb-1">{t[language].avgOrderValue}</p>
            <p className="text-2xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {avgOrderValue.toLocaleString()} {t[language].sar}
            </p>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sales Trend Chart */}
          <div className="lg:col-span-2 bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-purple-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg">{t[language].salesTrend}</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode('daily')}
                  className={`px-4 py-2 rounded-lg text-sm transition-all ${
                    viewMode === 'daily'
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {t[language].daily}
                </button>
                <button
                  onClick={() => setViewMode('weekly')}
                  className={`px-4 py-2 rounded-lg text-sm transition-all ${
                    viewMode === 'weekly'
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {t[language].weekly}
                </button>
              </div>
            </div>
            
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  dataKey={xAxisKey} 
                  tick={{ fontSize: 12 }}
                  stroke="#9ca3af"
                />
                <YAxis 
                  tick={{ fontSize: 12 }}
                  stroke="#9ca3af"
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                  formatter={(value: number) => `${value.toLocaleString()} ${t[language].sar}`}
                />
                <Bar 
                  dataKey="amount" 
                  fill="url(#colorGradient)" 
                  radius={[8, 8, 0, 0]}
                />
                <defs>
                  <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Payment Methods Pie Chart */}
          <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-purple-100">
            <h3 className="text-lg mb-6">{t[language].paymentMethods}</h3>
            
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={paymentData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {paymentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                  formatter={(value: number) => `${value.toLocaleString()} ${t[language].sar}`}
                />
              </PieChart>
            </ResponsiveContainer>

            {/* Payment Method Legend */}
            <div className="space-y-3 mt-4">
              {paymentData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: COLORS[index] }}
                    />
                    <span className="text-sm text-gray-600">{item.name}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm">{item.value.toLocaleString()} {t[language].sar}</p>
                    <p className="text-xs text-gray-400">{item.count} {t[language].order}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Orders Table */}
        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-purple-100">
          <h3 className="text-lg mb-4">{t[language].recentOrders}</h3>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-purple-100">
                  <th className="text-start py-3 px-2 text-sm text-gray-600">{t[language].order}</th>
                  <th className="text-start py-3 px-2 text-sm text-gray-600">{t[language].date}</th>
                  <th className="text-start py-3 px-2 text-sm text-gray-600">{t[language].productsSold}</th>
                  <th className="text-start py-3 px-2 text-sm text-gray-600">{t[language].paymentMethods}</th>
                  <th className="text-end py-3 px-2 text-sm text-gray-600">{t[language].amount}</th>
                </tr>
              </thead>
              <tbody>
                {mockOrders.slice(-10).reverse().map((order) => (
                  <tr key={order.id} className="border-b border-gray-100 hover:bg-purple-50/50 transition-colors">
                    <td className="py-3 px-2 text-sm">#{order.id}</td>
                    <td className="py-3 px-2 text-sm text-gray-600">
                      {new Date(order.date).toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US', {
                        month: 'short',
                        day: 'numeric'
                      })}
                    </td>
                    <td className="py-3 px-2 text-sm">{order.products}</td>
                    <td className="py-3 px-2">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
                        order.paymentMethod === 'electronic'
                          ? 'bg-purple-100 text-purple-700'
                          : 'bg-teal-100 text-teal-700'
                      }`}>
                        {order.paymentMethod === 'electronic' ? (
                          <>
                            <CreditCard className="w-3 h-3" />
                            {t[language].electronic}
                          </>
                        ) : (
                          <>
                            <Building2 className="w-3 h-3" />
                            {t[language].bank}
                          </>
                        )}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-end bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                      {order.amount.toLocaleString()} {t[language].sar}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
