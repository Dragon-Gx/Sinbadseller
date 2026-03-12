import { useState } from 'react';
import type { Language } from '../../App';
import { Shield, Smartphone } from 'lucide-react';

interface SecuritySettingsProps {
  language: Language;
}

export function SecuritySettings({ language }: SecuritySettingsProps) {
  const [twoStepVerification, setTwoStepVerification] = useState(false);
  const [showDevices, setShowDevices] = useState(false);

  const t = {
    ar: {
      title: 'الأمان وتسجيل الدخول',
      subtitle: 'حماية حسابك وإدارة الوصول',
      email: 'البريد الإلكتروني',
      changeEmail: 'تغيير البريد',
      password: 'كلمة المرور',
      changePassword: 'تغيير كلمة المرور',
      twoStep: 'التحقق بخطوتين',
      devices: 'الأجهزة المتصلة',
      manageDevices: 'إدارة الأجهزة',
      currentDevice: 'الجهاز الحالي',
      chrome: 'Chrome - Windows',
      safari: 'Safari - iPhone',
      revoke: 'إلغاء الوصول',
      hideDevices: 'إخفاء الأجهزة'
    },
    en: {
      title: 'Security & Login',
      subtitle: 'Protect your account and manage access',
      email: 'Email',
      changeEmail: 'Change Email',
      password: 'Password',
      changePassword: 'Change Password',
      twoStep: 'Two-Step Verification',
      devices: 'Connected Devices',
      manageDevices: 'Manage Devices',
      currentDevice: 'Current Device',
      chrome: 'Chrome - Windows',
      safari: 'Safari - iPhone',
      revoke: 'Revoke Access',
      hideDevices: 'Hide Devices'
    }
  };

  const devices = [
    { name: t[language].chrome, isCurrent: true },
    { name: t[language].safari, isCurrent: false }
  ];

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 shadow-sm border border-purple-100">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl flex items-center justify-center">
          <Shield className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-gray-800 text-lg">{t[language].title}</h2>
          <p className="text-gray-500 text-xs">{t[language].subtitle}</p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="p-3 bg-white rounded-lg border border-purple-200 flex items-center justify-between">
          <div>
            <div className="text-sm text-gray-700">{t[language].email}</div>
            <div className="text-xs text-gray-500">seller@sinbadstore.com</div>
          </div>
          <button className="text-xs text-purple-600 hover:text-purple-700">
            {t[language].changeEmail}
          </button>
        </div>

        <div className="p-3 bg-white rounded-lg border border-purple-200 flex items-center justify-between">
          <div>
            <div className="text-sm text-gray-700">{t[language].password}</div>
            <div className="text-xs text-gray-500">••••••••</div>
          </div>
          <button className="text-xs text-purple-600 hover:text-purple-700">
            {t[language].changePassword}
          </button>
        </div>

        <div className="p-3 bg-white rounded-lg border border-purple-200 flex items-center justify-between">
          <span className="text-sm text-gray-700">{t[language].twoStep}</span>
          <button
            onClick={() => setTwoStepVerification(!twoStepVerification)}
            className={`relative w-11 h-5 rounded-full transition-colors ${
              twoStepVerification ? 'bg-gradient-to-r from-red-500 to-pink-500' : 'bg-gray-300'
            }`}
          >
            <span
              className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-md transition-transform ${
                twoStepVerification ? 'left-6' : 'left-0.5'
              }`}
            />
          </button>
        </div>

        <button
          onClick={() => setShowDevices(!showDevices)}
          className="w-full p-3 bg-white rounded-lg border border-purple-200 flex items-center justify-between hover:bg-purple-50 transition-colors"
        >
          <div className="flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-purple-600" />
            <span className="text-sm text-gray-700">{t[language].devices}</span>
          </div>
          <span className="text-xs text-purple-600">
            {showDevices ? t[language].hideDevices : t[language].manageDevices}
          </span>
        </button>

        {showDevices && (
          <div className="p-4 bg-gray-50 rounded-lg space-y-2">
            {devices.map((device, index) => (
              <div key={index} className="p-3 bg-white rounded-lg border border-gray-200 flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-700">{device.name}</div>
                  {device.isCurrent && (
                    <div className="text-xs text-green-600">{t[language].currentDevice}</div>
                  )}
                </div>
                {!device.isCurrent && (
                  <button className="text-xs text-red-600 hover:text-red-700">
                    {t[language].revoke}
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
