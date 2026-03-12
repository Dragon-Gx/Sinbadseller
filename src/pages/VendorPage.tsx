import { useState } from 'react';
import { Link } from 'react-router';
import { ArrowRight, Store } from 'lucide-react';

type Language = 'ar' | 'en';

export default function VendorPage() {
  const [language, setLanguage] = useState<Language>('ar');
  const isRTL = language === 'ar';

  return (
    <div className={`min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-teal-50 ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 border-b border-purple-100 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link
                to="/home"
                className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-white/50 transition-all"
              >
                {isRTL ? <ArrowRight className="w-5 h-5" /> : <ArrowRight className="w-5 h-5 rotate-180" />}
                <span>{isRTL ? 'العودة للرئيسية' : 'Back to Home'}</span>
              </Link>
            </div>

            <button
              onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
              className="px-4 py-2 rounded-lg bg-white/50 hover:bg-white/80 transition-all backdrop-blur-sm border border-purple-200"
            >
              {language === 'ar' ? 'EN' : 'عربي'}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-12 border border-purple-100 shadow-xl text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-purple-600 via-blue-600 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Store className="w-12 h-12 text-white" />
          </div>
          
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 bg-clip-text text-transparent mb-4">
            {isRTL ? 'صفحة المتجر' : 'Vendor Store Page'}
          </h1>
          
          <p className="text-xl text-gray-600 mb-8">
            {isRTL 
              ? 'هذه الصفحة مخصصة لعرض متجر البائع ومنتجاته'
              : 'This page is for displaying vendor store and products'
            }
          </p>

          <Link
            to="/home"
            className="inline-block bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all hover:scale-105"
          >
            {isRTL ? 'العودة للرئيسية' : 'Back to Home'}
          </Link>
        </div>
      </main>
    </div>
  );
}
