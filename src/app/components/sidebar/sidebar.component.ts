import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  menuItems = [
    { name: 'Home', route: '/home', icon: '🏠' },
    { name: 'Products', route: '/products', icon: '🛒' },
    { name: 'Cart', route: '/cart', icon: '🛍️' },
    { name: 'Product Form', route: '/product-form', icon: '📝' }

  ];
}