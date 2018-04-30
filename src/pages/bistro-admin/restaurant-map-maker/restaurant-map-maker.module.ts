import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RestaurantMapMakerPage } from './restaurant-map-maker';
import { ComponentsModule } from '../../../components/ba-components/components.module';
 
@NgModule({
  declarations: [
    RestaurantMapMakerPage,
  ],
  imports: [
    IonicPageModule.forChild(RestaurantMapMakerPage),
    ComponentsModule
  ],
})
export class RestaurantMapMakerPageModule { }
