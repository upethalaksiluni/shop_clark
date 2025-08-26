import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'starRating'
})
export class StarRatingPipe implements PipeTransform {
  transform(rating: number, maxStars: number = 5): string {
    if (rating == null || isNaN(rating)) {
      return '';
    }
    
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = maxStars - fullStars - (hasHalfStar ? 1 : 0);
    
    let stars = '★'.repeat(fullStars);
    
    if (hasHalfStar) {
      stars += '☆'; // Half star representation
    }
    
    stars += '☆'.repeat(emptyStars);
    
    return stars;
  }
}