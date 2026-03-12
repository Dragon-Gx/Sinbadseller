import { Bell, Settings, User, Menu, X, Globe } from 'lucide-react';
import type { Language, StoreSettings } from '../App';

interface HeaderProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  mobileMenuOpen: boolean;
  onMobileMenuToggle: () => void;
  onSettingsClick: () => void;
  onNotificationsClick: () => void;
  storeSettings: StoreSettings;
}

export function Header({ language, onLanguageChange, mobileMenuOpen, onMobileMenuToggle, onSettingsClick, onNotificationsClick, storeSettings }: HeaderProps) {
  const t = {
    ar: {
      storeName: 'Sinbad Store – بوابة البائع',
      notifications: 'الإشعارات',
      settings: 'الإعدادات',
      profile: 'الملف الشخصي'
    },
    en: {
      storeName: 'Sinbad Store – Seller Portal',
      notifications: 'Notifications',
      settings: 'Settings',
      profile: 'Profile'
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg shadow-sm border-b border-purple-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Mobile Menu Button */}
          <button
            onClick={onMobileMenuToggle}
            className="md:hidden p-2 hover:bg-purple-50 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-purple-600" />
            ) : (
              <Menu className="w-6 h-6 text-purple-600" />
            )}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            {/* Language Switcher */}
            <button
              onClick={() => onLanguageChange(language === 'ar' ? 'en' : 'ar')}
              className="p-2 hover:bg-purple-50 rounded-lg transition-colors"
              aria-label="Switch language"
            >
              <Globe className="w-5 h-5 text-purple-600" />
            </button>

            <button
              className="p-2 hover:bg-purple-50 rounded-lg transition-colors relative"
              aria-label={t[language].notifications}
              onClick={onNotificationsClick}
            >
              <Bell className="w-5 h-5 text-purple-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            <button
              className="p-2 hover:bg-purple-50 rounded-lg transition-colors"
              aria-label={t[language].settings}
              onClick={onSettingsClick}
            >
              <Settings className="w-5 h-5 text-purple-600" />
            </button>

            <button
              className="p-2 hover:bg-purple-50 rounded-lg transition-colors"
              aria-label={t[language].profile}
            >
              <User className="w-5 h-5 text-purple-600" />
            </button>
          </div>

          {/* Logo and Store Name */}
          <div className="flex items-center gap-3">
            <h1 className="hidden sm:block bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 bg-clip-text text-transparent">
              {storeSettings.storeName && (language === 'ar' ? storeSettings.storeNameAr : storeSettings.storeName) 
                ? (language === 'ar' ? storeSettings.storeNameAr : storeSettings.storeName)
                : t[language].storeName}
            </h1>
            {storeSettings.logo ? (
              <div className="w-10 h-10 rounded-lg overflow-hidden shadow-md border-2 border-purple-200">
                <img
                  src={storeSettings.logo}
                  alt="Store Logo"
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 via-blue-600 to-teal-600 rounded-lg flex items-center justify-center shadow-md">
                <span className="text-white">S</span>
              </div>
            )}
          </div>

          {/* Mobile Profile Icon */}
          <button
            className="md:hidden p-2 hover:bg-purple-50 rounded-lg transition-colors"
            aria-label={t[language].profile}
          >
            <User className="w-5 h-5 text-purple-600" />
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-purple-100">
            <nav className="flex flex-col gap-2">
              <button
                onClick={() => onLanguageChange(language === 'ar' ? 'en' : 'ar')}
                className="flex items-center gap-3 p-3 hover:bg-purple-50 rounded-lg transition-colors"
              >
                <Globe className="w-5 h-5 text-purple-600" />
                <span className="text-gray-700">{language === 'ar' ? 'English' : 'العربية'}</span>
              </button>
              <button 
                className="flex items-center gap-3 p-3 hover:bg-purple-50 rounded-lg transition-colors relative"
                onClick={onNotificationsClick}
              >
                <Bell className="w-5 h-5 text-purple-600" />
                <span className="text-gray-700">{t[language].notifications}</span>
                <span className="absolute top-3 right-3 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button 
                className="flex items-center gap-3 p-3 hover:bg-purple-50 rounded-lg transition-colors"
                onClick={onSettingsClick}
              >
                <Settings className="w-5 h-5 text-purple-600" />
                <span className="text-gray-700">{t[language].settings}</span>
              </button>
              <button className="flex items-center gap-3 p-3 hover:bg-purple-50 rounded-lg transition-colors">
                <User className="w-5 h-5 text-purple-600" />
                <span className="text-gray-700">{t[language].profile}</span>
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}