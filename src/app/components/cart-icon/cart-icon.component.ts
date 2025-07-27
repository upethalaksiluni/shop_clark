import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-icon',
  templateUrl: './cart-icon.component.html',
  styleUrls: ['./cart-icon.component.css']
})
export class CartIconComponent implements OnInit, OnDestroy {
  itemCount = 0;
  private cartSubscription: Subscription = new Subscription();

  constructor(
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cartSubscription = this.cartService.getCart().subscribe(cart => {
      this.itemCount = cart.totalItems;
    });
  }

  ngOnDestroy(): void {
    this.cartSubscription.unsubscribe();
  }

  goToCart(): void {
    this.router.navigate(['/cart']);
  }
}