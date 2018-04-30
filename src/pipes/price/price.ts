import { Pipe, PipeTransform } from '@angular/core';
import { Utils } from '../../providers/app-utils';
 
@Pipe({
  name: 'price',
})
export class PricePipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: number, ...args) {
    return Utils.formatNumber(value, ".");
  }
}
