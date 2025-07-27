import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-add-to-cart-button',
  templateUrl: './add-to-cart-button.component.html',
  styleUrls: ['./add-to-cart-button.component.css']
})
export class AddToCartButtonComponent implements OnInit, OnDestroy {
  @Input() product!: Product;
  @Input() quantity: number = 1;
  @Input() disabled: boolean = false;
  @Input() size: 'small' | 'medium' | 'large' = 'medium';

  isInCart = false;
  cartQuantity = 0;
  isLoading = false;
  private cartSubscription: Subscription = new Subscription();

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartSubscription = this.cartService.getCart().subscribe(cart => {
      this.isInCart = this.cartService.isInCart(this.product.id);
      this.cartQuantity = this.cartService.getProductQuantity(this.product.id);
    });
  }

  ngOnDestroy(): void {
    this.cartSubscription.unsubscribe();
  }

  addToCart(): void {
    if (!this.disabled && this.product.stock > 0) {
      this.isLoading = true;
      
      try {
        this.cartService.addToCart(this.product, this.quantity);
        
        // Simulate loading for better UX
        setTimeout(() => {
          this.isLoading = false;
        }, 300);
      } catch (error) {
        console.error('Error adding to cart:', error);
        this.isLoading = false;
      }
    }
  }

  getButtonText(): string {
    if (this.isLoading) return 'Adding...';
    if (this.product.stock === 0) return 'Out of Stock';
    if (this.isInCart) return `In Cart (${this.cartQuantity})`;
    return 'Add to Cart';
  }

  getButtonClass(): string {
    let baseClass = `add-to-cart-btn ${this.size}`;
    
    if (this.disabled || this.product.stock === 0) {
      baseClass += ' disabled';
    } else if (this.isInCart) {
      baseClass += ' in-cart';
    } else if (this.isLoading) {
      baseClass += ' loading';
    }
    
    return baseClass;
  }
}