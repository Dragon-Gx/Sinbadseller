import { Edit2, Trash2, ToggleRight } from 'lucide-react';
import { useState } from 'react';
import type { Product, Language } from '../App';

interface ProductCardProps {
  product: Product;
  language: Language;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onSelect: (product: Product) => void;
  onEdit?: (product: Product) => void;
}

export function ProductCard({ product, language, onToggle, onDelete, onSelect, onEdit }: ProductCardProps) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const t = {
    ar: {
      sar: 'د.ع',
      inStock: 'متوفر',
      outOfStock: 'نفذ من المخزون',
      pending: 'معلق',
      active: 'نشط',
      hidden: 'مخفي',
      disabled: 'معطل',
      enable: 'تفعيل',
      edit: 'تعديل',
      delete: 'حذف',
      hiddenFromBuyers: 'مخفي عن المشترين',
      deleteConfirmTitle: 'تأكيد حذف المنتج',
      deleteConfirmMessage: 'هل أنت متأكد من حذف هذا المنتج؟ لا يمكن التراجع عن هذا الإجراء.',
      cancel: 'إلغاء',
      confirmDelete: 'نعم، احذف'
    },
    en: {
      sar: 'IQD',
      inStock: 'In Stock',
      outOfStock: 'Out of Stock',
      pending: 'Pending',
      active: 'Active',
      hidden: 'Hidden',
      disabled: 'Disabled',
      enable: 'Enable',
      edit: 'Edit',
      delete: 'Delete',
      hiddenFromBuyers: 'Hidden from buyers',
      deleteConfirmTitle: 'Confirm Product Deletion',
      deleteConfirmMessage: 'Are you sure you want to delete this product? This action cannot be undone.',
      cancel: 'Cancel',
      confirmDelete: 'Yes, Delete'
    }
  };

  const handleDeleteClick = () => {
    setShowDeleteConfirm(false);
    onDelete(product.id);
  };

  const isDisabled = product.status === 'disabled';

  const getStatusBadge = () => {
    if (product.status === 'out-of-stock') {
      return (
        <span className="px-2 py-0.5 bg-red-100 text-red-600 rounded-full text-xs">
          {t[language].outOfStock}
        </span>
      );
    }
    if (product.status === 'pending') {
      return (
        <span className="px-2 py-0.5 bg-yellow-100 text-yellow-600 rounded-full text-xs">
          {t[language].pending}
        </span>
      );
    }
    return (
      <span className="px-2 py-0.5 bg-green-100 text-green-600 rounded-full text-xs">
        {product.stock} {t[language].inStock}
      </span>
    );
  };

  return (
    <div 
      onClick={() => onSelect(product)}
      className={`bg-white/70 backdrop-blur-sm rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-purple-100 group cursor-pointer ${
        isDisabled ? 'opacity-75' : ''
      }`}
    >
      {/* Product Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={language === 'ar' ? product.nameAr : product.name}
          className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ${
            isDisabled ? 'grayscale' : ''
          }`}
        />
        
        {/* Disabled Overlay */}
        {isDisabled && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <div className="text-center">
              <span className="px-3 py-1.5 bg-red-500 text-white rounded-lg text-xs mb-2 inline-block">
                {t[language].disabled}
              </span>
              <p className="text-white text-xs">{t[language].hiddenFromBuyers}</p>
            </div>
          </div>
        )}
        
        {/* Action Buttons */}
        {!isDisabled && (
          <div className="absolute top-2 left-2 flex gap-1.5">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowDeleteConfirm(true);
              }}
              className="p-1.5 bg-white/90 backdrop-blur-sm rounded-lg shadow-md hover:bg-red-50 hover:text-red-600 transition-all"
              aria-label={t[language].delete}
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (onEdit) {
                  onEdit(product);
                }
              }}
              className="p-1.5 bg-white/90 backdrop-blur-sm rounded-lg shadow-md hover:bg-purple-50 hover:text-purple-600 transition-all"
              aria-label={t[language].edit}
            >
              <Edit2 className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-3 space-y-2">
        <div>
          <h3 className="text-sm text-gray-800 mb-0.5 line-clamp-1">
            {language === 'ar' ? product.nameAr : product.name}
          </h3>
          <div className="text-lg bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 bg-clip-text text-transparent">
            {product.price} {t[language].sar}
          </div>
        </div>

        {!isDisabled && (
          <div className="flex items-center justify-between">
            {getStatusBadge()}
          </div>
        )}

        {/* Status Display / Enable Button */}
        {isDisabled ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggle(product.id);
            }}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all text-sm"
          >
            <ToggleRight className="w-4 h-4" />
            {t[language].enable}
          </button>
        ) : (
          <div className="flex items-center justify-between pt-2 border-t border-purple-100">
            <span className="text-xs text-gray-600">
              {product.isActive ? t[language].active : t[language].hidden}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggle(product.id);
              }}
              className={`relative w-11 h-5 rounded-full transition-colors ${
                product.isActive
                  ? 'bg-gradient-to-r from-purple-500 to-blue-500'
                  : 'bg-gray-300'
              }`}
            >
              <span
                className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-md transition-transform ${
                  product.isActive ? 'left-6' : 'left-0.5'
                }`}
              />
            </button>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setShowDeleteConfirm(false)}
        >
          <div 
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6"
            onClick={(e) => e.stopPropagation()}
            dir={language === 'ar' ? 'rtl' : 'ltr'}
          >
            {/* Product Preview */}
            <div className="flex items-center gap-3 mb-4 p-3 bg-gray-50 rounded-lg">
              <img
                src={product.image}
                alt={language === 'ar' ? product.nameAr : product.name}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h4 className="text-sm line-clamp-2 mb-1">
                  {language === 'ar' ? product.nameAr : product.name}
                </h4>
                <p className="text-xs text-gray-500">
                  {product.price} {t[language].sar}
                </p>
              </div>
            </div>

            <h3 className="text-xl bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent mb-3">
              {t[language].deleteConfirmTitle}
            </h3>
            <p className="text-gray-600 mb-6 text-sm">
              {t[language].deleteConfirmMessage}
            </p>
            
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                {t[language].cancel}
              </button>
              <button
                onClick={handleDeleteClick}
                className="flex-1 bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-3 rounded-lg hover:shadow-lg transition-all duration-300"
              >
                {t[language].confirmDelete}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}