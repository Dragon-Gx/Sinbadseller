import { useState } from 'react';
import { Link } from 'react-router';
import { Home, AlertCircle } from 'lucide-react';

export default function NotFoundPage() {
  const [language] = useState<'ar' | 'en'>('ar');
  const isRTL = language === 'ar';

  return (
    <div className={`min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-teal-50 flex items-center justify-center p-4 ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-12 border border-purple-100 shadow-xl text-center max-w-lg w-full">
        <div className="w-24 h-24 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="w-12 h-12 text-purple-600" />
        </div>
        
        <div className="text-8xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 bg-clip-text text-transparent mb-4">
          404
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {isRTL ? 'الصفحة غير موجودة' : 'Page Not Found'}
        </h1>
        
        <p className="text-gray-600 mb-8">
          {isRTL 
            ? 'عذراً، الصفحة التي تبحث عنها غير متوفرة أو تم نقلها'
            : 'Sorry, the page you are looking for does not exist or has been moved'
          }
        </p>

        <Link
          to="/home"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all hover:scale-105"
        >
          <Home className="w-5 h-5" />
          {isRTL ? 'العودة للرئيسية' : 'Back to Home'}
        </Link>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            {isRTL 
              ? 'الصفحات المتاحة: /home | /vendor'
              : 'Available pages: /home | /vendor'
            }
          </p>
        </div>
      </div>
    </div>
  );
}
