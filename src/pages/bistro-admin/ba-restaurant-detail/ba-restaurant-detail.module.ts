import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BaRestaurantDetailPage } from './ba-restaurant-detail';
import { ComponentsModule } from '../../../components/ba-components/components.module';

@NgModule({
  declarations: [
    BaRestaurantDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(BaRestaurantDetailPage),
    ComponentsModule
  ],
})
export class BaRestaurantDetailPageModule {}
