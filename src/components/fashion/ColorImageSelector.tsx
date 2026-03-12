import { useState, useRef } from 'react';
import { Upload, X } from 'lucide-react';
import type { Language } from '../../App';

interface ColorImage {
  id: string;
  colorName: string;
  colorNameAr: string;
  imageUrl: string;
}

interface ColorImageSelectorProps {
  language: Language;
  colors: ColorImage[];
  onColorsChange: (colors: ColorImage[]) => void;
}

export function ColorImageSelector({ language, colors, onColorsChange }: ColorImageSelectorProps) {
  const [showAddColor, setShowAddColor] = useState(false);
  const [newColorName, setNewColorName] = useState('');
  const [newColorNameAr, setNewColorNameAr] = useState('');
  const [newColorImage, setNewColorImage] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const colorImageInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const t = {
    ar: {
      selectColors: 'اختر الألوان المتوفرة',
      addColor: 'إضافة لون',
      colorName: 'اسم اللون (إنجليزي)',
      colorNameAr: 'اسم اللون (عربي)',
      uploadImage: 'رفع صورة اللون',
      noColors: 'لم يتم إضافة ألوان بعد',
      clickToAdd: 'انقر لإضافة لون',
      cancel: 'إلغاء',
      add: 'إضافة',
      remove: 'حذف',
      colorsAdded: 'لون مضاف'
    },
    en: {
      selectColors: 'Select Available Colors',
      addColor: 'Add Color',
      colorName: 'Color Name (English)',
      colorNameAr: 'Color Name (Arabic)',
      uploadImage: 'Upload Color Image',
      noColors: 'No colors added yet',
      clickToAdd: 'Click to add a color',
      cancel: 'Cancel',
      add: 'Add',
      remove: 'Remove',
      colorsAdded: 'colors added'
    }
  };

  const handleAddColor = () => {
    if (!newColorName.trim() || !newColorNameAr.trim()) return;

    const newColor: ColorImage = {
      id: Date.now().toString(),
      colorName: newColorName.trim(),
      colorNameAr: newColorNameAr.trim(),
      imageUrl: newColorImage // Save the uploaded image
    };

    onColorsChange([...colors, newColor]);
    
    // Clear form fields after adding
    setNewColorName('');
    setNewColorNameAr('');
    setNewColorImage('');
    
    // Keep the form open for adding more colors
    // setShowAddColor(false); // Commented out to keep form open
  };

  const handleRemoveColor = (id: string) => {
    onColorsChange(colors.filter(c => c.id !== id));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewColorImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleColorImageChange = (colorId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const updatedColors = colors.map(color =>
          color.id === colorId ? { ...color, imageUrl: reader.result as string } : color
        );
        onColorsChange(updatedColors);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="block text-sm text-gray-700">
          {t[language].selectColors}
          {colors.length > 0 && (
            <span className="ml-2 px-2 py-0.5 bg-purple-100 text-purple-700 rounded-full text-xs">
              {colors.length}
            </span>
          )}
        </label>
        <button
          type="button"
          onClick={() => setShowAddColor(!showAddColor)}
          className="text-xs px-3 py-1 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:shadow-md transition-all"
        >
          {t[language].addColor}
        </button>
      </div>

      {/* Add Color Form */}
      {showAddColor && (
        <div className="p-4 bg-purple-50/50 rounded-xl border border-purple-200 space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-gray-600 mb-2">
                {t[language].colorName}
              </label>
              <input
                type="text"
                value={newColorName}
                onChange={(e) => setNewColorName(e.target.value)}
                placeholder="Red"
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400 transition-all"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-2">
                {t[language].colorNameAr}
              </label>
              <input
                type="text"
                value={newColorNameAr}
                onChange={(e) => setNewColorNameAr(e.target.value)}
                placeholder="أحمر"
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400 transition-all"
                dir="rtl"
              />
            </div>
          </div>

          {/* Image Upload Area */}
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="relative border-2 border-dashed border-purple-300 rounded-lg overflow-hidden text-center hover:border-purple-400 transition-colors cursor-pointer bg-white/50"
          >
            {newColorImage ? (
              <div className="relative aspect-video">
                <img src={newColorImage} alt="Preview" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setNewColorImage('');
                  }}
                  className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center shadow-md hover:bg-red-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="p-4">
                <Upload className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                <p className="text-xs text-gray-600">{t[language].uploadImage}</p>
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleAddColor}
              disabled={!newColorName.trim() || !newColorNameAr.trim() || !newColorImage}
              className="flex-1 px-3 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:shadow-md transition-all text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {t[language].add}
            </button>
            <button
              type="button"
              onClick={() => {
                setShowAddColor(false);
                setNewColorName('');
                setNewColorNameAr('');
                setNewColorImage('');
              }}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all text-sm"
            >
              {t[language].cancel}
            </button>
          </div>
        </div>
      )}

      {/* Color List */}
      {colors.length === 0 ? (
        <div className="p-6 bg-gray-50 rounded-xl border border-gray-200 text-center">
          <p className="text-sm text-gray-400">{t[language].noColors}</p>
          <p className="text-xs text-gray-400 mt-1">{t[language].clickToAdd}</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {colors.map(color => (
            <div
              key={color.id}
              className="relative group bg-white rounded-lg border-2 border-gray-200 p-3 hover:border-purple-300 transition-all"
            >
              <div 
                onClick={() => colorImageInputRefs.current[color.id]?.click()}
                className="aspect-square bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg mb-2 flex items-center justify-center overflow-hidden cursor-pointer relative group/img"
              >
                {color.imageUrl ? (
                  <>
                    <img src={color.imageUrl} alt={color.colorName} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                      <Upload className="w-6 h-6 text-white" />
                    </div>
                  </>
                ) : (
                  <Upload className="w-8 h-8 text-purple-300" />
                )}
                <input
                  type="file"
                  accept="image/*"
                  ref={(el) => colorImageInputRefs.current[color.id] = el}
                  onChange={(e) => handleColorImageChange(color.id, e)}
                  className="hidden"
                />
              </div>
              <p className="text-xs text-gray-700 text-center truncate">
                {language === 'ar' ? color.colorNameAr : color.colorName}
              </p>
              <button
                type="button"
                onClick={() => handleRemoveColor(color.id)}
                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-md flex items-center justify-center z-10"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}