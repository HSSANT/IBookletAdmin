import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BaRestaurantMapPage } from './ba-restaurant-map';
import { ComponentsModule } from '../../../components/ba-components/components.module';

@NgModule({
  declarations: [
    BaRestaurantMapPage,
  ],
  imports: [
    IonicPageModule.forChild(BaRestaurantMapPage),
    ComponentsModule
  ],
})
export class BaRestaurantMapPageModule { }
