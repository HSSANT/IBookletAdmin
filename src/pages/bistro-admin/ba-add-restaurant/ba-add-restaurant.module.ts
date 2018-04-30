import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BaAddRestaurantPage } from './ba-add-restaurant';
import { ComponentsModule } from "../../../components/ba-components/components.module";

@NgModule({
  declarations: [
    BaAddRestaurantPage,
  ],
  imports: [
    IonicPageModule.forChild(BaAddRestaurantPage),
    ComponentsModule
  ],
})
export class BaAddRestaurantPageModule { }
