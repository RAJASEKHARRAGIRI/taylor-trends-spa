export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    discount: number;
    stockStatus: string;
    rating: number;
    reviewsCount: number;
    category: string;
    brand: string;
    images: string[];
    tags: string[];
    createdAt: string;
    updatedAt: string;
  }