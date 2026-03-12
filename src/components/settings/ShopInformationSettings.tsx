import { useState, useRef } from 'react';
import type { Language, StoreSettings } from '../../App';
import { Store, Upload, X } from 'lucide-react';
import { ImageCropModal } from '../ImageCropModal';
import { SaveConfirmationModal } from '../SaveConfirmationModal';
import { toast } from 'sonner@2.0.3';

interface ShopInformationSettingsProps {
  language: Language;
  storeSettings: StoreSettings;
  onSaveSettings: (settings: StoreSettings) => void;
}

export function ShopInformationSettings({ language, storeSettings, onSaveSettings }: ShopInformationSettingsProps) {
  const [shopName, setShopName] = useState(storeSettings.storeName);
  const [shopNameAr, setShopNameAr] = useState(storeSettings.storeNameAr);
  const [category, setCategory] = useState(storeSettings.category);
  const [city, setCity] = useState(storeSettings.city);
  
  // Image upload states
  const [logo, setLogo] = useState<string>(storeSettings.logo);
  const [banner, setBanner] = useState<string>(storeSettings.coverImage);
  const [tempImageForCrop, setTempImageForCrop] = useState<string>('');
  const [cropType, setCropType] = useState<'logo' | 'banner' | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  const logoInputRef = useRef<HTMLInputElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);

  const t = {
    ar: {
      title: 'معلومات المتجر',
      subtitle: 'تعديل معلومات متجرك الأساسية',
      shopName: 'اسم المتجر',
      shopLogo: 'شعار المتجر',
      shopBanner: 'غلاف المتجر',
      category: 'فئة المتجر',
      selectCategory: 'اختر الفئة',
      electronics: 'إلكترونيات',
      fashion: 'أزياء',
      home: 'منزل',
      beauty: 'جمال',
      city: 'المدينة / المنطقة',
      selectCity: 'اختر المدينة',
      baghdad: 'بغداد',
      basra: 'البصرة',
      mosul: 'الموصل',
      erbil: 'أربيل',
      uploadLogo: 'رفع الشعار',
      uploadBanner: 'رفع الغلاف',
      changeLogo: 'تغيير الشعار',
      changeBanner: 'تغيير الغلاف',
      removeLogo: 'إزالة',
      removeBanner: 'إزالة',
      warning: 'تحذير: لن يتم عرض أرقام الهواتف أو وسائل التواصل المباشر - التواصل فقط عبر Sinbad Store',
      save: 'حفظ التغييرات',
      invalidFileType: 'نوع الملف غير صالح. يرجى اختيار صورة (JPG, PNG, WebP)',
      fileTooLarge: 'حجم الملف كبير جداً. الحد الأقصى 5 ميجابايت',
      logoUploaded: 'تم رفع الشعار بنجاح',
      bannerUploaded: 'تم رفع الغلاف بنجاح',
      cropLogo: 'قص شعار المتجر',
      cropBanner: 'قص غلاف المتجر',
      settingsSaved: 'تم حفظ إعدادات المتجر بنجاح',
      settingsSavedDesc: 'التغييرات ستظهر في واجهة المتجر فوراً'
    },
    en: {
      title: 'Shop Information',
      subtitle: 'Edit your store basic information',
      shopName: 'Shop Name',
      shopLogo: 'Shop Logo',
      shopBanner: 'Shop Cover Banner',
      category: 'Shop Category',
      selectCategory: 'Select Category',
      electronics: 'Electronics',
      fashion: 'Fashion',
      home: 'Home',
      beauty: 'Beauty',
      city: 'City / Area',
      selectCity: 'Select City',
      baghdad: 'Baghdad',
      basra: 'Basra',
      mosul: 'Mosul',
      erbil: 'Erbil',
      uploadLogo: 'Upload Logo',
      uploadBanner: 'Upload Banner',
      changeLogo: 'Change Logo',
      changeBanner: 'Change Banner',
      removeLogo: 'Remove',
      removeBanner: 'Remove',
      warning: 'Warning: Phone numbers or direct contact methods will not be shown - communication only through Sinbad Store',
      save: 'Save Changes',
      invalidFileType: 'Invalid file type. Please select an image (JPG, PNG, WebP)',
      fileTooLarge: 'File size too large. Maximum 5MB',
      logoUploaded: 'Logo uploaded successfully',
      bannerUploaded: 'Banner uploaded successfully',
      cropLogo: 'Crop Store Logo',
      cropBanner: 'Crop Store Banner',
      settingsSaved: 'Store settings saved successfully',
      settingsSavedDesc: 'Changes will appear on your storefront immediately'
    }
  };

  const validateImage = (file: File): boolean => {
    // Check file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      toast.error(t[language].invalidFileType);
      return false;
    }

    // Check file size (5MB max)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      toast.error(t[language].fileTooLarge);
      return false;
    }

    return true;
  };

  const handleLogoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!validateImage(file)) {
      e.target.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setTempImageForCrop(reader.result as string);
      setCropType('logo');
    };
    reader.readAsDataURL(file);
  };

  const handleBannerSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!validateImage(file)) {
      e.target.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setTempImageForCrop(reader.result as string);
      setCropType('banner');
    };
    reader.readAsDataURL(file);
  };

  const handleCropSave = (croppedImage: string) => {
    if (cropType === 'logo') {
      setLogo(croppedImage);
      toast.success(t[language].logoUploaded);
    } else if (cropType === 'banner') {
      setBanner(croppedImage);
      toast.success(t[language].bannerUploaded);
    }

    // Reset crop modal
    setTempImageForCrop('');
    setCropType(null);

    // Clear file inputs
    if (logoInputRef.current) logoInputRef.current.value = '';
    if (bannerInputRef.current) bannerInputRef.current.value = '';
  };

  const handleCropClose = () => {
    setTempImageForCrop('');
    setCropType(null);
    
    // Clear file inputs
    if (logoInputRef.current) logoInputRef.current.value = '';
    if (bannerInputRef.current) bannerInputRef.current.value = '';
  };

  const handleSaveSettings = () => {
    const updatedSettings: StoreSettings = {
      storeName: shopName,
      storeNameAr: shopNameAr,
      category: category,
      city: city,
      logo: logo,
      coverImage: banner
    };
    onSaveSettings(updatedSettings);
    toast.success(t[language].settingsSaved, {
      description: t[language].settingsSavedDesc
    });
  };

  const handleConfirmSave = () => {
    setShowConfirmModal(true);
  };

  const handleCancelSave = () => {
    setShowConfirmModal(false);
  };

  const handleConfirmSaveAction = () => {
    setIsSaving(true);
    handleSaveSettings();
    setIsSaving(false);
    setShowConfirmModal(false);
  };

  return (
    <>
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 shadow-sm border border-purple-100">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-blue-500 rounded-xl flex items-center justify-center">
            <Store className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-gray-800 text-lg">{t[language].title}</h2>
            <p className="text-gray-500 text-xs">{t[language].subtitle}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-700 mb-2">{t[language].shopName}</label>
            <input
              type="text"
              value={shopName}
              onChange={(e) => setShopName(e.target.value)}
              className="w-full px-4 py-2 bg-white border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Sinbad Store"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Logo Upload */}
            <div>
              <label className="block text-sm text-gray-700 mb-2">{t[language].shopLogo}</label>
              
              {logo ? (
                <div className="relative">
                  <div className="aspect-square rounded-lg overflow-hidden border-2 border-purple-200">
                    <img
                      src={logo}
                      alt="Store Logo"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => logoInputRef.current?.click()}
                      className="flex-1 px-3 py-2 bg-white border border-purple-200 rounded-lg hover:bg-purple-50 transition-colors text-sm text-purple-600"
                    >
                      {t[language].changeLogo}
                    </button>
                    <button
                      onClick={() => setLogo('')}
                      className="px-3 py-2 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors text-sm text-red-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => logoInputRef.current?.click()}
                  className="w-full px-4 py-3 bg-white border border-purple-200 rounded-lg hover:bg-purple-50 transition-colors flex items-center justify-center gap-2"
                >
                  <Upload className="w-4 h-4 text-purple-600" />
                  <span className="text-sm text-purple-600">{t[language].uploadLogo}</span>
                </button>
              )}

              <input
                ref={logoInputRef}
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/webp"
                onChange={handleLogoSelect}
                className="hidden"
              />
            </div>

            {/* Banner Upload */}
            <div>
              <label className="block text-sm text-gray-700 mb-2">{t[language].shopBanner}</label>
              
              {banner ? (
                <div className="relative">
                  <div className="aspect-[2/1] rounded-lg overflow-hidden border-2 border-purple-200">
                    <img
                      src={banner}
                      alt="Store Banner"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => bannerInputRef.current?.click()}
                      className="flex-1 px-3 py-2 bg-white border border-purple-200 rounded-lg hover:bg-purple-50 transition-colors text-sm text-purple-600"
                    >
                      {t[language].changeBanner}
                    </button>
                    <button
                      onClick={() => setBanner('')}
                      className="px-3 py-2 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors text-sm text-red-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => bannerInputRef.current?.click()}
                  className="w-full px-4 py-3 bg-white border border-purple-200 rounded-lg hover:bg-purple-50 transition-colors flex items-center justify-center gap-2"
                >
                  <Upload className="w-4 h-4 text-purple-600" />
                  <span className="text-sm text-purple-600">{t[language].uploadBanner}</span>
                </button>
              )}

              <input
                ref={bannerInputRef}
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/webp"
                onChange={handleBannerSelect}
                className="hidden"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-2">{t[language].category}</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 bg-white border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="">{t[language].selectCategory}</option>
              <option value="electronics">{t[language].electronics}</option>
              <option value="fashion">{t[language].fashion}</option>
              <option value="home">{t[language].home}</option>
              <option value="beauty">{t[language].beauty}</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-2">{t[language].city}</label>
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full px-4 py-2 bg-white border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="">{t[language].selectCity}</option>
              <option value="baghdad">{t[language].baghdad}</option>
              <option value="basra">{t[language].basra}</option>
              <option value="mosul">{t[language].mosul}</option>
              <option value="erbil">{t[language].erbil}</option>
            </select>
          </div>

          <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-xs text-yellow-800">{t[language].warning}</p>
          </div>

          <button className="w-full py-2 bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 text-white rounded-lg hover:shadow-lg transition-all" onClick={handleConfirmSave}>
            {t[language].save}
          </button>
        </div>
      </div>

      {/* Image Crop Modal */}
      {tempImageForCrop && cropType && (
        <ImageCropModal
          image={tempImageForCrop}
          onClose={handleCropClose}
          onSave={handleCropSave}
          language={language}
          aspectRatio={cropType === 'logo' ? 1 : 2}
          title={cropType === 'logo' ? t[language].cropLogo : t[language].cropBanner}
        />
      )}

      {/* Save Confirmation Modal */}
      <SaveConfirmationModal
        isOpen={showConfirmModal}
        onConfirm={handleConfirmSaveAction}
        onCancel={handleCancelSave}
        language={language}
        type="save"
      />
    </>
  );
}