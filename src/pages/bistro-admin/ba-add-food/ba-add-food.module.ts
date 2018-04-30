import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BaAddFoodPage } from './ba-add-food';
import { ComponentsModule } from '../../../components/ba-components/components.module';

@NgModule({
  declarations: [
    BaAddFoodPage,
  ],
  imports: [
    IonicPageModule.forChild(BaAddFoodPage),
    ComponentsModule
  ],
})
export class BaAddFoodPageModule {}
