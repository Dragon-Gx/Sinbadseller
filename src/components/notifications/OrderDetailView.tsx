import { ArrowRight, Package, CheckCircle, Truck } from 'lucide-react';
import type { Language } from '../../App';

interface OrderDetailViewProps {
  orderId: string;
  language: Language;
  onBack: () => void;
}

interface OrderProduct {
  id: string;
  name: string;
  nameAr: string;
  image: string;
  dozens: number;
  pieces: number;
  pricePerUnit: number;
  total: number;
}

const mockOrderDetail = {
  orderId: 'ORD-2024-001',
  buyerName: 'Ahmed Mohammed',
  buyerNameAr: 'أحمد محمد',
  orderType: 'retail',
  paymentMethod: 'online',
  paymentStatus: 'paid',
  deliveryAddress: 'King Fahd Road, Al Olaya District, Riyadh',
  deliveryAddressAr: 'طريق الملك فهد، حي العليا، الرياض',
  orderNotes: 'Please deliver before 5 PM',
  orderNotesAr: 'يرجى التسليم قبل الساعة 5 مساءً',
  orderDate: '2024-12-05 14:30',
  products: [
    {
      id: '1',
      name: 'Wireless Headphones',
      nameAr: 'سماعات لاسلكية',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop',
      dozens: 0,
      pieces: 2,
      pricePerUnit: 299,
      total: 598
    },
    {
      id: '2',
      name: 'Smart Watch',
      nameAr: 'ساعة ذكية',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop',
      dozens: 1,
      pieces: 3,
      pricePerUnit: 599,
      total: 8985
    }
  ] as OrderProduct[]
};

export function OrderDetailView({ orderId, language, onBack }: OrderDetailViewProps) {
  const order = mockOrderDetail;

  const t = {
    ar: {
      orderDetails: 'تفاصيل الطلب',
      orderInfo: 'معلومات الطلب',
      orderId: 'رقم الطلب',
      buyer: 'المشتري',
      orderType: 'نوع الطلب',
      retail: 'تجزئة',
      wholesale: 'جملة',
      paymentMethod: 'طريقة الدفع',
      online: 'دفع إلكتروني',
      cod: 'الدفع عند الاستلام',
      bankTransfer: 'تحويل بنكي',
      paymentStatus: 'حالة الدفع',
      paid: 'مدفوع',
      pending: 'معلق',
      deliveryAddress: 'عنوان التسليم',
      orderNotes: 'ملاحظات الطلب',
      products: 'المنتجات',
      dozens: 'دزينة',
      pieces: 'قطعة',
      pricePerUnit: 'السعر للوحدة',
      total: 'الإجمالي',
      orderTotal: 'إجمالي الطلب',
      sar: 'د.ع',
      markPrepared: 'تحديد كجاهز',
      markShipped: 'تحديد كمشحون',
      back: 'رجوع'
    },
    en: {
      orderDetails: 'Order Details',
      orderInfo: 'Order Information',
      orderId: 'Order ID',
      buyer: 'Buyer',
      orderType: 'Order Type',
      retail: 'Retail',
      wholesale: 'Wholesale',
      paymentMethod: 'Payment Method',
      online: 'Electronic',
      cod: 'Cash on Delivery',
      bankTransfer: 'Transfer',
      paymentStatus: 'Payment Status',
      paid: 'Paid',
      pending: 'Pending',
      deliveryAddress: 'Delivery Address',
      orderNotes: 'Order Notes',
      products: 'Products',
      dozens: 'Dozens',
      pieces: 'Pieces',
      pricePerUnit: 'Price per Unit',
      total: 'Total',
      orderTotal: 'Order Total',
      sar: 'IQD',
      markPrepared: 'Mark as Prepared',
      markShipped: 'Mark as Shipped',
      back: 'Back'
    }
  };

  const totalAmount = order.products.reduce((sum, product) => sum + product.total, 0);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-purple-50 via-blue-50 to-teal-50 z-50 overflow-y-auto">
      <div className="max-w-4xl mx-auto p-4 sm:p-6">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-purple-600 hover:text-purple-700 mb-4 transition-colors"
          >
            <ArrowRight className="w-5 h-5" />
            <span className="text-sm">{t[language].back}</span>
          </button>
          <h1 className="text-gray-800 text-2xl">{t[language].orderDetails}</h1>
        </div>

        {/* Order Info Card */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 shadow-sm border border-purple-100 mb-4">
          <h2 className="text-gray-800 text-lg mb-4">{t[language].orderInfo}</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-500 mb-1">{t[language].orderId}</p>
              <p className="text-sm text-gray-800">#{order.orderId}</p>
            </div>

            <div>
              <p className="text-xs text-gray-500 mb-1">{t[language].buyer}</p>
              <p className="text-sm text-gray-800">
                {language === 'ar' ? order.buyerNameAr : order.buyerName}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-500 mb-1">{t[language].orderType}</p>
              <span className={`inline-block px-3 py-1 rounded-lg text-xs ${
                order.orderType === 'wholesale'
                  ? 'bg-purple-100 text-purple-700'
                  : 'bg-blue-100 text-blue-700'
              }`}>
                {order.orderType === 'wholesale' ? t[language].wholesale : t[language].retail}
              </span>
            </div>

            <div>
              <p className="text-xs text-gray-500 mb-1">{t[language].paymentMethod}</p>
              <p className="text-sm text-gray-800">
                {order.paymentMethod === 'online' ? t[language].electronic : t[language].transfer}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-500 mb-1">{t[language].paymentStatus}</p>
              <span className={`inline-block px-3 py-1 rounded-lg text-xs ${
                order.paymentStatus === 'paid'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-yellow-100 text-yellow-700'
              }`}>
                {order.paymentStatus === 'paid' ? t[language].paid : t[language].pending}
              </span>
            </div>

            <div>
              <p className="text-xs text-gray-500 mb-1">{t[language].deliveryAddress}</p>
              <p className="text-sm text-gray-800">
                {language === 'ar' ? order.deliveryAddressAr : order.deliveryAddress}
              </p>
            </div>
          </div>

          {order.orderNotes && (
            <div className="mt-4 pt-4 border-t border-purple-100">
              <p className="text-xs text-gray-500 mb-1">{t[language].orderNotes}</p>
              <p className="text-sm text-gray-700 bg-blue-50 p-3 rounded-lg">
                {language === 'ar' ? order.orderNotesAr : order.orderNotes}
              </p>
            </div>
          )}
        </div>

        {/* Products Card */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 shadow-sm border border-purple-100 mb-4">
          <h2 className="text-gray-800 text-lg mb-4">{t[language].products}</h2>
          
          <div className="space-y-4">
            {order.products.map((product) => (
              <div key={product.id} className="flex gap-4 p-4 bg-white rounded-xl border border-purple-100">
                <img
                  src={product.image}
                  alt={language === 'ar' ? product.nameAr : product.name}
                  className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                />
                
                <div className="flex-1">
                  <h3 className="text-sm text-gray-800 mb-2">
                    {language === 'ar' ? product.nameAr : product.name}
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-2 text-xs mb-2">
                    {product.dozens > 0 && (
                      <div>
                        <span className="text-gray-500">{t[language].dozens}: </span>
                        <span className="text-gray-700">{product.dozens}</span>
                      </div>
                    )}
                    {product.pieces > 0 && (
                      <div>
                        <span className="text-gray-500">{t[language].pieces}: </span>
                        <span className="text-gray-700">{product.pieces}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">
                      {t[language].pricePerUnit}: {product.pricePerUnit} {t[language].sar}
                    </span>
                    <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                      {product.total} {t[language].sar}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-purple-100">
            <div className="flex items-center justify-between">
              <span className="text-gray-700">{t[language].orderTotal}</span>
              <span className="text-xl bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 bg-clip-text text-transparent">
                {totalAmount} {t[language].sar}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button className="py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2">
            <Package className="w-5 h-5" />
            {t[language].markPrepared}
          </button>

          <button className="py-3 bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2">
            <Truck className="w-5 h-5" />
            {t[language].markShipped}
          </button>
        </div>
      </div>
    </div>
  );
}