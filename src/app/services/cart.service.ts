import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartItem, Cart, CartSummary } from '../models/cart.model';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: CartItem[] = [];
  private cartSubject = new BehaviorSubject<Cart>(this.getEmptyCart());

  constructor() {
    this.loadCartFromStorage();
  }

  // Get cart as observable
  getCart(): Observable<Cart> {
    return this.cartSubject.asObservable();
  }

  // Get current cart value
  getCurrentCart(): Cart {
    return this.cartSubject.value;
  }

  // Add item to cart
  addToCart(product: Product, quantity: number = 1): void {
    const existingItemIndex = this.cartItems.findIndex(
      item => item.productId === product.id
    );

    if (existingItemIndex > -1) {
      // Update quantity if item already exists
      const existingItem = this.cartItems[existingItemIndex];
      const newQuantity = existingItem.quantity + quantity;
      
      if (newQuantity <= product.stock) {
        existingItem.quantity = newQuantity;
      } else {
        // Set to max stock if trying to add more than available
        existingItem.quantity = product.stock;
      }
    } else {
      // Add new item to cart
      const cartItem: CartItem = {
        id: this.generateCartItemId(),
        productId: product.id,
        title: product.title,
        price: product.price,
        thumbnail: product.thumbnail,
        quantity: Math.min(quantity, product.stock),
        stock: product.stock,
        category: product.category,
        brand: product.brand,
        discountPercentage: product.discountPercentage
      };
      
      this.cartItems.push(cartItem);
    }

    this.updateCart();
  }

  // Remove item from cart
  removeFromCart(cartItemId: string): void {
    this.cartItems = this.cartItems.filter(item => item.id !== cartItemId);
    this.updateCart();
  }

  // Update item quantity
  updateQuantity(cartItemId: string, quantity: number): void {
    const itemIndex = this.cartItems.findIndex(item => item.id === cartItemId);
    
    if (itemIndex > -1) {
      if (quantity <= 0) {
        this.removeFromCart(cartItemId);
      } else {
        const item = this.cartItems[itemIndex];
        item.quantity = Math.min(quantity, item.stock);
        this.updateCart();
      }
    }
  }

  // Clear entire cart
  clearCart(): void {
    this.cartItems = [];
    this.updateCart();
  }

  // Get cart item count
  getItemCount(): number {
    return this.cartItems.reduce((total, item) => total + item.quantity, 0);
  }

  // Check if product is in cart
  isInCart(productId: number): boolean {
    return this.cartItems.some(item => item.productId === productId);
  }

  // Get quantity of specific product in cart
  getProductQuantity(productId: number): number {
    const item = this.cartItems.find(item => item.productId === productId);
    return item ? item.quantity : 0;
  }

  // Calculate cart totals
  private calculateCart(): Cart {
    if (this.cartItems.length === 0) {
      return this.getEmptyCart();
    }

    let totalItems = 0;
    let subtotal = 0;
    let totalDiscount = 0;

    this.cartItems.forEach(item => {
      totalItems += item.quantity;
      const itemTotal = item.price * item.quantity;
      subtotal += itemTotal;
      
      if (item.discountPercentage > 0) {
        const discountAmount = (itemTotal * item.discountPercentage) / 100;
        totalDiscount += discountAmount;
      }
    });

    const finalTotal = subtotal - totalDiscount;

    return {
      items: [...this.cartItems],
      totalItems,
      totalPrice: subtotal,
      discountedTotal: finalTotal,
      totalSavings: totalDiscount
    };
  }

  // Update cart and notify subscribers
  private updateCart(): void {
    this.saveCartToStorage();
    this.cartSubject.next(this.calculateCart());
  }

  // Generate unique cart item ID
  private generateCartItemId(): string {
    return 'cart_item_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  // Get empty cart
  private getEmptyCart(): Cart {
    return {
      items: [],
      totalItems: 0,
      totalPrice: 0,
      discountedTotal: 0,
      totalSavings: 0
    };
  }

  // Save cart to localStorage
  private saveCartToStorage(): void {
    try {
      localStorage.setItem('shopclark_cart', JSON.stringify(this.cartItems));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }

  // Load cart from localStorage
  private loadCartFromStorage(): void {
    try {
      const savedCart = localStorage.getItem('shopclark_cart');
      if (savedCart) {
        this.cartItems = JSON.parse(savedCart);
        this.updateCart();
      }
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
      this.cartItems = [];
    }
  }

  // Get cart summary for checkout
  getCartSummary(): CartSummary {
    const cart = this.getCurrentCart();
    return {
      subtotal: cart.totalPrice,
      totalDiscount: cart.totalSavings,
      totalItems: cart.totalItems,
      finalTotal: cart.discountedTotal
    };
  }
}