import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'discountPrice'
})
export class DiscountPricePipe implements PipeTransform {
  transform(price: number, discountPercentage: number): number {
    if (price == null || discountPercentage == null || isNaN(price) || isNaN(discountPercentage)) {
      return price || 0;
    }
    
    return price - (price * discountPercentage / 100);
  }
}
