import { Pipe, PipeTransform } from '@angular/core';
import { FOOD_STATE } from '../../providers/bistro-admin/app-constant';


@Pipe({
  name: 'foodState',
})
export class FoodStatePipe implements PipeTransform {
  transform(value: number, ...args) {
    switch (value) {
      case FOOD_STATE.AVAILABLE.id: return FOOD_STATE.AVAILABLE.value;
      case FOOD_STATE.NOT_YET.id: return FOOD_STATE.NOT_YET.value;
      case FOOD_STATE.OUT_OF_BUSINESS.id: return FOOD_STATE.OUT_OF_BUSINESS.value;
      case FOOD_STATE.OUT_OF_STOCK.id: return FOOD_STATE.OUT_OF_STOCK.value;
      default: return "";
    }
  }
}
