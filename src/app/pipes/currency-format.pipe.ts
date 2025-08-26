import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyFormat'
})
export class CurrencyFormatPipe implements PipeTransform {
  transform(value: number, currencySymbol: string = 'LKR', decimalPlaces: number = 2): string {
    if (value == null || isNaN(value)) {
      return '';
    }
    
    return `${currencySymbol}${value.toFixed(decimalPlaces)}`;
  }
}