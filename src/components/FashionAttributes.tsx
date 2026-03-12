import { useState, useEffect } from 'react';
import type { Language } from '../App';
import { ShoeSizeSelector } from './fashion/ShoeSizeSelector';
import { ClothingSizeSelector } from './fashion/ClothingSizeSelector';
import { PantsSizeSelector } from './fashion/PantsSizeSelector';
import { KidsSizeSelector } from './fashion/KidsSizeSelector';
import { BagAttributes } from './fashion/BagAttributes';
import { ColorImageSelector } from './fashion/ColorImageSelector';
import { UniversalAttributes } from './fashion/UniversalAttributes';

/**
 * FashionAttributes Component - Dynamic Subcategory-Based Fields
 * 
 * This component implements a context-aware form that renders different fields
 * based on the selected fashion subcategory. Key behaviors:
 * 
 * 1. COMPLETE STATE RESET on subcategory change - prevents data contamination
 * 2. Dynamic component rendering based on product type:
 *    - Shoes: Numeric EU sizes (36-47) + Color images
 *    - Clothing (Men/Women/Sportswear/etc): Letter sizes (XS-XXXL) + Optional measurements + Colors
 *    - Pants: Waist sizes (28-44) + Optional length + Colors
 *    - Kids/Baby: Age-based sizes (Newborn, 0-3M, etc) + Colors
 *    - Bags/Accessories: No fixed sizes + Optional dimensions + Colors
 * 3. Universal product attributes (Brand, Country, Material, etc) - shown optionally
 * 4. Color selection via image upload - each color = one image
 * 5. Base product fields (Name, Description) - always visible
 * 6. Price and inventory are handled separately via InventoryMethodSelector and SellingTypeSelector
 * 
 * @param language - Current UI language (ar | en)
 * @param selectedSubcategory - Currently selected fashion subcategory (optional for future integration)
 */

interface FashionAttributesProps {
  language: Language;
  selectedSubcategory?: string;
}

interface ColorImage {
  id: string;
  colorName: string;
  colorNameAr: string;
  imageUrl: string;
}

export function FashionAttributes({ language, selectedSubcategory }: FashionAttributesProps) {
  const [fashionSubcategory, setFashionSubcategory] = useState('');
  
  // Size states - reset when subcategory changes
  const [shoeSizes, setShoeSizes] = useState<number[]>([]);
  const [clothingSizes, setClothingSizes] = useState<string[]>([]);
  const [pantsSizes, setPantsSizes] = useState<number[]>([]);
  const [kidsSizes, setKidsSizes] = useState<string[]>([]);
  
  // Color state - reset when subcategory changes
  const [colors, setColors] = useState<ColorImage[]>([]);

  // Base product fields - always visible for Fashion category
  const [productName, setProductName] = useState('');
  const [productNameAr, setProductNameAr] = useState('');
  const [description, setDescription] = useState('');
  const [descriptionAr, setDescriptionAr] = useState('');

  const t = {
    ar: {
      fashionAttributes: 'خصائص الأزياء',
      fashionType: 'نوع المنتج',
      selectFashionType: 'اختر نوع المنتج',
      mensClothing: 'ملابس رجالية',
      womensClothing: 'ملابس نسائية',
      kidsBabyClothing: 'ملابس أطفال ورضع',
      shoes: 'أحذية',
      bagsAccessories: 'حقائب وإكسسوارات',
      underwearLingerie: 'ملابس داخلية',
      sportswear: 'ملابس رياضية',
      sleepwearPajamas: 'ملابس نوم / بيجامات',
      traditionalAbaya: 'ملابس تقليدية وعبايات',
      workwearUniforms: 'ملابس عمل ويونيفورم',
      pants: 'بناطيل',
      availableSizes: 'المقاسات المتاحة',
      availableColors: 'الألوان المتاحة',
      productInfo: 'معلومات المنتج الأساسية',
      productNameEn: 'اسم المنتج (إنجليزي)',
      productNameAr: 'اسم المنتج (عربي)',
      price: 'السعر',
      currency: 'د.ع',
      stock: 'الكمية المتوفرة',
      pieces: 'قطعة',
      description: 'وصف المنتج',
      descriptionEn: 'الوصف (إنجليزي)',
      descriptionAr: 'الوصف (عربي)'
    },
    en: {
      fashionAttributes: 'Fashion Attributes',
      fashionType: 'Product Type',
      selectFashionType: 'Select Product Type',
      mensClothing: "Men's Clothing",
      womensClothing: "Women's Clothing",
      kidsBabyClothing: 'Kids & Baby Clothing',
      shoes: 'Shoes',
      bagsAccessories: 'Bags & Accessories',
      underwearLingerie: 'Underwear & Lingerie',
      sportswear: 'Sportswear',
      sleepwearPajamas: 'Sleepwear / Pajamas',
      traditionalAbaya: 'Traditional & Abaya',
      workwearUniforms: 'Workwear & Uniforms',
      pants: 'Pants / Trousers',
      availableSizes: 'Available Sizes',
      availableColors: 'Available Colors',
      productInfo: 'Basic Product Information',
      productNameEn: 'Product Name (English)',
      productNameAr: 'Product Name (Arabic)',
      price: 'Price',
      currency: 'IQD',
      stock: 'Stock Quantity',
      pieces: 'pieces',
      description: 'Product Description',
      descriptionEn: 'Description (English)',
      descriptionAr: 'Description (Arabic)'
    }
  };

  // Reset all size and color states when subcategory changes
  useEffect(() => {
    setShoeSizes([]);
    setClothingSizes([]);
    setPantsSizes([]);
    setKidsSizes([]);
    setColors([]);
  }, [fashionSubcategory]);

  // Determine which component to render based on subcategory
  const renderSizeSelector = () => {
    switch (fashionSubcategory) {
      case 'shoes':
        return (
          <ShoeSizeSelector
            language={language}
            selectedSizes={shoeSizes}
            onSizesChange={setShoeSizes}
          />
        );
      
      case 'mens-clothing':
      case 'womens-clothing':
      case 'sportswear':
      case 'underwear-lingerie':
      case 'sleepwear-pajamas':
      case 'traditional-abaya':
      case 'workwear-uniforms':
        return (
          <ClothingSizeSelector
            language={language}
            selectedSizes={clothingSizes}
            onSizesChange={setClothingSizes}
            showMeasurements={true}
          />
        );
      
      case 'pants':
        return (
          <PantsSizeSelector
            language={language}
            selectedSizes={pantsSizes}
            onSizesChange={setPantsSizes}
          />
        );
      
      case 'kids-baby-clothing':
        return (
          <KidsSizeSelector
            language={language}
            selectedSizes={kidsSizes}
            onSizesChange={setKidsSizes}
          />
        );
      
      case 'bags-accessories':
        return <BagAttributes language={language} />;
      
      default:
        return null;
    }
  };

  const showColorSelector = fashionSubcategory && fashionSubcategory !== '';

  return (
    <>
      {/* Base Product Information - Always visible for Fashion */}
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-purple-100 mb-4">
        <h2 className="text-gray-800 text-lg mb-4">{t[language].productInfo}</h2>
        
        <div className="space-y-4">
          {/* Product Names */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-2">
                {t[language].productNameEn}
              </label>
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="Cotton T-Shirt"
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-2">
                {t[language].productNameAr}
              </label>
              <input
                type="text"
                value={productNameAr}
                onChange={(e) => setProductNameAr(e.target.value)}
                placeholder="تيشيرت قطن"
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400 transition-all"
                dir="rtl"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm text-gray-600 mb-2">
              {t[language].description}
            </label>
            <div className="space-y-3">
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={t[language].descriptionEn}
                rows={3}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400 transition-all resize-none"
              />
              <textarea
                value={descriptionAr}
                onChange={(e) => setDescriptionAr(e.target.value)}
                placeholder={t[language].descriptionAr}
                rows={3}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400 transition-all resize-none"
                dir="rtl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Fashion-Specific Attributes */}
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-purple-100 mb-4">
        <h2 className="text-gray-800 text-lg mb-4">{t[language].fashionAttributes}</h2>
        
        <div className="space-y-6">
          {/* Fashion Subcategory Dropdown */}
          <div>
            <label className="block text-sm text-gray-600 mb-2">
              {t[language].fashionType}
            </label>
            <select
              value={fashionSubcategory}
              onChange={(e) => setFashionSubcategory(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400 transition-all"
            >
              <option value="">{t[language].selectFashionType}</option>
              <option value="mens-clothing">{t[language].mensClothing}</option>
              <option value="womens-clothing">{t[language].womensClothing}</option>
              <option value="kids-baby-clothing">{t[language].kidsBabyClothing}</option>
              <option value="shoes">{t[language].shoes}</option>
              <option value="pants">{t[language].pants}</option>
              <option value="bags-accessories">{t[language].bagsAccessories}</option>
              <option value="underwear-lingerie">{t[language].underwearLingerie}</option>
              <option value="sportswear">{t[language].sportswear}</option>
              <option value="sleepwear-pajamas">{t[language].sleepwearPajamas}</option>
              <option value="traditional-abaya">{t[language].traditionalAbaya}</option>
              <option value="workwear-uniforms">{t[language].workwearUniforms}</option>
            </select>
          </div>

          {/* Dynamic Size Selector */}
          {fashionSubcategory && (
            <div>
              <h3 className="text-sm text-gray-700 mb-3">{t[language].availableSizes}</h3>
              <div className="p-4 bg-gradient-to-br from-purple-50/50 to-blue-50/50 rounded-xl border border-purple-100">
                {renderSizeSelector()}
              </div>
            </div>
          )}

          {/* Color Selector - Only when subcategory is selected */}
          {showColorSelector && (
            <div>
              <h3 className="text-sm text-gray-700 mb-3">{t[language].availableColors}</h3>
              <div className="p-4 bg-gradient-to-br from-purple-50/50 to-blue-50/50 rounded-xl border border-purple-100">
                <ColorImageSelector
                  language={language}
                  colors={colors}
                  onColorsChange={setColors}
                />
              </div>
            </div>
          )}

          {/* Universal Attributes - Only when subcategory is selected */}
          {fashionSubcategory && (
            <UniversalAttributes language={language} />
          )}
        </div>
      </div>
    </>
  );
}