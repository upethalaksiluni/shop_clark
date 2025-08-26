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

// CartItem: Represents an item in the cart, including product details, quantity, stock, discount, etc.
// Cart: Represents the entire cart, including a list of items, total counts, prices, and savings.
// CartSummary: Used for checkout/order summary, showing subtotal, discounts, and final total.