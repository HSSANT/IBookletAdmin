import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BaAddStaffPage } from './ba-add-staff';
import { ComponentsModule } from '../../../components/ba-components/components.module';


@NgModule({
  declarations: [
    BaAddStaffPage,
  ],
  imports: [
    IonicPageModule.forChild(BaAddStaffPage),
    ComponentsModule
  ],
})
export class BaAddStaffPageModule {}
