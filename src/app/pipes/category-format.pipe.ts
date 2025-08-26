import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'categoryFormat'
})
export class CategoryFormatPipe implements PipeTransform {
  transform(categorySlug: string): string {
    if (!categorySlug) {
      return '';
    }
    
    // Replace hyphens and underscores with spaces, then capitalize each word
    return categorySlug
      .replace(/[-_]/g, ' ')
      .replace(/\b\w/g, (match) => match.toUpperCase());
  }
}