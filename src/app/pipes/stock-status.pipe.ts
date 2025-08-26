import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stockStatus'
})
export class StockStatusPipe implements PipeTransform {
  transform(stock: number): { status: string, class: string } {
    if (stock == null || isNaN(stock)) {
      return { status: 'Unknown', class: 'unknown-stock' };
    }
    
    if (stock === 0) {
      return { status: 'Out of Stock', class: 'out-of-stock' };
    } else if (stock <= 5) {
      return { status: 'Low Stock', class: 'low-stock' };
    } else if (stock <= 20) {
      return { status: 'Limited Stock', class: 'limited-stock' };
    } else {
      return { status: 'In Stock', class: 'in-stock' };
    }
  }
}