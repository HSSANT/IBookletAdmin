import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BaRestaurantPage } from './ba-restaurant';
import { ComponentsModule } from '../../../components/ba-components/components.module';
@NgModule({
  declarations: [
    BaRestaurantPage,
  ],
  imports: [
    IonicPageModule.forChild(BaRestaurantPage),
    ComponentsModule
  ],
})
export class BaRestaurantPageModule { }
