import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CartItem } from '../../models/cart.model';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent {
  @Input() item!: CartItem;
  @Output() quantityChange = new EventEmitter<{itemId: string, quantity: number}>();
  @Output() removeItem = new EventEmitter<string>();

  onQuantityChange(event: any): void {
    const quantity = parseInt(event.target.value, 10);
    if (quantity > 0 && quantity <= this.item.stock) {
      this.quantityChange.emit({itemId: this.item.id, quantity});
    }
  }

  increaseQuantity(): void {
    if (this.item.quantity < this.item.stock) {
      this.quantityChange.emit({
        itemId: this.item.id, 
        quantity: this.item.quantity + 1
      });
    }
  }

  decreaseQuantity(): void {
    if (this.item.quantity > 1) {
      this.quantityChange.emit({
        itemId: this.item.id, 
        quantity: this.item.quantity - 1
      });
    }
  }

  onRemove(): void {
    this.removeItem.emit(this.item.id);
  }

  getItemTotal(): number {
    return this.item.price * this.item.quantity;
  }

  getDiscountedPrice(): number {
    if (this.item.discountPercentage > 0) {
      return this.item.price * (1 - this.item.discountPercentage / 100);
    }
    return this.item.price;
  }

  getItemDiscount(): number {
    if (this.item.discountPercentage > 0) {
      return (this.item.price * this.item.quantity * this.item.discountPercentage) / 100;
    }
    return 0;
  }
  
  formatCurrency(value: number): string {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  }
}