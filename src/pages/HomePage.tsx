import { useState } from 'react';
import { Link } from 'react-router';
import { Header } from '../components/Header';
import { QuickStats } from '../components/QuickStats';
import { AddProductBanner } from '../components/AddProductBanner';
import { SearchFilters } from '../components/SearchFilters';
import { ProductGrid } from '../components/ProductGrid';
import { SettingsPage } from '../components/SettingsPage';
import { AddProduct } from '../components/AddProduct';
import { ProductDetails } from '../components/ProductDetails';
import { ActiveProductsPage } from '../components/ActiveProductsPage';
import { OutOfStockProductsPage } from '../components/OutOfStockProductsPage';
import { SalesAnalyticsPage } from '../components/SalesAnalyticsPage';
import { Plus } from 'lucide-react';
import { NotificationsPanel } from '../components/NotificationsPanel';
import { Toaster } from '../components/ui/sonner';
import { toast } from 'sonner@2.0.3';
import type { Language, Product, StoreSettings } from '../App';

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Wireless Headphones',
    nameAr: 'سماعات لاسلكية',
    price: 299,
    stock: 45,
    status: 'active',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
    category: 'Electronics',
    isActive: true,
    sellingType: 'retail',
    description: 'High quality wireless headphones',
    descriptionAr: 'سماعات لاسلكية عالية الجودة',
    createdAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    name: 'Smart Watch',
    nameAr: 'ساعة ذكية',
    price: 599,
    stock: 12,
    status: 'active',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
    category: 'Electronics',
    isActive: true,
    sellingType: 'both',
    description: 'Latest smart watch with fitness tracking',
    descriptionAr: 'ساعة ذكية حديثة مع تتبع اللياقة',
    createdAt: '2024-01-14T10:00:00Z'
  },
  {
    id: '3',
    name: 'Leather Wallet',
    nameAr: 'محفظة جلدية',
    price: 149,
    stock: 25,
    status: 'active',
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&h=400&fit=crop',
    category: 'Accessories',
    isActive: true,
    sellingType: 'retail',
    description: 'Premium leather wallet',
    descriptionAr: 'محفظة جلدية فاخرة',
    createdAt: '2024-01-13T10:00:00Z'
  },
  {
    id: '4',
    name: 'Running Shoes',
    nameAr: 'أحذية رياضية',
    price: 399,
    stock: 28,
    status: 'active',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
    category: 'Fashion',
    isActive: true,
    sellingType: 'retail',
    description: 'Comfortable running shoes',
    descriptionAr: 'أحذية رياضية مريحة',
    createdAt: '2024-01-12T10:00:00Z'
  },
  {
    id: '5',
    name: 'Coffee Maker',
    nameAr: 'صانعة قهوة',
    price: 249,
    stock: 15,
    status: 'draft',
    image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400&h=400&fit=crop',
    category: 'Home',
    isActive: false,
    sellingType: 'wholesale',
    description: 'Automatic coffee maker',
    descriptionAr: 'صانعة قهوة أوتوماتيكية',
    createdAt: '2024-01-11T10:00:00Z',
    missingFields: []
  },
  {
    id: '6',
    name: 'Backpack',
    nameAr: 'حقيبة ظهر',
    price: 179,
    stock: 33,
    status: 'active',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop',
    category: 'Accessories',
    isActive: true,
    sellingType: 'both',
    description: 'Durable backpack for daily use',
    descriptionAr: 'حقيبة ظهر متينة للاستخدام اليومي',
    createdAt: '2024-01-10T10:00:00Z'
  },
  {
    id: '7',
    name: 'Sunglasses',
    nameAr: 'نظارات شمسية',
    price: 199,
    stock: 8,
    status: 'incomplete',
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop',
    category: 'Accessories',
    isActive: false,
    sellingType: 'retail',
    createdAt: '2024-01-09T10:00:00Z',
    missingFields: ['description', 'colors']
  },
  {
    id: '8',
    name: 'Desk Lamp',
    nameAr: 'مصباح مكتب',
    price: 129,
    stock: 20,
    status: 'active',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=400&fit=crop',
    category: 'Home',
    isActive: true,
    sellingType: 'wholesale',
    description: 'Modern desk lamp with adjustable brightness',
    descriptionAr: 'مصباح مكتب حديث مع سطوع قابل للتعديل',
    createdAt: '2024-01-08T10:00:00Z'
  },
  {
    id: '9',
    name: 'Bluetooth Speaker',
    nameAr: 'مكبر صوت بلوتوث',
    price: 189,
    stock: 25,
    status: 'draft',
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop',
    category: 'Electronics',
    isActive: false,
    sellingType: 'retail',
    description: 'Portable bluetooth speaker',
    descriptionAr: 'مكبر صوت بلوتوث محمول',
    createdAt: '2024-01-07T10:00:00Z',
    missingFields: []
  },
  {
    id: '10',
    name: 'Yoga Mat',
    nameAr: 'سجادة يوغا',
    price: 89,
    stock: 40,
    status: 'incomplete',
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&h=400&fit=crop',
    category: 'Sports',
    isActive: false,
    sellingType: 'retail',
    createdAt: '2024-01-06T10:00:00Z',
    missingFields: ['description', 'sizes', 'colors']
  },
  {
    id: '11',
    name: 'Gaming Mouse',
    nameAr: 'ماوس ألعاب',
    price: 159,
    stock: 0,
    status: 'active',
    image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&h=400&fit=crop',
    category: 'Electronics',
    isActive: true,
    sellingType: 'retail',
    description: 'RGB gaming mouse with programmable buttons',
    descriptionAr: 'ماوس ألعاب RGB مع أزرار قابلة للبرمجة',
    createdAt: '2024-01-05T10:00:00Z'
  },
  {
    id: '12',
    name: 'Cotton T-Shirt',
    nameAr: 'قميص قطني',
    price: 79,
    stock: 0,
    status: 'active',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
    category: 'Fashion',
    isActive: true,
    sellingType: 'retail',
    description: 'Comfortable cotton t-shirt',
    descriptionAr: 'قميص قطني مريح',
    createdAt: '2024-01-04T10:00:00Z'
  },
  {
    id: '13',
    name: 'Water Bottle',
    nameAr: 'زجاجة ماء',
    price: 49,
    stock: 0,
    status: 'active',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop',
    category: 'Sports',
    isActive: true,
    sellingType: 'wholesale',
    description: 'Insulated water bottle 500ml',
    descriptionAr: 'زجاجة ماء معزولة 500 مل',
    createdAt: '2024-01-03T10:00:00Z'
  }
];

export default function HomePage() {
  const [language, setLanguage] = useState<Language>('ar');
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'pending' | 'out-of-stock'>('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showActiveProducts, setShowActiveProducts] = useState(false);
  const [showOutOfStock, setShowOutOfStock] = useState(false);
  const [showSalesAnalytics, setShowSalesAnalytics] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [storeSettings, setStoreSettings] = useState<StoreSettings>({
    storeName: 'Sinbad Store',
    storeNameAr: 'متجر سندباد',
    logo: '',
    coverImage: '',
    category: '',
    city: ''
  });

  // Only show active and disabled products in main grid (exclude draft/incomplete)
  const filteredProducts = products.filter(product => {
    // Exclude draft and incomplete products from main view
    if (product.status === 'draft' || product.status === 'incomplete') {
      return false;
    }
    
    const nameToSearch = language === 'ar' ? product.nameAr : product.name;
    const matchesSearch = nameToSearch.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || product.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const stats = {
    active: products.filter(p => p.status === 'active').length,
    outOfStock: products.filter(p => p.stock === 0).length,
    totalSales: 12450
  };

  const handleToggleProduct = (id: string) => {
    const product = products.find(p => p.id === id);
    if (!product) return;

    const wasDisabled = product.status === 'disabled';
    
    setProducts(products.map(p => {
      if (p.id === id) {
        // If product is active, disable it. If disabled, enable it.
        const newStatus = p.status === 'active' ? 'disabled' : 'active';
        return { ...p, status: newStatus, isActive: newStatus === 'active' };
      }
      return p;
    }));

    // Show toast notification
    if (wasDisabled) {
      toast.success(
        language === 'ar' ? 'تم تفعيل المنتج بنجاح' : 'Product enabled successfully',
        {
          description: language === 'ar' 
            ? 'المنتج الآن مرئي للمشترين' 
            : 'This product is now visible to buyers',
          duration: 3000
        }
      );
    }
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
    
    // Show success toast
    toast.success(
      language === 'ar' ? 'تم حذف المنتج بنجاح' : 'Product deleted successfully',
      {
        description: language === 'ar' 
          ? 'تم إزالة المنتج من قائمتك' 
          : 'The product has been removed from your list',
        duration: 3000
      }
    );
  };

  const handlePublishProduct = (id: string) => {
    setProducts(products.map(p => {
      if (p.id === id) {
        return { ...p, status: 'active' as const, isActive: true, missingFields: [] };
      }
      return p;
    }));
  };

  const handleAddProduct = (newProduct: Product) => {
    setProducts(prevProducts => [newProduct, ...prevProducts]);
    setShowAddProduct(false);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setShowAddProduct(true);
  };

  const handleRestockProduct = (productId: string, newStock: number) => {
    setProducts(products.map(p => {
      if (p.id === productId) {
        // When restocking, set stock to new amount and ensure product is active
        return { 
          ...p, 
          stock: newStock, 
          status: 'active' as const, 
          isActive: true 
        };
      }
      return p;
    }));

    // Show success toast
    toast.success(
      language === 'ar' ? 'تم إعادة التخزين بنجاح' : 'Product restocked successfully',
      {
        description: language === 'ar' 
          ? `تم تحديث الكمية إلى ${newStock} وحدة` 
          : `Stock updated to ${newStock} units`,
        duration: 3000
      }
    );

    // Close the out of stock page
    setShowOutOfStock(false);
  };

  if (showSettings) {
    return (
      <SettingsPage 
        language={language} 
        onLanguageChange={setLanguage}
        onBack={() => setShowSettings(false)}
        storeSettings={storeSettings}
        onSaveSettings={setStoreSettings}
      />
    );
  }

  if (showAddProduct) {
    return (
      <AddProduct
        language={language}
        onBack={() => {
          setShowAddProduct(false);
          setEditingProduct(null);
        }}
        onAddProduct={handleAddProduct}
        editingProduct={editingProduct}
      />
    );
  }

  if (selectedProduct) {
    return (
      <ProductDetails
        product={selectedProduct}
        language={language}
        onBack={() => setSelectedProduct(null)}
      />
    );
  }

  if (showActiveProducts) {
    return (
      <ActiveProductsPage
        products={products}
        language={language}
        onBack={() => setShowActiveProducts(false)}
        onSelectProduct={setSelectedProduct}
        onToggleProduct={handleToggleProduct}
      />
    );
  }

  if (showOutOfStock) {
    return (
      <OutOfStockProductsPage
        products={products}
        language={language}
        onBack={() => setShowOutOfStock(false)}
        onSelectProduct={setSelectedProduct}
        onRestockProduct={handleRestockProduct}
      />
    );
  }

  if (showSalesAnalytics) {
    return (
      <SalesAnalyticsPage
        language={language}
        onBack={() => setShowSalesAnalytics(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-teal-50" dir="rtl">
      <Header 
        language={language}
        onLanguageChange={setLanguage}
        mobileMenuOpen={mobileMenuOpen}
        onMobileMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)}
        onSettingsClick={() => setShowSettings(true)}
        onNotificationsClick={() => setShowNotifications(true)}
        storeSettings={storeSettings}
      />

      <NotificationsPanel
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
        language={language}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        <QuickStats 
          stats={stats} 
          language={language} 
          onActiveProductsClick={() => setShowActiveProducts(true)}
          onOutOfStockClick={() => setShowOutOfStock(true)}
          onTotalSalesClick={() => setShowSalesAnalytics(true)}
        />
        
        <AddProductBanner 
          language={language} 
          onCreateProduct={() => setShowAddProduct(true)} 
        />
        
        <SearchFilters
          language={language}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          categoryFilter={categoryFilter}
          onCategoryFilterChange={setCategoryFilter}
        />

        <ProductGrid
          products={filteredProducts}
          language={language}
          onToggleProduct={handleToggleProduct}
          onDeleteProduct={handleDeleteProduct}
          onSelectProduct={setSelectedProduct}
          onEditProduct={handleEditProduct}
        />
      </main>

      {/* Floating Add Product Button */}
      <button
        onClick={() => setShowAddProduct(true)}
        className="fixed bottom-6 left-6 bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-50"
        aria-label={language === 'ar' ? 'إضافة منتج جديد' : 'Add New Product'}
      >
        <Plus className="w-6 h-6" />
      </button>

      <Toaster />
    </div>
  );
}
