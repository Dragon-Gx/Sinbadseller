import { ProductCard } from './ProductCard';
import type { Product, Language } from '../App';

interface ProductGridProps {
  products: Product[];
  language: Language;
  onToggleProduct: (id: string) => void;
  onDeleteProduct: (id: string) => void;
  onSelectProduct: (product: Product) => void;
  onEditProduct?: (product: Product) => void;
}

export function ProductGrid({ products, language, onToggleProduct, onDeleteProduct, onSelectProduct, onEditProduct }: ProductGridProps) {
  const t = {
    ar: {
      myProducts: 'منتجاتي',
      noProducts: 'لا توجد منتجات',
      noProductsDesc: 'ابدأ بإضافة منتجك الأول'
    },
    en: {
      myProducts: 'My Products',
      noProducts: 'No products found',
      noProductsDesc: 'Start by adding your first product'
    }
  };

  return (
    <div>
      <h2 className="mb-4 text-gray-800">{t[language].myProducts}</h2>
      
      {products.length === 0 ? (
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-12 text-center shadow-sm border border-purple-100">
          <div className="text-gray-400 mb-2">{t[language].noProducts}</div>
          <p className="text-gray-500 text-sm">{t[language].noProductsDesc}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {products.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              language={language}
              onToggle={onToggleProduct}
              onDelete={onDeleteProduct}
              onSelect={onSelectProduct}
              onEdit={onEditProduct}
            />
          ))}
        </div>
      )}
    </div>
  );
}