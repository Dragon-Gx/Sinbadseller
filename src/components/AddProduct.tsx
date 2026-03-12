import { useState, useMemo, useRef, useEffect } from 'react';
import { ArrowRight, Search, Upload, X, Plus } from 'lucide-react';
import type { Language, Product } from '../App';
import { FashionAttributes } from './FashionAttributes';
import { InventoryMethodSelector, type InventoryMethod } from './product/InventoryMethodSelector';
import { SellingTypeSelector, type SellingType } from './product/SellingTypeSelector';

interface AddProductProps {
  language: Language;
  onBack: () => void;
  onAddProduct: (product: Product) => void;
  editingProduct?: Product | null;
}

interface Category {
  id: string;
  nameEn: string;
  nameAr: string;
  subcategories: Subcategory[];
}

interface Subcategory {
  id: string;
  nameEn: string;
  nameAr: string;
}

const categories: Category[] = [
  {
    id: 'fashion',
    nameEn: 'Fashion & Apparel',
    nameAr: 'أزياء وملابس',
    subcategories: [
      { id: 'mens-clothing', nameEn: "Men's Clothing", nameAr: 'ملابس رجالية' },
      { id: 'womens-clothing', nameEn: "Women's Clothing", nameAr: 'ملابس نسائية' },
      { id: 'kids-baby-clothing', nameEn: 'Kids & Baby Clothing', nameAr: 'ملابس أطفال ورضع' },
      { id: 'sportswear', nameEn: 'Sportswear', nameAr: 'ملابس رياضية' },
      { id: 'underwear-lingerie', nameEn: 'Underwear & Lingerie', nameAr: 'ملابس داخلية' },
      { id: 'socks-hosiery', nameEn: 'Socks & Hosiery', nameAr: 'جوارب' },
      { id: 'sleepwear-homewear', nameEn: 'Sleepwear & Homewear', nameAr: 'ملابس نوم ومنزلية' },
      { id: 'abayas-traditional', nameEn: 'Abayas & Traditional Wear', nameAr: 'عبايات وملابس تقليدية' },
      { id: 'shoes-sandals', nameEn: 'Shoes & Sandals', nameAr: 'أحذية وصنادل' },
      { id: 'bags-backpacks', nameEn: 'Bags & Backpacks', nameAr: 'حقائب وشنط' },
      { id: 'caps-hats', nameEn: 'Caps & Hats', nameAr: 'قبعات' },
      { id: 'scarves-gloves', nameEn: 'Scarves, Gloves & Accessories', nameAr: 'أوشحة وقفازات وإكسسوارات' }
    ]
  },
  {
    id: 'electrical-appliances',
    nameEn: 'Electronics & Home Appliances',
    nameAr: 'أجهزة كهربائية ومنزلية',
    subcategories: [
      { id: 'blenders', nameEn: 'Blenders', nameAr: 'خلاطات' },
      { id: 'food-processors', nameEn: 'Food Processors', nameAr: 'محضرات الطعام' },
      { id: 'ovens', nameEn: 'Ovens', nameAr: 'أفران' },
      { id: 'microwaves', nameEn: 'Microwaves', nameAr: 'مايكروويف' },
      { id: 'air-fryers', nameEn: 'Air Fryers', nameAr: 'قلايات هوائية' },
      { id: 'electric-kettles', nameEn: 'Electric Kettles', nameAr: 'غلايات كهربائية' },
      { id: 'coffee-machines', nameEn: 'Coffee Machines', nameAr: 'ماكينات قهوة' },
      { id: 'toasters', nameEn: 'Toasters', nameAr: 'محمصات خبز' },
      { id: 'mixers', nameEn: 'Mixers', nameAr: 'عجانات' },
      { id: 'rice-cookers', nameEn: 'Rice Cookers', nameAr: 'طباخات أرز' },
      { id: 'juicers', nameEn: 'Juicers', nameAr: 'عصارات' },
      { id: 'steam-irons', nameEn: 'Steam Irons', nameAr: 'مكاوي بخار' },
      { id: 'heaters', nameEn: 'Heaters', nameAr: 'مدافئ' },
      { id: 'fans', nameEn: 'Fans', nameAr: 'مراوح' },
      { id: 'electric-cookers', nameEn: 'Electric Cookers', nameAr: 'طباخات كهربائية' },
      { id: 'vacuum-cleaners', nameEn: 'Vacuum Cleaners', nameAr: 'مكانس كهربائية' },
      { id: 'water-dispensers', nameEn: 'Water Dispensers', nameAr: 'مبردات مياه' },
      { id: 'hair-dryers', nameEn: 'Hair Dryers', nameAr: 'مجففات شعر' },
      { id: 'shavers-trimmers', nameEn: 'Shavers & Trimmers', nameAr: 'ماكينات حلاقة وتشذيب' }
    ]
  },
  {
    id: 'home-kitchen',
    nameEn: 'Home & Kitchen',
    nameAr: 'منزل ومطبخ',
    subcategories: [
      { id: 'kitchen-tools', nameEn: 'Kitchen Tools & Utensils', nameAr: 'أدوات المطبخ' },
      { id: 'cookware-pots', nameEn: 'Cookware & Pots', nameAr: 'أواني الطبخ والقدور' },
      { id: 'plates-dining', nameEn: 'Plates & Dining Sets', nameAr: 'أطباق وأطقم طعام' },
      { id: 'storage-organizers', nameEn: 'Storage & Organizers', nameAr: 'تخزين ومنظمات' },
      { id: 'home-decor', nameEn: 'Home Décor', nameAr: 'ديكور منزلي' },
      { id: 'curtains-carpets', nameEn: 'Curtains & Carpets', nameAr: 'ستائر وسجاد' },
      { id: 'bedding-blankets', nameEn: 'Bedding & Blankets & Pillows', nameAr: 'مفروشات وبطانيات ووسائد' },
      { id: 'cleaning-supplies', nameEn: 'Cleaning Supplies', nameAr: 'مستلزمات تنظيف' },
      { id: 'bathroom-accessories', nameEn: 'Bathroom Accessories', nameAr: 'إكسسوارات الحمام' }
    ]
  },
  {
    id: 'electronics',
    nameEn: 'Electronics',
    nameAr: 'إلكترونيات',
    subcategories: [
      { id: 'tvs-screens', nameEn: 'TVs & Screens', nameAr: 'تلفزيونات وشاشات' },
      { id: 'audio-headphones', nameEn: 'Audio & Headphones', nameAr: 'سماعات وصوتيات' },
      { id: 'cameras-accessories', nameEn: 'Cameras & Accessories', nameAr: 'كاميرات وملحقاتها' },
      { id: 'smart-home', nameEn: 'Smart Home Devices', nameAr: 'أجهزة المنزل الذكي' },
      { id: 'power-banks-chargers', nameEn: 'Power Banks & Chargers', nameAr: 'بطاريات محمولة وشواحن' },
      { id: 'cables-adapters', nameEn: 'Cables & Adapters', nameAr: 'كابلات ومحولات' }
    ]
  },
  {
    id: 'mobiles',
    nameEn: 'Mobiles & Accessories',
    nameAr: 'موبايلات وملحقات',
    subcategories: [
      { id: 'smartphones', nameEn: 'Smartphones', nameAr: 'هواتف ذكية' },
      { id: 'feature-phones', nameEn: 'Feature Phones', nameAr: 'هواتف عادية' },
      { id: 'phone-cases', nameEn: 'Phone Cases & Covers', nameAr: 'جرابات وأغطية' },
      { id: 'screen-protectors', nameEn: 'Screen Protectors', nameAr: 'واقيات شاشة' },
      { id: 'phone-chargers', nameEn: 'Chargers & Cables', nameAr: 'شواحن وكابلات' },
      { id: 'earphones-bluetooth', nameEn: 'Earphones & Bluetooth Headsets', nameAr: 'سماعات أذن وبلوتوث' }
    ]
  },
  {
    id: 'computers-gaming',
    nameEn: 'Computers & Gaming',
    nameAr: 'كمبيوتر وألعاب',
    subcategories: [
      { id: 'laptops', nameEn: 'Laptops', nameAr: 'لابتوبات' },
      { id: 'desktop-pcs', nameEn: 'Desktop PCs', nameAr: 'كمبيوتر مكتبي' },
      { id: 'pc-components', nameEn: 'PC Components', nameAr: 'قطع كمبيوتر' },
      { id: 'keyboards-mice', nameEn: 'Keyboards & Mice', nameAr: 'لوحات مفاتيح وفا' },
      { id: 'monitors', nameEn: 'Monitors', nameAr: 'شاشات كمبيوتر' },
      { id: 'gaming-consoles', nameEn: 'Gaming Consoles', nameAr: 'أجهزة ألعاب' },
      { id: 'gaming-accessories', nameEn: 'Gaming Accessories', nameAr: 'ملحقات ألعاب' }
    ]
  },
  {
    id: 'automotive',
    nameEn: 'Automotive & Tools',
    nameAr: 'سيارات وأدوات',
    subcategories: [
      { id: 'car-care', nameEn: 'Car Care & Cleaning', nameAr: 'عناية وتنظيف السيارات' },
      { id: 'car-interior', nameEn: 'Car Interior Accessories', nameAr: 'إكسسوارات داخلية للسيارة' },
      { id: 'car-exterior', nameEn: 'Car Exterior Accessories', nameAr: 'إكسسوارات خارجية للسيارة' },
      { id: 'engine-oils', nameEn: 'Engine Oils & Fluids', nameAr: 'زيوت محركات وسوائل' },
      { id: 'car-electronics', nameEn: 'Car Electronics', nameAr: 'إلكترونيات السيارات' },
      { id: 'tools-repair', nameEn: 'Tools & Repair Kits', nameAr: 'أدوات وعدة إصلاح' }
    ]
  },
  {
    id: 'health-beauty',
    nameEn: 'Health & Beauty',
    nameAr: 'صحة وجمال',
    subcategories: [
      { id: 'skincare', nameEn: 'Skincare', nameAr: 'عناية بالبشرة' },
      { id: 'haircare', nameEn: 'Haircare', nameAr: 'عناية بالشعر' },
      { id: 'makeup', nameEn: 'Makeup', nameAr: 'مكياج' },
      { id: 'fragrances', nameEn: 'Fragrances', nameAr: 'عطور' },
      { id: 'personal-hygiene', nameEn: 'Personal Hygiene', nameAr: 'نظافة شخصية' },
      { id: 'healthcare-devices', nameEn: 'Healthcare Devices', nameAr: 'أجهزة صحية' }
    ]
  },
  {
    id: 'groceries',
    nameEn: 'Groceries & Food',
    nameAr: 'بقالة ومواد غذائية',
    subcategories: [
      { id: 'rice-grains', nameEn: 'Rice & Grains', nameAr: 'أرز وحبوب' },
      { id: 'pasta-noodles', nameEn: 'Pasta & Noodles', nameAr: 'معكرونة ونودلز' },
      { id: 'canned-food', nameEn: 'Canned Food', nameAr: 'معلبات' },
      { id: 'spices-condiments', nameEn: 'Spices & Condiments', nameAr: 'بهارا وتوابل' },
      { id: 'snacks-chips', nameEn: 'Snacks & Chips', nameAr: 'وجبات خفيفة وشيبس' },
      { id: 'sweets-chocolate', nameEn: 'Sweets & Chocolate', nameAr: 'حلويات وشوكولاتة' },
      { id: 'beverages-juices', nameEn: 'Beverages & Juices', nameAr: 'مشروبات وعصائر' },
      { id: 'tea-coffee', nameEn: 'Tea & Coffee', nameAr: 'شاي وقهوة' }
    ]
  },
  {
    id: 'baby-kids',
    nameEn: 'Baby & Kids',
    nameAr: 'أطفال ورضع',
    subcategories: [
      { id: 'baby-clothing', nameEn: 'Baby Clothing', nameAr: 'ملابس رضع' },
      { id: 'diapers-wipes', nameEn: 'Diapers & Wipes', nameAr: 'حفاضات ومناديل' },
      { id: 'feeding-bottles', nameEn: 'Feeding Bottles & Accessories', nameAr: 'رضاعات وملحقاتها' },
      { id: 'toys-babies', nameEn: 'Toys for Babies', nameAr: 'ألعاب للرضع' },
      { id: 'toys-kids', nameEn: 'Toys for Kids', nameAr: 'ألعاب للأطفال' },
      { id: 'school-supplies', nameEn: 'School Supplies for Kids', nameAr: 'مستلزمات مدرسية' }
    ]
  },
  {
    id: 'sports-outdoors',
    nameEn: 'Sports & Outdoors',
    nameAr: 'رياضة وأنشطة خارجية',
    subcategories: [
      { id: 'sports-clothing', nameEn: 'Sports Clothing', nameAr: 'ملابس رياضية' },
      { id: 'shoes-trainers', nameEn: 'Shoes & Trainers', nameAr: 'أحذية رياضية' },
      { id: 'fitness-equipment', nameEn: 'Fitness Equipment', nameAr: 'معدات لياقة بدنية' },
      { id: 'camping-outdoor', nameEn: 'Camping & Outdoor Gear', nameAr: 'معدات تخييم' },
      { id: 'balls-sports', nameEn: 'Balls & Sports Accessories', nameAr: 'كرات وملحقت رياضية' }
    ]
  },
  {
    id: 'office-stationery',
    nameEn: 'Office & Stationery',
    nameAr: 'مكتب وقرطاسية',
    subcategories: [
      { id: 'notebooks-papers', nameEn: 'Notebooks & Papers', nameAr: 'دفاتر وأوراق' },
      { id: 'pens-writing', nameEn: 'Pens & Writing Tools', nameAr: 'أقلام وأدوات كتابة' },
      { id: 'office-accessories', nameEn: 'Office Accessories', nameAr: 'إكسسوارات مكتبية' },
      { id: 'printers-ink', nameEn: 'Printers & Ink', nameAr: 'طابعات وحبر' },
      { id: 'office-furniture', nameEn: 'Office Furniture', nameAr: 'أثاث مكتبي' }
    ]
  },
  {
    id: 'pets',
    nameEn: 'Pets Supplies',
    nameAr: 'مستلزمات حيوانات أليفة',
    subcategories: [
      { id: 'pet-food', nameEn: 'Pet Food', nameAr: 'طعام حيوانات' },
      { id: 'pet-accessories', nameEn: 'Pet Accessories', nameAr: 'إكسسوارات حيوانات' },
      { id: 'pet-hygiene', nameEn: 'Pet Hygiene & Care', nameAr: 'نظافة وعناية بالحيوانات' }
    ]
  },
  {
    id: 'construction',
    nameEn: 'Construction & Industrial',
    nameAr: 'بناء وصناعة',
    subcategories: [
      { id: 'hand-tools', nameEn: 'Hand Tools', nameAr: 'أدوات يدوية' },
      { id: 'power-tools', nameEn: 'Power Tools', nameAr: 'أدوات كهربائية' },
      { id: 'safety-equipment', nameEn: 'Safety Equipment', nameAr: 'معدات سلامة' },
      { id: 'electrical-supplies', nameEn: 'Electrical Supplies', nameAr: 'مستلزمات كهربائية' },
      { id: 'plumbing-supplies', nameEn: 'Plumbing Supplies', nameAr: 'مستلزمات سباكة' }
    ]
  },
  {
    id: 'agriculture',
    nameEn: 'Agriculture & Garden',
    nameAr: 'زراعة وحدائق',
    subcategories: [
      { id: 'seeds-fertilizers', nameEn: 'Seeds & Fertilizers', nameAr: 'بذور وأسمدة' },
      { id: 'gardening-tools', nameEn: 'Gardening Tools', nameAr: 'أدوات زراعة' },
      { id: 'plant-pots', nameEn: 'Plant Pots & Accessories', nameAr: 'أصص نباتات وملحقات' },
      { id: 'irrigation-hoses', nameEn: 'Irrigation & Hoses', nameAr: 'ري وخراطيم' }
    ]
  },
  {
    id: 'medical-health',
    nameEn: 'Medical Supplies & Health Equipment',
    nameAr: 'مستلزمات طبية ومعدات صحية',
    subcategories: [
      { id: 'medicines', nameEn: 'Medicines (non-prescription)', nameAr: 'أدوية (بدون وصفة)' },
      { id: 'vitamins-supplements', nameEn: 'Vitamins & Supplements', nameAr: 'فيتامينات ومكملات' },
      { id: 'first-aid', nameEn: 'First Aid Items', nameAr: 'مستلزمات إسعافات أولية' },
      { id: 'bandages-gauze', nameEn: 'Bandages & Gauze', nameAr: 'ضمادات وشاش' },
      { id: 'medical-gloves', nameEn: 'Medical Gloves', nameAr: 'فازات طبية' },
      { id: 'masks', nameEn: 'Masks', nameAr: 'كمامات' },
      { id: 'thermometers', nameEn: 'Thermometers', nameAr: 'موازين حرارة' },
      { id: 'blood-pressure-monitors', nameEn: 'Blood Pressure Monitors', nameAr: 'أجهزة قياس ضغط الدم' },
      { id: 'nebulizers', nameEn: 'Nebulizers', nameAr: 'أجهزة بخار' },
      { id: 'diabetes-supplies', nameEn: 'Diabetes Supplies', nameAr: 'مستلزمات السكري' },
      { id: 'crutches', nameEn: 'Crutches', nameAr: 'عكاكيز' },
      { id: 'wheelchairs', nameEn: 'Wheelchairs', nameAr: 'كراسي متحركة' },
      { id: 'hot-cold-packs', nameEn: 'Hot/Cold Packs', nameAr: 'كمادات ساخنة/باردة' },
      { id: 'medical-tools', nameEn: 'Medical Tools & Small Equipment', nameAr: 'أدوات طبية ومعدات صغيرة' }
    ]
  }
];

export function AddProduct({ language, onBack, onAddProduct, editingProduct }: AddProductProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [productName, setProductName] = useState('');
  const [productNameAr, setProductNameAr] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [description, setDescription] = useState('');
  const [descriptionAr, setDescriptionAr] = useState('');
  const [customSubcategories, setCustomSubcategories] = useState<Record<string, Subcategory[]>>({});
  const [showAddSubcategoryModal, setShowAddSubcategoryModal] = useState(false);
  const [newSubcategoryNameEn, setNewSubcategoryNameEn] = useState('');
  const [newSubcategoryNameAr, setNewSubcategoryNameAr] = useState('');
  
  // Inventory Management States
  const [inventoryMethod, setInventoryMethod] = useState<InventoryMethod>('manual');
  const [sku, setSku] = useState('');
  const [manualQuantity, setManualQuantity] = useState('');
  
  // Selling Type States
  const [sellingType, setSellingType] = useState<SellingType>('retail');
  const [retailPrice, setRetailPrice] = useState('');
  const [wholesalePrice, setWholesalePrice] = useState('');

  // Product Images States
  const [productImages, setProductImages] = useState<string[]>([]);
  const productImagesInputRef = useRef<HTMLInputElement>(null);

  const t = {
    ar: {
      addProduct: 'إضافة منتج جديد',
      back: 'رجوع',
      categoryType: 'الفئة والنوع',
      searchCategory: 'بحث عن فئة...',
      mainCategory: 'الفئة الرئيسية',
      subcategory: 'الفئة الفرعية',
      selectMainCategory: 'اختر الفئة الرئيسية',
      selectSubcategory: 'اختر الفئة الفرعية',
      addSubcategory: 'إضافة فئة رعية',
      addSubcategoryTitle: 'إضافة فئة فرعية جديدة',
      subcategoryNameEn: 'اسم الفئة الفرعية (إنجليزي)',
      subcategoryNameAr: 'اسم الفئة الفرعية (عربي)',
      add: 'إضافة',
      close: 'إغلاق',
      productInfo: 'معلومات المنتج',
      productNameEn: 'اسم المنتج (إنجليزي)',
      productNameAr: 'اسم المنتج (عربي)',
      price: 'السعر',
      currency: 'د.ع',
      stock: 'الكمية المتوفرة',
      pieces: 'قطعة',
      description: 'وصف المنتج',
      descriptionEn: 'الوصف (إنجليزي)',
      descriptionAr: 'الوصف (عربي)',
      images: 'صور المنتج',
      uploadImages: 'رفع صور',
      dragDrop: 'اسحب الصور هنا أو انقر للاختيار',
      maxImages: 'حتى 5 صور',
      saveProduct: 'حفظ المنتج',
      cancel: 'إلغاء',
      validationError: 'خطأ في التحقق',
      fillRequired: 'الرجاء ملء جميع الحقول المطلوبة',
      categoryRequired: 'الرجاء اختيار الفئة والفئة الفرعية',
      nameRequired: 'الرجاء إدخال اسم المنتج',
      priceRequired: 'الرجاء إدخال السعر',
      inventoryRequired: 'الرجاء إدخال معلومات المخزون',
      imagesRequired: 'الرجاء رفع صورة واحدة على الأقل',
      productSaved: 'تم حفظ المنتج بنجاح!',
      saving: 'جاري الحفظ...'
    },
    en: {
      addProduct: 'Add New Product',
      back: 'Back',
      categoryType: 'Category & Type',
      searchCategory: 'Search category...',
      mainCategory: 'Main Category',
      subcategory: 'Subcategory',
      selectMainCategory: 'Select main category',
      selectSubcategory: 'Select subcategory',
      addSubcategory: 'Add Subcategory',
      addSubcategoryTitle: 'Add New Subcategory',
      subcategoryNameEn: 'Subcategory Name (English)',
      subcategoryNameAr: 'Subcategory Name (Arabic)',
      add: 'Add',
      close: 'Close',
      productInfo: 'Product Information',
      productNameEn: 'Product Name (English)',
      productNameAr: 'Product Name (Arabic)',
      price: 'Price',
      currency: 'IQD',
      stock: 'Stock Quantity',
      pieces: 'pieces',
      description: 'Product Description',
      descriptionEn: 'Description (English)',
      descriptionAr: 'Description (Arabic)',
      images: 'Product Images',
      uploadImages: 'Upload Images',
      dragDrop: 'Drag images here or click to select',
      maxImages: 'Up to 5 images',
      saveProduct: 'Save Product',
      cancel: 'Cancel',
      validationError: 'Validation Error',
      fillRequired: 'Please fill all required fields',
      categoryRequired: 'Please select category and subcategory',
      nameRequired: 'Please enter product name',
      priceRequired: 'Please enter price',
      inventoryRequired: 'Please enter inventory information',
      imagesRequired: 'Please upload at least one image',
      productSaved: 'Product saved successfully!',
      saving: 'Saving...'
    }
  };

  // Pre-fill form when editing a product
  useEffect(() => {
    if (editingProduct) {
      // Pre-fill category and subcategory
      setSelectedCategory(editingProduct.category || '');
      setSelectedSubcategory(editingProduct.subcategory || '');
      
      // Pre-fill product info
      setProductName(editingProduct.name || '');
      setProductNameAr(editingProduct.nameAr || '');
      setDescription(editingProduct.description || '');
      setDescriptionAr(editingProduct.descriptionAr || '');
      
      // Pre-fill inventory
      if (editingProduct.inventoryMethod) {
        setInventoryMethod(editingProduct.inventoryMethod);
      }
      setSku(editingProduct.sku || '');
      setManualQuantity(editingProduct.stock?.toString() || '');
      
      // Pre-fill selling type and prices
      if (editingProduct.sellingType) {
        setSellingType(editingProduct.sellingType);
      }
      setRetailPrice(editingProduct.retailPrice || '');
      setWholesalePrice(editingProduct.wholesalePrice || '');
      
      // Pre-fill images
      if (editingProduct.images && editingProduct.images.length > 0) {
        setProductImages(editingProduct.images);
      } else if (editingProduct.image) {
        setProductImages([editingProduct.image]);
      }
    }
  }, [editingProduct]);

  // Search suggestions
  const suggestions = useMemo(() => {
    if (!searchQuery.trim()) return [];
    
    const query = searchQuery.toLowerCase();
    const results: Array<{ category: Category; subcategory: Subcategory }> = [];
    
    categories.forEach(category => {
      category.subcategories.forEach(subcategory => {
        const categoryNameEn = category.nameEn.toLowerCase();
        const categoryNameAr = category.nameAr.toLowerCase();
        const subcategoryNameEn = subcategory.nameEn.toLowerCase();
        const subcategoryNameAr = subcategory.nameAr.toLowerCase();
        
        if (
          categoryNameEn.includes(query) ||
          categoryNameAr.includes(query) ||
          subcategoryNameEn.includes(query) ||
          subcategoryNameAr.includes(query)
        ) {
          results.push({ category, subcategory });
        }
      });
    });
    
    return results.slice(0, 8);
  }, [searchQuery]);

  const handleSuggestionClick = (category: Category, subcategory: Subcategory) => {
    setSelectedCategory(category.id);
    setSelectedSubcategory(subcategory.id);
    setSearchQuery('');
    setShowSuggestions(false);
  };

  const selectedCategoryData = categories.find(c => c.id === selectedCategory);
  const subcategories = selectedCategoryData?.subcategories || [];
  const allSubcategories = [
    ...subcategories,
    ...(customSubcategories[selectedCategory] || [])
  ];

  const isFashionCategory = selectedCategory === 'fashion';

  const handleAddCustomSubcategory = () => {
    if (!newSubcategoryNameEn.trim() || !newSubcategoryNameAr.trim() || !selectedCategory) return;

    const newSubcategory: Subcategory = {
      id: `custom-${Date.now()}`,
      nameEn: newSubcategoryNameEn.trim(),
      nameAr: newSubcategoryNameAr.trim()
    };

    setCustomSubcategories(prev => ({
      ...prev,
      [selectedCategory]: [...(prev[selectedCategory] || []), newSubcategory]
    }));

    setSelectedSubcategory(newSubcategory.id);
    setNewSubcategoryNameEn('');
    setNewSubcategoryNameAr('');
    setShowAddSubcategoryModal(false);
  };

  const handleProductImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newImages: string[] = [];
    const maxImages = 5;
    const remainingSlots = maxImages - productImages.length;
    const filesToProcess = Math.min(files.length, remainingSlots);

    let processed = 0;
    for (let i = 0; i < filesToProcess; i++) {
      const file = files[i];
      const reader = new FileReader();
      reader.onloadend = () => {
        newImages.push(reader.result as string);
        processed++;
        if (processed === filesToProcess) {
          setProductImages(prev => [...prev, ...newImages]);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveProductImage = (index: number) => {
    setProductImages(prev => prev.filter((_, i) => i !== index));
  };

  const validateProduct = (): string | null => {
    // Check category and subcategory
    if (!selectedCategory || !selectedSubcategory) {
      return t[language].categoryRequired;
    }

    // Check product name (for non-fashion items)
    if (!isFashionCategory) {
      if (!productName.trim() || !productNameAr.trim()) {
        return t[language].nameRequired;
      }
    }

    // Check inventory
    if (inventoryMethod === 'pos' && !sku.trim()) {
      return t[language].inventoryRequired;
    }
    if (inventoryMethod === 'manual' && !manualQuantity.trim()) {
      return t[language].inventoryRequired;
    }

    // Check price
    if (sellingType === 'retail' && !retailPrice.trim()) {
      return t[language].priceRequired;
    }
    if (sellingType === 'wholesale' && !wholesalePrice.trim()) {
      return t[language].priceRequired;
    }
    if (sellingType === 'both' && (!retailPrice.trim() || !wholesalePrice.trim())) {
      return t[language].priceRequired;
    }

    // Check images
    if (productImages.length === 0) {
      return t[language].imagesRequired;
    }

    return null;
  };

  const handleSaveProduct = () => {
    // Validate
    const validationError = validateProduct();
    if (validationError) {
      alert(validationError);
      return;
    }

    // Calculate price for display
    const displayPrice = sellingType === 'retail' || sellingType === 'both' 
      ? parseFloat(retailPrice) 
      : parseFloat(wholesalePrice);

    // Calculate stock
    const displayStock = inventoryMethod === 'manual' ? parseInt(manualQuantity) : 0;

    // Determine status
    const productStatus: 'active' | 'pending' | 'out-of-stock' = 
      displayStock === 0 ? 'out-of-stock' : 'active';

    // Collect product data formatted to match Product interface
    const newProduct: Product = {
      id: Date.now().toString(),
      name: productName || 'New Product',
      nameAr: productNameAr || 'منتج جديد',
      price: displayPrice,
      retailPrice: sellingType === 'retail' || sellingType === 'both' ? retailPrice : undefined,
      wholesalePrice: sellingType === 'wholesale' || sellingType === 'both' ? wholesalePrice : undefined,
      stock: displayStock,
      status: productStatus,
      image: productImages[0] || '', // First image as main image
      images: productImages,
      category: selectedCategory,
      subcategory: selectedSubcategory,
      isActive: true,
      description: description || undefined,
      descriptionAr: descriptionAr || undefined,
      inventoryMethod,
      sku: inventoryMethod === 'pos' ? sku : undefined,
      sellingType,
      createdAt: new Date().toISOString()
    };

    // Log product data (in real app, this would save to database)
    console.log('Product Saved:', newProduct);

    // Show success message
    alert(t[language].productSaved);

    // Add product to the list
    onAddProduct(newProduct);

    // Redirect back to products list
    onBack();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-teal-50 pb-8" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-purple-600 hover:text-purple-700 mb-4 transition-colors"
          >
            <ArrowRight className={`w-5 h-5 ${language === 'en' ? 'rotate-180' : ''}`} />
            <span className="text-sm">{t[language].back}</span>
          </button>
          <h1 className="text-gray-800 text-2xl">{t[language].addProduct}</h1>
        </div>

        {/* Category Selection Card */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-purple-100 mb-4">
          <h2 className="text-gray-800 text-lg mb-4">{t[language].categoryType}</h2>
          
          {/* Search Bar */}
          <div className="relative mb-4">
            <div className="relative">
              <Search className={`absolute top-3 ${language === 'ar' ? 'right-3' : 'left-3'} w-5 h-5 text-gray-400`} />
              <input
                type="text"
                placeholder={t[language].searchCategory}
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                className={`w-full ${language === 'ar' ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400 transition-all`}
              />
            </div>

            {/* Suggestions Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute z-10 w-full mt-2 bg-white rounded-xl shadow-lg border border-purple-100 max-h-80 overflow-y-auto">
                {suggestions.map((item, index) => (
                  <button
                    key={`${item.category.id}-${item.subcategory.id}-${index}`}
                    onClick={() => handleSuggestionClick(item.category, item.subcategory)}
                    className="w-full px-4 py-3 text-start hover:bg-purple-50 transition-colors border-b border-gray-100 last:border-b-0"
                  >
                    <div className="text-sm text-gray-800">
                      <span className="text-purple-600">
                        {language === 'ar' ? item.category.nameAr : item.category.nameEn}
                      </span>
                      <span className="mx-2 text-gray-400">→</span>
                      <span className="text-gray-600">
                        {language === 'ar' ? item.subcategory.nameAr : item.subcategory.nameEn}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Category Dropdowns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Main Category */}
            <div>
              <label className="block text-sm text-gray-600 mb-2">
                {t[language].mainCategory}
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setSelectedSubcategory('');
                }}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400 transition-all"
              >
                <option value="">{t[language].selectMainCategory}</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {language === 'ar' ? category.nameAr : category.nameEn}
                  </option>
                ))}
              </select>
            </div>

            {/* Subcategory */}
            <div>
              <label className="block text-sm text-gray-600 mb-2">
                {t[language].subcategory}
              </label>
              <select
                value={selectedSubcategory}
                onChange={(e) => setSelectedSubcategory(e.target.value)}
                disabled={!selectedCategory}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400 transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
              >
                <option value="">{t[language].selectSubcategory}</option>
                {allSubcategories.map(subcategory => (
                  <option key={subcategory.id} value={subcategory.id}>
                    {language === 'ar' ? subcategory.nameAr : subcategory.nameEn}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Add Subcategory Button */}
          {selectedCategory && (
            <div className="mt-4">
              <button
                onClick={() => setShowAddSubcategoryModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:shadow-md transition-all text-sm"
              >
                <Plus className="w-4 h-4" />
                {t[language].addSubcategory}
              </button>
            </div>
          )}
        </div>

        {/* Product Information Card - Only for non-fashion or as base info */}
        {!isFashionCategory && (
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
                    placeholder="Wireless Headphones"
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
                    placeholder="سماعات لاسلكية"
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400 transition-all"
                    dir="rtl"
                  />
                </div>
              </div>

              {/* Price and Stock */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-2">
                    {t[language].price}
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="25000"
                      className={`w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400 transition-all ${language === 'ar' ? 'pl-16' : 'pr-16'}`}
                    />
                    <span className={`absolute top-3 ${language === 'ar' ? 'left-4' : 'right-4'} text-gray-500`}>
                      {t[language].currency}
                    </span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-2">
                    {t[language].stock}
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={stock}
                      onChange={(e) => setStock(e.target.value)}
                      placeholder="100"
                      className={`w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400 transition-all ${language === 'ar' ? 'pl-16' : 'pr-16'}`}
                    />
                    <span className={`absolute top-3 ${language === 'ar' ? 'left-4' : 'right-4'} text-gray-500 text-sm`}>
                      {t[language].pieces}
                    </span>
                  </div>
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
        )}

        {/* Fashion Attributes - Only shown when Fashion category is selected */}
        {isFashionCategory && (
          <FashionAttributes language={language} />
        )}

        {/* Inventory Management Section - Universal for all categories */}
        <InventoryMethodSelector
          language={language}
          method={inventoryMethod}
          onMethodChange={setInventoryMethod}
          sku={sku}
          onSkuChange={setSku}
          quantity={manualQuantity}
          onQuantityChange={setManualQuantity}
        />

        {/* Selling Type Section - Universal for all categories */}
        <div className="mb-4">
          <SellingTypeSelector
            language={language}
            sellingType={sellingType}
            onSellingTypeChange={setSellingType}
            retailPrice={retailPrice}
            onRetailPriceChange={setRetailPrice}
            wholesalePrice={wholesalePrice}
            onWholesalePriceChange={setWholesalePrice}
          />
        </div>

        {/* Product Images Card */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-purple-100 mb-6">
          <h2 className="text-gray-800 text-lg mb-4">{t[language].images}</h2>
          
          {/* Upload Area */}
          <div 
            onClick={() => productImagesInputRef.current?.click()}
            className="border-2 border-dashed border-purple-200 rounded-xl p-8 text-center hover:border-purple-400 transition-colors cursor-pointer bg-purple-50/30 mb-4"
          >
            <Upload className="w-12 h-12 text-purple-400 mx-auto mb-3" />
            <p className="text-gray-700 mb-1">{t[language].dragDrop}</p>
            <p className="text-sm text-gray-500">{t[language].maxImages}</p>
            <input
              type="file"
              accept="image/*"
              multiple
              ref={productImagesInputRef}
              onChange={handleProductImagesChange}
              className="hidden"
            />
          </div>

          {/* Image Grid Preview */}
          {productImages.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {productImages.map((img, index) => (
                <div key={index} className="relative group aspect-square">
                  <img 
                    src={img} 
                    alt={`Product ${index + 1}`} 
                    className="w-full h-full object-cover rounded-lg border-2 border-gray-200"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveProductImage(index)}
                    className="absolute -top-2 -right-2 w-7 h-7 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-md flex items-center justify-center hover:bg-red-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            onClick={onBack}
            className="py-3 bg-white text-gray-700 rounded-xl border border-gray-200 hover:bg-gray-50 transition-all"
          >
            {t[language].cancel}
          </button>

          <button
            onClick={handleSaveProduct}
            className="py-3 bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 text-white rounded-xl hover:shadow-lg transition-all"
          >
            {t[language].saveProduct}
          </button>
        </div>
      </div>

      {/* Add Subcategory Modal */}
      {showAddSubcategoryModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl" dir={language === 'ar' ? 'rtl' : 'ltr'}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-800 text-lg">{t[language].addSubcategoryTitle}</h3>
              <button
                onClick={() => {
                  setShowAddSubcategoryModal(false);
                  setNewSubcategoryNameEn('');
                  setNewSubcategoryNameAr('');
                }}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-2">
                  {t[language].subcategoryNameEn}
                </label>
                <input
                  type="text"
                  value={newSubcategoryNameEn}
                  onChange={(e) => setNewSubcategoryNameEn(e.target.value)}
                  placeholder="Air Conditioners"
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-2">
                  {t[language].subcategoryNameAr}
                </label>
                <input
                  type="text"
                  value={newSubcategoryNameAr}
                  onChange={(e) => setNewSubcategoryNameAr(e.target.value)}
                  placeholder="مكيفات هواء"
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400 transition-all"
                  dir="rtl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => {
                    setShowAddSubcategoryModal(false);
                    setNewSubcategoryNameEn('');
                    setNewSubcategoryNameAr('');
                  }}
                  className="py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all"
                >
                  {t[language].close}
                </button>
                <button
                  onClick={handleAddCustomSubcategory}
                  disabled={!newSubcategoryNameEn.trim() || !newSubcategoryNameAr.trim()}
                  className="py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {t[language].add}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}