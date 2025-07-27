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