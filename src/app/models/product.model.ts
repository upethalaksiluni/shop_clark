export interface Product {
    id: number;
  title: string; // Changed from 'name' to 'title' to match API
  price: number;
  description: string;
  category: string;
  brand: string;
  thumbnail: string; // Changed from 'image' to 'thumbnail' to match API
  images: string[];
  rating: number;
  stock: number;
  discountPercentage: number;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}