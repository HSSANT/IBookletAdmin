import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BaFoodDetailPage } from './ba-food-detail';
import { ComponentsModule } from '../../../components/ba-components/components.module';

@NgModule({
  declarations: [
    BaFoodDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(BaFoodDetailPage),
    ComponentsModule
  ],
})
export class BaFoodDetailPageModule {}
