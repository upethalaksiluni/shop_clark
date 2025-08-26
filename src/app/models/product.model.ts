export interface Product {
  id: number;
  title: string; 
  price: number;
  description: string;
  category: string;
  brand: string;
  thumbnail: string; 
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

export interface AddToCartRequest {
  productId: number;
  quantity: number;
}