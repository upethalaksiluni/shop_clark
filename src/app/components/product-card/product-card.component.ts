import { Component, Input } from '@angular/core';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input() product!: Product;
}

// In Product Cards:

// Price formatting
// Text truncation for titles and descriptions
// Star ratings
// Stock status indicators

// Custom Pipes Created:
// CurrencyFormatPipe - Formats prices with currency symbol
// DiscountPricePipe - Calculates discounted prices
// CategoryFormatPipe - Formats category slugs to readable names
// StarRatingPipe - Converts numeric ratings to star symbols
// StockStatusPipe - Provides stock status with CSS classes
// TruncateTextPipe - Truncates long text with ellipsis