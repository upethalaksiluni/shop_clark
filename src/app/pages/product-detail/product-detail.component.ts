import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: Product | null = null;
  isLoading = true;
  error: string | null = null;
  selectedImageIndex = 0;
  selectedQuantity = 1; 

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private categoryService: CategoryService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = Number(params['id']);
      if (id) {
        this.loadProduct(id);
      }
    });
  }

  loadProduct(id: number) {
    this.isLoading = true;
    this.error = null;

    this.productService.getProductById(id).subscribe({
      next: (product) => {
        this.product = product;
        this.isLoading = false;
        this.selectedQuantity = 1;
      },
      error: (error) => {
        console.error('Error loading product:', error);
        this.error = 'Failed to load product. Please try again later.';
        this.isLoading = false;
      }
    });
  }

  selectImage(index: number) {
    this.selectedImageIndex = index;
  }

  formatCategoryName(slug: string): string {
    return this.categoryService.formatCategoryName(slug);
  }

  getDiscountedPrice(price: number, discount: number): number {
    return price - (price * discount / 100);
  }

  
  getQuantityOptions(): number[] {
    if (!this.product) return [1];
    
    const maxQuantity = Math.min(this.product.stock, 10); 
    return Array.from({ length: maxQuantity }, (_, i) => i + 1);
  }
}