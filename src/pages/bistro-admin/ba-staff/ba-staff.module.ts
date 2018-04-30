import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BaStaffPage } from './ba-staff';
import { ComponentsModule } from '../../../components/ba-components/components.module';

@NgModule({
  declarations: [
    BaStaffPage,
  ],
  imports: [
    IonicPageModule.forChild(BaStaffPage),
    ComponentsModule
  ],
})
export class BaStaffPageModule {}
