import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartService } from '../../services/cart.service';
import { Cart, CartItem, CartSummary } from '../../models/cart.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {
  cart: Cart = {
    items: [],
    totalItems: 0,
    totalPrice: 0,
    discountedTotal: 0,
    totalSavings: 0
  };
  
  cartSummary: CartSummary = {
    subtotal: 0,
    totalDiscount: 0,
    totalItems: 0,
    finalTotal: 0
  };

  isLoading = false;
  private cartSubscription: Subscription = new Subscription();

  constructor(
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cartSubscription = this.cartService.getCart().subscribe(cart => {
      this.cart = cart;
      this.cartSummary = this.cartService.getCartSummary();
    });
  }

  ngOnDestroy(): void {
    this.cartSubscription.unsubscribe();
  }

  onQuantityChange(event: {itemId: string, quantity: number}): void {
    this.cartService.updateQuantity(event.itemId, event.quantity);
  }

  onRemoveItem(itemId: string): void {
    if (confirm('Are you sure you want to remove this item from your cart?')) {
      this.cartService.removeFromCart(itemId);
    }
  }

  clearCart(): void {
    if (confirm('Are you sure you want to clear your entire cart?')) {
      this.cartService.clearCart();
    }
  }

  continueShopping(): void {
    this.router.navigate(['/products']);
  }

  proceedToCheckout(): void {
    if (this.cart.items.length > 0) {
      // Navigate to checkout page (you can implement this later)
      alert('Checkout functionality would be implemented here!');
      // this.router.navigate(['/checkout']);
    }
  }

  goToProduct(productId: number): void {
    this.router.navigate(['/products', productId]);
  }

  isEmpty(): boolean {
    return this.cart.items.length === 0;
  }

  getTotalSavings(): number {
    return this.cart.totalSavings;
  }

  formatCurrency(amount: number): string {
    return `$${amount.toFixed(2)}`;
  }
  
  trackByItemId(index: number, item: CartItem): string {
    return item.id;
  }
}

// Cart Service:

// Add/remove items from cart
// Update quantities with stock validation
// Calculate totals with discounts
// Persist cart in localStorage
// Observable-based state management

// Cart Components:

// Cart Icon: Shows item count, clickable to go to cart
// Add to Cart Button: Smart button with loading states
// Cart Item: Individual cart item with quantity controls
// Cart Page: Full cart view with checkout functionality

// Enhanced Product Display:

// Add to cart buttons on product cards and detail pages
// Quantity selectors on product detail page
// Stock validation and low stock warnings
// Discount calculations and savings display


// .......................................................................................................................................................................................................................................
// .............................................................................

// 3. Cart Components
// a. Cart Icon (cart-icon.component.ts/html)
// Displays a cart icon with a badge showing the total item count.
// Clicking the icon navigates to the cart page.
// b. Add to Cart Button (add-to-cart-button.component.ts/html)
// Smart button that:
// Shows loading state when adding.
// Disables if out of stock or already in cart.
// Displays different text based on state (e.g., "Add to Cart", "In Cart", "Out of Stock").
// Handles quantity and size (small/medium/large) for different UI contexts.
// c. Cart Item (cart-item.component.ts/html)
// Displays individual cart items with:
// Product image, title, brand, category, pricing, and discount.
// Quantity controls (increase, decrease, direct input).
// Remove button.
// Shows total price and savings for each item.
// Emits events for quantity changes and removal.
// d. Cart Page (cart.component.ts/html)
// Main cart view:
// Shows all items in the cart using app-cart-item.
// Displays order summary (subtotal, discount, total, savings).
// Provides actions: clear cart, proceed to checkout, continue shopping.
// Handles empty cart state with a friendly message and button to shop.