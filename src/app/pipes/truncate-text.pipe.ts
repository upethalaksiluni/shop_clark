import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncateText'
})
export class TruncateTextPipe implements PipeTransform {
  transform(text: string, limit: number = 100, suffix: string = '...'): string {
    if (!text) {
      return '';
    }
    
    if (text.length <= limit) {
      return text;
    }
    
    return text.substr(0, limit) + suffix;
  }
}