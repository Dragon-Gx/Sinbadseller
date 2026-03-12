import { Search } from 'lucide-react';
import type { Language } from '../App';

interface SearchFiltersProps {
  language: Language;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  statusFilter: 'all' | 'active' | 'pending' | 'out-of-stock';
  onStatusFilterChange: (status: 'all' | 'active' | 'pending' | 'out-of-stock') => void;
  categoryFilter: string;
  onCategoryFilterChange: (category: string) => void;
}

export function SearchFilters({
  language,
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  categoryFilter,
  onCategoryFilterChange
}: SearchFiltersProps) {
  const t = {
    ar: {
      search: 'ابحث في متجرك...',
      all: 'الكل',
      active: 'نشط',
      pending: 'معلق',
      outOfStock: 'نفذ من المخزون',
      electronics: 'إلكترونيات',
      fashion: 'أزياء',
      home: 'منزل',
      accessories: 'إكسسوارات'
    },
    en: {
      search: 'Search in your store...',
      all: 'All',
      active: 'Active',
      pending: 'Pending',
      outOfStock: 'Out of Stock',
      electronics: 'Electronics',
      fashion: 'Fashion',
      home: 'Home',
      accessories: 'Accessories'
    }
  };

  const statusOptions = [
    { value: 'all', label: t[language].all },
    { value: 'active', label: t[language].active },
    { value: 'pending', label: t[language].pending },
    { value: 'out-of-stock', label: t[language].outOfStock }
  ];

  const categoryOptions = [
    { value: 'all', label: t[language].all },
    { value: 'Electronics', label: t[language].electronics },
    { value: 'Fashion', label: t[language].fashion },
    { value: 'Home', label: t[language].home },
    { value: 'Accessories', label: t[language].accessories }
  ];

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 shadow-sm border border-purple-100">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search */}
        <div className="flex-1 relative">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={t[language].search}
            className="w-full pr-10 pl-4 py-2 bg-white border border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
          />
        </div>

        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={(e) => onStatusFilterChange(e.target.value as any)}
          className="px-4 py-2 bg-white border border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all cursor-pointer"
        >
          {statusOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {/* Category Filter */}
        <select
          value={categoryFilter}
          onChange={(e) => onCategoryFilterChange(e.target.value)}
          className="px-4 py-2 bg-white border border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all cursor-pointer"
        >
          {categoryOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
