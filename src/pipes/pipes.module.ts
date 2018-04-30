import { NgModule } from '@angular/core';
import { TitlePipe } from './title/title';
import { PricePipe } from './price/price';
import { FoodStatePipe } from './food-state/food-state';
@NgModule({
    declarations: [TitlePipe,
    PricePipe,
    FoodStatePipe],
    imports: [],
    exports: [TitlePipe,
    PricePipe,
    FoodStatePipe]
})
export class PipesModule { }
