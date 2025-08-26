import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  isLoading = true;
  error: string | null = null;
  currentCategory: string | null = null;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.currentCategory = params['category'];
      this.loadProducts();
    });
  }

  loadProducts() {
    this.isLoading = true;
    this.error = null;

    const productObservable = this.currentCategory 
      ? this.productService.getProductsByCategory(this.currentCategory)
      : this.productService.getLimitedProducts(30);

    productObservable.subscribe({
      next: (products) => {
        this.products = products;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading products:', error);
        this.error = 'Failed to load products. Please try again later.';
        this.isLoading = false;
      }
    });
  }
}

// In Products List Page:

// Category name formatting in headers