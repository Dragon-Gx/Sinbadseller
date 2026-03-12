import { RouterProvider } from 'react-router';
import { router } from './routes';
import { Toaster } from './components/ui/sonner';

export type Language = 'ar' | 'en';

export interface StoreSettings {
  storeName: string;
  storeNameAr: string;
  logo: string;
  coverImage: string;
  category: string;
  city: string;
}

export interface Product {
  id: string;
  name: string;
  nameAr: string;
  price: number;
  retailPrice?: string;
  wholesalePrice?: string;
  stock: number;
  status: 'draft' | 'incomplete' | 'active' | 'disabled';
  image: string;
  images?: string[];
  category: string;
  subcategory?: string;
  isActive: boolean;
  description?: string;
  descriptionAr?: string;
  inventoryMethod?: 'pos' | 'manual';
  sku?: string;
  sellingType?: 'retail' | 'wholesale' | 'both';
  colors?: Array<{
    id: string;
    colorName: string;
    colorNameAr: string;
    imageUrl: string;
  }>;
  sizes?: string[] | number[];
  brand?: string;
  material?: string;
  origin?: string;
  weight?: string;
  createdAt?: string;
  missingFields?: string[];
}

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}