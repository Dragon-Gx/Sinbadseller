import { Package, AlertCircle, TrendingUp } from 'lucide-react';
import type { Language } from '../App';

interface QuickStatsProps {
  stats: {
    active: number;
    outOfStock: number;
    totalSales: number;
  };
  language: Language;
  onActiveProductsClick?: () => void;
  onOutOfStockClick?: () => void;
  onTotalSalesClick?: () => void;
}

export function QuickStats({ stats, language, onActiveProductsClick, onOutOfStockClick, onTotalSalesClick }: QuickStatsProps) {
  const t = {
    ar: {
      activeProducts: 'منتجات نشطة',
      outOfStock: 'نفذت من المخزون',
      totalSales: 'إجمالي المبيعات',
      sar: 'د.ع',
      disabledProducts: 'منتجات معطلة'
    },
    en: {
      activeProducts: 'Active Products',
      outOfStock: 'Out of Stock',
      totalSales: 'Total Sales',
      sar: 'IQD',
      disabledProducts: 'Disabled Products'
    }
  };

  const cards = [
    {
      icon: Package,
      label: t[language].activeProducts,
      value: stats.active,
      gradient: 'from-green-400 to-emerald-500',
      bg: 'bg-green-50',
      clickable: true,
      onClick: onActiveProductsClick
    },
    {
      icon: AlertCircle,
      label: t[language].outOfStock,
      value: stats.outOfStock,
      gradient: 'from-red-400 to-pink-500',
      bg: 'bg-red-50',
      clickable: true,
      onClick: onOutOfStockClick
    },
    {
      icon: TrendingUp,
      label: t[language].totalSales,
      value: `${stats.totalSales} ${t[language].sar}`,
      gradient: 'from-purple-400 via-blue-500 to-teal-500',
      bg: 'bg-purple-50',
      clickable: true,
      onClick: onTotalSalesClick
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <div
            key={index}
            onClick={card.clickable ? card.onClick : undefined}
            className={`bg-white/70 backdrop-blur-sm rounded-xl p-3 shadow-sm hover:shadow-md transition-all duration-300 border border-purple-100 ${
              card.clickable ? 'cursor-pointer hover:scale-105' : ''
            }`}
          >
            <div className={`w-10 h-10 ${card.bg} rounded-lg flex items-center justify-center mb-2`}>
              <Icon className={`w-5 h-5 bg-gradient-to-br ${card.gradient} bg-clip-text text-transparent`} style={{ WebkitTextFillColor: 'transparent', WebkitBackgroundClip: 'text', backgroundClip: 'text' }} />
            </div>
            <div className="text-gray-500 text-xs mb-1 line-clamp-2">{card.label}</div>
            <div className={`text-lg bg-gradient-to-r ${card.gradient} bg-clip-text text-transparent`}>
              {card.value}
            </div>
          </div>
        );
      })}
    </div>
  );
}