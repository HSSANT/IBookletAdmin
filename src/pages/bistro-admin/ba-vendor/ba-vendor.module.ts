import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BaVendorPage } from './ba-vendor';
import { ComponentsModule } from '../../../components/ba-components/components.module';

@NgModule({
  declarations: [
    BaVendorPage,
  ],
  imports: [
    IonicPageModule.forChild(BaVendorPage),
    ComponentsModule
  ],
})
export class BaVendorPageModule { }
