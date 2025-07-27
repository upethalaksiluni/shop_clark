export interface CartItem {
  id: string; 
  productId: number;
  title: string;
  price: number;
  thumbnail: string;
  quantity: number;
  stock: number;
  category: string;
  brand?: string;
  discountPercentage: number;
}

export interface Cart {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  discountedTotal: number;
  totalSavings: number;
}

export interface CartSummary {
  subtotal: number;
  totalDiscount: number;
  totalItems: number;
  finalTotal: number;
}
