import { useState } from 'react';
import type { Language, StoreSettings } from '../App';
import { InventorySettings } from './settings/InventorySettings';
import { ProductVisibilitySettings } from './settings/ProductVisibilitySettings';
import { ShopInformationSettings } from './settings/ShopInformationSettings';
import { PayoutSettings } from './settings/PayoutSettings';
import { NotificationSettings } from './settings/NotificationSettings';
import { LanguageSettings } from './settings/LanguageSettings';
import { SecuritySettings } from './settings/SecuritySettings';
import { StaffPermissionsSettings } from './settings/StaffPermissionsSettings';
import { ArrowRight } from 'lucide-react';

interface SettingsPageProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onBack: () => void;
  storeSettings: StoreSettings;
  onSaveSettings: (settings: StoreSettings) => void;
}

export function SettingsPage({ language, onLanguageChange, onBack, storeSettings, onSaveSettings }: SettingsPageProps) {
  const t = {
    ar: {
      title: 'الإعدادات',
      subtitle: 'إدارة متجرك وحسابك'
    },
    en: {
      title: 'Settings',
      subtitle: 'Manage your store and account'
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-teal-50 pb-20" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-purple-600 hover:text-purple-700 mb-4 transition-colors"
          >
            <ArrowRight className="w-5 h-5" />
            <span className="text-sm">{language === 'ar' ? 'رجوع' : 'Back'}</span>
          </button>
          <h1 className="text-gray-800 mb-2">{t[language].title}</h1>
          <p className="text-gray-600 text-sm">{t[language].subtitle}</p>
        </div>

        {/* Settings Sections */}
        <div className="space-y-4">
          <InventorySettings language={language} />
          <ProductVisibilitySettings language={language} />
          <ShopInformationSettings 
            language={language} 
            storeSettings={storeSettings}
            onSaveSettings={onSaveSettings}
          />
          <PayoutSettings language={language} />
          <NotificationSettings language={language} />
          <LanguageSettings language={language} onLanguageChange={onLanguageChange} />
          <SecuritySettings language={language} />
          <StaffPermissionsSettings language={language} />
        </div>
      </div>
    </div>
  );
}